import useCreateTransaction from "@/features/management/useCreateTransaction";
import { CreateTransactionInput, CreateTransactionLineInput } from "@/types/account";
import Button from "@/ui/Button";
import InputBox from "@/ui/InputBox";
import PageTitle from "@/ui/PageTitle";
import { ChangeEvent, MouseEventHandler, ReactNode, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import styled from "styled-components";

const Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    padding-top: 0.5rem;
    overflow-y: scroll;
`;

const CreateTransactionForm = styled.form`
    padding: 1rem;
    display: flex;
    background-color: white;
    border-radius: 0.5rem;
    flex-direction: column;
    gap: 1.5rem;
`;

const SecondaryButton = styled(Button)`
    background-color: white;
    border: 2px solid var(--bl-input-background);
    color: var(--bl-main-text-color);

    & > svg {
        display: inline-block;
        vertical-align: baseline;
        color: black;
    }
`;

const TransactionLineGroup = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 2px solid var(--bl-base-background-color);
    padding: 1rem;
    border-radius: 0.5rem;
    position: relative;

    & > label {
        color: var(--bl-main-text-color);
        position: absolute;
        top: -1rem;
        background-color: white;
        display: inline-block;
        width: fit-content;
        padding: 0.125rem 0.5rem;
    }
`;

const TransactionLineGroupRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`;

type TransactionLineInputProps = {
    removable: boolean;
    getTransactionLine: (key: number) => CreateTransactionLineInput;
    updateTransactionLine: (key: number, value: CreateTransactionLineInput) => void;
    deleteTransactionLine: (key: number) => void;
    mapKey: number;
};

type ShowProps = {
    when: boolean;
    children: ReactNode;
};
function Show(props: ShowProps) {
    if (props.when) return props.children;

    return null;
}

function TransactionLineInput({
    removable,
    getTransactionLine,
    updateTransactionLine,
    deleteTransactionLine,
    mapKey,
}: TransactionLineInputProps) {
    const line = getTransactionLine(mapKey);

    console.log("created id", mapKey);

    const onAccountIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateTransactionLine(mapKey, { ...line, accountId: event.target.value });
    };

    const onDebitsChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateTransactionLine(mapKey, { ...line, debitAmount: event.target.value });
    };

    const onCreditsChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateTransactionLine(mapKey, { ...line, creditAmount: event.target.value });
    };

    const onDeleteLineHandler: MouseEventHandler = (event) => {
        event.preventDefault();
        deleteTransactionLine(mapKey);
    };

    return (
        <TransactionLineGroup>
            <label>Transaction line</label>
            <InputBox
                placeholder="Account id"
                type="text"
                name={`accountId-${mapKey}`}
                onChange={onAccountIdChange}
                value={line.accountId}
            />
            <TransactionLineGroupRow>
                <InputBox
                    placeholder="Debits"
                    type="number"
                    name={`debits-${mapKey}`}
                    onChange={onDebitsChange}
                    value={line.debitAmount}
                />
                <InputBox
                    placeholder="Credits"
                    type="number"
                    name={`credits-${mapKey}`}
                    onChange={onCreditsChange}
                    value={line.creditAmount}
                />
            </TransactionLineGroupRow>
            <Show when={removable}>
                <SecondaryButton onClick={onDeleteLineHandler}>Delete Line</SecondaryButton>
            </Show>
        </TransactionLineGroup>
    );
}
const empty: CreateTransactionLineInput = {
    accountId: "",
    debitAmount: "",
    creditAmount: "",
};
export default function CreateTransactionPage() {
    const [description, setDescription] = useState("");
    const [createdAt, setCreatedAt] = useState(new Date().toString());
    const [nextAvailableId, setNextAvailableId] = useState(2);
    const [transactionLines, setTransactionLines] = useState(
        new Map<number, CreateTransactionLineInput>([
            [0, { ...empty }],
            [1, { ...empty }],
        ]),
    );

    const onDescriptionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const onCreatedAtChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCreatedAt(event.target.value);
    };
    const clearFormOnSuccess = () => {
        setTransactionLines(
            new Map<number, CreateTransactionLineInput>([
                [0, { ...empty }],
                [1, { ...empty }],
            ]),
        );

        setNextAvailableId(2);
        setDescription("");
        setCreatedAt("");
    };

    const getTransactionLine = (key: number): CreateTransactionLineInput => {
        if (transactionLines.has(key)) {
            return transactionLines.get(key) as CreateTransactionLineInput;
        } /* else {
            setTransactionLines((prev) => {
                const copy = new Map(prev);
                copy.set(key, { ...empty });
                return copy;
            });
        } */
        return { ...empty };
    };

    const updateTransactionLine = (key: number, value: CreateTransactionLineInput) => {
        setTransactionLines((prev) => {
            const copy = new Map(prev);
            copy.set(key, value);
            return copy;
        });
    };

    const deleteTransactionLine = (key: number) => {
        setTransactionLines((prev) => {
            const copy = new Map(prev);
            copy.delete(key);
            return copy;
        });
    };

    const lines = [];
    for (const [key, value] of transactionLines) {
        lines.push(
            <TransactionLineInput
                key={key}
                mapKey={key}
                removable={key != 0 && key != 1}
                getTransactionLine={getTransactionLine}
                updateTransactionLine={updateTransactionLine}
                deleteTransactionLine={deleteTransactionLine}
            />,
        );
    }

    const { isCreatingTransaction, createTransaction } = useCreateTransaction(clearFormOnSuccess);

    const onCreateTransactionClickHandler: MouseEventHandler = (event) => {
        event.preventDefault();

        const transaction: CreateTransactionInput = {
            createdAt: new Date(createdAt),
            description,
            lines: [...transactionLines.values()],
        };

        createTransaction(transaction);
    };
    const onAddTransactionLine: MouseEventHandler = (event) => {
        event.preventDefault();
        setTransactionLines((prev) => {
            const copy = new Map(prev);
            copy.set(nextAvailableId, { ...empty });
            return copy;
        });
        setNextAvailableId((prev) => prev + 1);
    };
    return (
        <Container>
            <PageTitle title="Add transaction" />
            <CreateTransactionForm name="create-account">
                {lines}
                <SecondaryButton onClick={onAddTransactionLine}>
                    Add Transaction Line <IoAddOutline />
                </SecondaryButton>
                <InputBox
                    name="description"
                    type="text"
                    placeholder="Transaction summary"
                    value={description}
                    onChange={onDescriptionChangeHandler}
                />
                <InputBox name="createdAt" type="date" value={createdAt} onChange={onCreatedAtChangeHandler} />
                <Button disabled={isCreatingTransaction} onClick={onCreateTransactionClickHandler}>
                    Add account
                </Button>
            </CreateTransactionForm>
        </Container>
    );
}
