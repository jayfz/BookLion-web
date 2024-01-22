import axios from "@/service/AxiosDefaults";
import { AppResponse, PagedAppResponse } from "@/service/types";
import { BalanceSheet, IncomeStament, JournalEntry, LedgerEntry } from "@/types/account";

const defaultDate = "2023-12-31T23:59:58";

export async function getGeneralLedgerForAccount(accountNumber: string) {
    const { data } = await axios.get<AppResponse<LedgerEntry[]>>(
        `/transactions/generalLedger?accountNumber=${accountNumber}`,
    );

    return data.data;
}

export async function getJournalEntry(transactionId: string | number) {
    const { data } = await axios.get<AppResponse<JournalEntry>>(`/transactions/${transactionId}`);

    return data.data;
}

export async function getJournalEntries(pageNumber: number) {
    const pagedAppResponse = await axios.get<PagedAppResponse<JournalEntry[]>>(
        `/transactions?page=${pageNumber}&size=7`,
    );
    return pagedAppResponse.data;
}

export async function getBalanceSheetReport() {
    const { data } = await axios.get<AppResponse<BalanceSheet>>(`/transactions/balance-sheet?from=${defaultDate}`);

    return data.data;
}

export async function getIncomeStatementReport() {
    const { data } = await axios.get<AppResponse<IncomeStament>>(`/transactions/income-statement?from=${defaultDate}`);

    return data.data;
}
