import React from 'react';

// Importing context and components

// Importing type definitions
import { FieldArraySaveProps } from '../types/FieldArraySaveProps';

// Add component for adding new items to the field array
export const Save = ({
    children,
    onClick,
    setItemStateAfterSave,
    updateItemState,
}: FieldArraySaveProps) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (updateItemState && setItemStateAfterSave) {
            updateItemState(setItemStateAfterSave);
        }
    };

    return <div onClick={handleClick}>{children}</div>;
};
