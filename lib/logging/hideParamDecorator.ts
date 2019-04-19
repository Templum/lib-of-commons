import 'reflect-metadata';
import { PREFIX } from '../shared/const';
import { getMetaDataKey } from '../shared/helper';

/**
 * Information about the prameter that should be hidden.
 */
export interface ISanitizeInfo {
    /**
     * Index of the parameter in the args array.
     */
    index: number;
    /**
     * Value with which it should be displayed.
     */
    value: string;
}

export function Hide(value: string = '*****') {
    const getKey = getMetaDataKey(PREFIX.Hide);
    return (target: any, propertyName: string, index: number) => {
        const META_DATA_KEY = getKey(propertyName);
        const listOfParameterToHide: ISanitizeInfo[] = Reflect.getOwnMetadata(META_DATA_KEY, target, propertyName) || [];

        listOfParameterToHide.push({ index, value });

        Reflect.defineMetadata(META_DATA_KEY, listOfParameterToHide, target, propertyName);
    };
}
