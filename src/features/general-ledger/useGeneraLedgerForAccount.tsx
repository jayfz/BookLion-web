import { getGeneralLedgerForAccount } from "@/service/ApiTransactions";
import { useQuery } from "@tanstack/react-query";

export default function useGeneraLedgerForAccount(accountNumber: string) {
    const {
        isPending,
        data: generalLedgerEntries,
        error,
        isFetching,
    } = useQuery({
        queryKey: ["generalLedger", accountNumber],
        queryFn: () => getGeneralLedgerForAccount(accountNumber),
        retry: false,
    });

    return { isFetching, generalLedgerEntries, error, isPending };
}
