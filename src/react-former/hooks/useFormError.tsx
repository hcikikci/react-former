import React, {createContext, useContext} from "react";

import {FormErrors} from "../types/FormErrors";
import {FormErrorProviderProps} from "../types/FormErrorProviderProps";

const FormErrorContext = createContext<FormErrors>({});

export const FormErrorProvider: React.FC<FormErrorProviderProps> = ({children, formErrors}) => {
    return (
        <FormErrorContext.Provider value={formErrors}>
            {children}
        </FormErrorContext.Provider>
    );
};

export const useFormError = (fieldName: string): string | null => {
    const formErrors = useContext(FormErrorContext);
    return formErrors[fieldName] || null;
};
