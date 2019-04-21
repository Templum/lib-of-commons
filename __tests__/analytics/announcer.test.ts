import { AnalyticsAnnouncer, AnnouncementType } from "../../lib";
import { MockMonitor } from "../__mocks__/monitor.mock";

describe('Announcer', () => {
    describe('Contract', () => {
        it('should allow to register an monitor', () => {
            const mockMonitor = new MockMonitor();
            const target = new AnalyticsAnnouncer();

            target.register(mockMonitor);

            expect((target as any).subscribers).toContain(mockMonitor);
        });

        it('should allow to remove a registered monitor', () => {
            const mockMonitor = new MockMonitor();
            const target = new AnalyticsAnnouncer();

            target.register(mockMonitor);
            expect((target as any).subscribers).toContain(mockMonitor);

            target.unregister(mockMonitor);
            expect((target as any).subscribers).not.toContain(mockMonitor);
        });

        it('should drop announcements if there is no subscriber', () => {
            const mockMonitor = new MockMonitor();
            const target = new AnalyticsAnnouncer();

            target.announce({
                key: 'key',
                data: null,
                kind: AnnouncementType.Event,
                timestamp: Date.now(),
            });

            target.register(mockMonitor);
            const record = mockMonitor.getRecord();
            expect(record).toBeNull;

        });

        it('should forward announcements to monitors', () => {
            const mockMonitor = new MockMonitor();
            const target = new AnalyticsAnnouncer();
            target.register(mockMonitor);

            target.announce({
                key: 'key',
                data: null,
                kind: AnnouncementType.Event,
                timestamp: Date.now(),
            });

            const record = mockMonitor.getRecord();

            expect(record.key).toEqual('key');
            expect(record.data).toBeNull;
            expect(record.kind).toEqual(AnnouncementType.Event);
        });
    });
});