import React, {createContext, useEffect} from 'react';
import {FormContextProps} from "../types/FormContextProps";
import {FormerProps} from "../types/FormerProps";
import {useFormState} from "../hooks/useFormState";
import {FormDataValue} from "../types/FormData";


export const FormContext = createContext<FormContextProps | undefined>(undefined);

export const Former: React.FC<FormerProps> = ({
                                                  children,
                                                  onChange,
                                                  onSubmit,
                                                  initialData,
                                                  isInitialDataLoading,
                                                  className
                                              }) => {
    const {formData, getField, createField, updateField: _updateField, deleteField} = useFormState(initialData || {});

    const updateField = (fieldName: string, value: FormDataValue) => {
        _updateField(fieldName, value);
        onChange?.(fieldName, value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit?.(formData);
    };

    if (isInitialDataLoading) {
        return <div>Loading...</div>;
    }

    return (
        <FormContext.Provider value={{formData, getField, createField, updateField, deleteField}}>
            <form className={className ? className : undefined} onSubmit={handleSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    );
};