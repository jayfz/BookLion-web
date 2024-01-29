import BudgetCard from "@/features/budget/BudgetCard";
import useBudgets from "@/features/budget/useBudgets";
import PageTitle from "@/ui/PageTitle";
import { Show } from "@/ui/Show";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    overflow-y: scroll;
    padding-top: 0.5rem;
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

export default function BudgetOverviewPage() {
    const { isPending, budgets } = useBudgets();
    return (
        <Container>
            {isPending || !budgets ? (
                <PageTitle title="Loading..." />
            ) : (
                <>
                    <PageTitle title="Budgets overview" />
                    <Show when={budgets?.length === 0}>
                        <EmptyMessage>
                            No budgets were found. Add your first one
                            <GoToLink to="/dashboard/management/create-budget">Here.</GoToLink>
                        </EmptyMessage>
                    </Show>
                    {budgets.map((budget) => {
                        return <BudgetCard key={budget.id} budget={budget} />;
                    })}
                </>
            )}
        </Container>
    );
}
