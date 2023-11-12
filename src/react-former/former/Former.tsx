import React, { createContext, ReactNode, useState } from 'react';

import { useFormState } from '../hooks/useFormState';
import { FormContextProps } from '../types/FormContextProps';
import { FormErrors } from '../types/FormErrors';
import { FormErrorProvider } from '../hooks/useFormError';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { FormDataValue } from '../types/FormData';
import { FormerProps } from '../types/FormerProps';

export const FormContext = createContext<FormContextProps | undefined>(
    undefined
);

export const Former: React.FC<FormerProps> = ({
    children,
    onChange,
    onSubmit,
    initialData,
    className,
    validate,
}) => {
    const {
        formData,
        getField,
        createField,
        updateField: _updateField,
        deleteField,
        initialDataError,
        initialDataLoaded,
    } = useFormState(initialData === undefined ? {} : initialData);

    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const updateField = (fieldName: string, value: FormDataValue) => {
        _updateField(fieldName, value);
        onChange?.(fieldName, value);
    };

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

    if (!initialDataLoaded) {
        return (
            <form className={className ? className : undefined}>
                {/* Skeleton bileşenleri ile yükleniyor göstergesi */}
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

    if (initialDataError) {
        return <div>Error: {initialDataError}</div>;
    }

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
