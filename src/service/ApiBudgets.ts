import axios from "@/service/AxiosDefaults";
import { AppResponse } from "@/service/types";
import { Budget, BudgetDetails, CreateBudgetInput } from "@/types/account";
export async function getBudget(budgetId: string | number) {
    const { data } = await axios.get<AppResponse<BudgetDetails>>(`/budgets/${budgetId}`);

    return data.data;
}

export async function getBudgets() {
    const { data } = await axios.get<AppResponse<Budget[]>>(`/budgets`);

    return data.data;
}
export async function postBudget(accountId: string | number, budget: CreateBudgetInput) {
    const { data } = await axios.post<AppResponse<Budget>>(`/accounts/${accountId}/budget`, budget);

    return data.data;
}
