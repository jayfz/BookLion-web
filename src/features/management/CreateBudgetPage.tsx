import useFindAccountsByNameAndAccountType from "@/features/management/useFindAccountsByNameAndType";
import useCreateBudget from "@/features/management/useCreateBudget";
import { Account } from "@/types/account";
import Button from "@/ui/Button";
import InputBox from "@/ui/InputBox";
import { Show } from "@/ui/Show";
import { MouseEventHandler, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    padding-top: 0.5rem;
    overflow-y: scroll;
    height: 100%;
`;
const CreateBudgetForm = styled.form`
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

const QueryResultContext = styled.div`
    position: relative;
`;
const QueryResults = styled.div`
    width: 100%;
    position: absolute;
    background-color: white;
    border-radius: 0.5rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 2px solid var(--bl-base-background-color);
`;
const ResultItem = styled.div`
    border: 2px solid var(--bl-base-background-color);
    padding: 0.5rem;
`;

export default function CreateBudgetPage() {
    // const accountNumberRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [account, setAccount] = useState<Account | null>(null);
    const [queryName, setQueryName] = useState("");
    const [accountName, setAccountName] = useState("");
    const clearInputForm = () => {
        if (formRef.current) formRef.current.reset();
    };

    const { accountsFound } = useFindAccountsByNameAndAccountType(queryName, "EXPENSES");
    const { createBudget, isCreatingBudget } = useCreateBudget(clearInputForm);
    const onCreateBudgetClick: MouseEventHandler = (event) => {
        event.preventDefault();

        if (account && descriptionRef.current && amountRef.current)
            createBudget({
                accountId: account.id,
                budget: {
                    amount: amountRef.current.value,
                    description: descriptionRef.current.value,
                },
            });
    };
    return (
        <Container>
            <CreateBudgetForm name="create-budget" ref={formRef}>
                {/* <InputBox placeholder="Account id" type="text" name="accountNumber" ref={accountNumberRef} /> */}

                <InputBox
                    placeholder="Account name"
                    type="text"
                    name="accountName"
                    value={accountName}
                    onChange={(e) => {
                        setAccountName(e.target.value);
                        setQueryName(e.target.value);
                    }}
                />
                <Show when={accountsFound != undefined}>
                    <QueryResultContext>
                        <QueryResults>
                            {accountsFound?.map((account) => {
                                return (
                                    <ResultItem
                                        key={account.id}
                                        onClick={() => {
                                            setAccountName(account.name);
                                            setAccount(account);
                                            setQueryName("");
                                        }}
                                    >
                                        <span> {account.number}</span> <span>{account.name}</span>{" "}
                                    </ResultItem>
                                );
                            })}
                        </QueryResults>
                    </QueryResultContext>
                </Show>

                <InputBox placeholder="Description" type="text" name="description" ref={descriptionRef} />
                <InputBox placeholder="0.00" type="number" step={"0.01"} name="budgetAmount" ref={amountRef} />
                <Button disabled={isCreatingBudget} onClick={onCreateBudgetClick}>
                    Create Budget
                </Button>
            </CreateBudgetForm>
        </Container>
    );
}
