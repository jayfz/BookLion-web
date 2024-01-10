import BudgetCard from "@/features/budget/BudgetCard";
import BudgetDetailsCard from "@/features/budget/BudgetDetailsCard";
import { Budget, BudgetDetails } from "@/types/account";
import styled from "styled-components";

const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: #efefef;
    padding: 1.25rem;
`;

// type Spending = {
//     month: string;
//     spentAmount: string;
// };
// export type BudgetDetails = {
//     budgetId: string;
//     accountNumber: string;
//     name: string;
//     amount: string;
//     spending: Spending[];
// };

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
            <BudgetDetailsCard budgetDetails={data} />
        </Container>
    );
}
