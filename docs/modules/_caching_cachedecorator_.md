[lib-of-commons](../README.md) > ["caching/cacheDecorator"](../modules/_caching_cachedecorator_.md)

# External module: "caching/cacheDecorator"

## Index

### Variables

* [ONE_MINUTE](_caching_cachedecorator_.md#one_minute)
* [getKey](_caching_cachedecorator_.md#getkey)

### Functions

* [Cache](_caching_cachedecorator_.md#cache)
* [CacheKey](_caching_cachedecorator_.md#cachekey)
* [hashCode](_caching_cachedecorator_.md#hashcode)

---

## Variables

<a id="one_minute"></a>

### `<Const>` ONE_MINUTE

**● ONE_MINUTE**: *`number`* =  60 * 1000

*Defined in [caching/cacheDecorator.ts:7](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/cacheDecorator.ts#L7)*

___
<a id="getkey"></a>

### `<Const>` getKey

**● getKey**: *`(Anonymous function)`* =  getMetaDataKey(PREFIX.CacheKey)

*Defined in [caching/cacheDecorator.ts:8](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/cacheDecorator.ts#L8)*

___

## Functions

<a id="cache"></a>

###  Cache

▸ **Cache**(cacheDuration?: *`number`*, cache?: *[ICache](../interfaces/_caching_icache_.icache.md)<`any`>*): `(Anonymous function)`

*Defined in [caching/cacheDecorator.ts:31](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/cacheDecorator.ts#L31)*

Cache Decorator which stores the method result in the provided [ICache](../interfaces/_caching_icache_.icache.md) for the specified Time. It leverages either all input parameters or only the with [CacheKey](_caching_cachedecorator_.md#cachekey) specified parameters as cache keys. By calculating an simple hashcode. It is adviced to avoid objects as cache keys. Because they might have an negative impact on the performance and further could lead to unwanted caching behaviours.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` cacheDuration | `number` |  ONE_MINUTE |  in Milliseconds, defaults to 1 Minute |
| `Default value` cache | [ICache](../interfaces/_caching_icache_.icache.md)<`any`> |  new MemoryCache() |  to use, defaults to [MemoryCache](../classes/_caching_memorycache_.memorycache.md) |

**Returns:** `(Anonymous function)`

___
<a id="cachekey"></a>

###  CacheKey

▸ **CacheKey**(target: *`any`*, propertyName: *`string`*, index: *`number`*): `void`

*Defined in [caching/cacheDecorator.ts:14](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/cacheDecorator.ts#L14)*

CacheKey Decorator allows to select certain parameters as cache keys. This improves the caching quality and also the performance.

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `any` |
| propertyName | `string` |
| index | `number` |

**Returns:** `void`

___
<a id="hashcode"></a>

###  hashCode

▸ **hashCode**(str: *`string`*): `string`

*Defined in [caching/cacheDecorator.ts:64](https://github.com/Templum/Project-Toolbox/blob/0839fcc/lib/caching/cacheDecorator.ts#L64)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| str | `string` |

**Returns:** `string`

___

