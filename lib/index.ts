import { AnalyticsAnnouncer } from './analytics/announcer/analyticsAnnouncer';
import { IAnnouncer, InternalAnnouncer } from './analytics/announcer/IAnnouncer';

export { AnalyticsAnnouncer } from './analytics/announcer/analyticsAnnouncer';
export { Announcement, AnnouncementType } from './analytics/announcer/announcement';
export { Counter } from './analytics/counter';
export { Measure, TimeUnit } from './analytics/measure';
export { IMonitor } from './analytics/monitor/IMonitor';
export { Cache, CacheKey } from './caching/cacheDecorator';
export { ICache, ICacheEntry } from './caching/ICache';
export { Debounce } from './execution/debounceDecorator';
export { AsyncRetry, Retry } from './execution/retryDecorator';
export { Hide } from './logging/hideParamDecorator';
export { IToolboxLogger } from './logging/IToolboxLogger';
export { Level, Log } from './logging/logDecorator';
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
