import { IMonitor } from "../../lib";
import { Announcement } from "../../lib/analytics/announcer/announcement";


export class MockMonitor implements IMonitor<any> {
    private records: Announcement<any>[];

    constructor() {
        this.records = [];
    }


    getIdentifier(): string {
        return 'MockMonitor';
    }

    handleAnnouncement(announcement: Announcement<any>): void {
        this.records.push(announcement);
    }

    getRecord(): Announcement<any> {
        return this.records.splice(0, 1)[0];
    }
}