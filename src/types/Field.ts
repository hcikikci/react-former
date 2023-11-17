import React from 'react';

import { FormDataValue } from './FormData';

export interface FieldType {
    name: string;
    type:
        | 'select'
        | 'text'
        | 'checkbox'
        | 'radio'
        | 'number'
        | 'password'
        | 'date'
        | 'email'
        | 'file'
        | 'color'
        | 'range';
    required?: boolean;
    label?: string;
    customInitialValue?: FormDataValue;
    options?: Array<{ value: string; label: string }>;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    saveOnSubmit?:
        | boolean
        | ((fieldName: string, value: FormDataValue) => void);
    setExternalState?: any;
}
