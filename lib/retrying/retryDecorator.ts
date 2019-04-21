/**
 * Async Retry Decorator will automatically retry the invocation up to the specified amount of retries.
 * It is setup to work with methods that return Promises or leverage the async keyword.
 * @param isRetrieable function to determine if the received error is retriable
 * @param times amount of retries, defaults to 3
 */
export function AsyncRetry(isRetrieable: (error: Error) => boolean, times: number = 3) {
    if (times <= 0) { throw new Error('Times need to be at least 1'); }
    return function (
        target: any,
        propertyName: string,
        propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
        const method = propertyDesciptor.value;

        propertyDesciptor.value = async function (...args: any[]) {
            for (let attempt = 0; attempt < times; attempt++) {
                try {
                    return await method.apply(this, args);
                } catch (error) {
                    if (!isRetrieable(error) || attempt + 1 >= times) { throw error; }
                }
            }
        };
        return propertyDesciptor;
    };
}

/**
 * Retry Decorator will automatically retry the invocation up to the specified amount of retries.
 * It is setup to work with methods that are executed synchronous.
 * @param isRetrieable function to determine if the received error is retriable
 * @param times amount of retries, defaults to 3
 */
export function Retry(isRetrieable: (error: Error) => boolean, times: number = 3) {
    if (times <= 0) { throw new Error('Times need to be at least 1'); }
    return function (
        target: any,
        propertyName: string,
        propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
        const method = propertyDesciptor.value;

        propertyDesciptor.value = function (...args: any[]) {
            for (let attempt = 0; attempt < times; attempt++) {
                try {
                    return method.apply(this, args);
                } catch (error) {
                    if (!isRetrieable(error) || attempt + 1 >= times) { throw error; }
                }
            }
        };
        return propertyDesciptor;
    };
}
