import { libOfCommons } from "../../lib";
import { AnnouncementType } from "../../lib/analytics/announcer/announcement";
import { Measure, TimeUnit } from "../../lib/analytics/measure";
import { MockMonitor } from "../__mocks__/monitor.mock";

describe('Measure Decorator', () => {
    describe('Contract', () => {
        it('should measure the execution time of a function in the defined time unit', () => {
            const mock: MockMonitor = new MockMonitor();
            const announcer = libOfCommons.getAnnouncerInstance();
            announcer.register(mock);

            class Example {

                @Measure(TimeUnit.Nanosecond)
                static compute(times: number): number {
                    for (let i = 0; i < times; i++) {
                        const temp = i * i;
                    }
                    return 1337;
                }
            }

            Example.compute(100000);

            const announcement = mock.getRecord();
            expect(announcement.key).toEqual('compute');
            expect(announcement.kind).toEqual(AnnouncementType.Time);
            expect(typeof announcement.timestamp).toBe('number');
            expect(announcement.data).toBeGreaterThanOrEqual(100000); // Assuming that each Loop takes a minimum of 1 ns

            announcer.unregister(mock);
        });

        it('should measure the execution time of a async function in the defined time unit', async () => {
            const mock: MockMonitor = new MockMonitor();
            const announcer = libOfCommons.getAnnouncerInstance();
            announcer.register(mock);

            class Example {

                @Measure(TimeUnit.Second)
                static async compute(time: number): Promise<number> {
                    return await new Promise(resolve => setTimeout(resolve, time));
                }
            }

            await Example.compute(2000);

            const announcement = mock.getRecord();
            expect(announcement.key).toEqual('compute');
            expect(announcement.kind).toEqual(AnnouncementType.Time);
            expect(typeof announcement.timestamp).toBe('number');
            expect(announcement.data).toEqual(2);

            announcer.unregister(mock);
        });

        it('should measure the execution time even if the function throws an error', async () => {
            const mock: MockMonitor = new MockMonitor();
            const announcer = libOfCommons.getAnnouncerInstance();
            announcer.register(mock);

            class Example {

                @Measure(TimeUnit.Nanosecond)
                static async compute(time: number): Promise<number> {
                    throw new Error('Expected');
                }

                @Measure(TimeUnit.Nanosecond)
                static syncCompute(time: number): number {
                    throw new Error('Expected');
                }
            }

            try {
                await Example.compute(2000);
            } catch (error) {
                expect(error).toBeDefined();
                const announcement = mock.getRecord();
                expect(announcement.key).toEqual('compute');
                expect(announcement.kind).toEqual(AnnouncementType.Time);
                expect(typeof announcement.timestamp).toBe('number');
                expect(announcement.data).toBeGreaterThan(0);
            }

            try {
                Example.syncCompute(2000);
            } catch (error) {
                expect(error).toBeDefined();
                const announcement = mock.getRecord();
                expect(announcement.key).toEqual('compute');
                expect(announcement.kind).toEqual(AnnouncementType.Time);
                expect(typeof announcement.timestamp).toBe('number');
                expect(announcement.data).toBeGreaterThan(0);
            }

            announcer.unregister(mock);
        });
    });

    describe('Special Cases', () => {

    });
});