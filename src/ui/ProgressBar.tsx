import styled from "styled-components";

type ProgressBarProps =
    | {
          type: "determinated";
          value: number;
      }
    | {
          type: "indeterminated";
      };

const Progress = styled.div`
    width: 100%;
    background-color: blue;
    height: 1rem;
`;

export default function ProgressBar(props: ProgressBarProps) {
    return <Progress />;
}
