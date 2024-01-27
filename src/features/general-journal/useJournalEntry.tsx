import { getJournalEntry } from "@/service/ApiTransactions";
import { useQuery } from "@tanstack/react-query";

export default function useJournalEntry(transactionId: string) {
    const {
        data: journalEntry,
        isPending,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["transactions", transactionId],
        queryFn: () => getJournalEntry(transactionId),
    });

    return { journalEntry, isError, isPending, isFetching };
}
