import axios from "@/service/AxiosDefaults";
import { AppResponse } from "@/service/types";
import {
    Account,
    AccountOverview,
    AccountOverviewDetails,
    AccountType,
    AccountTypeSelectOptions,
    CreateAccountInput,
} from "@/types/account";

const defaultDate = "2023-12-31T23:59:58Z";
export async function getAccountsOverview() {
    const { data } = await axios.get<AppResponse<AccountOverview[]>>(`/accounts/overview?from=${defaultDate}`);

    return data.data;
}

export async function getAccountOverviewDetails() {
    const { data } = await axios.get<AppResponse<AccountOverviewDetails[]>>(
        `/accounts/overviewPerAccount?from=${defaultDate}`,
    );

    return data.data;
}
export async function postAccount(account: CreateAccountInput) {
    const { data } = await axios.post<AppResponse<CreateAccountInput>>(`/accounts`, account);

    return data.data;
}

export async function findNextAccountNumber(accountType: AccountTypeSelectOptions) {
    const { data } = await axios.get<AppResponse<string>>(`/accounts/findNextAccountNumber?accountType=${accountType}`);

    return data.data;
}

export async function findAccountsByNameAndType(name: string, accountType: AccountType | "all") {
    const { data } = await axios.get<AppResponse<Account[]>>(
        `/accounts/searchBy?name=${name}&accountType=${accountType}`,
    );

    return data.data;
}
