import useCreateBudget from "@/features/management/useCreateBudget";
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

export default function CreateBudgetPage() {
    const accountNumberRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const clearInputForm = () => {
        if (formRef.current) formRef.current.reset();
    };
    const { createBudget, isCreatingBudget } = useCreateBudget(clearInputForm);
    const onCreateBudgetClick: MouseEventHandler = (event) => {
        event.preventDefault();

        if (accountNumberRef.current && descriptionRef.current && amountRef.current)
            createBudget({
                accountId: accountNumberRef.current.value,
                budget: {
                    amount: amountRef.current.value,
                    description: descriptionRef.current.value,
                },
            });
    };
    return (
        <Container>
            <CreateBudgetForm name="create-budget" ref={formRef}>
                <InputBox placeholder="Account id" type="text" name="accountNumber" ref={accountNumberRef} />
                <InputBox placeholder="Description" type="text" name="description" ref={descriptionRef} />
                <InputBox placeholder="0.00" type="number" step={"0.01"} name="budgetAmount" ref={amountRef} />
                <Button disabled={isCreatingBudget} onClick={onCreateBudgetClick}>
                    Create Budget
                </Button>
            </CreateBudgetForm>
        </Container>
    );
}
