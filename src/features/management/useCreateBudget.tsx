import { postBudget } from "@/service/ApiBudgets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateBudgetInput } from "@/types/account";

type CreateBudgetMutationFunction = {
    accountId: string | number;
    budget: CreateBudgetInput;
};
export default function useCreateBudget(onSuccessCallback: () => void) {
    const queryClient = useQueryClient();
    const { mutate: createBudget, isPending: isCreatingBudget } = useMutation({
        mutationFn: ({ accountId, budget }: CreateBudgetMutationFunction) => postBudget(accountId, budget),
        onSuccess: () => {
            onSuccessCallback();
            toast.success("Budget succesfully created");
            queryClient.invalidateQueries({
                queryKey: ["budgets"],
            });
        },
        onError: () => {
            toast.error("Unable to create budget");
        },
    });

    return { createBudget, isCreatingBudget };
}
