import ReportSection from "@/features/reports/ReportSection";
import { FilterDate, Title, TotalAmount } from "@/features/reports/ReportUIElements";
import { BalanceSheet } from "@/types/account";
import { formatCurrency, formatDate } from "@/utils/formatters";
import BigNumber from "bignumber.js";
import styled from "styled-components";

const Container = styled.article`
    padding: 1rem;
`;

const data: BalanceSheet = {
    assets: [
        {
            name: "Savings account",
            balance: "21000.34",
        },
        {
            name: "Transmetro card",
            balance: "17022.91",
        },
        {
            name: "Dollar currency",
            balance: "401020.00",
        },
        {
            name: "Loans given",
            balance: "63000",
        },
        {
            name: "Voluntary pension",
            balance: "74000.22",
        },
        {
            name: "Equipment depreciation",
            balance: "-74000.22",
        },
    ],

    liabilities: [
        {
            name: "Accounts payable",
            balance: "17234",
        },
        {
            name: "Credit card",
            balance: "191412.90",
        },
    ],
    equity: [
        {
            name: "Invested capital",
            balance: "32912882.44",
        },
        {
            name: "Retained earnings",
            balance: "321929.44",
        },
    ],
};

export default function BalanceSheetPage() {
    let totalLiabilitiesAndEquity = new BigNumber("0.00");
    data.liabilities.forEach((s) => (totalLiabilitiesAndEquity = totalLiabilitiesAndEquity.plus(s.balance)));
    data.equity.forEach((s) => (totalLiabilitiesAndEquity = totalLiabilitiesAndEquity.plus(s.balance)));

    return (
        <Container>
            <FilterDate>{formatDate(new Date(), "short")}</FilterDate>
            <Title>Balance Sheet</Title>
            <ReportSection accountName={"assets"} accountSummary={data.assets} />
            <ReportSection accountName={"liabilities"} accountSummary={data.liabilities} />
            <ReportSection accountName={"equity"} accountSummary={data.equity} />
            <TotalAmount>
                <p>Total Liabilities & Equity</p>
                <p>{formatCurrency(totalLiabilitiesAndEquity.toFixed(2).toString(), "shortest")}</p>
            </TotalAmount>
        </Container>
    );
}
