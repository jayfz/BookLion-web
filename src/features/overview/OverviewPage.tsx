import OverviewAccount from "@/features/overview/OverviewAccount";
import useAccountOverview from "@/features/overview/useAccountOverview";
import PageTitle from "@/ui/PageTitle";
import { Show } from "@/ui/Show";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    overflow-y: scroll;
    height: 100%;
`;
const GoToLink = styled(Link)`
    color: var(--bl-link-unvisted);
    padding: 0 0.5rem;
`;

const EmptyMessage = styled.p`
    margin: auto auto;
    /* max-width: 10rem; */
    padding: 0 4rem;
    font-size: 1.25rem;
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
                    <Show when={accountsOverview?.length === 0}>
                        <EmptyMessage>
                            No transactions were found. Add your first one
                            <GoToLink to="/dashboard/management/record-transaction">Here.</GoToLink>
                        </EmptyMessage>
                    </Show>
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
