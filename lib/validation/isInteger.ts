import 'reflect-metadata';
import { PREFIX } from '../shared/const';
import { getMetaDataKey } from '../shared/helper';
import { IValidation } from './IValidation';

/**
 * It will check if the marked parameter is an Integer. It leverages
 * the Number.isInteger method to perform the validation.
 */
export function isInteger() {
    const getKey = getMetaDataKey(PREFIX.Validation);
    return (target: any, propertyName: string, index: number) => {
        const META_DATA_KEY = getKey(propertyName);
        const listOfValidations: IValidation[] = Reflect.getOwnMetadata(META_DATA_KEY, target, propertyName) || [];

        const validator = (param: number) => {
            if (Number.isInteger(param)) {
                return true;
            } else {
                throw new Error(`${propertyName}: Parameter ${index} was not an Integer`);
            }
        };
        listOfValidations.push({ index, validate: validator });

        Reflect.defineMetadata(META_DATA_KEY, listOfValidations, target, propertyName);
    };
}
