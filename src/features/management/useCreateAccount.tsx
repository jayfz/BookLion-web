import { postAccount } from "@/service/ApiAccount";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreateAccount(successCallback?: () => void) {
    const queryClient = useQueryClient();
    const { mutate: createAccount, isPending: isCreatingAccount } = useMutation({
        mutationFn: postAccount,
        onSuccess: () => {
            toast.success("Account created succesfully");
            if (successCallback) successCallback();

            queryClient.invalidateQueries({
                queryKey: ["accounts"],
            });
        },
        onError: () => {
            toast.error("Unable to create account");
        },
    });

    return { createAccount, isCreatingAccount };
}
