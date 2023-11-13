import config from '../config/input.json';

/**
 * Retrieves the default style for input elements from the configuration.
 * This function looks up the style configuration defined in a JSON file.
 * @returns The default style for inputs if specified in the configuration, otherwise undefined.
 */
export const getDefaultStyle = () => {
    // Checking if the 'input' key and 'style' subkey exist in the config
    return config.input && config.input.style;
};
