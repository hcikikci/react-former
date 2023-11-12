import React from 'react';

// Importing context and components
import { FormContext } from './Former';

// Importing type definitions
import { FieldArrayRemoveProps } from '../types/FieldArrayRemoveProps';

// Remove component for deleting items from the field array
export const Remove = ({ name = '', children }: FieldArrayRemoveProps) => {
    const context = React.useContext(FormContext);

    // Ensuring Remove is used within a FormContext provider
    if (!context) {
        throw new Error('FieldArray must be used within the Former component');
    }
    const { deleteField } = context;

    // Function to handle the deletion of a field
    const handleDeleteField = (name: string) => {
        deleteField(name);
    };

    // Rendering the Remove component
    return <div onClick={() => handleDeleteField(name)}>{children}</div>;
};
