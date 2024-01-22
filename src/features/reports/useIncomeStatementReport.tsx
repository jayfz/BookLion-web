import { getIncomeStatementReport } from "@/service/ApiTransactions";
import { useQuery } from "@tanstack/react-query";

export default function useIncomeStatementReport() {
    const {
        isPending,
        isError,
        data: incomeStatementReport,
    } = useQuery({
        queryKey: ["transactions", "income-statement"],
        queryFn: () => getIncomeStatementReport(),
    });

    return { isPending, isError, incomeStatementReport };
}
