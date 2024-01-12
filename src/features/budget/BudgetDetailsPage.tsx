import BudgetDetailsCard from "@/features/budget/BudgetDetailsCard";
import { BudgetDetails } from "@/types/account";
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

export default function BudgetDetailsPage() {
    const data: BudgetDetails = {
        budgetId: "1",
        accountNumber: "50001",
        name: "Recargas de wom",
        amount: "18600.00",
        spending: [
            {
                month: "december",
                spentAmount: "17300.00",
            },
            {
                month: "november",
                spentAmount: "5600.00",
            },
            {
                month: "october",
                spentAmount: "16300.00",
            },
            {
                month: "september",
                spentAmount: "0.01",
            },
        ],
    };

    return (
        <Container>
            <PageTitle title="Budget details" />
            <BudgetDetailsCard budgetDetails={data} />
            <BudgetDetailsCard budgetDetails={data} />
            <BudgetDetailsCard budgetDetails={data} />
        </Container>
    );
}
