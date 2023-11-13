import { formeraConfig } from '../config/config';

/**
 * Retrieves the default style for input elements from the configuration.
 * This function looks up the style configuration defined in a JSON file.
 * @returns The default style for inputs if specified in the configuration, otherwise undefined.
 */
export const getDefaultStyle = (
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

    return formeraConfig?.[typeStyles]?.['style'] ?? undefined;
};
