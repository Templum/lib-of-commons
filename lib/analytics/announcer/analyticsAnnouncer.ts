import { EventEmitter } from "events";

const ANALYTICS = Symbol('Analytics');

// tslint:disable-next-line: interface-name
export interface Announcement<Data> {
    key: string;
    kind: AnnouncementType;
    data: Data;
    timestamp: number;
}

export enum AnnouncementType {
    Time = 'executionTime',
    Metric = 'metric',
    Event = 'event',
}

export interface IMonitor<Data> {
    getIdentifier(): string;
    handleAnnouncement(announcement: Announcement<Data>): void;
}

export interface IAnnouncer {
    register(monitor: IMonitor<any>): void;
    unregister(monitor: IMonitor<any>): void;
}

export interface IAnnouncerInternal extends IAnnouncer {
    announce(data: Announcement<any>): void;
}

export class AnalyticsAnnouncer implements IAnnouncerInternal {
    private subscribers: Array<IMonitor<any>>;
    private eventBus: EventEmitter;

    constructor() {
        this.subscribers = [];
        this.eventBus = new EventEmitter();
    }

    public announce(data: Announcement<any>): void {
        if (this.eventBus.listenerCount(ANALYTICS) === 0) {
            console.info('No Monitor found, will drop data');
            return;
        }
        console.info(`Announced Data from ${data.key} created at ${data.timestamp}`);
        this.eventBus.emit(ANALYTICS, data);
    }

    public register(monitor: IMonitor<any>): void {
        this.subscribers.push(monitor);
        this.eventBus.addListener(ANALYTICS, monitor.handleAnnouncement.bind(monitor));
        console.info(`Registered Monitor ${monitor.getIdentifier()}`);
    }

    public unregister(monitor: IMonitor<any>): void {
        const idx = this.subscribers.findIndex((current) => current.getIdentifier() === monitor.getIdentifier());
        this.subscribers.splice(idx, 1);
        this.eventBus.removeListener(ANALYTICS, monitor.handleAnnouncement);

        console.info(`Removed Monitor ${monitor.getIdentifier()}`);
    }
}
