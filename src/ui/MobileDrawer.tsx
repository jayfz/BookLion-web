import styled from "styled-components";

import {
    IoBarChartOutline,
    IoBookOutline,
    IoBookmarkOutline,
    IoDocumentOutline,
    IoEyeOutline,
    IoPieChartOutline,
    IoLogOutOutline,
    IoReorderThree,
    IoChevronDownCircleOutline,
    IoChevronUpCircleOutline,
    IoChevronDownOutline,
} from "react-icons/io5";

const DrawerContainer = styled.section`
    width: 80%;
    padding: 1.25rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background: linear-gradient(180deg, rgba(0, 255, 102, 0.2) 0%, rgba(0, 0, 0, 0) 100%), var(--bl-brand);
    position: sticky;
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
    & > svg {
        fill: white;
        size: 6rem;
    }
    & > svg:nth-child(2) {
        align-self: center;
        margin: 3rem 0;
    }
`;

const DrawerBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;

    & > a {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
    }

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
};

const StyledDrawerLink = styled(NavLink)`
    display: flex;
    flex-direction: row;
    align-items: center;
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

function SimpleDrawerLink({ children, to }: DrawerLinkProps) {
    return (
        <StyledDrawerLink style={selectedNavLink} to={to}>
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
import { IconContext, IconType } from "react-icons";
import { Link, NavLink } from "react-router-dom";
import { ReactNode } from "react";
export default function MobileDrawer() {
    return (
        <IconContext.Provider value={{ color: "white", size: iconSize }}>
            <DrawerContainer>
                <DrawerHeader>
                    <IoReorderThree />
                    <BookLionLogo />
                </DrawerHeader>
                <DrawerBody>
                    <SimpleDrawerLink to="/dashboard/overview">
                        <IoEyeOutline />
                        <span>Overview</span>
                    </SimpleDrawerLink>

                    <SimpleDrawerLink to="/dashboard/budgets">
                        <IoPieChartOutline />
                        <span>Budgets</span>
                    </SimpleDrawerLink>

                    <ComplexDrawerLink>
                        <div>
                            <IoBarChartOutline />
                            <span>Reports</span>
                            <IoChevronDownOutline />
                        </div>
                        <ul>
                            <SimpleDrawerLink to="/dashboard/reports/balance-sheet">Balance sheet</SimpleDrawerLink>
                            <SimpleDrawerLink to="/dashboard/reports/income-statement">
                                Income Statement
                            </SimpleDrawerLink>
                        </ul>
                    </ComplexDrawerLink>

                    <SimpleDrawerLink to="/dashboard/general-ledger">
                        <IoBookOutline />
                        <span>General Ledger</span>
                    </SimpleDrawerLink>

                    <SimpleDrawerLink to="/dashboard/general-journal">
                        <IoBookmarkOutline />
                        <span>General Journal</span>
                    </SimpleDrawerLink>

                    <SimpleDrawerLink to="/logout">
                        <IoLogOutOutline />
                        <span>Logout</span>
                    </SimpleDrawerLink>
                </DrawerBody>
            </DrawerContainer>
        </IconContext.Provider>
    );
}
