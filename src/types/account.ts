export type AccountType = "ASSETS" | "LIABILITIES" | "EQUITY" | "REVENUE" | "EXPENSES";
export type AccountOverview = {
    type: AccountType;
    transactionCount: number;
    dateLastTransaction: string;
    balance: string;
    variation: string;
};
export type AccountOverviewDetails = {
    type: AccountType;
    transactionCount: number;
    number: string;
    name: string;
    balance: string;
    variation: string;
};
export type LedgerEntry = {
    date: string;
    description: string;
    accountType: AccountType;
    debits: string;
    credits: string;
    transactionId: string;
};
type Account = {
    name: string;
    number: string;
    id: number;
    accountType: AccountType;
};
export type BasicLedgerEntry = {
    account: Account;
    debitAmount: string;
    creditAmount: string;
};

export type JournalEntry = {
    id: number | string;
    createdAt: string;
    description: string;
    lines: BasicLedgerEntry[];
};

export type Budget = {
    id: string;
    accountNumber: string;
    description: string;
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
