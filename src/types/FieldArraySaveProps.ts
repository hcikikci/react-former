import React from 'react';

export type FieldArraySaveProps = {
    children: React.ReactNode;
    renderInLoop?: boolean;
    onClick?: () => void;
    setItemStateAfterSave?: any;
    updateItemState?: any;
};
