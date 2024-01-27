import BudgetCard from "@/features/budget/BudgetCard";
import useBudgets from "@/features/budget/useBudgets";
import PageTitle from "@/ui/PageTitle";
import styled from "styled-components";

const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    overflow-y: scroll;
    padding-top: 0.5rem;
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
                    {budgets.map((budget) => {
                        return <BudgetCard key={budget.id} budget={budget} />;
                    })}
                </>
            )}
        </Container>
    );
}
