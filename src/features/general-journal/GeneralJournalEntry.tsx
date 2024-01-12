import { AccountType, JournalEntry } from "@/types/account";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { isTransactionNegative } from "@/utils/helpers";
import styled from "styled-components";

type GeneralJournalEntry = {
    entry: JournalEntry;
};

const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background-color: white;
    border-radius: 0.5rem;
    /* border: 1px solid #e3e3e3;
    box-shadow: -1px 1px 0px 0px #e0e0e0; */
    font-size: 0.75rem;

    & hr {
        color: #dadada;
    }
`;

const TransactionBody = styled.div``;

const TransactionHeader = styled.div`
    display: grid;
    grid-template-columns: 40% 1fr 1fr;
    align-items: center;

    & > p:first-child {
        font-size: 1rem;
        color: #696969;
    }

    & > :not(:first-child) {
        margin-left: auto;
    }
`;

const TransactionLine = styled(TransactionHeader).attrs<{ $accountType: AccountType }>((props) => ({
    $accountType: props.$accountType,
}))`
    padding: 0.25rem 0;
    & > p:not(:first-child) {
        font-family: "Roboto mono", monospace;
    }
    & > div > p {
        display: inline-block;
        padding-right: 0.25rem;
    }

    & > div > p:last-child {
        color: ${(props) => `var(--bl-${props.$accountType.toLocaleLowerCase()}-medium-color)`};
    }
`;

const TransactionAmount = styled.p<{ $outcome: "positive" | "negative" | "neutral" }>`
    color: ${(props) => `var(--bl-${props.$outcome}-amount)`};
`;

function checkOutcome(amount: string, isNegative: boolean) {
    if (amount == "0.00") return "neutral";

    if (isNegative) return "negative";

    return "positive";
}

//todo: give color to accountNumber

export default function GeneralJournalEntry({ entry }: GeneralJournalEntry) {
    const dateFormat = "short" as const;

    return (
        <Container>
            <TransactionHeader>
                <p>{formatDate(entry.date, dateFormat)}</p>
                <p>Debits</p>
                <p>Credits</p>
            </TransactionHeader>
            <TransactionBody>
                {entry.ledgerEntries.map((ledgerEntry) => {
                    return (
                        <TransactionLine key={ledgerEntry.accountNumber} $accountType={ledgerEntry.accountType}>
                            <div>
                                <p>{ledgerEntry.accountName}</p>
                                <p>({ledgerEntry.accountNumber})</p>
                            </div>

                            <TransactionAmount
                                $outcome={checkOutcome(ledgerEntry.debits, isTransactionNegative(ledgerEntry))}
                            >
                                {formatCurrency(ledgerEntry.debits, "shortest")}
                            </TransactionAmount>
                            <TransactionAmount
                                $outcome={checkOutcome(ledgerEntry.credits, isTransactionNegative(ledgerEntry))}
                            >
                                {formatCurrency(ledgerEntry.credits, "shortest")}
                            </TransactionAmount>
                        </TransactionLine>
                    );
                })}
            </TransactionBody>
            <hr />
            <p>{entry.description}</p>
        </Container>
    );
}
