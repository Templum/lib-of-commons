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
