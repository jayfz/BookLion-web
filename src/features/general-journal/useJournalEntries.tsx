import { getJournalEntries } from "@/service/ApiTransactions";
import { useInfiniteQuery } from "@tanstack/react-query";

const defaultPageNumber = 0;
async function retrieveJournalEntries({ pageParam = defaultPageNumber }) {
    return await getJournalEntries(pageParam);
}
export default function useJournalEntries() {
    const {
        isPending,
        data: journalEntries,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["transactions"],
        queryFn: retrieveJournalEntries,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.page.last) {
                return undefined;
            }
            return lastPage.page.number + 1;
        },
    });

    return { hasNextPage, isPending, journalEntries, fetchNextPage, isFetchingNextPage };
}
