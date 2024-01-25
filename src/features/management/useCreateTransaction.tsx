import { postTransaction } from "@/service/ApiTransactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreateTransaction(onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();
    const { mutate: createTransaction, isPending: isCreatingTransaction } = useMutation({
        mutationFn: postTransaction,
        onSuccess: () => {
            if (onSuccessCallback) onSuccessCallback();
            toast.success("Transaction recorded succesfully");
            queryClient.invalidateQueries({
                queryKey: ["transactions"],
            });
        },
        onError: () => {
            toast.error("Unable to create transaction");
        },
    });

    return { createTransaction, isCreatingTransaction };
}
