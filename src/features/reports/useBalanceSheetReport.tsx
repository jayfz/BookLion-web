import { getBalanceSheetReport } from "@/service/ApiTransactions";
import { useQuery } from "@tanstack/react-query";

export default function useBalanceSheetReport() {
    const {
        isPending,
        isError,
        data: balanceSheet,
    } = useQuery({
        queryKey: ["transactions", "balance-sheet"],
        queryFn: () => getBalanceSheetReport(),
    });

    return { isPending, isError, balanceSheet };
}
