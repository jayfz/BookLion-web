import GeneralJournalEntry from "@/features/general-journal/GeneralJournalEntry";
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

export default function GeneralLedgerPage() {
    const { transactionId } = useParams();
    console.log(transactionId);

    const data = {
        date: new Date(),
        description: "Paying Netflix's montly fee",
        ledgerEntries: [
            {
                accountType: "ASSETS" as const,
                accountNumber: "10001",
                accountName: "Savings account",
                debits: "0.00",
                credits: "13414322.55",
            },
            {
                accountType: "EXPENSES" as const,
                accountNumber: "50001",
                accountName: "Netflix",
                debits: "10976.41",
                credits: "0.00",
            },
            {
                accountType: "EXPENSES" as const,
                accountNumber: "50002",
                accountName: "Dian IVA",
                debits: "3742.17",
                credits: "0.00",
            },
        ],
    };

    return (
        <Container>
            <PageTitle title="General Journal" />
            <GeneralJournalEntry entry={data} />
            <GeneralJournalEntry entry={data} />
            <GeneralJournalEntry entry={data} />
            <GeneralJournalEntry entry={data} />
        </Container>
    );
}
