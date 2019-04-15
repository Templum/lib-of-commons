import { AnalyticsAnnouncer, IAnnouncer } from "./analytics/announcer/analyticsAnnouncer";

// tslint:disable-next-line: max-line-length
export { Announcement, AnnouncementType, IAnnouncer, IAnnouncerInternal, IMonitor } from "./analytics/announcer/analyticsAnnouncer";
export { Measure, TimeUnit } from "./analytics/measure";
export { ICache, ICacheEntry } from "./caching/cache";
export { Cache, CacheKey } from "./caching/cacheDecorator";
export { Hide } from "./logging/hideParamDecorator";
export { IToolboxLogger, Level, Log } from "./logging/logDecorator";
export { AsyncRetry, Retry } from "./retrying/retryDecorator";

class LibOfCommons {
    private announcerInstance: IAnnouncer | undefined;

    public getAnnouncerInstance(): IAnnouncer {
        if (!this.announcerInstance) {
            this.announcerInstance = new AnalyticsAnnouncer();
        }
        return this.announcerInstance;
    }
}

export const libOfCommons = new LibOfCommons();
