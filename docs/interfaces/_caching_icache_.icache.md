[lib-of-commons](../README.md) > ["caching/ICache"](../modules/_caching_icache_.md) > [ICache](../interfaces/_caching_icache_.icache.md)

# Interface: ICache

Interface for the Cache used by the [Cache](../modules/_caching_cachedecorator_.md#cache) Decorator.

## Type parameters
#### V 
## Hierarchy

**ICache**

## Implemented by

* [MemoryCache](../classes/_caching_memorycache_.memorycache.md)

## Index

### Methods

* [get](_caching_icache_.icache.md#get)
* [isCached](_caching_icache_.icache.md#iscached)
* [put](_caching_icache_.icache.md#put)

---

## Methods

<a id="get"></a>

###  get

▸ **get**(key: *`string`*): `V`

*Defined in [caching/ICache.ts:21](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/ICache.ts#L21)*

Obtains the cached value from the cache using the provided key.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `string` |  of the target value |

**Returns:** `V`

___
<a id="iscached"></a>

###  isCached

▸ **isCached**(key: *`string`*): `boolean`

*Defined in [caching/ICache.ts:29](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/ICache.ts#L29)*

Will be called prior to getting. It should check if the value is cached and return true if it is cached and still valid. This method can be used for a cleanup routine, as it will be called before performing a get.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `string` |  of the target value |

**Returns:** `boolean`

___
<a id="put"></a>

###  put

▸ **put**(key: *`string`*, value: *`V`*, cacheDuration: *`number`*): `void`

*Defined in [caching/ICache.ts:16](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/ICache.ts#L16)*

Put's a value into the cache under the specified key for a specified duration.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `string` |  used for caching |
| value | `V` |  that should be cached |
| cacheDuration | `number` |  duration how long the data stays valid |

**Returns:** `void`

___

