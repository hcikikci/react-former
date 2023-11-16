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
import { useFormState } from '../hooks/useFormState';
import { FormDataValue } from '../types/FormData';
import { Save } from './FieldArray.Save';

// FieldArray component for handling arrays of fields
const FieldArray = ({
    name,
    children,
    saveOnSubmit,
    itemStates,
    updateItemState,
}: FieldArrayProps) => {
    const context = React.useContext(FormContext);
    const { formData: innerFormData, updateField: innerUpdateField } =
        useFormState({});
    // Ensuring FieldArray is used within a FormContext provider
    if (!context) {
        throw new Error('FieldArray must be used within the Former component');
    }
    const { formData, updateField, getField } = context;

    const handleSubmit = (index: number | undefined) => {
        if (index === undefined) return;
        Object.keys(innerFormData).forEach((key) => {
            const copied = structuredClone(innerFormData[key]);
            const indexed = structuredClone(copied[index]);
            updateField(key + '.' + index, indexed);
        });
    };

    const requiredFields = React.useMemo(() => {
        const fields: string[] = [];

        // Recursive bir fonksiyon tanımlayın
        const processChildrenRecursively = (children: React.ReactNode) => {
            React.Children.forEach(children, (child) => {
                // Eğer geçerli bir React elementiyse
                if (React.isValidElement(child)) {
                    const childProps = child.props as FieldArrayElement;

                    // Eğer Field bileşeni ve gerekliyse, ismini diziye ekleyin
                    if (child.type === Field && childProps.required) {
                        if (childProps.name != null) {
                            fields.push(childProps.name);
                        }
                    }

                    // Eğer çocukların da kendi içinde çocukları varsa, bu fonksiyonu tekrar çağırın
                    if (childProps.children) {
                        processChildrenRecursively(childProps.children);
                    }
                }
            });
        };

        // Başlangıç noktası olarak children'ı fonksiyona verin
        processChildrenRecursively(children);

        return fields;
    }, [children]);

    const validateAllRequiredFieldsIsFilled = React.useCallback(() => {
        const fieldData = getField(name);
        console.log(fieldData);
        const lastItem =
            fieldData && Array.isArray(fieldData) ? fieldData.length - 1 : null;
        let allFilled: boolean = true;
        requiredFields.forEach((field) => {
            const value = getField(name + '.' + lastItem + '.' + field);

            if (value == null || value === '') {
                allFilled = false;
            }
        });
        return allFilled;
    }, [requiredFields, getField]);

    // Function to process children components
    const processChildren = (
        children: ReactNode,
        fieldName: string,
        isInLoop: boolean,
        index?: number
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
                const isSave = child.type === Save;
                const isManageState =
                    child.props.itemState && child.props.updateItemState;

                // Cloning and modifying element based on its type
                if (isFieldOrPreview) {
                    return React.cloneElement(child as ReactElement, {
                        name: `${fieldName}.${childProps.name}`,
                        saveOnSubmit: saveOnSubmit
                            ? (fieldName: string, value: FormDataValue) =>
                                  innerUpdateField(fieldName, value)
                            : false,
                    });
                } else if (isRemove) {
                    return React.cloneElement(child as ReactElement, {
                        name: `${fieldName}`,
                    });
                } else if (isAdd) {
                    const fieldData = getField(fieldName);
                    if (
                        fieldData &&
                        Array.isArray(fieldData) &&
                        fieldData.length > 0
                    ) {
                        const lastItem = fieldData[fieldData.length - 1];
                        console.log(
                            lastItem,
                            validateAllRequiredFieldsIsFilled(),
                            lastItem && Object.keys(lastItem).length === 0
                        );
                        if (
                            lastItem &&
                            (Object.keys(lastItem).length === 0 ||
                                !validateAllRequiredFieldsIsFilled())
                        ) {
                            return null;
                        }
                    }
                    const index =
                        fieldData && Array.isArray(fieldData)
                            ? fieldData.length
                            : 0;
                    return React.cloneElement(child as ReactElement, {
                        name: `${name}`,
                        itemState: itemStates ? itemStates[index] : null,
                        updateItemState: (newState: any) =>
                            updateItemState
                                ? updateItemState(index, newState)
                                : null,
                    });
                } else if (isSave && index !== undefined) {
                    return React.cloneElement(child as ReactElement, {
                        onClick: () => handleSubmit(index),
                        itemState: itemStates ? itemStates[index] : null,
                        updateItemState: (newState: any) =>
                            updateItemState
                                ? updateItemState(index, newState)
                                : null,
                    });
                } else if (isManageState && index !== undefined) {
                    return React.cloneElement(child as ReactElement, {
                        key: index,
                        itemState: itemStates ? itemStates[index] : null,
                        updateItemState: (newState: any) =>
                            updateItemState
                                ? updateItemState(index, newState)
                                : null,
                        children: processChildren(
                            childProps.children,
                            fieldName,
                            isInLoop,
                            index
                        ),
                    });
                }

                // Recursive processing for nested children
                if (childProps.children) {
                    return React.cloneElement(child, {
                        children: processChildren(
                            childProps.children,
                            fieldName,
                            isInLoop,
                            index
                        ),
                    } as FieldArrayElement);
                }
            }
            return child;
        });
    };

    const renderFormItems = () => {
        return (
            Array.isArray(formData?.[name]) &&
            (formData[name] as []).map((_item, index) => {
                return processChildren(
                    children,
                    `${name}[${index}]`,
                    true,
                    index
                );
            })
        );
    };

    // Rendering the fields
    return (
        <>
            {renderFormItems()}
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

FieldArray.Save = Save;

export default FieldArray;
