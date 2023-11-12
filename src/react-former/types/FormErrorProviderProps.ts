import { ReactNode } from 'react';
import { FormErrors } from './FormErrors';

export interface FormErrorProviderProps {
    children: ReactNode;
    formErrors: FormErrors;
}
