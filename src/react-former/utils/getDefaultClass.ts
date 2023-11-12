import config from '../config/input.json';

/**
 * Retrieves the default class name for input elements from the configuration.
 * This function accesses the configuration defined in a JSON file, specifically
 * looking for a class name to apply to input elements.
 * @returns The default class name for input elements if specified in the configuration, otherwise undefined.
 */
export const getDefaultClass = () => {
    // Checking if 'input' key and 'class' subkey exist in the config
    return config.input && config.input.class;
};
