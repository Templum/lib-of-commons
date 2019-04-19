export interface ICacheEntry<V> {
    validTill: number;
    value: V;
}

/**
 * Interface for the Cache used by the [[Cache]] Decorator.
 */
export interface ICache<V> {
    /**
     * Put's a value into the cache under the specified key for a specified duration.
     * @param key used for caching
     * @param value that should be cached
     * @param cacheDuration duration how long the data stays valid
     */
    put(key: string, value: V, cacheDuration: number): void;
    /**
     * Obtains the cached value from the cache using the provided key.
     * @param key of the target value
     */
    get(key: string): V;
    /**
     * Will be called prior to getting. It should check if the value is
     * cached and return true if it is cached and still valid.
     * This method can be used for a cleanup routine, as it will be called
     * before performing a get.
     * @param key of the target value
     */
    isCached(key: string): boolean;
}
