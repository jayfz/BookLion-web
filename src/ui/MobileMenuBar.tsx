import BookLionQuicksandBoldLogo from "@/ui/BookLionQuicksandBoldLogo";
import { IoReorderThree } from "react-icons/io5";
import styled from "styled-components";

const MainContainer = styled.article`
    width: 100%;
    padding: 1rem;
    padding-bottom: 0.5rem;
`;
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background-color: white;
    border-radius: 0.5rem;
    align-items: center;
`;

export default function MobileMenuBar() {
    return (
        <MainContainer>
            <Container>
                <BookLionQuicksandBoldLogo style={{ fill: "var(--bl-main-text-color)" }} />
                <IoReorderThree size={"2rem"} />
            </Container>
        </MainContainer>
    );
}
