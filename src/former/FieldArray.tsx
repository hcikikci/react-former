import React, { ReactElement, ReactNode } from 'react';

// Importing context and components
import { FormContext } from './Former';
import Field from './Field';
import { Preview } from './FieldArray.Preview';
import { Add } from './FieldArray.Add';
import { Remove } from './FieldArray.Remove';

// Importing type definitions
import { FieldArrayProps } from '../types/FieldArrayProps';
import { FieldArrayElement } from '../types/FieldArrayElement';

// FieldArray component for handling arrays of fields
const FieldArray = ({ name, children }: FieldArrayProps) => {
    const context = React.useContext(FormContext);

    // Ensuring FieldArray is used within a FormContext provider
    if (!context) {
        throw new Error('FieldArray must be used within the Former component');
    }
    const { formData } = context;

    // Function to process children components
    const processChildren = (
        children: ReactNode,
        fieldName: string,
        isInLoop: boolean
    ): ReactNode => {
        return React.Children.map(children, (child) => {
            // Check if child is a valid React element
            if (React.isValidElement(child)) {
                const childProps = child.props as FieldArrayElement;

                // Rendering logic based on the 'renderInLoop' property
                if (
                    (childProps.renderInLoop === false && isInLoop) ||
                    (childProps.renderInLoop !== false && !isInLoop)
                ) {
                    return null;
                }

                // Determining the type of child component
                const isFieldOrPreview =
                    child.type === Field || child.type === Preview;
                const isRemove = child.type === Remove;
                const isAdd = child.type === Add;

                // Cloning and modifying element based on its type
                if (isFieldOrPreview) {
                    return React.cloneElement(child as ReactElement, {
                        name: `${fieldName}.${childProps.name}`,
                    });
                } else if (isRemove) {
                    return React.cloneElement(child as ReactElement, {
                        name: `${fieldName}`,
                    });
                } else if (isAdd) {
                    return React.cloneElement(child as ReactElement, {
                        name: `${name}`,
                    });
                }

                // Recursive processing for nested children
                if (childProps.children) {
                    return React.cloneElement(child, {
                        children: processChildren(
                            childProps.children,
                            fieldName,
                            isInLoop
                        ),
                    } as FieldArrayElement);
                }
            }
            return child;
        });
    };

    // Rendering the fields
    return (
        <>
            {Array.isArray(formData?.[name]) &&
                (formData[name] as []).map((_item: any, index: number) => {
                    return processChildren(children, `${name}[${index}]`, true);
                })}
            {processChildren(children, name, false)}
        </>
    );
};

// Adding the Add component as a static property of FieldArray
FieldArray.Add = Add;

// Adding the Remove component as a static property of FieldArray
FieldArray.Remove = Remove;

// Adding the Preview component as a static property of FieldArray
FieldArray.Preview = Preview;

export default FieldArray;
