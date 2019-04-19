/**
 * The set of currently supported [[Annoucement]] Types.
 * - Time e.g. Execution Time / Request Times
 * - Metric e.g. Prometheus Metrics
 * - Event e.g. Analytic Events
 */
export enum AnnouncementType {
    Time = 'timing',
    Metric = 'metric',
    Event = 'event',
}

/**
 * Domain Probe Data containing different Information
 */
export interface Announcement<Data> {
    /**
     * Metric Key
     */
    key: string;
    /**
     * Kind of Announcement
     */
    kind: AnnouncementType;
    /**
     * Raised Information
     */
    data: Data;
    /**
     * Timestamp of the raising
     */
    timestamp: number;
}
