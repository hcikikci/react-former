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

export function useFormState(initialData: FormData | Promise<any>) {
    const [formData, setFormData] = useState<FormData>({});
    const [initialDataLoaded, setInitialDataLoaded] = useState<boolean>(false);
    const [initialDataError, setInitialDataError] = useState<boolean | string>(false);
    const isInitialDataProcessed = useRef(false);

    useEffect(() => {
        if (!isInitialDataProcessed.current) {
            if (initialData instanceof Promise) {
                initialData.then(data => {
                    setFormData(data);
                    setInitialDataLoaded(true);
                }).catch(error => {
                    setInitialDataError(error);
                });
            } else {
                setFormData(initialData);
                setInitialDataLoaded(true);
            }
            isInitialDataProcessed.current = true;
        }
    }, [initialData]);

    const getField: GetFieldFunction = (fieldName) => {
        return get(formData, fieldName);
    };

    const createField: CreateFieldFunction = (fieldName, value) => {
        setFormData(prevFormData => set({...prevFormData}, fieldName, value));
    };

    const updateField: UpdateFieldFunction = (fieldName, value) => {
        setFormData(prevFormData => set({...prevFormData}, fieldName, value));
    };

    const deleteField: DeleteFieldFunction = (fieldName) => {
        setFormData(prevFormData => {
            const newFormData = {...prevFormData};
            unset(newFormData, fieldName);
            return newFormData;
        });
    };

    return {
        formData,
        setFormData,
        getField,
        createField,
        updateField,
        deleteField,
        initialDataLoaded,
        initialDataError
    };
}

