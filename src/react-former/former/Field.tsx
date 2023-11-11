import React, {useContext} from 'react';
import {FieldType} from "../types/Field";
import {FormContext} from "./Former";
import Select from 'react-select';
import {getDefaultClass} from "../utils/getDefaultClass";
import {getDefaultStyle} from "../utils/getDefaultStyle";
import {useFormError} from "../hooks/useFormError";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const Field = ({
                   name,
                   options,
                   required = false,
                   placeholder,
                   customInitialValue,
                   type = 'text',
                   label,
                   className = getDefaultClass(),
                   style = getDefaultStyle()
               }: FieldType) => {
    const context = useContext(FormContext);

    if (!context) {
        throw new Error("Field must be used within the Former component");
    }

    const {formData, getField, updateField} = context;
    const initialValue = customInitialValue || (name.includes(".") ? getField(name) : formData[name]) || '';
    const isDefaultValueValid = typeof initialValue === 'string' || typeof initialValue === 'number';

    const commonProps = {
        key: name,
        name: name,
        required,
        className,
        style,
        defaultValue: isDefaultValueValid ? initialValue : undefined,
        placeholder: placeholder || label || name,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => updateField(name, event.target.value)
    };

    const renderSelectField = () => (
        <Select {...commonProps}
                defaultValue={customInitialValue || options?.find(option => option.value === initialValue) || {
                    label: name,
                    value: name
                }} options={options} onChange={(selectedOption: any) => updateField(name, selectedOption?.value)}/>
    );

    const renderTextField = () => <input {...commonProps} type="text"/>;
    const renderCheckboxField = () => <input {...commonProps} type="checkbox" checked={Boolean(initialValue)}/>;
    const renderRadioField = () => <input {...commonProps} type="radio"/>;
    const renderNumberField = () => <input {...commonProps} type="number"/>;
    const renderPasswordField = () => <input {...commonProps} type="password"/>;
    const renderDateField = () => <input {...commonProps} type="date"/>;
    const renderEmailField = () => <input {...commonProps} type="email"/>;
    const renderFileField = () => <input {...commonProps} type="file"/>;
    const renderRangeField = () => <input {...commonProps} type="range"/>;
    const renderColorField = () => <input {...commonProps} type="color"/>;

    let fieldComponent;
    switch (type) {
        case 'select':
            fieldComponent = renderSelectField();
            break;
        case 'checkbox':
            fieldComponent = renderCheckboxField();
            break;
        case 'radio':
            fieldComponent = renderRadioField();
            break;
        case 'number':
            fieldComponent = renderNumberField();
            break;
        case 'password':
            fieldComponent = renderPasswordField();
            break;
        case 'date':
            fieldComponent = renderDateField();
            break;
        case 'email':
            fieldComponent = renderEmailField();
            break;
        case 'file':
            fieldComponent = renderFileField();
            break;
        case 'range':
            fieldComponent = renderRangeField();
            break;
        case 'color':
            fieldComponent = renderColorField();
            break;
        default:
            fieldComponent = renderTextField();
            break;
    }

    return label ? (
        <div className="flex flex-col space-y-1">
            <label htmlFor={name}>{label}</label>
            {fieldComponent}
        </div>
    ) : (
        fieldComponent
    );
};

export const ErrorMessage = ({ fieldName }: { fieldName: string }) => {
    const errorMessage = useFormError(fieldName);

    return errorMessage ? <>{errorMessage}</> : null;
};

export default Field;
