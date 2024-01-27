import useCreateAccount from "@/features/management/useCreateAccount";
import useFindNextAccountNumber from "@/features/management/useFindNextAccountNumber";
import { AccountTypeSelectOptions } from "@/types/account";
import Button from "@/ui/Button";
import InputBox from "@/ui/InputBox";
import { MouseEventHandler, useRef, useState } from "react";
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
    & > select {
        padding: 0.5rem;
        background-color: var(--bl-base-background-color);
        border-radius: 0.5rem;
        width: 100%;
        height: 3rem;
    }
`;

export default function CreateAccountPage() {
    const [accountType, setAccountType] = useState<AccountTypeSelectOptions>("DEFAULT");
    const accountRef = useRef<HTMLInputElement>(null);
    const { isFindingNextAccountNumber, nextAccountNumber } = useFindNextAccountNumber(accountType);

    const clearFormOnSuccess = () => {
        if (accountRef.current) accountRef.current.value = "";
        setAccountType("DEFAULT");
    };
    const { createAccount, isCreatingAccount } = useCreateAccount(clearFormOnSuccess);
    const onAddAccountClick: MouseEventHandler = (event) => {
        event.preventDefault();
        const accountNumber = nextAccountNumber;
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
                <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.currentTarget.value as AccountTypeSelectOptions)}
                >
                    <option value={"DEFAULT"}>Select account type</option>
                    <option value={"ASSETS"}>Asset</option>
                    <option value={"LIABILITIES"}>Liability</option>
                    <option value={"EQUITY"}>Equity</option>
                    <option value={"REVENUE"}>Revenue</option>
                    <option value={"EXPENSES"}>Expenses</option>
                </select>
                <InputBox
                    placeholder="Account number"
                    type="text"
                    name="accountNumber"
                    value={isFindingNextAccountNumber ? "Loading..." : nextAccountNumber ?? ""}
                    disabled
                />
                <InputBox placeholder="Account name" type="text" name="accountName" ref={accountRef} />
                <Button disabled={isCreatingAccount} onClick={onAddAccountClick}>
                    Add account
                </Button>
            </CreateAccountForm>
        </Container>
    );
}
