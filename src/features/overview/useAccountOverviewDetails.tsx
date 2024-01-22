import { getAccountOverviewDetails } from "@/service/ApiAccount";
import { useQuery } from "@tanstack/react-query";

export default function useAccountOverviewDetails() {
    const {
        isPending,
        data: accountsOverviewDetails,
        error,
        isFetching,
    } = useQuery({
        queryKey: ["accounts", "overviewDetails"],
        queryFn: () => getAccountOverviewDetails(),
        retry: false,
    });

    return { isPending, accountsOverviewDetails, error, isFetching };
}
