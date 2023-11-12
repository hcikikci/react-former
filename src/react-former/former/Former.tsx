import React, { createContext, ReactNode, useState } from 'react';

// Importing hooks and types
import { useFormState } from '../hooks/useFormState';
import { FormContextProps } from '../types/FormContextProps';
import { FormErrors } from '../types/FormErrors';
import { FormErrorProvider } from '../hooks/useFormError';

// Importing Skeleton for loading states
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { FormDataValue } from '../types/FormData';
import { FormerProps } from '../types/FormerProps';

// Creating a context for the form
export const FormContext = createContext<FormContextProps | undefined>(
    undefined
);

// Former component - a custom form component
export const Former: React.FC<FormerProps> = ({
    children,
    onChange,
    onSubmit,
    initialData,
    className,
    validate,
}) => {
    // Using useFormState hook to manage form state
    const {
        formData,
        getField,
        createField,
        updateField: _updateField,
        deleteField,
        initialDataError,
        initialDataLoaded,
    } = useFormState(initialData === undefined ? {} : initialData);

    // State for managing form errors
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    // Function to update field values and trigger onChange callback
    const updateField = (fieldName: string, value: FormDataValue) => {
        _updateField(fieldName, value);
        onChange?.(fieldName, value);
    };

    // Handling form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (validate) {
            const errors = validate(formData);
            if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
                return;
            }
        }
        setFormErrors({});
        onSubmit?.(formData);
    };

    // Function to count total children components for skeleton size
    const countTotalChildren = (children: ReactNode): number => {
        let total = 0;
        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child)) {
                total += 1;
                if (child.props.children) {
                    total += countTotalChildren(child.props.children);
                }
            }
        });
        return total;
    };

    // Display loading skeletons if initial data is not loaded
    if (!initialDataLoaded) {
        return (
            <form className={className ? className : undefined}>
                {React.Children.map(children, (child) =>
                    React.isValidElement(child) ? (
                        <Skeleton
                            height={30}
                            count={countTotalChildren(child)}
                        />
                    ) : null
                )}
            </form>
        );
    }

    // Display error if there is an error in loading initial data
    if (initialDataError) {
        return <div>Error: {initialDataError}</div>;
    }

    // Providing form context and error context to children
    return (
        <FormContext.Provider
            value={{
                formData,
                getField,
                createField,
                updateField,
                deleteField,
            }}
        >
            <FormErrorProvider formErrors={formErrors}>
                <form
                    className={className ? className : undefined}
                    onSubmit={handleSubmit}
                >
                    {children}
                </form>
            </FormErrorProvider>
        </FormContext.Provider>
    );
};
