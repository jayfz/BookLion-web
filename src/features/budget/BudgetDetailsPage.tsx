import BudgetDetailsCard from "@/features/budget/BudgetDetailsCard";
import useBudget from "@/features/budget/useBudget";
import PageTitle from "@/ui/PageTitle";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    overflow-y: scroll;
    padding-top: 0.5rem;
`;

export default function BudgetDetailsPage() {
    const { budgetId } = useParams();
    const { isPending, budget } = useBudget(budgetId as string);
    return (
        <Container>
            {isPending || !budget ? (
                <PageTitle title="Loading..." />
            ) : (
                <>
                    <PageTitle title="Budget details" />
                    <BudgetDetailsCard budgetDetails={budget} key={budget?.budgetId} />
                </>
            )}
        </Container>
    );
}
