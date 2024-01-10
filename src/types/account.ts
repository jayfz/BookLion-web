export type AccountType = "ASSETS" | "LIABILITIES" | "EQUITY" | "REVENUE" | "EXPENSES";

export type LedgerEntry = {
    date: Date;
    description: string;
    accountType: AccountType;
    debits: string;
    credits: string;
    transactionId: string;
};

export type BasicLedgerEntry = {
    accountType: AccountType;
    accountNumber: string;
    accountName: string;
    debits: string;
    credits: string;
};

export type JournalEntry = {
    date: Date;
    description: string;
    ledgerEntries: BasicLedgerEntry[];
};

export type Budget = {
    id: string;
    accountNumber: string;
    name: string;
    amount: string;
    spentSoFar: string;
};

type Spending = {
    month: string;
    spentAmount: string;
};
export type BudgetDetails = {
    budgetId: string;
    accountNumber: string;
    name: string;
    amount: string;
    spending: Spending[];
};

export type AccountSummary = {
    name: string;
    balance: string;
};
export type BalanceSheet = {
    assets: AccountSummary[];
    liabilities: AccountSummary[];
    equity: AccountSummary[];
};

export type IncomeStament = {
    revenue: AccountSummary[];
    expenses: AccountSummary[];
};
