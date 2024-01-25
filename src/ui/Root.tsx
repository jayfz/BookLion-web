import MobileMenuBar from "@/ui/MobileMenuBar";
import ProgressBar from "@/ui/ProgressBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const RootContainer = styled.main`
    /* padding: 1rem; */
    display: flex;
    flex-direction: column;
    height: 100%;

    /* gap: 0.5rem; */
`;

export default function Root() {
    return (
        <RootContainer>
            <MobileMenuBar />
            <Outlet />
        </RootContainer>
    );
}
