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
    const account = {
        type: "ASSETS" as const,
        transactionCount: 44,
        dateLastTransaction: new Date(),
        balance: "4321927192.22",
        variation: "12.44",
    };

    return (
        <Container>
            <OverviewAccount account={account} />
            <OverviewAccount account={account} />
            <OverviewAccount account={account} />
            <OverviewAccount account={account} />
        </Container>
    );
}
