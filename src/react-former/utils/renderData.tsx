import {ReactNode} from "react";

import {FormDataValue} from "../types/FormData";

export const renderData = (data: FormDataValue): ReactNode => {
    if (data === null || data === undefined) {
        return <span>Veri Yok</span>;
    } else if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
        return <span>{data.toString()}</span>;
    } else if (Array.isArray(data)) {
        return data.map((item, index) => (
            <div key={index}>
                {renderData(item)}
            </div>
        ));
    } else if (typeof data === 'object') {
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
    return <span>Unknown Data Type</span>;
};