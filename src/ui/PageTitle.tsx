import DateFilter from "@/ui/DateFilter";
import styled from "styled-components";

type PageTitleProps = {
    title: string;
};

const Container = styled.section`
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    color: var(--bl-brand);

    & > p {
        max-width: 60%;
        font-weight: 500;
        white-space: nowrap;
        overflow-y: scroll;
        text-transform: capitalize;
    }
`;

export default function PageTitle({ title }: PageTitleProps) {
    return (
        <Container>
            <p>{title}</p>
            <DateFilter />
        </Container>
    );
}
