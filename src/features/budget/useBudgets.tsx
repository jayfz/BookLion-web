import { getBudgets } from "@/service/ApiBudgets";
import { useQuery } from "@tanstack/react-query";

export default function useBudgets() {
    const {
        isError,
        isPending,
        data: budgets,
    } = useQuery({
        queryKey: ["budgets"],
        queryFn: () => getBudgets(),
    });

    return { isError, isPending, budgets };
}
