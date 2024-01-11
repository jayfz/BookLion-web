import OverviewAccountDetails from "@/features/overview/OverviewAccountDetails";
import PageTitle from "@/ui/PageTitle";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    padding-top: 0.5rem;
    overflow-y: scroll;
`;

export default function OverviewDetailsPage() {
    const { pathname } = useLocation() as string;
    const accountType = pathname.split("/").slice(-1).toString() ?? "Account";

    const accountAsset1 = {
        type: "ASSETS" as const,
        transactionCount: 44,
        name: "Cash",
        number: "1001",
        balance: "6321927192.22",
        variation: "-12.44",
    };

    const accountAsset2 = {
        type: "ASSETS" as const,
        transactionCount: 11,
        name: "Savings acount",
        number: "1002",
        balance: "12817772.22",
        variation: "5.82",
    };

    const pension = {
        type: "ASSETS" as const,
        transactionCount: 6,
        name: "Pension is too long a word",
        number: "1003",
        balance: "417772.22",
        variation: "3.44",
    };

    return (
        <Container>
            <PageTitle title={`${accountType} Overview`} />
            <OverviewAccountDetails
                account={accountAsset1}
                to={`/dashboard/general-ledger/account/${accountAsset1.number}`}
            />
            <OverviewAccountDetails
                account={accountAsset2}
                to={`/dashboard/general-ledger/account/${accountAsset2.number}`}
            />
            <OverviewAccountDetails account={pension} to={`/general-ledger/account/${pension.number}`} />
            <OverviewAccountDetails
                account={accountAsset1}
                to={`/dashboard/general-ledger/account/${accountAsset1.number}`}
            />
            <OverviewAccountDetails
                account={accountAsset2}
                to={`/dashboard/general-ledger/account/${accountAsset2.number}`}
            />
            <OverviewAccountDetails account={pension} to={`/general-ledger/account/${pension.number}`} />
        </Container>
    );
}
