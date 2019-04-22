[lib-of-commons](../README.md) > ["analytics/announcer/IAnnouncer"](../modules/_analytics_announcer_iannouncer_.md) > [InternalAnnouncer](../interfaces/_analytics_announcer_iannouncer_.internalannouncer.md)

# Interface: InternalAnnouncer

An Announcer will receive Data from different Domain Probes and forward it to registered [IMonitor](_analytics_imonitor_.imonitor.md).

## Hierarchy

 [IAnnouncer](_analytics_announcer_iannouncer_.iannouncer.md)

**↳ InternalAnnouncer**

## Implemented by

* [AnalyticsAnnouncer](../classes/_analytics_announcer_analyticsannouncer_.analyticsannouncer.md)

## Index

### Methods

* [announce](_analytics_announcer_iannouncer_.internalannouncer.md#announce)
* [register](_analytics_announcer_iannouncer_.internalannouncer.md#register)
* [unregister](_analytics_announcer_iannouncer_.internalannouncer.md#unregister)

---

## Methods

<a id="announce"></a>

###  announce

▸ **announce**(data: *[Announcement](_analytics_announcer_announcement_.announcement.md)<`any`>*): `void`

*Defined in [analytics/announcer/IAnnouncer.ts:29](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/announcer/IAnnouncer.ts#L29)*

Will submit provided data to all registered [IMonitor](_analytics_imonitor_.imonitor.md)

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | [Announcement](_analytics_announcer_announcement_.announcement.md)<`any`> |  Information collected by a Domain Probe. |

**Returns:** `void`

___
<a id="register"></a>

###  register

▸ **register**(monitor: *[IMonitor](_analytics_imonitor_.imonitor.md)<`any`>*): `void`

*Inherited from [IAnnouncer](_analytics_announcer_iannouncer_.iannouncer.md).[register](_analytics_announcer_iannouncer_.iannouncer.md#register)*

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

*Inherited from [IAnnouncer](_analytics_announcer_iannouncer_.iannouncer.md).[unregister](_analytics_announcer_iannouncer_.iannouncer.md#unregister)*

*Defined in [analytics/announcer/IAnnouncer.ts:18](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/announcer/IAnnouncer.ts#L18)*

Unregisters provided [IMonitor](_analytics_imonitor_.imonitor.md) as subscriber for [Announcement](_analytics_announcer_announcement_.announcement.md).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| monitor | [IMonitor](_analytics_imonitor_.imonitor.md)<`any`> |  that should be unregistered |

**Returns:** `void`

___

