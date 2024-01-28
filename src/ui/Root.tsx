import DesktopVersionNotReady from "@/ui/DesktopVersionNotReady";
import MobileMenuBar from "@/ui/MobileMenuBar";
// import ProgressBar from "@/ui/ProgressBar";
import useDeviceWidth from "@/ui/useDeviceWidth";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const RootContainer = styled.main`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export default function Root() {
    const deviceWidth = useDeviceWidth();

    if (deviceWidth > 650) {
        return <DesktopVersionNotReady />;
    }
    return (
        <RootContainer>
            <MobileMenuBar />
            <Outlet />
        </RootContainer>
    );
}
