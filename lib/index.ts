import { AnalyticsAnnouncer, IAnnouncer } from "./analytics/announcer/analyticsAnnouncer";

export { IAnnouncer, IAnnouncerInternal, IMonitor } from "./analytics/announcer/analyticsAnnouncer";
export { ICache, ICacheEntry } from "./caching/cache";
export { Cache, CacheKey } from "./caching/cacheDecorator";
export { Hide } from "./logging/hideParamDecorator";
export { IToolboxLogger, Level, Log } from "./logging/logDecorator";
export { AsyncRetry, Retry } from "./retrying/retryDecorator";

class LibOfCommons {
    private announcerInstance: IAnnouncer | undefined;

    constructor() { }

    public getAnnouncerInstance(): IAnnouncer {
        if (!this.announcerInstance) {
            this.announcerInstance = new AnalyticsAnnouncer();
        }
        return this.announcerInstance;
    }
}

export const libOfCommons = new LibOfCommons();
