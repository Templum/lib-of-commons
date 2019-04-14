export interface ICacheEntry<V> {
    validTill: number;
    value: V;
}

export interface ICache<V> {
    put(key: string, value: V, cacheDuration?: number): void;
    get(key: string): V;
    isCached(key: string): boolean;
}

export class MemoryCache implements ICache<any> {
    private store: Map<string, ICacheEntry<any>>;

    constructor() {
        this.store = new Map();
    }

    public put(key: string, value: any, cacheDuration: number): void {
        const NOW = Date.now();
        const entry = { value, validTill: NOW + cacheDuration };
        this.store.set(key, entry);
    }
    public get(key: string): any {
        const entry = this.store.get(key) as ICacheEntry<any>;
        return entry.value;
    }
    public isCached(key: string): boolean {
        const NOW = Date.now();
        const cachedAndFresh = this.store.has(key) && NOW < (this.store.get(key) as ICacheEntry<any>).validTill;

        if (!cachedAndFresh) {
            this.store.delete(key);
        }

        return cachedAndFresh;
    }
}
