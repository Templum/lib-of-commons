import { libOfCommons } from '..';
import { AnnouncementType } from './announcer/announcement';
import { InternalAnnouncer } from './announcer/IAnnouncer';

function emitMeasurement(key: string, counter: number) {
    const announcer = libOfCommons.getAnnouncerInstance() as InternalAnnouncer;

    announcer.announce({
        data: counter,
        key,
        kind: AnnouncementType.Metric,
        timestamp: Date.now(),
    });
}

/**
 * Counter Decorator which will increase a counter everytime the function was called.
 * Using a [[IMonitor]] the counter changing can be observed and processed.
 * @param metricKey The Name used for the [[Announcement]]. Will default to the method name.
 */
export function Counter(metricKey?: string) {
    let counter = 0;
    return function (
        _: any,
        propertyName: string,
        propertyDesciptor: PropertyDescriptor): PropertyDescriptor {

        const method = propertyDesciptor.value;
        const key = metricKey || propertyName;

        propertyDesciptor.value = function (...args: any[]) {
            emitMeasurement(key, ++counter);
            return method.apply(this, args);
        };
        return propertyDesciptor;
    };
}
