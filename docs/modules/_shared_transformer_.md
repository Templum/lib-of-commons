[lib-of-commons](../README.md) > ["shared/transformer"](../modules/_shared_transformer_.md)

# External module: "shared/transformer"

## Index

### Variables

* [NS_PER_MIN](_shared_transformer_.md#ns_per_min)
* [NS_PER_MS](_shared_transformer_.md#ns_per_ms)
* [NS_PER_SEC](_shared_transformer_.md#ns_per_sec)

### Functions

* [getMultiplikator](_shared_transformer_.md#getmultiplikator)
* [transformTo](_shared_transformer_.md#transformto)

---

## Variables

<a id="ns_per_min"></a>

### `<Const>` NS_PER_MIN

**● NS_PER_MIN**: *`60000000000`* = 60000000000

*Defined in [shared/transformer.ts:5](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/shared/transformer.ts#L5)*

___
<a id="ns_per_ms"></a>

### `<Const>` NS_PER_MS

**● NS_PER_MS**: *`1000000`* = 1000000

*Defined in [shared/transformer.ts:4](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/shared/transformer.ts#L4)*

___
<a id="ns_per_sec"></a>

### `<Const>` NS_PER_SEC

**● NS_PER_SEC**: *`1000000000`* = 1000000000

*Defined in [shared/transformer.ts:3](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/shared/transformer.ts#L3)*

___

## Functions

<a id="getmultiplikator"></a>

###  getMultiplikator

▸ **getMultiplikator**(unit: *[TimeUnit](../enums/_analytics_measure_.timeunit.md)*): `number`

*Defined in [shared/transformer.ts:7](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/shared/transformer.ts#L7)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| unit | [TimeUnit](../enums/_analytics_measure_.timeunit.md) |

**Returns:** `number`

___
<a id="transformto"></a>

###  transformTo

▸ **transformTo**(unit: *[TimeUnit](../enums/_analytics_measure_.timeunit.md)*): `function`

*Defined in [shared/transformer.ts:20](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/shared/transformer.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| unit | [TimeUnit](../enums/_analytics_measure_.timeunit.md) |

**Returns:** `function`

___

