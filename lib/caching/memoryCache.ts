import { ICache, ICacheEntry } from './ICache';

/**
 * Memory based implementation of the [[ICache]] Interface.
 * Using a [[Map]] for holding the data.
 */
export class MemoryCache implements ICache<any> {
    private store: Map<string, ICacheEntry<any>>;

    constructor() {
        this.store = new Map();
    }

    /**
     * Put's a value into the cache under the specified key for a specified duration.
     * @param key used for caching
     * @param value that should be cached
     * @param cacheDuration duration how long the data stays valid.
     */
    public put(key: string, value: any, cacheDuration: number): void {
        const NOW = Date.now();
        const entry = { value, validTill: NOW + cacheDuration };
        this.store.set(key, entry);
    }
    /**
     * Obtains the cached value from the cache using the provided key.
     * @param key of the target value
     */
    public get(key: string): any {
        const entry = this.store.get(key) as ICacheEntry<any>;
        return entry.value;
    }
    /**
     * Will be called prior to getting. It should check if the value is
     * cached and return true if it is cached and still valid.
     * It automatically removes entries that are expired.
     * @param key of the target value
     */
    public isCached(key: string): boolean {
        const NOW = Date.now();
        const cachedAndFresh = this.store.has(key) && NOW < (this.store.get(key) as ICacheEntry<any>).validTill;

        if (!cachedAndFresh) {
            this.store.delete(key);
        }

        return cachedAndFresh;
    }
}
