import ReportSection from "@/features/reports/ReportSection";
import { Title, TotalAmount } from "@/features/reports/ReportUIElements";
import useBalanceSheetReport from "@/features/reports/useBalanceSheetReport";
import { BalanceSheet } from "@/types/account";
import DateFilter from "@/ui/DateFilter";
import { formatCurrency } from "@/utils/formatters";
import BigNumber from "bignumber.js";
import styled from "styled-components";

const Container = styled.article`
    height: 100%;
    padding: 1rem;
    background-color: white;
    overflow-y: scroll;

    & > div {
        display: flex;
        justify-content: end;
        padding: 0.5rem 0;
    }
`;

export default function BalanceSheetPage() {
    const { isError, isPending, balanceSheet } = useBalanceSheetReport();
    let totalLiabilitiesAndEquity = new BigNumber("0.00");

    if (balanceSheet) {
        balanceSheet.liabilities.forEach(
            (s) => (totalLiabilitiesAndEquity = totalLiabilitiesAndEquity.plus(s.balance)),
        );
        balanceSheet.equity.forEach((s) => (totalLiabilitiesAndEquity = totalLiabilitiesAndEquity.plus(s.balance)));
    }

    return (
        <Container>
            <div>
                <DateFilter />
            </div>
            <Title>Balance Sheet</Title>
            {isPending || !balanceSheet ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ReportSection accountName={"assets"} accountSummary={balanceSheet.assets} />
                    <ReportSection accountName={"liabilities"} accountSummary={balanceSheet.liabilities} />
                    <ReportSection accountName={"equity"} accountSummary={balanceSheet.equity} />
                    <TotalAmount>
                        <p>Total Liabilities & Equity</p>
                        <p>{formatCurrency(totalLiabilitiesAndEquity.toFixed(2).toString(), "shortest")}</p>
                    </TotalAmount>
                </>
            )}
        </Container>
    );
}
