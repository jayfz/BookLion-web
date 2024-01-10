import GeneralLedgerEntry from "@/features/general-ledger/GeneralLedgerEntry";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    background-color: #efefef;
    padding: 1.25rem;
`;

export default function GeneralLedgerPage() {
    const { accountId } = useParams();
    console.log(accountId);

    const data = [
        {
            date: new Date(),
            description: "Paying Netflix's montly fee",
            accountType: "ASSETS" as const,
            debits: "0.00",
            credits: "14322.55",
            transactionId: "129129",
        },
        {
            date: new Date(),
            description: "Banco paga intereses",
            accountType: "ASSETS" as const,
            debits: "4600.32",
            credits: "0.00",
            transactionId: "327124",
        },
        {
            date: new Date(),
            description: "Paying Disney+ monthly fee, why do I have to pay this goddang it, please someone help me",
            accountType: "ASSETS" as const,
            debits: "0.00",
            credits: "16000.33",
            transactionId: "4124",
        },
    ];

    return (
        <Container>
            <GeneralLedgerEntry ledgerEntry={data[0]} />
            <GeneralLedgerEntry ledgerEntry={data[1]} />
            <GeneralLedgerEntry ledgerEntry={data[2]} />
        </Container>
    );
}
