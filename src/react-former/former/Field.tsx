import React, { useContext } from 'react';
import { FieldType } from "../types/Field";
import { FormContext } from "./Former";
import Select from 'react-select';
import config from '../config/input.json';

const getDefaultClass = () => config.input && config.input.class; //TODO: Is this the best way to do this? also function can move to utils?
const getDefaultStyle = () => config.input && config.input.style; //TODO: Is this the best way to do this? also function can move to utils?

const Field = ({
                   name,
                   options,
                   required = false,
                   placeholder,
                   customInitialValue,
                   type = 'text', // default to 'text' if not provided
                   label,
                   className = getDefaultClass(),
                   style = getDefaultStyle(),
               } : FieldType) => {
    const context = useContext(FormContext);

    if (!context) {
        throw new Error("Field must be used within the Former component");
    }

    const { formData, getField, updateField } = context;
    const initialValue = customInitialValue || (name.includes(".") ? getField(name) : formData[name]) || '';

    const commonProps = {
        key: name,
        required,
        className,
        style
    };

    const renderSelectField = () => (
        <Select
            {...commonProps}
            defaultValue={customInitialValue || options?.find(option => option.value === initialValue) || { label: name, value: name }}
            options={options}
            onChange={(selectedOption:any) => updateField(name, selectedOption?.value)} //TODO: Type Fix (any)
        />
    );

    const renderTextField = () => (
        <input
            {...commonProps}
            defaultValue={initialValue}
            name={name}
            onChange={(event) => updateField(name, event.target.value)}
            placeholder={placeholder || label || name}
        />
    );

    const fieldComponent = type === 'select' ? renderSelectField() : renderTextField();

    return label ? (
        <div className="flex flex-col space-y-1">
            <label>{label}</label>
            {fieldComponent}
        </div>
    ) : (
        fieldComponent
    );
};

export default Field;
