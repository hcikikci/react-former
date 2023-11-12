import React, { createContext, useContext } from 'react';

// Importing types for form errors
import { FormErrors } from '../types/FormErrors';
import { FormErrorProviderProps } from '../types/FormErrorProviderProps';

// Creating a context for form errors
const FormErrorContext = createContext<FormErrors>({});

/**
 * Provides a context for form errors.
 * This component wraps around form-related components
 * and provides them access to form errors.
 */
export const FormErrorProvider: React.FC<FormErrorProviderProps> = ({
    children,
    formErrors,
}) => {
    return (
        // Providing the form errors to its children via context
        <FormErrorContext.Provider value={formErrors}>
            {children}
        </FormErrorContext.Provider>
    );
};

/**
 * Custom hook to access form errors.
 * @param fieldName - The name of the field whose error is to be retrieved.
 * @returns The error message associated with the field if present, otherwise null.
 */
export const useFormError = (fieldName: string): string | null => {
    // Using the useContext hook to access form errors from the context
    const formErrors = useContext(FormErrorContext);

    // Returning the error message for the specified field name, if it exists
    return formErrors[fieldName] || null;
};
