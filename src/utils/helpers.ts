import { AccountType, BasicLedgerEntry, LedgerEntry } from "@/types/account";

export function checkIsOutcomeNegative(accountType: AccountType, isDownwardsTrend: boolean) {
    switch (accountType) {
        case "ASSETS":
            return isDownwardsTrend;
        case "LIABILITIES":
            return !isDownwardsTrend;
        case "EQUITY":
            return isDownwardsTrend;
        case "REVENUE":
            return isDownwardsTrend;
        case "EXPENSES":
            return !isDownwardsTrend;
        default:
            throw new Error("Unknown account type");
    }
}

export function isTransactionNegative(entry: LedgerEntry | BasicLedgerEntry) {
    switch (entry.accountType) {
        case "ASSETS":
        case "LIABILITIES":
        case "EQUITY":
            return entry.credits != "0.00";
        case "EXPENSES":
        case "REVENUE":
            return entry.debits != "0.00";
    }
}
