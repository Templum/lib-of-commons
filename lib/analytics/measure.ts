import { libOfCommons } from "..";
import { isPromise } from "../shared/helper";
import { transformTo } from "../shared/transformer";
import { AnnouncementType, IAnnouncerInternal } from "./announcer/analyticsAnnouncer";

export enum TimeUnit {
    Nanosecond,
    Millisecond,
    Second,
    Minute,
}

function prepareEmitMeasurement(
    targetUnit: TimeUnit,
    key: string,
    announcer: IAnnouncerInternal): (startTime: [number, number]) => void {
    const transformToTargetUnit = transformTo(targetUnit);

    return function (startTime: [number, number]): void {
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

export function Measure(unit: TimeUnit, metricKey?: string) {
    return function (
        target: any,
        propertyName: string,
        propertyDesciptor: PropertyDescriptor): PropertyDescriptor {

        const method = propertyDesciptor.value;
        const key = metricKey || propertyName;
        const emitMeasurement = prepareEmitMeasurement(unit, key, libOfCommons.getAnnouncerInstance() as IAnnouncerInternal);

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
