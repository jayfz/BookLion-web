import { getBudget } from "@/service/ApiBudgets";
import { useQuery } from "@tanstack/react-query";

export default function useBudget(budgetId: string | number) {
    const {
        isError,
        isPending,
        data: budget,
    } = useQuery({
        queryKey: ["budgets", budgetId],
        queryFn: () => getBudget(budgetId),
    });

    return { isError, isPending, budget };
}
