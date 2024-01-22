import { GeneralJournalEntry } from "@/features/general-journal/GeneralJournalEntry";
import useJournalEntries from "@/features/general-journal/useJournalEntries";
import PageTitle from "@/ui/PageTitle";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef } from "react";
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
    const containerRef = useRef<HTMLDivElement>(null);
    const { journalEntries, isFetchingNextPage, fetchNextPage } = useJournalEntries();
    const { ref, entry } = useIntersection({
        // root: lastJournalEntryRef.current,
        threshold: 1,
    });

    useEffect(() => {
        if (entry?.isIntersecting) fetchNextPage();
    }, [entry, fetchNextPage]);
    return (
        <Container>
            {/* <PageTitle title="General Journal" /> */}
            {isFetchingNextPage ? (
                <p>Loading...</p>
            ) : (
                <div ref={containerRef}>
                    {journalEntries?.pages
                        .flatMap((page) => page.data)
                        .map((item, index, collection) => {
                            return collection.length - 1 == index ? (
                                <GeneralJournalEntry
                                    entry={item}
                                    key={item.id}
                                    ref={collection.length - 1 == index ? ref : undefined}
                                />
                            ) : (
                                <GeneralJournalEntry entry={item} key={item.id} />
                            );
                        })}
                </div>
            )}
        </Container>
    );
}
