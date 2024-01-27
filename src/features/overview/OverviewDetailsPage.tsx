import OverviewAccountDetails from "@/features/overview/OverviewAccountDetails";
import useAccountOverviewDetails from "@/features/overview/useAccountOverviewDetails";
import PageTitle from "@/ui/PageTitle";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    padding-top: 0.5rem;
    overflow-y: scroll;
`;

export default function OverviewDetailsPage() {
    const { pathname } = useLocation() as { pathname: string };
    const accountType = pathname.split("/").slice(-1).toString() ?? "Account";
    const { isPending, accountsOverviewDetails } = useAccountOverviewDetails();

    return (
        <Container>
            {isPending ? (
                <PageTitle title={`Loading...`} />
            ) : (
                <>
                    <PageTitle title={`${accountType} Overview`} />
                    <>
                        {accountsOverviewDetails
                            ?.filter((aod) => aod.type.toLowerCase() == accountType.toLowerCase())
                            .map((item) => {
                                return (
                                    <OverviewAccountDetails
                                        key={item.number}
                                        account={item}
                                        to={`/dashboard/general-ledger/account/${item.number}`}
                                    />
                                );
                            })}
                    </>
                </>
            )}
        </Container>
    );
}
