import GeneralJournalEntryPage from "@/features/general-journal/GeneralJournalEntryPage";
import GeneralJournalPage from "@/features/general-journal/GeneralJournalPage";
import { useState } from "react";
import styled from "styled-components";

const ContainerParent = styled.main`
    /* display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center; */
`;
const Container = styled.div`
    /* display: flex; */

    /* flex-direction: column;
    background-color: aqua;
    justify-content: center;
    align-items: center;

    & div {
        margin: auto 0;
    }
    & > p:last-child {
        color: red;
    }

    & p {
        padding: 0.5rem 0;
        border: 1px solid green;
        width: 100px;
        text-align: center;
        flex-grow: 1;
        background-color: beige;
    } */

    & p {
        height: 4rem;
    }
`;

export default function Playground(params) {
    const [items, setItems] = useState(["today"]);

    const loadMore = () => {
        setItems((prev) => {
            return [...prev, new Date().toDateString()];
        });
    };
    return (
        <ContainerParent>
            <button onClick={loadMore}>Load more</button>
            {items.map((item, index) => (
                <p>
                    Date&Time {item}{" "}
                    {index % 5 == 0 && (
                        <>
                            {" "}
                            <button onClick={loadMore}>Load more</button>
                        </>
                    )}
                </p>
            ))}
        </ContainerParent>
    );
}
