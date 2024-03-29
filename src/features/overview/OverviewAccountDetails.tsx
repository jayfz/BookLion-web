import TrendDownIcon from "@/features/overview/icons/TrendDownIcon";
import TrendUpIcon from "@/features/overview/icons/TrendUpIcon";
import { formatCurrency, formatVariation } from "@/utils/formatters";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { checkIsOutcomeNegative } from "@/utils/helpers";
import { AccountOverviewDetails } from "@/types/account";

type OverviewAccountProps = {
    account: AccountOverviewDetails;
    to: string;
};

const Container = styled.article`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: white;

    --bl-trend-positive-amount: #1e6940;
    --bl-trend-negative-amount: #ff7182;
`;

const LeftInfo = styled.div<{ $accountType: AccountOverviewDetails["type"] }>`
    & > p:nth-child(1) {
        font-size: 1rem;
        text-transform: capitalize;
        font-weight: 500;
        text-overflow: ellipsis;
    }

    & > div > span:first-child {
        background-color: ${(props) => `var(--bl-${props.$accountType.toLocaleLowerCase()}-medium-color)`};
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 5rem;
        font-weight: 600;
        font-family: "Roboto mono", monospace;
    }

    & > div {
        font-size: 0.875rem;
        display: flex;
        gap: 0.5rem;
        align-items: center;
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

export default function OverviewAccountDetails({ account, to }: OverviewAccountProps) {
    const isDownwardsTrend = account.variation.startsWith(negativeSymbol);
    const isOutcomeNegative = checkIsOutcomeNegative(account.type, isDownwardsTrend);
    const TrendIcon = isDownwardsTrend ? TrendDownIcon : TrendUpIcon;
    const currencyFormat = "shortest" as const;

    return (
        <Container as={Link} to={to}>
            <LeftInfo $accountType={account.type}>
                <p>{account.name}</p>
                <div>
                    <span>{account.number}</span>
                    <span>({account.transactionCount} entries)</span>
                </div>
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
