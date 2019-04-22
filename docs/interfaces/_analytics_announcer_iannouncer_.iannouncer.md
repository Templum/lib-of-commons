[lib-of-commons](../README.md) > ["analytics/announcer/IAnnouncer"](../modules/_analytics_announcer_iannouncer_.md) > [IAnnouncer](../interfaces/_analytics_announcer_iannouncer_.iannouncer.md)

# Interface: IAnnouncer

An Announcer will receive Data from different Domain Probes and forward it to registered [IMonitor](_analytics_imonitor_.imonitor.md).

## Hierarchy

**IAnnouncer**

↳  [InternalAnnouncer](_analytics_announcer_iannouncer_.internalannouncer.md)

## Index

### Methods

* [register](_analytics_announcer_iannouncer_.iannouncer.md#register)
* [unregister](_analytics_announcer_iannouncer_.iannouncer.md#unregister)

---

## Methods

<a id="register"></a>

###  register

▸ **register**(monitor: *[IMonitor](_analytics_imonitor_.imonitor.md)<`any`>*): `void`

*Defined in [analytics/announcer/IAnnouncer.ts:12](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/announcer/IAnnouncer.ts#L12)*

Registers provided [IMonitor](_analytics_imonitor_.imonitor.md) as subscriber for [Announcement](_analytics_announcer_announcement_.announcement.md).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| monitor | [IMonitor](_analytics_imonitor_.imonitor.md)<`any`> |  that should be registered |

**Returns:** `void`

___
<a id="unregister"></a>

###  unregister

▸ **unregister**(monitor: *[IMonitor](_analytics_imonitor_.imonitor.md)<`any`>*): `void`

*Defined in [analytics/announcer/IAnnouncer.ts:18](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/announcer/IAnnouncer.ts#L18)*

Unregisters provided [IMonitor](_analytics_imonitor_.imonitor.md) as subscriber for [Announcement](_analytics_announcer_announcement_.announcement.md).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| monitor | [IMonitor](_analytics_imonitor_.imonitor.md)<`any`> |  that should be unregistered |

**Returns:** `void`

___

