import { Announcement } from './announcer/announcement';

/**
 * An Interface for Monitors that will receive Domain Data published as [[Announcement]] by an [[InternalAnnouncer]].
 */
export interface IMonitor<Data> {
    /**
     * Returns a unique identifier for the Monitor.
     */
    getIdentifier(): string;
    /**
     * Gets called by the [[InternalAnnouncer]] with [[Announcement]] coming from Decorators e.g. [[Measure]]
     * @param announcement [[Annoucement]] containing varying Data based on the [[AnnouncementType]].
     */
    handleAnnouncement(announcement: Announcement<Data>): void;
}
