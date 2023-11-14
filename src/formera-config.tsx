import React, { ReactNode } from 'react';
import { FormeraConfig } from './react-former/types/FormeraConfig';

const formeraConfig: FormeraConfig = {
    selectStyles: {
        style: {
            control: (base: any) => ({
                ...base,
                background: '#F5F6FA',
                border: '1px solid rgba(174, 195, 214, 0.30)',
                borderRadius: '30px',
                height: '40px',
                fontSize: '12px',
                padding: ' 0 8px',
                boxShadow: 'none',
                '&:hover': {
                    border: '1px solid rgba(174, 195, 214, 0.30)',
                    cursor: 'pointer',
                },
            }),
            menu: (base: any) => ({
                ...base,
                background: '#ffffff',
                border: 'none',
                boxShadow:
                    '3px 3px 10px 3px rgba(205, 214, 243, 0.25), 2px 2px 4px 0px rgba(85, 102, 153, 0.11)',
                borderRadius: '15px',
                padding: '8px',
                fontSize: '12px',
                zIndex: 9999,
            }),
            option: (base: any, state: any) => ({
                ...base,
                borderRadius: '8px',
                backgroundColor: state.isSelected ? '#F5F5F5' : '#ffffff',
                color: '#000000',
                '&:hover': {
                    background: state.isSelected ? '#F5F5F5' : '#F5F5F5',
                    cursor: 'pointer',
                },
                '&:active': {
                    background: '#F5F5F5',
                },

                whiteSpace: 'nowrap',
            }),
            menuList: (base: any) => ({
                ...base,
                maxHeight: '200px',
            }),

            indicatorSeparator: (base: any) => ({
                ...base,
                display: 'none',
            }),
        },
    },
    textStyles: {
        class: 'input border border-4 rounded-3xl py-2 px-3 bg-gray input-bordered w-full rounded-csm max-w-md text-black placeholder:text-gray placeholder:text-xs border-primary text-xs',
        style: {
            background: '#F5F6FA',
        },
    },
    inputWithLabel: (label: string, field: ReactNode) => (
        <div className="flex flex-col">
            <label className="text-sm text-gray-600">{label}</label>
            {field}
        </div>
    ),
};

export default formeraConfig;
