import React from 'react';

// Importing context and components
import { FormContext } from './Former';
import { renderData } from '../utils/renderData';

// Preview component for displaying data
export const Preview = ({ name }: { name: string }) => {
    const context = React.useContext(FormContext);

    // Ensuring Preview is used within a FormContext provider
    if (!context) {
        throw new Error('FieldArray must be used within the Former component');
    }
    const { getField } = context;
    const data = getField(name);

    // Rendering the data using a utility function
    return <div>{renderData(data)}</div>;
};
