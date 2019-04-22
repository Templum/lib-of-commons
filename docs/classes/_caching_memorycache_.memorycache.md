[lib-of-commons](../README.md) > ["caching/memoryCache"](../modules/_caching_memorycache_.md) > [MemoryCache](../classes/_caching_memorycache_.memorycache.md)

# Class: MemoryCache

Memory based implementation of the [ICache](../interfaces/_caching_icache_.icache.md) Interface. Using a \[\[Map\]\] for holding the data.

## Hierarchy

**MemoryCache**

## Implements

* [ICache](../interfaces/_caching_icache_.icache.md)<`any`>

## Index

### Constructors

* [constructor](_caching_memorycache_.memorycache.md#constructor)

### Properties

* [store](_caching_memorycache_.memorycache.md#store)

### Methods

* [get](_caching_memorycache_.memorycache.md#get)
* [isCached](_caching_memorycache_.memorycache.md#iscached)
* [put](_caching_memorycache_.memorycache.md#put)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MemoryCache**(): [MemoryCache](_caching_memorycache_.memorycache.md)

*Defined in [caching/memoryCache.ts:8](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/memoryCache.ts#L8)*

**Returns:** [MemoryCache](_caching_memorycache_.memorycache.md)

___

## Properties

<a id="store"></a>

### `<Private>` store

**● store**: *`Map`<`string`, [ICacheEntry](../interfaces/_caching_icache_.icacheentry.md)<`any`>>*

*Defined in [caching/memoryCache.ts:8](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/memoryCache.ts#L8)*

___

## Methods

<a id="get"></a>

###  get

▸ **get**(key: *`string`*): `any`

*Implementation of [ICache](../interfaces/_caching_icache_.icache.md).[get](../interfaces/_caching_icache_.icache.md#get)*

*Defined in [caching/memoryCache.ts:29](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/memoryCache.ts#L29)*

Obtains the cached value from the cache using the provided key.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `string` |  of the target value |

**Returns:** `any`

___
<a id="iscached"></a>

###  isCached

▸ **isCached**(key: *`string`*): `boolean`

*Implementation of [ICache](../interfaces/_caching_icache_.icache.md).[isCached](../interfaces/_caching_icache_.icache.md#iscached)*

*Defined in [caching/memoryCache.ts:39](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/memoryCache.ts#L39)*

Will be called prior to getting. It should check if the value is cached and return true if it is cached and still valid. It automatically removes entries that are expired.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `string` |  of the target value |

**Returns:** `boolean`

___
<a id="put"></a>

###  put

▸ **put**(key: *`string`*, value: *`any`*, cacheDuration: *`number`*): `void`

*Defined in [caching/memoryCache.ts:20](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/memoryCache.ts#L20)*

Put's a value into the cache under the specified key for a specified duration.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `string` |  used for caching |
| value | `any` |  that should be cached |
| cacheDuration | `number` |  duration how long the data stays valid. |

**Returns:** `void`

___

