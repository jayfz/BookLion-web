import styled from "styled-components";

import {
    IoBarChartOutline,
    IoBookOutline,
    IoBookmarkOutline,
    IoEyeOutline,
    IoPieChartOutline,
    IoLogOutOutline,
    IoReorderThree,
    IoChevronDownOutline,
    IoCloseOutline,
    IoAccessibilityOutline,
} from "react-icons/io5";

const DrawerOverlay = styled.div<{ $isVisible: boolean }>`
    backdrop-filter: blur(2px);
    width: 100%;
    height: 100%;
    position: absolute;
    transform: ${(props) => (!props.$isVisible ? "translate(-100%)" : "translate(0%)")};
    transition: transform 0.25s ease-out;
    z-index: 1000;
`;
const DrawerContainer = styled.section`
    width: 80%;
    padding: 1.25rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background: linear-gradient(180deg, rgba(0, 255, 102, 0.2) 0%, rgba(0, 0, 0, 0) 100%), var(--bl-brand);
    /* position: absolute; */
    height: 100svh;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    color: white;

    & > ul a {
        display: flex;
    }
`;

const DrawerHeader = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 25svh;
    & > button:first-child {
        align-self: end;
    }

    & > svg {
        fill: white;
        size: 6rem;
        /* view-transition-name: logo-transition; */
    }
    & > svg:nth-child(2) {
        align-self: center;
        margin: 1rem 0;
    }
`;

const DrawerBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
    overflow-y: scroll;
    font-size: 0.875rem;

    & > a:first-child {
        /* background-color: rgba(255, 255, 255, 0.2); */
        padding: 0.5rem 1rem;
        /* border-radius: 0.5rem; */
    }
    & > a:last-child {
        margin-top: auto;
        margin-bottom: 1rem;
    }
`;

type DrawerLinkProps = {
    children: ReactNode;
    to: string;
} & React.HTMLAttributes<HTMLAnchorElement> &
    React.DOMAttributes<HTMLAnchorElement>;

const StyledDrawerLink = styled(NavLink)`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0.5rem 1rem;
    border-radius: 0.5rem;

    gap: 1rem;
`;

const selectedNavLink = ({ isActive }) => {
    if (isActive) {
        return {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "0.5rem",
        };
    }

    return {};
};

function SimpleDrawerLink({ children, to, ...attributes }: DrawerLinkProps) {
    return (
        <StyledDrawerLink style={selectedNavLink} to={to} {...attributes}>
            {children}
        </StyledDrawerLink>
    );
}

const iconSize = "1.5rem";

const ComplexDrawerLink = styled.div`
    display: flex;
    flex-direction: column;

    & > div {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
    }

    & > ul {
        padding-left: calc(1rem + ${iconSize} + 1rem);
    }

    & > div > svg:last-child {
        margin-left: auto;
    }
`;

import BookLionLogo from "@/ui/drawer/BookLionLogo";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import { AnchorHTMLAttributes, ReactNode } from "react";

type MobileDrawerProps = {
    isVisible: boolean;
    closeDrawer: () => void;
};

const CloseDrawerButton = styled.button``;
export default function MobileDrawer({ isVisible, closeDrawer }: MobileDrawerProps) {
    return (
        <IconContext.Provider value={{ color: "white", size: iconSize }}>
            <DrawerOverlay $isVisible={isVisible} onClick={closeDrawer}>
                <DrawerContainer>
                    <DrawerHeader>
                        <CloseDrawerButton onClick={closeDrawer}>
                            <IoCloseOutline />
                        </CloseDrawerButton>
                        <BookLionLogo />
                    </DrawerHeader>
                    <DrawerBody>
                        <SimpleDrawerLink to="/dashboard/overview" onClick={closeDrawer}>
                            <IoEyeOutline />
                            <span>Overview</span>
                        </SimpleDrawerLink>

                        <SimpleDrawerLink to="/dashboard/budgets" onClick={closeDrawer}>
                            <IoPieChartOutline />
                            <span>Budgets</span>
                        </SimpleDrawerLink>

                        <SimpleDrawerLink onClick={closeDrawer} to="/dashboard/reports/balance-sheet">
                            <IoBarChartOutline />
                            <span>Balance sheet</span>
                        </SimpleDrawerLink>
                        <SimpleDrawerLink onClick={closeDrawer} to="/dashboard/reports/income-statement">
                            <IoBarChartOutline />
                            <span>Income Statement</span>
                        </SimpleDrawerLink>

                        {/* <ComplexDrawerLink>
                            <div>
                                <IoBarChartOutline />
                                <span>Reports</span>
                                <IoChevronDownOutline />
                            </div>
                            <ul>
                                <SimpleDrawerLink onClick={toggleDrawer} to="/dashboard/reports/balance-sheet">
                                    Balance sheet
                                </SimpleDrawerLink>
                                <SimpleDrawerLink onClick={toggleDrawer} to="/dashboard/reports/income-statement">
                                    Income Statement
                                </SimpleDrawerLink>
                            </ul>
                        </ComplexDrawerLink> */}

                        {/* <SimpleDrawerLink onClick={toggleDrawer} to="/dashboard/general-ledger">
                            <IoBookOutline />
                            <span>General Ledger</span>
                        </SimpleDrawerLink> */}

                        <SimpleDrawerLink onClick={closeDrawer} to="/dashboard/general-journal">
                            <IoBookmarkOutline />
                            <span>General Journal</span>
                        </SimpleDrawerLink>

                        <SimpleDrawerLink onClick={closeDrawer} to="/dashboard/management">
                            <IoAccessibilityOutline />
                            <span>Management</span>
                        </SimpleDrawerLink>

                        <SimpleDrawerLink onClick={closeDrawer} to="/logout">
                            <IoLogOutOutline />
                            <span>Logout</span>
                        </SimpleDrawerLink>
                    </DrawerBody>
                </DrawerContainer>
            </DrawerOverlay>
        </IconContext.Provider>
    );
}
