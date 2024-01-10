import { TotalAmount } from "@/features/reports/ReportUIElements";
import { AccountSummary } from "@/types/account";
import { formatCurrency } from "@/utils/formatters";
import BigNumber from "bignumber.js";
import styled from "styled-components";

const Container = styled.article`
    background-color: white;
    padding: 0.5rem 0;

    & > hr {
        margin-bottom: 1rem;
        border-top-width: 4px;
        color: #dedede;
        height: 0;
        border-radius: 99rem;
    }
`;

type ReportSectionProps = {
    accountName: string;
    accountSummary: AccountSummary[];
};

const Heading = styled.h2`
    font-size: 1.25rem;
    color: #454545;
    text-transform: capitalize;
`;

const SectionBody = styled.section`
    font-size: 0.875rem;
`;

const SectionEntry = styled.div<{ $odd: boolean }>`
    background-color: ${(props) => (props.$odd ? "#F0F0F0" : "white")};
    display: flex;
    justify-content: space-between;
    padding: 0.25rem;
    border-radius: 0.5rem;
`;

export default function ReportSection({ accountSummary, accountName }: ReportSectionProps) {
    let subtotal = new BigNumber("0.00");
    accountSummary.forEach((s) => (subtotal = subtotal.plus(s.balance)));

    return (
        <Container>
            <Heading>{accountName}</Heading>
            <hr />
            <SectionBody>
                {accountSummary.map((item, index) => {
                    return (
                        <SectionEntry key={item.name} $odd={index % 2 != 0}>
                            <p>{item.name}</p>
                            <p>{formatCurrency(item.balance, "shortest")}</p>
                        </SectionEntry>
                    );
                })}

                <TotalAmount>
                    <p>Total {accountName}</p>
                    <p>{formatCurrency(subtotal.toFixed(2), "shortest")}</p>
                </TotalAmount>
            </SectionBody>
        </Container>
    );
}
