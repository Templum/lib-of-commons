import { EventEmitter } from 'events';
import { IMonitor } from '../monitor/IMonitor';
import { Announcement } from './announcement';
import { InternalAnnouncer } from './IAnnouncer';

const ANALYTICS = Symbol('Analytics');

/**
 * An Announcer Implementation using a local [[EventEmitter]].
 */
export class AnalyticsAnnouncer implements InternalAnnouncer {
    private subscribers: Array<IMonitor<any>>;
    private eventBus: EventEmitter;

    constructor() {
        this.subscribers = [];
        this.eventBus = new EventEmitter();
    }

    /**
     * Will submit provided data to all registered [[IMonitor]].
     * By emitting it on the local [[EventEmitter]] instance. It
     * will drop received [[Annoucement]] if there is no subscriber.
     * @param data Information collected by a Domain Probe.
     */
    public announce(data: Announcement<any>): void {
        if (this.eventBus.listenerCount(ANALYTICS) === 0) {
            console.info('No Monitor found, will drop data');
            return;
        }
        console.info(`Announced Data from ${data.key} created at ${data.timestamp}`);
        this.eventBus.emit(ANALYTICS, data);
    }

    /**
     * Registers provided [[IMonitor]] as subscriber for [[Announcement]].
     * It will print a warining if there are more then 10 registered Monitors.
     * Due to it's implementation with an [[EventEmitter]].
     * @param monitor that should be registered
     */
    public register(monitor: IMonitor<any>): void {
        this.subscribers.push(monitor);
        this.eventBus.addListener(ANALYTICS, monitor.handleAnnouncement.bind(monitor));
        console.info(`Registered Monitor ${monitor.getIdentifier()}`);
    }

    /**
     * Unregisters provided [[IMonitor]] as subscriber for [[Announcement]].
     * @param monitor that should be unregistered
     */
    public unregister(monitor: IMonitor<any>): void {
        const idx = this.subscribers.findIndex((current) => current.getIdentifier() === monitor.getIdentifier());
        this.subscribers.splice(idx, 1);
        this.eventBus.removeListener(ANALYTICS, monitor.handleAnnouncement);

        console.info(`Removed Monitor ${monitor.getIdentifier()}`);
    }
}
