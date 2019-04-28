import 'reflect-metadata';
import { PREFIX } from '../shared/const';
import { getMetaDataKey } from '../shared/helper';
import { IValidation } from './IValidation';

/**
 * IsOneOf checks if the marked parameter is included in the provided whitelist.
 * @param whitelist containing allowed values
 */
export function isOneOf(whitelist: any[]) {
    const getKey = getMetaDataKey(PREFIX.Validation);
    return (target: any, propertyName: string, index: number) => {
        const META_DATA_KEY = getKey(propertyName);
        const listOfValidations: IValidation[] = Reflect.getOwnMetadata(META_DATA_KEY, target, propertyName) || [];

        const validator = (param: number) => {
            if (whitelist.includes(param)) {
                return true;
            } else {
                throw new Error(`${propertyName}: Parameter ${index} was not in whitelist`);
            }
        };
        listOfValidations.push({ index, validate: validator });

        Reflect.defineMetadata(META_DATA_KEY, listOfValidations, target, propertyName);
    };
}
