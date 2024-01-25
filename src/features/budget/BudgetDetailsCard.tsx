import BudgetProgressBar from "@/features/budget/BudgetProgressBar";
import { BudgetDetails } from "@/types/account";
import { formatCurrency } from "@/utils/formatters";
import React from "react";
import styled from "styled-components";

type BudgetDetailsCard = {
    budgetDetails: BudgetDetails;
};

const Container = styled.article`
    display: grid;
    grid-template-columns: 20% minmax(auto, 50%) auto;
    gap: 0.25rem;
    background-color: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    align-items: center;
    font-size: 0.875rem;
    text-transform: capitalize;
`;

const Spenditure = styled.p`
    text-align: end;
    font-family: "Roboto mono", monospace;
`;

const BudgetName = styled.p`
    white-space: nowrap;
    overflow: scroll;
    font-weight: 500;
`;

const AccountNumber = styled.p`
    font-weight: 500;
    text-align: center;
`;

const Month = styled.p`
    color: #868686;
`;

export default function BudgetDetailsCard({ budgetDetails }: BudgetDetailsCard) {
    return (
        <Container>
            <AccountNumber>{budgetDetails.accountNumber}</AccountNumber>
            <BudgetName>{budgetDetails.name}</BudgetName>
            <Spenditure>{budgetDetails.amount}</Spenditure>
            {budgetDetails.spending.map((item) => {
                return (
                    <React.Fragment key={item.month}>
                        <Month>{item.month}</Month>
                        <BudgetProgressBar
                            progress={(parseFloat(item.spentAmount) / parseFloat(budgetDetails.amount)) * 100}
                        />
                        <Spenditure>{formatCurrency(item.spentAmount, "shortest")}</Spenditure>
                    </React.Fragment>
                );
            })}
        </Container>
    );
}
