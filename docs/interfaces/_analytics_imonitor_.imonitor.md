[lib-of-commons](../README.md) > ["analytics/IMonitor"](../modules/_analytics_imonitor_.md) > [IMonitor](../interfaces/_analytics_imonitor_.imonitor.md)

# Interface: IMonitor

An Interface for Monitors that will receive Domain Data published as [Announcement](_analytics_announcer_announcement_.announcement.md) by an [InternalAnnouncer](_analytics_announcer_iannouncer_.internalannouncer.md).

## Type parameters
#### Data 
## Hierarchy

**IMonitor**

## Index

### Methods

* [getIdentifier](_analytics_imonitor_.imonitor.md#getidentifier)
* [handleAnnouncement](_analytics_imonitor_.imonitor.md#handleannouncement)

---

## Methods

<a id="getidentifier"></a>

###  getIdentifier

▸ **getIdentifier**(): `string`

*Defined in [analytics/IMonitor.ts:10](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/IMonitor.ts#L10)*

Returns a unique identifier for the Monitor.

**Returns:** `string`

___
<a id="handleannouncement"></a>

###  handleAnnouncement

▸ **handleAnnouncement**(announcement: *[Announcement](_analytics_announcer_announcement_.announcement.md)<`Data`>*): `void`

*Defined in [analytics/IMonitor.ts:15](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/IMonitor.ts#L15)*

Gets called by the [InternalAnnouncer](_analytics_announcer_iannouncer_.internalannouncer.md) with [Announcement](_analytics_announcer_announcement_.announcement.md) coming from Decorators e.g. [Measure](../modules/_analytics_measure_.md#measure)

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| announcement | [Announcement](_analytics_announcer_announcement_.announcement.md)<`Data`> |  \[\[Annoucement\]\] containing varying Data based on the [AnnouncementType](../enums/_analytics_announcer_announcement_.announcementtype.md). |

**Returns:** `void`

___

