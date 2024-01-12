import BookLionQuicksandBoldLogo from "@/ui/BookLionQuicksandBoldLogo";
import MobileDrawer from "@/ui/MobileDrawer";
import { useState } from "react";
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

const HamburgerButton = styled.button.attrs({ type: "button" })``;

export default function MobileMenuBar() {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    const openDrawer = () => setIsDrawerVisible(true);
    const closeDrawer = () => setIsDrawerVisible(false);

    return (
        <>
            <MobileDrawer isVisible={isDrawerVisible} closeDrawer={closeDrawer} />
            <MainContainer>
                <Container>
                    <BookLionQuicksandBoldLogo style={{ fill: "var(--bl-main-text-color)" }} />
                    <HamburgerButton onClick={openDrawer}>
                        <IoReorderThree size={"2rem"} />
                    </HamburgerButton>
                </Container>
            </MainContainer>
        </>
    );
}
