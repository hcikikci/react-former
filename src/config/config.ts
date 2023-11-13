import { FormeraConfig } from '../types/FormeraConfig';

export let formeraConfig: FormeraConfig = {};

export function setFormeraConfig(newConfig: FormeraConfig) {
    formeraConfig = { ...formeraConfig, ...newConfig };
}

export function initializeFormera(userConfig: FormeraConfig) {
    setFormeraConfig(userConfig);
}
