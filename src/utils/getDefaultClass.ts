import { formeraConfig } from '../config/config';

/**
 * Retrieves the default class name for input elements from the configuration.
 * This function accesses the configuration defined in a JSON file, specifically
 * looking for a class name to apply to input elements.
 * @returns The default class name for input elements if specified in the configuration, otherwise undefined.
 */
export const getDefaultClass = (
    type:
        | 'select'
        | 'text'
        | 'checkbox'
        | 'radio'
        | 'number'
        | 'password'
        | 'date'
        | 'email'
        | 'file'
        | 'color'
        | 'range'
) => {
    const typeStyles = (type + 'Styles') as
        | 'selectStyles'
        | 'textStyles'
        | 'checkboxStyles'
        | 'radioStyles'
        | 'numberStyles'
        | 'passwordStyles'
        | 'dateStyles'
        | 'emailStyles'
        | 'fileStyles'
        | 'colorStyles'
        | 'rangeStyles';
    return formeraConfig?.[typeStyles]?.['class'] ?? undefined;
};
