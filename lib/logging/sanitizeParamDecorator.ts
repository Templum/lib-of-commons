export const META_DATA_KEY_PREFIX = 'list_of_parameter_to_sanitize_for'

export interface ISanitizeInfo {
    index: number;
    value: string;
}

export function Sanitize(value: string = '*****'){
    return function (target: any, propertyName: string, index: number) {
        const META_DATA_KEY = `${META_DATA_KEY_PREFIX}_${propertyName}`;
        // Generate a List to hold all parameter to sanitize
        if (!Array.isArray(target[META_DATA_KEY])){
            target[META_DATA_KEY] = [];
        }
    
        target[META_DATA_KEY].push({index: index, value: value} as ISanitizeInfo);
    }
}
