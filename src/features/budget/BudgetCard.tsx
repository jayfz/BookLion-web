import BudgetProgressBar from "@/features/budget/BudgetProgressBar";
import { Budget } from "@/types/account";
import { formatCurrency } from "@/utils/formatters";
import { Link } from "react-router-dom";
import styled from "styled-components";

type BudgetCardProps = {
    budget: Budget;
};

const Container = styled.article`
    display: grid;
    grid-template-columns: min-content minmax(50%, auto) auto;
    gap: 0.5rem;
    background-color: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    align-items: center;
    font-size: 0.875rem;
`;

const BudgetAmounts = styled.div`
    font-family: "Roboto mono", sans-serif;

    & > p {
        text-align: end;
    }
`;
const BudgetInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 0.25rem;

    & > p:first-child {
        white-space: nowrap;
        overflow: scroll;
    }
`;

export default function BudgetCard({ budget }: BudgetCardProps) {
    const progress = (parseFloat(budget.spentSoFar) / parseFloat(budget.amount)) * 100;
    return (
        <Container as={Link} to={`/dashboard/budgets/${budget.id}`}>
            <p>{budget.accountNumber}</p>
            <BudgetInfo>
                <p>{budget.name}</p>
                <BudgetProgressBar progress={progress} />
            </BudgetInfo>
            <BudgetAmounts>
                <p>{formatCurrency(budget.amount, "shortest")}</p>
                <p>{formatCurrency(budget.spentSoFar, "shortest")}</p>
            </BudgetAmounts>
        </Container>
    );
}
