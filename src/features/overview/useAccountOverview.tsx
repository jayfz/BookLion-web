import { getAccountsOverview } from "@/service/ApiAccount";
import { useQuery } from "@tanstack/react-query";

export default function useAccountOverview() {
    const {
        isPending,
        data: accountsOverview,
        error,
        isFetching,
    } = useQuery({
        queryKey: ["accounts", "overview"],
        queryFn: () => getAccountsOverview(),
        retry: false,
    });

    return { isPending, accountsOverview, error, isFetching };
}
