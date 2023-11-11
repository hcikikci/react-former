export type FormData = {
    [key: string]: FormDataValue;
};

export type FormDataValue = string | number | boolean | FormData | Array<FormData> | null | undefined;