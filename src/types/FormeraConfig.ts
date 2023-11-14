import React, { ReactElement, ReactNode } from 'react';
import { StylesConfig } from 'react-select';

export interface FormeraConfig {
    selectStyles?: {
        class?: string;
        style?: StylesConfig;
    };
    textStyles?: {
        class?: string;
        style?: React.CSSProperties;
    };
    checkboxStyles?: {
        class?: string;
        style?: React.CSSProperties;
    };
    radioStyles?: {
        class?: string;
        style?: React.CSSProperties;
    };
    numberStyles?: {
        class?: string;
        style?: React.CSSProperties;
    };
    passwordStyles?: {
        class?: string;
        style?: React.CSSProperties;
    };
    dateStyles?: {
        class?: string;
        style?: React.CSSProperties;
    };
    emailStyles?: {
        class?: string;
        style?: React.CSSProperties;
    };
    fileStyles?: {
        class?: string;
        style?: React.CSSProperties;
    };
    colorStyles?: {
        class?: string;
        style?: React.CSSProperties;
    };
    rangeStyles?: {
        class?: string;
        style?: React.CSSProperties;
    };
    inputWithLabel?: (label: string, input: ReactNode) => ReactElement;
}
