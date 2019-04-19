import { IMonitor } from '../IMonitor';
import { Announcement } from './announcement';

/**
 * An Announcer will receive Data from different Domain Probes and forward it to registered [[IMonitor]].
 */
export interface IAnnouncer {
    /**
     * Registers provided [[IMonitor]] as subscriber for [[Announcement]].
     * @param monitor that should be registered
     */
    register(monitor: IMonitor<any>): void;

    /**
     * Unregisters provided [[IMonitor]] as subscriber for [[Announcement]].
     * @param monitor that should be unregistered
     */
    unregister(monitor: IMonitor<any>): void;
}

/**
 * An Announcer will receive Data from different Domain Probes and forward it to registered [[IMonitor]].
 */
export interface InternalAnnouncer extends IAnnouncer {
    /**
     * Will submit provided data to all registered [[IMonitor]]
     * @param data Information collected by a Domain Probe.
     */
    announce(data: Announcement<any>): void;
}
