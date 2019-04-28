import { AnalyticsAnnouncer } from './analytics/announcer/analyticsAnnouncer';
import { IAnnouncer, InternalAnnouncer } from './analytics/announcer/IAnnouncer';

// tslint:disable-next-line: max-line-length
export { AnalyticsAnnouncer } from './analytics/announcer/analyticsAnnouncer';
export { Announcement, AnnouncementType } from './analytics/announcer/announcement';
export { Counter } from './analytics/counter';
export { IMonitor } from './analytics/IMonitor';
export { Measure, TimeUnit } from './analytics/measure';
export { Cache, CacheKey } from './caching/cacheDecorator';
export { ICache, ICacheEntry } from './caching/ICache';
export { Hide } from './logging/hideParamDecorator';
export { IToolboxLogger } from './logging/IToolboxLogger';
export { Level, Log } from './logging/logDecorator';
export { Debounce } from './retrying/debounceDecorator';
export { AsyncRetry, Retry } from './retrying/retryDecorator';
export { isGreater } from './validation/isGreater';
export { IsGreaterOrEqual } from './validation/isGreaterOrEqual';
export { isInteger } from './validation/isInteger';
export { isOneOf } from './validation/isOneOf';
export { isSmaller } from './validation/isSmaller';
export { IsSmallerOrEqual } from './validation/isSmallerOrEqual';
export { Validate } from './validation/validate';

class LibOfCommons {
    private announcerInstance: InternalAnnouncer | undefined;

    public getAnnouncerInstance(): IAnnouncer {
        if (!this.announcerInstance) {
            this.announcerInstance = new AnalyticsAnnouncer();
        }
        return this.announcerInstance;
    }
}

export const libOfCommons = new LibOfCommons();
