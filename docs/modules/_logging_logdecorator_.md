[lib-of-commons](../README.md) > ["logging/logDecorator"](../modules/_logging_logdecorator_.md)

# External module: "logging/logDecorator"

## Index

### Enumerations

* [Level](../enums/_logging_logdecorator_.level.md)

### Functions

* [Log](_logging_logdecorator_.md#log)

---

## Functions

<a id="log"></a>

###  Log

▸ **Log**(level?: *[Level](../enums/_logging_logdecorator_.level.md)*, logger?: *[IToolboxLogger](../interfaces/_logging_itoolboxlogger_.itoolboxlogger.md)*): `(Anonymous function)`

*Defined in [logging/logDecorator.ts:27](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/logging/logDecorator.ts#L27)*

Log Decorator which logs the method name along with the received parameters. Further it possible to leverage the [Hide](_shared_const_.md#prefix.hide) Decorator to sanitize specified Parameters during logging.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` level | [Level](../enums/_logging_logdecorator_.level.md) |  Level.Info |  The Log Level of the message |
| `Default value` logger | [IToolboxLogger](../interfaces/_logging_itoolboxlogger_.itoolboxlogger.md) |  console |  The used logger [IToolboxLogger](../interfaces/_logging_itoolboxlogger_.itoolboxlogger.md), defaults to \[\[console\]\] |

**Returns:** `(Anonymous function)`

___

