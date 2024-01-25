import useCreateAccount from "@/features/management/useCreateAccount";
import Button from "@/ui/Button";
import InputBox from "@/ui/InputBox";
import { MouseEventHandler, useRef } from "react";
import styled from "styled-components";

const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    padding-top: 0.5rem;
    overflow-y: scroll;
`;

const CreateAccountForm = styled.form`
    padding: 1rem;
    display: flex;
    background-color: white;
    border-radius: 0.5rem;
    flex-direction: column;
    gap: 0.5rem;
    /* & > select {
        padding: 0.5rem;
        background-color: var(--bl-base-background-color);
        border-radius: 0.5rem;
        width: 100%;
        height: 3rem;
    } */
`;

export default function CreateAccountPage() {
    const accountRef = useRef<HTMLInputElement>(null);
    const accountNumberRef = useRef<HTMLInputElement>(null);

    const clearFormOnSuccess = () => {
        if (accountNumberRef.current) accountNumberRef.current.value = "";
        if (accountRef.current) accountRef.current.value = "";
    };
    const { createAccount, isCreatingAccount } = useCreateAccount(clearFormOnSuccess);
    const onAddAccountClick: MouseEventHandler = (event) => {
        event.preventDefault();
        const accountNumber = accountNumberRef.current?.value;
        const accountName = accountRef.current?.value;

        if (accountNumber && accountName) {
            createAccount({
                number: accountNumber,
                name: accountName,
            });
        }
    };

    return (
        <Container>
            <CreateAccountForm name="create-account">
                <InputBox placeholder="Account number" type="text" name="accountNumber" ref={accountNumberRef} />
                <InputBox placeholder="Account name" type="text" name="accountName" ref={accountRef} />
                <Button disabled={isCreatingAccount} onClick={onAddAccountClick}>
                    Add account
                </Button>
            </CreateAccountForm>
        </Container>
    );
}
