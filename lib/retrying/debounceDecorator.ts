export function Debounce(time: number) {
    let nextCall = 0;
    return function (
        _: any,
        __: string,
        propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
        const method = propertyDesciptor.value;

        if (time <= 0) {
            return propertyDesciptor;
        }

        propertyDesciptor.value = function (...args: any[]) {
            if (Date.now() > nextCall) {
                nextCall = Date.now() + time;
                return method.apply(this, args);
            }
            return;
        };
        return propertyDesciptor;
    };
}
