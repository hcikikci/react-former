import React from 'react';

// Importing context and components
import { FormContext } from './Former';

// Importing type definitions
import { FieldArrayAddProps } from '../types/FieldArrayAddProps';

// Add component for adding new items to the field array
export const Add = ({
    name = '',
    children,
    initialItemState,
    itemState,
    updateItemState,
    grayedOut,
}: FieldArrayAddProps) => {
    const context = React.useContext(FormContext);

    // Ensuring Add is used within a FormContext provider
    if (!context) {
        throw new Error('FieldArray must be used within the Former component');
    }
    const { createField, getField } = context;

    // Function to handle the creation of a new field
    const handleCreateField = (name: string) => {
        let fields = getField(name);
        if (!Array.isArray(fields)) {
            createField(name, []);
            fields = [];
        }
        const firstNullIndex = fields.findIndex(
            (item) => item == null || Object.keys(item).length === 0
        );

        // Logic for creating a new field in the array
        if (firstNullIndex !== -1) {
            console.log('firstNullIndex', firstNullIndex);
            createField(name + '[' + firstNullIndex + ']', {});
            updateItemState({ ...itemState, ...initialItemState });
            return;
        } else {
            console.log('fields.length', fields.length);
            createField(name + '[' + fields.length + ']', {});
            updateItemState({ ...itemState, ...initialItemState });
            return;
        }
    };

    return (
        <div
            className={grayedOut ? 'grayed-out pointer-events-none' : undefined}
            onClick={() => !grayedOut && handleCreateField(name)}
        >
            {children}
        </div>
    );
};
