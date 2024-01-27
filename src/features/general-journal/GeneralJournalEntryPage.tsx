import { GeneralJournalEntry } from "@/features/general-journal/GeneralJournalEntry";
import useJournalEntry from "@/features/general-journal/useJournalEntry";
import PageTitle from "@/ui/PageTitle";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    padding-top: 0.5rem;
    overflow-y: scroll;
`;

export default function GeneralJournalEntryPage() {
    const { transactionId } = useParams();
    const { journalEntry, isPending } = useJournalEntry(transactionId ?? "");

    return (
        <Container>
            {isPending ? <PageTitle title="Loading..." /> : <PageTitle title={`General Journal #${transactionId}`} />}

            {journalEntry && <GeneralJournalEntry entry={journalEntry} />}
        </Container>
    );
}
