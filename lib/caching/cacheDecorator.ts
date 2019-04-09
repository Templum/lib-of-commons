import { ICache, MemoryCache } from "./cache";

const META_DATA_KEY_PREFIX = 'cache_key_for';
const ONE_MINUTE = 60 * 1000;

export function CacheKey(target: any, propertyName: string, index: number) {
    const META_DATA_KEY = `${META_DATA_KEY_PREFIX}_${propertyName}`;
    // Generate a List to hold all parameter that are relevant for they hashing
    if (!Array.isArray(target[META_DATA_KEY])) {
        target[META_DATA_KEY] = [];
    }

    target[META_DATA_KEY].push(index);
}

export function Cache(cacheDuration: number = ONE_MINUTE, cache: ICache<any> = new MemoryCache()) {
    return function (
        target: any,
        propertyName: string,
        propertyDesciptor: PropertyDescriptor): PropertyDescriptor {

        const method = propertyDesciptor.value;
        propertyDesciptor.value = function (...args: any[]) {
            const META_DATA_KEY = `${META_DATA_KEY_PREFIX}_${propertyName}`;
            const keyIndexes: number[] = target[META_DATA_KEY] || [];

            let hashKey = '';
            if (keyIndexes.length > 0) {
                const key = args.filter((_, i) => keyIndexes.includes(i))
                    .map((a) => JSON.stringify(a)).join();
                hashKey = hashCode(key);
            } else {
                const key = args.map((a) => JSON.stringify(a)).join();
                hashKey = hashCode(key);
            }

            if (cache.isCached(hashKey)) {
                return cache.get(hashKey);
            }

            const result = method.apply(this, args);
            cache.put(hashKey, result, cacheDuration);
            return result;
        };
        return propertyDesciptor;
    };
}

function hashCode(str: string): string {
    let hash = 0;
    if (str.length === 0) { return hash.toString(); }

    for (let i = 0, len = str.length; i < len; i++) {
        const chr = str.charCodeAt(i);
        // tslint:disable-next-line: no-bitwise
        hash = ((hash << 5) - hash) + chr;
        // tslint:disable-next-line: no-bitwise
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
}
