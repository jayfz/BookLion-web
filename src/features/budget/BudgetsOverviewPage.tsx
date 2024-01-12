import BudgetCard from "@/features/budget/BudgetCard";
import { Budget } from "@/types/account";
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
    const data: Budget[] = [
        {
            id: "1",
            accountNumber: "50001",
            name: "Recargas de wom",
            amount: "20000000.00",
            spentSoFar: "6000000.00",
        },
        {
            id: "2",
            accountNumber: "50002",
            name: "Transmetro recargas abc del toro",
            amount: "16000.00",
            spentSoFar: "18600.00",
        },
        {
            id: "3",
            accountNumber: "50003",
            name: "Dulces para Isa",
            amount: "14300.00",
            spentSoFar: "11322.00",
        },
    ];

    return (
        <Container>
            <PageTitle title="Budgets overview" />
            <BudgetCard budget={data[0]} />
            <BudgetCard budget={data[1]} />
            <BudgetCard budget={data[2]} />
            <BudgetCard budget={data[0]} />
            <BudgetCard budget={data[1]} />
            <BudgetCard budget={data[2]} />
            <BudgetCard budget={data[0]} />
            <BudgetCard budget={data[1]} />
            <BudgetCard budget={data[2]} />
            <BudgetCard budget={data[0]} />
            <BudgetCard budget={data[1]} />
            <BudgetCard budget={data[2]} />
        </Container>
    );
}
