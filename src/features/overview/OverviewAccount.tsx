import AssetsIcon from "@/features/overview/AssetsIcon";
import TrendDownIcon from "@/features/overview/TrendDownIcon";
import TrendUpIcon from "@/features/overview/TrendUpIcon";
import { formatCurrency, formatDate } from "@/utils/formatters";
import styled from "styled-components";

type Account = {
    type: "ASSETS" | "LIABILITIES" | "EQUITY" | "REVENUE" | "EXPENSES";
    transactionCount: number;
    dateLastTransaction: Date;
    balance: string;
    variation: string;
};

type OverviewAccountProps = {
    account: Account;
};

const Container = styled.article`
    display: flex;
    flex-direction: row;
    height: 6rem;
    gap: 0.5rem;
    align-items: center;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: white;
    --bl-assets-weak-color: #d6ffe2;
    --bl-assets-strong-color: #1e6940;
    --bl-trend-positive-amount: #1e6940;
    --bl-trend-negative-amount: #ff7182;
`;

const IconBox = styled.div`
    height: 3.375rem;
    width: 3.375rem;
    background-color: var(--bl-assets-weak-color);
    display: flex;
    flex-wrap: wrap;
    place-content: center center;
    border-radius: 0.5rem;
`;

const LeftInfo = styled.div`
    & > p:nth-child(1) {
        font-size: 1rem;
        text-transform: capitalize;
        font-weight: 600;
    }

    & > p:not(:first-child) {
        font-size: 0.75rem;
    }
`;
const RightInfo = styled.div`
    margin-left: auto;
    font-family: monospace;

    & > p:first-child {
        font-weight: 600;
        font-size: 1rem;
    }

    & > p:last-child {
    }
`;

const Row = styled.div<{ $negativeTrend: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.25rem;

    & > svg {
        margin-left: auto;
    }

    & > p {
        font-size: 1rem;
        color: ${(props) =>
            props.$negativeTrend ? "var(--bl-trend-negative-amount)" : "var(--bl-trend-positive-amount)"};
    }
`;

const negativeSymbol = "-";

export default function OverviewAccount({ account }: OverviewAccountProps) {
    const isDownwardsTrend = account.variation.startsWith(negativeSymbol);
    const TrendIcon = isDownwardsTrend ? TrendDownIcon : TrendUpIcon;

    return (
        <Container>
            <IconBox>
                <AssetsIcon />
            </IconBox>
            <LeftInfo>
                <p>{account.type.toLocaleLowerCase()}</p>
                <p>{account.transactionCount} transactions</p>
                <p>{formatDate(account.dateLastTransaction)}</p>
            </LeftInfo>
            <RightInfo>
                <p>{formatCurrency(account.balance)}</p>
                <Row $negativeTrend={isDownwardsTrend}>
                    <TrendIcon fill="green" />
                    <p>{account.variation}%</p>
                </Row>
            </RightInfo>
        </Container>
    );
}
