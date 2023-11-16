import React, { ReactNode } from 'react';

// Importing type for form data value
import { FormDataValue } from '../types/FormData';

/**
 * Function to render data as a React component.
 * This function dynamically renders different types of data.
 * @param data - The data to be rendered, can be of various types.
 * @param placeholderEmptyData
 * @returns A ReactNode that visually represents the input data.
 */
export const renderData = (
    data: FormDataValue,
    placeholderEmptyData?: ReactNode
): ReactNode => {
    // Handling null or undefined data
    if (data === null || data === undefined) {
        return placeholderEmptyData || <span>No Data</span>;
    }
    // Rendering basic data types (string, number, boolean)
    else if (
        typeof data === 'string' ||
        typeof data === 'number' ||
        typeof data === 'boolean'
    ) {
        return <span>{data.toString()}</span>;
    }
    // Recursively rendering array data
    else if (Array.isArray(data)) {
        return data.map((item, index) => (
            <div key={index}>{renderData(item)}</div>
        ));
    }
    // Rendering object data with keys and values
    else if (typeof data === 'object') {
        return (
            <div>
                {Object.entries(data).map(([key, value], index) => (
                    <div key={index}>
                        <strong>{key}:</strong> {renderData(value)}
                    </div>
                ))}
            </div>
        );
    }
    // Fallback for unknown data types
    return <span>Unknown Data Type</span>;
};
