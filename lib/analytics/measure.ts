import { libOfCommons } from '..';
import { isPromise } from '../shared/helper';
import { transformTo } from '../shared/transformer';
import { AnnouncementType } from './announcer/announcement';
import { InternalAnnouncer } from './announcer/IAnnouncer';

/**
 * The set of currently supported Time Units.
 * Used by the [[Measure]] Decorator.
 *
 * - Nanosecond
 * - Millisecond
 * - Second
 * - Minute
 */
export enum TimeUnit {
    Nanosecond,
    Millisecond,
    Second,
    Minute,
}

function prepareEmitMeasurement({ targetUnit, key }: { targetUnit: TimeUnit, key: string }) {
    const transformToTargetUnit = transformTo(targetUnit);
    const announcer = libOfCommons.getAnnouncerInstance() as InternalAnnouncer;
    return (startTime: [number, number]) => {
        const executionTime = process.hrtime(startTime);
        const timeInTargetUnit = transformToTargetUnit(executionTime);
        announcer.announce({
            data: timeInTargetUnit,
            key,
            kind: AnnouncementType.Time,
            timestamp: Date.now(),
        });
    };
}

async function handlePromise(
    unresolvedResult: Promise<any>,
    startTime: [number, number],
    emitMeasurement: (startTime: [number, number]) => void): Promise<any> {
    try {
        const resolvedResult = await unresolvedResult;
        emitMeasurement(startTime);
        return resolvedResult;
    } catch (error) {
        emitMeasurement(startTime);
        return error;
    }
}

/**
 * Measure Decorator which leverages [[process.hrtime()]] to measure the execution time of decorated methods.
 * Using a [[IMonitor]] the measurements can be obtained and processed.
 * @param unit The [[TimeUnit]] used for the execution time measurement.
 * @param metricKey The Name used for the [[Announcement]]. Will default to the method name.
 */
export function Measure(unit: TimeUnit, metricKey?: string) {
    return function (
        _: any,
        propertyName: string,
        propertyDesciptor: PropertyDescriptor): PropertyDescriptor {

        const method = propertyDesciptor.value;
        const key = metricKey || propertyName;
        const emitMeasurement = prepareEmitMeasurement({ key, targetUnit: unit });

        propertyDesciptor.value = function (...args: any[]) {
            const startTime = process.hrtime();
            try {
                const result = method.apply(this, args);

                if (!isPromise(result)) {
                    emitMeasurement(startTime);
                    return result;
                }

                return handlePromise(result, startTime, emitMeasurement);
            } catch (error) {
                emitMeasurement(startTime);
                throw error;
            }
        };
        return propertyDesciptor;
    };
}
