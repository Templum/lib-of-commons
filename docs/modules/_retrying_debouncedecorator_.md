[lib-of-commons](../README.md) > ["retrying/debounceDecorator"](../modules/_retrying_debouncedecorator_.md)

# External module: "retrying/debounceDecorator"

## Index

### Functions

* [Debounce](_retrying_debouncedecorator_.md#debounce)

---

## Functions

<a id="debounce"></a>

###  Debounce

▸ **Debounce**(time: *`number`*): `(Anonymous function)`

*Defined in [retrying/debounceDecorator.ts:6](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/retrying/debounceDecorator.ts#L6)*

Debounce Decorator will drop additional calls during the specified debounce period. After the debounce period has passed, it will forward the call again.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| time | `number` |  window for the debouncing in ms |

**Returns:** `(Anonymous function)`

___

