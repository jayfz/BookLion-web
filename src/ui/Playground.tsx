import styled from "styled-components";

const ContainerParent = styled.main`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
`;
const Container = styled.div`
    display: flex;

    flex-direction: column;
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
    }
`;

export default function Playground(params) {
    return (
        <ContainerParent>
            <Container>
                <p>step1</p>
                <p>step2</p>
                <p>step3</p>
            </Container>
            <Container>
                <p>step1</p>
                <p>step2</p>
                <p>step3</p>
            </Container>
        </ContainerParent>
    );
}
