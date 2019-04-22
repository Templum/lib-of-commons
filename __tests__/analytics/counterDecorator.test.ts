import { Counter, libOfCommons } from "../../lib";
import { AnnouncementType } from "../../lib/analytics/announcer/announcement";
import { MockMonitor } from "../__mocks__/monitor.mock";

describe('Counter Decorator', () => {
    describe('Contract', () => {
        it('should increment the counter', () => {
            const mock: MockMonitor = new MockMonitor();
            const announcer = libOfCommons.getAnnouncerInstance();
            announcer.register(mock);

            class Example {

                @Counter('')
                static registerUser(username: string, email: string): boolean {
                    return true;
                }
            }

            for (let i = 0; i < 10; i++) {
                Example.registerUser('sample_user', 'sample@user.com');
                const announcement = mock.getRecord();
                expect(announcement.key).toEqual('registerUser');
                expect(announcement.kind).toEqual(AnnouncementType.Metric);
                expect(typeof announcement.timestamp).toBe('number');
                expect(announcement.data).toEqual(i + 1);
            }




            announcer.unregister(mock);
        });


        it('should increment the counter even if the function throws an error', () => {
            const mock: MockMonitor = new MockMonitor();
            const announcer = libOfCommons.getAnnouncerInstance();
            announcer.register(mock);

            class Example {

                @Counter('Registered_User')
                static registerUser(username: string, email: string): boolean {
                    throw new Error('System Error');
                }
            }


            try {
                Example.registerUser('sample_user', 'sample@user.com');
            } catch (error) {
                expect(error).toBeDefined();
                const announcement = mock.getRecord();
                expect(announcement.key).toEqual('Registered_User');
                expect(announcement.kind).toEqual(AnnouncementType.Metric);
                expect(typeof announcement.timestamp).toBe('number');
                expect(announcement.data).toEqual(1);
            }

            announcer.unregister(mock);
        });
    });

    describe('Special Cases', () => {

    });
});