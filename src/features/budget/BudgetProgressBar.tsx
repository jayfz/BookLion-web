import styled from "styled-components";

const BudgetBar = styled.div`
    height: 0.5rem;
    border-radius: 99rem;
    background-color: #d9d9d9;
    width: 100%;
    --bl-budget-bar-safe-color: #1ce460;
    --bl-budget-bar-close-color: #e4ac1c;
    --bl-budget-bar-full-color: #e41c34;
`;

function normalizeProgress(progress: number) {
    if (progress >= 100) return 100;

    if (progress >= 5) return progress;

    if (progress == 0) return 0;

    return 5;
}

const BudgetBarWithProgress = styled(BudgetBar).attrs<{ $status: "safe" | "close" | "full"; $progress: number }>(
    (props) => ({
        $status: props.$status,
    }),
)`
    width: ${(props) => normalizeProgress(props.$progress)}%;
    background-color: ${(props) => `var(--bl-budget-bar-${props.$status}-color)`};
`;

type BudgetProgressBarProps = {
    progress: number;
};

export default function BudgetProgressBar({ progress }: BudgetProgressBarProps) {
    const status = progress < 50 ? "safe" : progress >= 100 ? "full" : "close";

    return (
        <BudgetBar>
            <BudgetBarWithProgress $status={status} $progress={progress} />
        </BudgetBar>
    );
}
