import styled from "styled-components";

const Container = styled.article`
    max-width: 800px;
    padding: 2rem;
    background-color: white;
    border-radius: 1rem;
    margin: auto auto;
    font-size: 2rem;
`;
export default function DesktopVersionNotReady() {
    return (
        <Container>
            <p>
                The desktop version of this app is not ready yet. If you would like to use it, please consider switching
                to a phone.
            </p>
        </Container>
    );
}
