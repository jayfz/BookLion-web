import OverviewAccount from "@/features/overview/OverviewAccount";
import useAccountOverview from "@/features/overview/useAccountOverview";
import PageTitle from "@/ui/PageTitle";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    overflow-y: scroll;
`;

export default function OverviewPage() {
    const { isPending, accountsOverview } = useAccountOverview();
    return (
        <Container>
            {isPending ? (
                <PageTitle title="Loading..."></PageTitle>
            ) : (
                <>
                    <PageTitle title="Accounts overview" />

                    {accountsOverview?.map((row) => {
                        return (
                            <OverviewAccount
                                key={row.type}
                                account={row}
                                to={`/dashboard/overview/${row.type.toLowerCase()}`}
                            />
                        );
                    })}
                </>
            )}
        </Container>
    );
}
