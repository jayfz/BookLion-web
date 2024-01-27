import { ReactNode } from "react";

type ShowProps = {
    when: boolean;
    children: ReactNode;
};
export function Show(props: ShowProps) {
    if (props.when) return props.children;

    return null;
}
