import 'reflect-metadata';
import { PREFIX } from '../shared/const';
import { getMetaDataKey } from '../shared/helper';
import { IValidation } from './IValidation';

/**
 * IsSmaller Decorator will check if the marked parameter is smaller then the provided value.
 * It will throw an error if the value is greater or equal.
 * @param value target value
 */
export function isSmaller(value: number) {
    const getKey = getMetaDataKey(PREFIX.Validation);
    return (target: any, propertyName: string, index: number) => {
        const META_DATA_KEY = getKey(propertyName);
        const listOfValidations: IValidation[] = Reflect.getOwnMetadata(META_DATA_KEY, target, propertyName) || [];

        const validator = (param: number) => param < value;
        // tslint:disable-next-line: max-line-length
        listOfValidations.push({ index, validate: validator, message: `${propertyName}: Parameter ${index} was not smaller then ${value}` });

        Reflect.defineMetadata(META_DATA_KEY, listOfValidations, target, propertyName);
    };
}
