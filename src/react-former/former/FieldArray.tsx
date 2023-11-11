import React, {ReactElement, ReactNode} from 'react';

import {FormContext} from "./Former";
import Field from "./Field";
import {renderData} from "../utils/renderData";

import {FieldArrayProps} from "../types/FieldArrayProps";
import {FieldArrayElement} from "../types/FieldArrayElement";
import {FieldArrayAddProps} from "../types/FieldArrayAddProps";
import {FieldArrayRemoveProps} from "../types/FieldArrayRemoveProps";

const FieldArray = ({name, children}: FieldArrayProps) => {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error("FieldArray must be used within the Former component");
    }
    const {formData} = context;

    const processChildren = (children: ReactNode, fieldName: string, isInLoop: boolean): ReactNode => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                const childProps = child.props as FieldArrayElement;

                // Koşullu render işlemlerini optimize et
                if ((childProps.renderInLoop === false && isInLoop) || (childProps.renderInLoop !== false && !isInLoop)) {
                    return null;
                }

                // Tip kontrolünü optimize et
                const isFieldOrPreview = child.type === Field || child.type === Preview;
                const isRemove = child.type === Remove;
                const isAdd = child.type === Add;

                if (isFieldOrPreview) {
                    return React.cloneElement(child as ReactElement, {name: `${fieldName}.${childProps.name}`});
                } else if (isRemove) {
                    return React.cloneElement(child as ReactElement, {name: `${fieldName}`});
                } else if (isAdd) {
                    return React.cloneElement(child as ReactElement, {name: `${name}`});
                }

                // Yinelemeli işlemleri optimize et
                if (childProps.children) {
                    return React.cloneElement(child, {
                        children: processChildren(childProps.children, fieldName, isInLoop),
                    } as FieldArrayElement);
                }
            }
            return child;
        });
    };

    return (
        <>
            {Array.isArray(formData?.[name]) && (formData[name] as []).map((item: any, index: number) => {
                return processChildren(children, `${name}[${index}]`, true);
            })}
            {processChildren(children, name, false)}
        </>
    );
};

const Add = ({name = "", children}: FieldArrayAddProps) => {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error("FieldArray must be used within the Former component");
    }
    const {createField, getField} = context;
    const handleCreateField = (name: string) => {
        const fields = getField(name);
        if (!Array.isArray(fields)) return;
        const firstNullIndex = fields.findIndex(item => item == null || Object.keys(item).length === 0);

        if (firstNullIndex !== -1) {
            createField(name + "[" + firstNullIndex + "]", {});
            return;
        } else {
            createField(name + "[" + fields.length + "]", {});
            return;
        }
    }
    return (
        <div onClick={() => handleCreateField(name)}>
            {children}
        </div>
    );
}

FieldArray.Add = Add;

const Remove = ({name = "", children}: FieldArrayRemoveProps) => {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error("FieldArray must be used within the Former component");
    }
    const {deleteField} = context;
    const handleDeleteField = (name: string) => {
        deleteField(name);
    }
    return (
        <div onClick={() => handleDeleteField(name)}>
            {children}
        </div>
    );
}

FieldArray.Remove = Remove;

const Preview = ({name}: { name: string }) => {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error("FieldArray must be used within the Former component");
    }
    const {getField} = context;
    const data = getField(name);

    return (
        <div>
            {renderData(data)}
        </div>
    );
}

FieldArray.Preview = Preview;
export default FieldArray;