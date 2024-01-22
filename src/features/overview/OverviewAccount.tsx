import AssetsIcon from "@/features/overview/icons/AssetsIcon";
import LiabilitiesIcon from "@/features/overview/icons/LiabilitiesIcon";
import EquityIcon from "@/features/overview/icons/EquityIcon";
import RevenueIcon from "@/features/overview/icons/RevenueIcon";
import ExpensesIcon from "@/features/overview/icons/ExpensesIcon";
import TrendDownIcon from "@/features/overview/icons/TrendDownIcon";
import TrendUpIcon from "@/features/overview/icons/TrendUpIcon";
import { formatCurrency, formatDate, formatVariation } from "@/utils/formatters";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { AccountOverview, AccountType } from "@/types/account";
import { checkIsOutcomeNegative } from "@/utils/helpers";

type OverviewAccountProps = {
    account: AccountOverview;
    to: string;
};

const Container = styled.article`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    padding: 0.5rem;
    /* border: 1px solid #e3e3e3;
    box-shadow: -1px 1px 0px 0px #e0e0e0; */
    border-radius: 0.5rem;
    background-color: white;
    --bl-assets-weak-color: #d6ffe2;
    --bl-assets-strong-color: #1e6940;
    --bl-liabilities-weak-color: #fdf9c5;
    --bl-liabilities-strong-color: #edc601;
    --bl-equity-weak-color: #e7f2ff;
    --bl-equity-strong-color: #1c64ff;
    --bl-revenue-weak-color: #f5ffec;
    --bl-revenue-strong-color: #78c200;
    --bl-expenses-weak-color: #fddbdc;
    --bl-expenses-strong-color: #ff1c68;

    --bl-trend-positive-amount: #1e6940;
    --bl-trend-negative-amount: #ff7182;
`;

const IconBox = styled.div<{ $type: AccountType }>`
    min-height: 3.75rem;
    min-width: 3.75rem;
    background-color: ${(account) => `var(--bl-${account.$type.toLowerCase()}-weak-color)`};
    display: flex;
    flex-wrap: wrap;
    place-content: center center;
    border-radius: 0.5rem;
    border: 1px solid ${(account) => `var(--bl-${account.$type.toLowerCase()}-strong-color)`};
    & path {
        fill: ${(account) => `var(--bl-${account.$type.toLowerCase()}-strong-color)`};
    }
`;

const LeftInfo = styled.div`
    & > p:nth-child(1) {
        font-size: 1rem;
        text-transform: capitalize;
        font-weight: 500;
    }

    & > p:not(:first-child) {
        font-size: 0.75rem;
    }
`;
const RightInfo = styled.div`
    margin-left: auto;
    font-family: "Roboto Mono", monospace;
    font-size: 0.875rem;

    & > p {
        text-align: end;
    }
`;

const Row = styled.div.attrs<{ $negativeOutcome: boolean; $outcomeColor?: string }>((props) => ({
    $outcomeColor: props.$negativeOutcome ? "var(--bl-trend-negative-amount)" : "var(--bl-trend-positive-amount)",
}))`
    display: flex;
    align-items: center;
    gap: 0.25rem;

    & > svg {
        margin-left: auto;
    }

    & > p {
        color: ${(props) => props.$outcomeColor};
    }

    & path {
        fill: ${(props) => props.$outcomeColor};
    }
`;

const negativeSymbol = "-";

function AccountIcon(props: { account: AccountOverview }) {
    switch (props.account.type) {
        case "ASSETS":
            return <AssetsIcon />;
        case "LIABILITIES":
            return <LiabilitiesIcon />;
        case "EQUITY":
            return <EquityIcon />;
        case "REVENUE":
            return <RevenueIcon />;
        case "EXPENSES":
            return <ExpensesIcon />;
        default:
            throw new Error("Unknown account type");
    }
}

export default function OverviewAccount({ account, to }: OverviewAccountProps) {
    const isDownwardsTrend = account.variation.startsWith(negativeSymbol);
    const isOutcomeNegative = checkIsOutcomeNegative(account.type, isDownwardsTrend);
    const TrendIcon = isDownwardsTrend ? TrendDownIcon : TrendUpIcon;
    const currencyFormat = "shortest" as const;

    return (
        <Container as={Link} to={to}>
            <IconBox $type={account.type}>
                <AccountIcon account={account} />
            </IconBox>
            <LeftInfo>
                <p>{account.type.toLocaleLowerCase()}</p>
                <p>{account.transactionCount} entries</p>
                <p>{formatDate(account.dateLastTransaction, "short")}</p>
            </LeftInfo>
            <RightInfo>
                <p>{formatCurrency(account.balance, currencyFormat)}</p>
                <Row $negativeOutcome={isOutcomeNegative}>
                    <TrendIcon />
                    <p>{formatVariation(account.variation)}%</p>
                </Row>
            </RightInfo>
        </Container>
    );
}
