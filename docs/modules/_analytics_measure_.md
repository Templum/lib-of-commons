[lib-of-commons](../README.md) > ["analytics/measure"](../modules/_analytics_measure_.md)

# External module: "analytics/measure"

## Index

### Enumerations

* [TimeUnit](../enums/_analytics_measure_.timeunit.md)

### Functions

* [Measure](_analytics_measure_.md#measure)
* [handlePromise](_analytics_measure_.md#handlepromise)
* [prepareEmitMeasurement](_analytics_measure_.md#prepareemitmeasurement)

---

## Functions

<a id="measure"></a>

###  Measure

▸ **Measure**(unit: *[TimeUnit](../enums/_analytics_measure_.timeunit.md)*, metricKey?: *`undefined` \| `string`*): `(Anonymous function)`

*Defined in [analytics/measure.ts:58](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/measure.ts#L58)*

Measure Decorator which leverages \[\[process.hrtime()\]\] to measure the execution time of decorated methods. Using a [IMonitor](../interfaces/_analytics_imonitor_.imonitor.md) the measurements can be obtained and processed.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| unit | [TimeUnit](../enums/_analytics_measure_.timeunit.md) |  The [TimeUnit](../enums/_analytics_measure_.timeunit.md) used for the execution time measurement. |
| `Optional` metricKey | `undefined` \| `string` |  The Name used for the [Announcement](../interfaces/_analytics_announcer_announcement_.announcement.md). Will default to the method name. |

**Returns:** `(Anonymous function)`

___
<a id="handlepromise"></a>

###  handlePromise

▸ **handlePromise**(unresolvedResult: *`Promise`<`any`>*, startTime: *[`number`, `number`]*, emitMeasurement: *`function`*): `Promise`<`any`>

*Defined in [analytics/measure.ts:38](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/measure.ts#L38)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| unresolvedResult | `Promise`<`any`> |
| startTime | [`number`, `number`] |
| emitMeasurement | `function` |

**Returns:** `Promise`<`any`>

___
<a id="prepareemitmeasurement"></a>

###  prepareEmitMeasurement

▸ **prepareEmitMeasurement**(__namedParameters: *`object`*): `(Anonymous function)`

*Defined in [analytics/measure.ts:23](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/analytics/measure.ts#L23)*

**Parameters:**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| key | `string` |
| targetUnit | [TimeUnit](../enums/_analytics_measure_.timeunit.md) |

**Returns:** `(Anonymous function)`

___

