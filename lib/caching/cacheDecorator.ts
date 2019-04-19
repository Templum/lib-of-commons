import 'reflect-metadata';
import { PREFIX } from '../shared/const';
import { getMetaDataKey } from '../shared/helper';
import { ICache } from './ICache';
import { MemoryCache } from './memoryCache';

const ONE_MINUTE = 60 * 1000;
const getKey = getMetaDataKey(PREFIX.CacheKey);

/**
 * CacheKey Decorator allows to select certain parameters as cache keys.
 * This improves the caching quality and also the performance.
 */
export function CacheKey(target: any, propertyName: string, index: number) {
    const META_DATA_KEY = getKey(propertyName);
    const listOfCacheKeys: number[] = Reflect.getOwnMetadata(META_DATA_KEY, target, propertyName) || [];

    listOfCacheKeys.push(index);

    Reflect.defineMetadata(META_DATA_KEY, listOfCacheKeys, target, propertyName);
}

/**
 * Cache Decorator which stores the method result in the provided [[ICache]] for the specified Time.
 * It leverages either all input parameters or only the with [[CacheKey]] specified parameters as cache keys.
 * By calculating an simple hashcode. It is adviced to avoid objects as cache keys. Because they might have
 * an negative impact on the performance and further could lead to unwanted caching behaviours.
 * @param cacheDuration in Milliseconds, defaults to 1 Minute
 * @param cache to use, defaults to [[MemoryCache]]
 */
export function Cache(cacheDuration: number = ONE_MINUTE, cache: ICache<any> = new MemoryCache()) {
    return function (
        target: any,
        propertyName: string,
        propertyDesciptor: PropertyDescriptor): PropertyDescriptor {

        const method = propertyDesciptor.value;
        propertyDesciptor.value = function (...args: any[]) {
            const META_DATA_KEY = getKey(propertyName);
            const listOfCacheKeys: number[] = Reflect.getOwnMetadata(META_DATA_KEY, target, propertyName) || [];

            let hashKey = '';
            if (listOfCacheKeys.length > 0) {
                const key = args.filter((_, i) => listOfCacheKeys.includes(i))
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
