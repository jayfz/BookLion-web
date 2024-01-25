import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    padding-top: 0.5rem;
    overflow-y: scroll;
`;

const ManagementOption = styled(Link)`
    padding: 1.5rem;
    background-color: white;
    border-radius: 0.5rem;
`;

export default function ManagementPage() {
    return (
        <Container>
            <ManagementOption to="add-account">Add Account</ManagementOption>
            <ManagementOption to="create-budget">Create Budget</ManagementOption>
            <ManagementOption to="record-transaction">Record Transaction</ManagementOption>
        </Container>
    );
}
