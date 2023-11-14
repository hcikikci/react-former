import { Former } from './former/Former';
import FieldArray from './former/FieldArray';
import Field, { ErrorMessage } from './former/Field';

import { FormData } from './types/FormData';
import { FormErrors } from './types/FormErrors';
import { initializeFormera, setFormeraConfig } from './config/config';

export {
    Former,
    FieldArray,
    Field,
    ErrorMessage,
    setFormeraConfig,
    initializeFormera,
};
export type { FormData, FormErrors };
