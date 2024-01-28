import { AccountType, JournalEntry } from "@/types/account";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { isTransactionNegative } from "@/utils/helpers";
import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";

type GeneralJournalEntryProps = {
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
        font-family: "Roboto mono", monospace;
    }

    & > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    & > div > p:first-child {
        background-color: ${(props) => `var(--bl-${props.$accountType.toLocaleLowerCase()}-medium-color)`};
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 5rem;
        font-weight: 600;
        font-family: "Roboto mono", monospace;
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

const generalJournalEntry = (props: GeneralJournalEntryProps, ref: ForwardedRef<HTMLElement>) => {
    const entry = props.entry;

    const dateFormat = "short" as const;

    return (
        <Container ref={ref}>
            <TransactionHeader>
                <p>{formatDate(entry.createdAt, dateFormat)}</p>
                <p>Debits</p>
                <p>Credits</p>
            </TransactionHeader>
            <TransactionBody>
                {entry.lines.map((ledgerEntry) => {
                    return (
                        <TransactionLine
                            key={ledgerEntry.account.number}
                            $accountType={ledgerEntry.account.accountType}
                        >
                            <div>
                                <p>{ledgerEntry.account.number}</p>
                                <span>{ledgerEntry.account.name}</span>
                            </div>

                            <TransactionAmount
                                $outcome={checkOutcome(
                                    ledgerEntry.debitAmount,
                                    isTransactionNegative(
                                        ledgerEntry.account.accountType,
                                        ledgerEntry.creditAmount,
                                        ledgerEntry.debitAmount,
                                    ),
                                )}
                            >
                                {formatCurrency(ledgerEntry.debitAmount, "shortest")}
                            </TransactionAmount>
                            <TransactionAmount
                                $outcome={checkOutcome(
                                    ledgerEntry.creditAmount,
                                    isTransactionNegative(
                                        ledgerEntry.account.accountType,
                                        ledgerEntry.creditAmount,
                                        ledgerEntry.debitAmount,
                                    ),
                                )}
                            >
                                {formatCurrency(ledgerEntry.creditAmount, "shortest")}
                            </TransactionAmount>
                        </TransactionLine>
                    );
                })}
            </TransactionBody>
            <hr />
            <p>{entry.description}</p>
        </Container>
    );
};

export const GeneralJournalEntry = forwardRef<HTMLElement, GeneralJournalEntryProps>(generalJournalEntry);
