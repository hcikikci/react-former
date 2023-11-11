import {FormData, FormDataValue} from "./FormData";
import {FormErrors} from "./FormErrors";

export interface FormerProps {
    children: React.ReactNode;
    onChange?: (name: string, value: FormDataValue) => void;
    onSubmit: (data: FormData ) => void;
    initialData?: FormData | Promise<any>;
    className?: string;
    validate?: (data: FormData) => FormErrors;
}
