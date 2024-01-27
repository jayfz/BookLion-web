import { findNextAccountNumber } from "@/service/ApiAccount";
import { AccountTypeSelectOptions } from "@/types/account";
import { useQuery } from "@tanstack/react-query";

export default function useFindNextAccountNumber(accountType: AccountTypeSelectOptions) {
    const shouldTriggerRequest = accountType != "DEFAULT";
    const { isPending: isFindingNextAccountNumber, data: nextAccountNumber } = useQuery({
        queryKey: ["accounts", "accountType", accountType],
        queryFn: () => findNextAccountNumber(accountType),
        enabled: shouldTriggerRequest,
    });

    return { isFindingNextAccountNumber, nextAccountNumber };
}
