import React, { CSSProperties, useContext } from 'react';
import Select, { StylesConfig } from 'react-select';

// Importing context and components
import { FormContext } from './Former';
import { getDefaultClass } from '../utils/getDefaultClass';
import { getDefaultStyle } from '../utils/getDefaultStyle';
import { useFormError } from '../hooks/useFormError';

// Importing type definitions
import { FieldType } from '../types/Field';
import { formeraConfig } from '../config/config';

// Define default prop values for the Field component
const defaultProps = {
    required: false,
    type: 'text',
};

// Field component for form inputs
const Field = ({
    name,
    options,
    required,
    placeholder,
    customInitialValue,
    type,
    label,
    className,
    style,
}: FieldType) => {
    // Accessing context from the Form component
    const context = useContext(FormContext);

    // Ensuring Field is used within a FormContext provider
    if (!context) {
        throw new Error('Field must be used within the Former component');
    }

    // Destructuring context to get field-related functions
    const { getField, updateField } = context;

    // Determine the initial value of the field
    const initialValue = customInitialValue || getField(name) || '';
    const isDefaultValueValid =
        typeof initialValue === 'string' || typeof initialValue === 'number'; //TODO: add support for other types

    // Common properties for all field types
    const commonProps = {
        key: name,
        name: name,
        required,
        className: className || getDefaultClass(type),
        style: style || (getDefaultStyle(type) as CSSProperties),
        defaultValue: isDefaultValueValid ? initialValue : undefined,
        placeholder: placeholder || label || name,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
            updateField(name, event.target.value),
    };

    // Render functions for various input types
    const renderSelectField = () => (
        <Select
            {...commonProps}
            defaultValue={
                customInitialValue ||
                options?.find((option) => option.value === initialValue) ||
                null
            }
            options={options}
            onChange={(selectedOption: any) =>
                updateField(name, selectedOption?.value)
            }
            styles={getDefaultStyle('select') as StylesConfig} //TODO: add support for custom styles
        />
    );

    const renderTextField = () => <input {...commonProps} type="text" />;
    const renderCheckboxField = () => (
        <input
            {...commonProps}
            type="checkbox"
            checked={Boolean(initialValue)}
        />
    );
    const renderRadioField = () => <input {...commonProps} type="radio" />;
    const renderNumberField = () => <input {...commonProps} type="number" />;
    const renderPasswordField = () => (
        <input {...commonProps} type="password" />
    );
    const renderDateField = () => <input {...commonProps} type="date" />;
    const renderEmailField = () => <input {...commonProps} type="email" />;
    const renderFileField = () => <input {...commonProps} type="file" />;
    const renderRangeField = () => <input {...commonProps} type="range" />;
    const renderColorField = () => <input {...commonProps} type="color" />;

    // Mapping field types to their respective render functions
    const fieldComponentMap = {
        select: renderSelectField,
        checkbox: renderCheckboxField,
        radio: renderRadioField,
        number: renderNumberField,
        password: renderPasswordField,
        date: renderDateField,
        email: renderEmailField,
        file: renderFileField,
        range: renderRangeField,
        color: renderColorField,
        text: renderTextField,
    };

    // Selecting the appropriate component to render based on the 'type' prop
    const fieldComponent = fieldComponentMap[type]
        ? fieldComponentMap[type]()
        : renderTextField();

    // Conditional rendering based on whether a label is provided TODO: add support for custom label component
    return label
        ? (formeraConfig.inputWithLabel &&
              formeraConfig.inputWithLabel(label, fieldComponent)) || (
              <div className="flex flex-col space-y-1">
                  <label htmlFor={name}>{label}</label>
                  {fieldComponent}
              </div>
          )
        : fieldComponent;
};

// Setting default properties for the Field component
Field.defaultProps = defaultProps;

// Component to display error messages for a field
export const ErrorMessage = ({ fieldName }: { fieldName: string }) => {
    const errorMessage = useFormError(fieldName);

    return errorMessage ? <>{errorMessage}</> : null;
};

export default Field;
