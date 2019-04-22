[lib-of-commons](../README.md) > ["analytics/announcer/analyticsAnnouncer"](../modules/_analytics_announcer_analyticsannouncer_.md) > [AnalyticsAnnouncer](../classes/_analytics_announcer_analyticsannouncer_.analyticsannouncer.md)

# Class: AnalyticsAnnouncer

An Announcer Implementation using a local \[\[EventEmitter\]\].

## Hierarchy

**AnalyticsAnnouncer**

## Implements

* [InternalAnnouncer](../interfaces/_analytics_announcer_iannouncer_.internalannouncer.md)

## Index

### Constructors

* [constructor](_analytics_announcer_analyticsannouncer_.analyticsannouncer.md#constructor)

### Properties

* [eventBus](_analytics_announcer_analyticsannouncer_.analyticsannouncer.md#eventbus)
* [subscribers](_analytics_announcer_analyticsannouncer_.analyticsannouncer.md#subscribers)

### Methods

* [announce](_analytics_announcer_analyticsannouncer_.analyticsannouncer.md#announce)
* [register](_analytics_announcer_analyticsannouncer_.analyticsannouncer.md#register)
* [unregister](_analytics_announcer_analyticsannouncer_.analyticsannouncer.md#unregister)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new AnalyticsAnnouncer**(): [AnalyticsAnnouncer](_analytics_announcer_analyticsannouncer_.analyticsannouncer.md)

*Defined in [analytics/announcer/analyticsAnnouncer.ts:13](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/announcer/analyticsAnnouncer.ts#L13)*

**Returns:** [AnalyticsAnnouncer](_analytics_announcer_analyticsannouncer_.analyticsannouncer.md)

___

## Properties

<a id="eventbus"></a>

### `<Private>` eventBus

**● eventBus**: *`EventEmitter`*

*Defined in [analytics/announcer/analyticsAnnouncer.ts:13](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/announcer/analyticsAnnouncer.ts#L13)*

___
<a id="subscribers"></a>

### `<Private>` subscribers

**● subscribers**: *`Array`<[IMonitor](../interfaces/_analytics_imonitor_.imonitor.md)<`any`>>*

*Defined in [analytics/announcer/analyticsAnnouncer.ts:12](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/announcer/analyticsAnnouncer.ts#L12)*

___

## Methods

<a id="announce"></a>

###  announce

▸ **announce**(data: *[Announcement](../interfaces/_analytics_announcer_announcement_.announcement.md)<`any`>*): `void`

*Implementation of [InternalAnnouncer](../interfaces/_analytics_announcer_iannouncer_.internalannouncer.md).[announce](../interfaces/_analytics_announcer_iannouncer_.internalannouncer.md#announce)*

*Defined in [analytics/announcer/analyticsAnnouncer.ts:26](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/announcer/analyticsAnnouncer.ts#L26)*

Will submit provided data to all registered [IMonitor](../interfaces/_analytics_imonitor_.imonitor.md). By emitting it on the local \[\[EventEmitter\]\] instance. It will drop received \[\[Annoucement\]\] if there is no subscriber.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | [Announcement](../interfaces/_analytics_announcer_announcement_.announcement.md)<`any`> |  Information collected by a Domain Probe. |

**Returns:** `void`

___
<a id="register"></a>

###  register

▸ **register**(monitor: *[IMonitor](../interfaces/_analytics_imonitor_.imonitor.md)<`any`>*): `void`

*Implementation of [InternalAnnouncer](../interfaces/_analytics_announcer_iannouncer_.internalannouncer.md).[register](../interfaces/_analytics_announcer_iannouncer_.internalannouncer.md#register)*

*Defined in [analytics/announcer/analyticsAnnouncer.ts:41](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/announcer/analyticsAnnouncer.ts#L41)*

Registers provided [IMonitor](../interfaces/_analytics_imonitor_.imonitor.md) as subscriber for [Announcement](../interfaces/_analytics_announcer_announcement_.announcement.md). It will print a warining if there are more then 10 registered Monitors. Due to it's implementation with an \[\[EventEmitter\]\].

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| monitor | [IMonitor](../interfaces/_analytics_imonitor_.imonitor.md)<`any`> |  that should be registered |

**Returns:** `void`

___
<a id="unregister"></a>

###  unregister

▸ **unregister**(monitor: *[IMonitor](../interfaces/_analytics_imonitor_.imonitor.md)<`any`>*): `void`

*Implementation of [InternalAnnouncer](../interfaces/_analytics_announcer_iannouncer_.internalannouncer.md).[unregister](../interfaces/_analytics_announcer_iannouncer_.internalannouncer.md#unregister)*

*Defined in [analytics/announcer/analyticsAnnouncer.ts:51](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/announcer/analyticsAnnouncer.ts#L51)*

Unregisters provided [IMonitor](../interfaces/_analytics_imonitor_.imonitor.md) as subscriber for [Announcement](../interfaces/_analytics_announcer_announcement_.announcement.md).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| monitor | [IMonitor](../interfaces/_analytics_imonitor_.imonitor.md)<`any`> |  that should be unregistered |

**Returns:** `void`

___

