import styled from "styled-components";

import { IoChevronBackOutline } from "react-icons/io5";
import { formatDate } from "@/utils/formatters";
const Span = styled.span`
    /* color: var(--bl-link-unvisted); */
    display: flex;
    align-items: center;
    font-size: 0.75rem;
`;

export default function DateFilter() {
    return (
        <Span>
            <IoChevronBackOutline />
            {formatDate(new Date(), "short")}
        </Span>
    );
}
