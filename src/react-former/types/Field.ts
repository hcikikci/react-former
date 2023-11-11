import {FormDataValue} from "./FormData";
import React from "react";

export interface FieldType {
    name: string;
    type: 'select' | 'text';
    required?: boolean;
    label?: string;
    customInitialValue?: FormDataValue;
    options?: Array<{ value: string; label: string }>;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
}