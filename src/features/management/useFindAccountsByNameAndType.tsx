import { findAccountsByNameAndType } from "@/service/ApiAccount";
import { AccountType } from "@/types/account";
import { useQuery } from "@tanstack/react-query";

export default function useFindAccountsByNameAndAccountType(name: string, accountType: AccountType | "all") {
    const shouldTriggerRequest = Boolean(name);

    const { isPending: isFindingAccount, data: accountsFound } = useQuery({
        queryKey: ["accounts", "name", name, accountType],
        queryFn: () => findAccountsByNameAndType(name, accountType),
        enabled: shouldTriggerRequest,
    });

    return { isFindingAccount, accountsFound };
}
