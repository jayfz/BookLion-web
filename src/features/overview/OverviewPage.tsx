import OverviewAccount from "@/features/overview/OverviewAccount";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: calc(1.25rem / 2);
    background-color: #efefef;
    padding: 1.25rem;
`;

export default function OverviewPage() {
    const accountAsset = {
        type: "ASSETS" as const,
        transactionCount: 44,
        dateLastTransaction: new Date(),
        balance: "6321927192.22",
        variation: "-12.44",
    };

    const accountLiability = {
        type: "LIABILITIES" as const,
        transactionCount: 12,
        dateLastTransaction: new Date(),
        balance: "928189.40",
        variation: "3.44",
    };

    const accountEquity = {
        type: "EQUITY" as const,
        transactionCount: 13,
        dateLastTransaction: new Date(),
        balance: "192391248.77",
        variation: "1.37",
    };

    const accountRevenue = {
        type: "REVENUE" as const,
        transactionCount: 8,
        dateLastTransaction: new Date(),
        balance: "18218828.22",
        variation: "-32.44",
    };
    const accountExpenses = {
        type: "EXPENSES" as const,
        transactionCount: 19,
        dateLastTransaction: new Date(),
        balance: "1467721.22",
        variation: "3.88",
    };

    return (
        <Container>
            <OverviewAccount account={accountAsset} to="/dashboard/overview/assets" />
            <OverviewAccount account={accountLiability} to="/dashboard/overview/liabilities" />
            <OverviewAccount account={accountEquity} to="/dashboard/overview/equity" />
            <OverviewAccount account={accountRevenue} to="/dashboard/overview/revenue" />
            <OverviewAccount account={accountExpenses} to="/dashboard/overview/expenses" />
        </Container>
    );
}
