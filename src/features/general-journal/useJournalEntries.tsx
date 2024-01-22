import { getJournalEntries } from "@/service/ApiTransactions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const defaultPageNumber = 0;
async function retrieveJournalEntries({ pageParam = defaultPageNumber }) {
    return await getJournalEntries(pageParam);
}
export default function useJournalEntries() {
    const {
        data: journalEntries,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["transactions"],
        queryFn: retrieveJournalEntries,
        initialPageParam: 0,
        getNextPageParam: (_, pages) => {
            if (_.page.last) {
                return pages.length - 1;
            }
            return pages.length;
        },
    });

    return { journalEntries, fetchNextPage, isFetchingNextPage };
}
