import {useEffect, useRef, useState} from "react";
import set from 'lodash/set';
import get from 'lodash/get';
import unset from 'lodash/unset';
import {FormData} from "../types/FormData";
import {
    CreateFieldFunction,
    DeleteFieldFunction,
    GetFieldFunction,
    UpdateFieldFunction
} from "../types/FormContextProps";

export function useFormState(initialData: FormData) {
    const [formData, setFormData] = useState<FormData>(initialData);
    const isInitialDataSet = useRef(false);

    useEffect(() => {
        console.log('useFormState: initialData', initialData)
        if (!isInitialDataSet.current) {
            setFormData(initialData);
            isInitialDataSet.current = true;
        }
    }, [initialData]);

    const getField:GetFieldFunction = (fieldName) => {
        return get(formData, fieldName);
    };

    const createField:CreateFieldFunction = (fieldName, value) => {
        setFormData(prevFormData => set({...prevFormData}, fieldName, value));
    };

    const updateField:UpdateFieldFunction = (fieldName, value) => {
        setFormData(prevFormData => set({...prevFormData}, fieldName, value));
    };

    const deleteField:DeleteFieldFunction = (fieldName) => {
        setFormData(prevFormData => {
            const newFormData = {...prevFormData};
            unset(newFormData, fieldName);
            return newFormData;
        });
    };

    return {formData, setFormData, getField, createField, updateField, deleteField};
}

