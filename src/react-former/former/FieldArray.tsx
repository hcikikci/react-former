import React, {ReactNode} from 'react';
import {FormContext} from "./Former";
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
                const childType = child.type as any;

                if ((childProps.renderInLoop === false && isInLoop) || (childProps.renderInLoop !== false && !isInLoop)) {
                    return null;
                }

                if (childType.name === "Field" || childType.name === "Preview") {
                    return React.cloneElement(child as React.ReactElement<any>, {name: `${fieldName}.${childProps.name}`});
                } else if (childType.name === "Remove") {
                    return React.cloneElement(child as React.ReactElement<any>, {name: `${fieldName}`});
                } else if (childType.name === "Add") {
                    return React.cloneElement(child as React.ReactElement<any>, {name: `${name}`});
                }

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

const Add = ({name="", children}: FieldArrayAddProps) => {
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

const Remove = ({name="", children}: FieldArrayRemoveProps) => {
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
            {data}
        </div>
    );
}

FieldArray.Preview = Preview;
export default FieldArray;