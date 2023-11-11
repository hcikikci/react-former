import {FormData, FormDataValue} from "./FormData";

export interface FormerProps {
    children: React.ReactNode;
    onChange?: (name: string, value: FormDataValue) => void;
    onSubmit: (data: FormData ) => void;
    initialData?: FormData;
    isInitialDataLoading?: boolean;
    className?: string;
}
