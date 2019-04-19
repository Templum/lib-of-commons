import 'reflect-metadata';
import { PREFIX } from '../shared/const';
import { getMetaDataKey } from '../shared/helper';
import { IValidation } from './IValidation';

export function isInteger() {
    const getKey = getMetaDataKey(PREFIX.Validation);
    return (target: any, propertyName: string, index: number) => {
        const META_DATA_KEY = getKey(propertyName);
        const listOfValidations: IValidation[] = Reflect.getOwnMetadata(META_DATA_KEY, target, propertyName) || [];

        const validator = (param: number) => Number.isInteger(param);
        // tslint:disable-next-line: max-line-length
        listOfValidations.push({ index, validate: validator, message: `${propertyName}: Parameter ${index} was not an Integer` });

        Reflect.defineMetadata(META_DATA_KEY, listOfValidations, target, propertyName);
    };
}
