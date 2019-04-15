import { TimeUnit } from "../../lib";
import { transformTo } from "../../lib/shared/transformer";

describe.only('transformTo', () => {
    describe('Nanoseconds => Nanoseconds', () => {
        test('1 Nanoseconds should be 1 Nanoseconds', () => {
            const transFromToNanoseconds = transformTo(TimeUnit.Nanosecond);
            expect(transFromToNanoseconds([0, 1])).toEqual(1);
        });

        test('1 Second should be 1e+9 Nanoseconds', () => {
            const transFromToNanoseconds = transformTo(TimeUnit.Nanosecond);
            expect(transFromToNanoseconds([1, 0])).toEqual(1e+9);
        });
    });

    describe('Nanoseconds => Millisecond', () => {
        test('1000000 Nanoseconds should be 1 Millisecond', () => {
            const transFromToMillisecond = transformTo(TimeUnit.Millisecond);
            expect(transFromToMillisecond([0, 1000000])).toEqual(1);
        });

        test('1 Second should be 1 Millisecond', () => {
            const transFromToMillisecond = transformTo(TimeUnit.Millisecond);
            expect(transFromToMillisecond([1, 0])).toEqual(1000);
        });
    });

    describe('Nanoseconds => Second', () => {
        test('1e+9 Nanoseconds should be 1 Second', () => {
            const transFromToSecond = transformTo(TimeUnit.Second);
            expect(transFromToSecond([0, 1e+9])).toEqual(1);
        });

        test('1 Second should be 1 Second', () => {
            const transFromToSecond = transformTo(TimeUnit.Second);
            expect(transFromToSecond([1, 0])).toEqual(1);
        });
    });

    describe('Nanoseconds => Minute', () => {
        test('6e+10Nanoseconds should be 1 Minute', () => {
            const transformToMinute = transformTo(TimeUnit.Minute);
            expect(transformToMinute([0, 6e+10])).toEqual(1);
        });

        test('60 Second should be 1 Minute', () => {
            const transformToMinute = transformTo(TimeUnit.Minute);
            expect(transformToMinute([60, 0])).toEqual(1);
        });
    });
});