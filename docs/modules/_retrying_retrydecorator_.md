[lib-of-commons](../README.md) > ["retrying/retryDecorator"](../modules/_retrying_retrydecorator_.md)

# External module: "retrying/retryDecorator"

## Index

### Functions

* [AsyncRetry](_retrying_retrydecorator_.md#asyncretry)
* [Retry](_retrying_retrydecorator_.md#retry)

---

## Functions

<a id="asyncretry"></a>

###  AsyncRetry

▸ **AsyncRetry**(isRetrieable: *`function`*, times?: *`number`*): `(Anonymous function)`

*Defined in [retrying/retryDecorator.ts:7](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/retrying/retryDecorator.ts#L7)*

Async Retry Decorator will automatically retry the invocation up to the specified amount of retries. It is setup to work with methods that return Promises or leverage the async keyword.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| isRetrieable | `function` | - |  function to determine if the received error is retriable |
| `Default value` times | `number` | 3 |  amount of retries, defaults to 3 |

**Returns:** `(Anonymous function)`

___
<a id="retry"></a>

###  Retry

▸ **Retry**(isRetrieable: *`function`*, times?: *`number`*): `(Anonymous function)`

*Defined in [retrying/retryDecorator.ts:34](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/retrying/retryDecorator.ts#L34)*

Retry Decorator will automatically retry the invocation up to the specified amount of retries. It is setup to work with methods that are executed synchronous.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| isRetrieable | `function` | - |  function to determine if the received error is retriable |
| `Default value` times | `number` | 3 |  amount of retries, defaults to 3 |

**Returns:** `(Anonymous function)`

___

