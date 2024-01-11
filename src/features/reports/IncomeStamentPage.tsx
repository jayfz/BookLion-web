import ReportSection from "@/features/reports/ReportSection";
import { Title, TotalAmount } from "@/features/reports/ReportUIElements";
import { IncomeStament } from "@/types/account";
import DateFilter from "@/ui/DateFilter";
import { formatCurrency } from "@/utils/formatters";
import BigNumber from "bignumber.js";
import styled from "styled-components";

const Container = styled.article`
    padding: 1rem;
    background-color: white;
    height: 100%;

    & > div {
        display: flex;
        justify-content: end;
        padding: 0.5rem 0;
    }
`;

const data: IncomeStament = {
    expenses: [
        {
            name: "groceries",
            balance: "11924992.22",
        },
        {
            name: "Higiene",
            balance: "1929192.32",
        },
        {
            name: "Netflix",
            balance: "29341.11",
        },
        {
            name: "Youtube Premium",
            balance: "11500.22",
        },
    ],

    revenue: [
        {
            name: "Employement",
            balance: "4232188.33",
        },
        {
            name: "Selling mercadolibre",
            balance: "321241.90",
        },
        {
            name: "savings account interest",
            balance: "3212.90",
        },
        {
            name: "side hustle",
            balance: "59129.32",
        },
        {
            name: "discoutns given merclibre",
            balance: "129319.11",
        },
    ],
};

export default function IncomeStamentPage() {
    let totalRevenue = new BigNumber("0.00");
    let totalExpenses = new BigNumber("0.00");

    data.revenue.forEach((s) => (totalRevenue = totalRevenue.plus(s.balance)));
    data.expenses.forEach((s) => (totalExpenses = totalExpenses.plus(s.balance)));

    console.log(`Expenses ${totalExpenses.toFixed(2).toString()}`);
    console.log(`REvenue ${totalRevenue.toFixed(2).toString()}`);

    const profitLoss = totalRevenue.minus(totalExpenses);

    return (
        <Container>
            <div>
                <DateFilter />
            </div>
            <Title>Income Statement</Title>
            <ReportSection accountName={"revenue"} accountSummary={data.revenue} />
            <ReportSection accountName={"expenses"} accountSummary={data.expenses} />
            <TotalAmount>
                <p>Profit/Loss</p>
                <p> {formatCurrency(profitLoss.toFixed(2).toString(), "shortest")}</p>
            </TotalAmount>
        </Container>
    );
}
