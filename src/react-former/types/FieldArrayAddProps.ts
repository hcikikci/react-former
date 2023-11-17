import React from 'react';

export type FieldArrayAddProps = {
    name?: string;
    children: React.ReactNode;
    renderInLoop?: boolean;
    index?: number;
    initialItemState?: any;
    itemState?: any;
    updateItemState?: any;
    grayedOut?: boolean;
};
