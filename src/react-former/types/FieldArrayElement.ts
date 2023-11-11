import React, {ReactNode} from "react";

export interface FieldArrayElement extends React.HTMLProps<HTMLElement> {
    children?: ReactNode;
    renderInLoop?: boolean;
}
