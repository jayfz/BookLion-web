import { GeneralJournalEntry } from "@/features/general-journal/GeneralJournalEntry";
import useJournalEntries from "@/features/general-journal/useJournalEntries";
import PageTitle from "@/ui/PageTitle";
import { useIntersection } from "@mantine/hooks";
import { useEffect } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

export const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    padding-top: 0.5rem;
    overflow-y: scroll;
`;
export default function GeneralJournalPage() {
    const { hasNextPage, isPending, journalEntries, isFetchingNextPage, fetchNextPage } = useJournalEntries();

    const { ref, entry } = useIntersection({
        threshold: 1,
    });

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) fetchNextPage();
    }, [entry, fetchNextPage, hasNextPage]);

    useEffect(() => {
        let toastId: null | string = null;
        if (isFetchingNextPage || isPending) toastId = toast.loading("Loading");
        return () => toast.dismiss(toastId || "");
    }, [isFetchingNextPage, isPending]);
    return (
        <Container>
            <PageTitle title="General Journal" />
            {journalEntries?.pages
                .flatMap((page) => page.data)
                .map((item, index, collection) => (
                    <GeneralJournalEntry
                        entry={item}
                        key={item.id}
                        ref={collection.length - 1 == index ? ref : undefined}
                    />
                ))}
            {!hasNextPage && journalEntries && <p>No more data available</p>}
            {!hasNextPage && !journalEntries && !isPending && <p>No data available</p>}
        </Container>
    );
}
