import { PREFIX } from '../shared/const';
import { getMetaDataKey } from '../shared/helper';
import { IValidation } from './IValidation';

/**
 * Validate Decorator is used together with other Validation Decorators
 * and will check the provided input parameters.
 * Supported Decorator:
 * - [[isGreater]]
 * - [[isGreaterOrEqual]]
 * - [[isSmaller]]
 * - [[isSmallerOrEqual]]
 * - [[isOneOf]]
 * - [[isInteger]]
 */
export function Validate() {
    const getKey = getMetaDataKey(PREFIX.Validation);
    return function (
        target: any,
        propertyName: string,
        propertyDesciptor: PropertyDescriptor): PropertyDescriptor {

        const method = propertyDesciptor.value;
        propertyDesciptor.value = function (...args: any[]) {
            const META_DATA_KEY = getKey(propertyName);
            const listOfParameterToValidate: IValidation[] = Reflect.getOwnMetadata(META_DATA_KEY, target, propertyName) || [];

            listOfParameterToValidate.filter((current) => {
                return current.validate(args[current.index]);
            });

            // Perform the actuall invocation
            return method.apply(this, args);
        };
        return propertyDesciptor;
    };
}
