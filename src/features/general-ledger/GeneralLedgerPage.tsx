import GeneralLedgerEntry from "@/features/general-ledger/GeneralLedgerEntry";
import useGeneraLedgerForAccount from "@/features/general-ledger/useGeneraLedgerForAccount";
import PageTitle from "@/ui/PageTitle";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    padding-top: 0.5rem;
    overflow-y: scroll;
`;

export default function GeneralLedgerPage() {
    const { accountId } = useParams();

    const { generalLedgerEntries, isFetching, isPending } = useGeneraLedgerForAccount(accountId ?? "");
    return (
        <Container>
            {isFetching ? (
                <PageTitle title="Loading..." />
            ) : (
                <>
                    <PageTitle title={`Gen. Ledger (${accountId})`} />
                    {generalLedgerEntries?.map((item) => {
                        return <GeneralLedgerEntry key={item.transactionId} ledgerEntry={item} />;
                    })}
                </>
            )}
        </Container>
    );
}
