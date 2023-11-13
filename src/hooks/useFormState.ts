import { useEffect, useRef, useState } from 'react';

// Importing lodash utility functions
import set from 'lodash/set';
import get from 'lodash/get';
import unset from 'lodash/unset';

// Importing types for form data and functions
import { FormData } from '../types/FormData';
import {
    CreateFieldFunction,
    DeleteFieldFunction,
    GetFieldFunction,
    UpdateFieldFunction,
} from '../types/FormContextProps';

/**
 * Custom hook to manage form state.
 * @param initialData - The initial data for the form, can be an object or a promise resolving to an object.
 * @returns An object containing form data and functions to manipulate it.
 */
export const useFormState = (initialData: FormData | Promise<any>) => {
    // State for storing form data
    const [formData, setFormData] = useState<FormData>({});

    // State to track if initial data is loaded
    const [initialDataLoaded, setInitialDataLoaded] = useState<boolean>(false);

    // State to track any error in loading initial data
    const [initialDataError, setInitialDataError] = useState<boolean | string>(
        false
    );

    // Ref to track if initial data has been processed
    const isInitialDataProcessed = useRef(false);

    // Effect to handle initial data loading
    useEffect(() => {
        if (!isInitialDataProcessed.current) {
            if (initialData instanceof Promise) {
                initialData
                    .then((data) => {
                        setFormData(data);
                        setInitialDataLoaded(true);
                    })
                    .catch((error) => {
                        setInitialDataError(error);
                    });
            } else {
                setFormData(initialData);
                setInitialDataLoaded(true);
            }
            isInitialDataProcessed.current = true;
        }
    }, [initialData]);

    // Function to get a field's value
    const getField: GetFieldFunction = (fieldName) => {
        return get(formData, fieldName);
    };

    // Function to create a new field
    const createField: CreateFieldFunction = (fieldName, value) => {
        setFormData((prevFormData) =>
            set({ ...prevFormData }, fieldName, value)
        );
    };

    // Function to update an existing field
    const updateField: UpdateFieldFunction = (fieldName, value) => {
        setFormData((prevFormData) =>
            set({ ...prevFormData }, fieldName, value)
        );
    };

    // Function to delete a field
    const deleteField: DeleteFieldFunction = (fieldName) => {
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData };
            unset(newFormData, fieldName);
            return newFormData;
        });
    };

    // Returning form data and utility functions
    return {
        formData,
        setFormData,
        getField,
        createField,
        updateField,
        deleteField,
        initialDataLoaded,
        initialDataError,
    };
};
