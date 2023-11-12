import { FormData, FormDataValue } from './FormData';

export interface FormContextProps {
    formData: FormData;
    getField: GetFieldFunction;
    createField: CreateFieldFunction;
    updateField: UpdateFieldFunction;
    deleteField: DeleteFieldFunction;
}

export type UpdateFieldFunction = (
    fieldName: string,
    value: FormDataValue
) => void;
export type DeleteFieldFunction = (fieldName: string) => void;
export type GetFieldFunction = (fieldName: string) => FormDataValue;
export type CreateFieldFunction = (
    fieldName: string,
    value: FormDataValue
) => void;
