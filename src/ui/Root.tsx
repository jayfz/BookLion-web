import MobileMenuBar from "@/ui/MobileMenuBar";
import ProgressBar from "@/ui/ProgressBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const RootContainer = styled.main`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 0.5rem;

    /* & > img {
        position: relative;
        transform: translate(-1rem);
        min-width: calc(100% + 2rem);
    } */
`;

export default function Root() {
    return (
        <>
            {/* <ProgressBar type={"indeterminated"} /> */}
            <MobileMenuBar />
            {/* <img src="https://developer-blogs.nvidia.com/wp-content/uploads/2020/03/RTX-Rendering_-Blender_3.jpg" /> */}
            <Outlet />
        </>
    );
}
