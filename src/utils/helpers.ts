import { AccountType } from "@/types/account";

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

export function isTransactionNegative(accountType: AccountType, creditAmount: string, debitAmount: string) {
    switch (accountType) {
        case "ASSETS":
        case "LIABILITIES":
        case "EQUITY":
            return creditAmount != "0.00";
        case "EXPENSES":
        case "REVENUE":
            return debitAmount != "0.00";
    }
}
