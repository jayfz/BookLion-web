import { LedgerEntry } from "@/types/account";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { isTransactionNegative } from "@/utils/helpers";
import { Link } from "react-router-dom";
import styled from "styled-components";

type GeneralLedgerEntryProps = {
    ledgerEntry: LedgerEntry;
};

const Container = styled.article<{ $isNegativeAmount: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    background-color: white;
    border-radius: 0.5rem;
    border: 1px solid #e3e3e3;
    box-shadow: -1px 1px 0px 0px #e0e0e0;
    font-size: 0.75rem;

    & > p:first-child {
        font-size: 0.875rem;
        color: #868686;
    }

    & > p {
        font-size: 0.75rem;
    }

    & > p:last-child {
        margin-left: auto;
        font-size: 0.875rem;
        font-family: "Roboto mono", monospace;
        color: ${(props) => (props.$isNegativeAmount ? "var(--bl-negative-amount)" : "var(--bl-positive-amount)")};
    }
`;

export default function GeneralLedgerEntry({ ledgerEntry }: GeneralLedgerEntryProps) {
    const transactionAmount = ledgerEntry.debits == "0.00" ? ledgerEntry.credits : ledgerEntry.debits;
    const formattedAmount = formatCurrency(transactionAmount, "shortest");
    const isNegativeAmount = isTransactionNegative(ledgerEntry);
    return (
        <Container
            $isNegativeAmount={isNegativeAmount}
            as={Link}
            to={`/dashboard/general-journal/${ledgerEntry.transactionId}`}
        >
            <p>{formatDate(ledgerEntry.date, "shorter")}</p>
            <p>{ledgerEntry.description}</p>
            <p>{formattedAmount}</p>
        </Container>
    );
}
