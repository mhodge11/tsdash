[Documentation](../README.md) / [Exports](../modules.md) / [@tsdash/ksuid](../modules/tsdash_ksuid.md) / KSUID

# Class: KSUID

[@tsdash/ksuid](../modules/tsdash_ksuid.md).KSUID

A KSUID is a unique identifier that is sortable by the time it was created.
It is composed of a timestamp and a payload.

**`Example`**

```ts
const ksuidFromSync = KSUID.random();
const idFromSync = ksuidFromSync.string;

const ksuidFromAsync = await KSUID.randomAsync();
const idFromAsync = ksuidFromAsync.string;
```

**`See`**

https://github.com/novemberborn/ksuid

## Table of contents

### Constructors

- [constructor](tsdash_ksuid.KSUID.md#constructor)

### Properties

- [view](tsdash_ksuid.KSUID.md#view)
- [MAX\_STRING\_ENCODED](tsdash_ksuid.KSUID.md#max_string_encoded)
- [MIN\_STRING\_ENCODED](tsdash_ksuid.KSUID.md#min_string_encoded)

### Accessors

- [[toStringTag]](tsdash_ksuid.KSUID.md#[tostringtag])
- [date](tsdash_ksuid.KSUID.md#date)
- [length](tsdash_ksuid.KSUID.md#length)
- [payload](tsdash_ksuid.KSUID.md#payload)
- [raw](tsdash_ksuid.KSUID.md#raw)
- [string](tsdash_ksuid.KSUID.md#string)
- [timestamp](tsdash_ksuid.KSUID.md#timestamp)

### Methods

- [compare](tsdash_ksuid.KSUID.md#compare)
- [equals](tsdash_ksuid.KSUID.md#equals)
- [toJSON](tsdash_ksuid.KSUID.md#tojson)
- [toString](tsdash_ksuid.KSUID.md#tostring)
- [fromParts](tsdash_ksuid.KSUID.md#fromparts)
- [isValid](tsdash_ksuid.KSUID.md#isvalid)
- [parse](tsdash_ksuid.KSUID.md#parse)
- [random](tsdash_ksuid.KSUID.md#random)
- [randomAsync](tsdash_ksuid.KSUID.md#randomasync)

## Constructors

### constructor

• **new KSUID**(`buffer`): [`KSUID`](tsdash_ksuid.KSUID.md)

Creates a new KSUID from an ArrayBufferLike.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | `ArrayBufferLike` | An ArrayBufferLike containing a KSUID |

#### Returns

[`KSUID`](tsdash_ksuid.KSUID.md)

#### Defined in

[ksuid.ts:29](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L29)

## Properties

### view

• `Private` **view**: [`DataView`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView )

#### Defined in

[ksuid.ts:22](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L22)

___

### MAX\_STRING\_ENCODED

▪ `Static` **MAX\_STRING\_ENCODED**: `string` = `"aWgEPTl1tmebfsQzFP4bxwgy80V"`

A string-encoded maximum value for a KSUID

#### Defined in

[ksuid.ts:18](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L18)

___

### MIN\_STRING\_ENCODED

▪ `Static` **MIN\_STRING\_ENCODED**: `string` = `"000000000000000000000000000"`

A string-encoded minimum value for a KSUID

#### Defined in

[ksuid.ts:20](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L20)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

The KSUID tag.

#### Returns

`string`

#### Defined in

[ksuid.ts:82](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L82)

___

### date

• `get` **date**(): [`Date`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date )

The date the KSUID was created.

#### Returns

[`Date`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date )

#### Defined in

[ksuid.ts:51](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L51)

___

### length

• `get` **length**(): `number`

The byte length of the KSUID.

#### Returns

`number`

#### Defined in

[ksuid.ts:44](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L44)

___

### payload

• `get` **payload**(): [`ArrayBuffer`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer )

The payload of the KSUID.

#### Returns

[`ArrayBuffer`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer )

#### Defined in

[ksuid.ts:65](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L65)

___

### raw

• `get` **raw**(): [`ArrayBuffer`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer )

A copy of the underlying buffer.

#### Returns

[`ArrayBuffer`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer )

#### Defined in

[ksuid.ts:37](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L37)

___

### string

• `get` **string**(): `string`

The KSUID as a string.

#### Returns

`string`

#### Defined in

[ksuid.ts:72](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L72)

___

### timestamp

• `get` **timestamp**(): `number`

The timestamp of the KSUID in milliseconds since the epoch.

#### Returns

`number`

#### Defined in

[ksuid.ts:58](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L58)

## Methods

### compare

▸ **compare**(`other`): ``0`` \| ``1`` \| ``-1``

Compares this KSUID to another.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`KSUID`](tsdash_ksuid.KSUID.md) | KSUID to compare to |

#### Returns

``0`` \| ``1`` \| ``-1``

`1` if `other` represents an earlier date,
`-1` if `other` represents a later date,
`0` if they are equal

#### Defined in

[ksuid.ts:94](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L94)

___

### equals

▸ **equals**(`other`): `boolean`

Checks if this KSUID is equal to another.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`KSUID`](tsdash_ksuid.KSUID.md) | KSUID to compare to |

#### Returns

`boolean`

`true` if they are equal, `false` otherwise

#### Defined in

[ksuid.ts:116](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L116)

___

### toJSON

▸ **toJSON**(): `string`

Converts the KSUID to a string used by `JSON.stringify()`.

#### Returns

`string`

The KSUID as a string

#### Defined in

[ksuid.ts:125](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L125)

___

### toString

▸ **toString**(): `string`

Converts the KSUID to a string used for representation.

#### Returns

`string`

The KSUID as a string

#### Defined in

[ksuid.ts:134](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L134)

___

### fromParts

▸ **fromParts**(`timestamp`, `payload`): [`KSUID`](tsdash_ksuid.KSUID.md)

Generates a new KSUID with a custom payload.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `string` \| `number` \| [`Date`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date ) | (?= Date.now()) A timestamp in milliseconds since the epoch |
| `payload` | [`Uint8Array`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array ) | A Uint8Array of length 16 that randomizes the KSUID |

#### Returns

[`KSUID`](tsdash_ksuid.KSUID.md)

A KSUID

#### Defined in

[ksuid.ts:165](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L165)

___

### isValid

▸ **isValid**(`buffer`): `boolean`

Checks if a buffer is a valid KSUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | `ArrayBufferLike` | A possible KSUID buffer |

#### Returns

`boolean`

`true` if the buffer is a valid KSUID, `false` otherwise

#### Defined in

[ksuid.ts:187](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L187)

___

### parse

▸ **parse**(`data`): [`KSUID`](tsdash_ksuid.KSUID.md)

Parses a string-encoded KSUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | A string-encoded KSUID |

#### Returns

[`KSUID`](tsdash_ksuid.KSUID.md)

A KSUID

#### Defined in

[ksuid.ts:197](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L197)

___

### random

▸ **random**(`timestamp?`): [`KSUID`](tsdash_ksuid.KSUID.md)

Generates a new KSUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `string` \| `number` \| [`Date`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date ) | (?= Date.now()) A date or timestamp in milliseconds since the epoch |

#### Returns

[`KSUID`](tsdash_ksuid.KSUID.md)

A KSUID

#### Defined in

[ksuid.ts:144](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L144)

___

### randomAsync

▸ **randomAsync**(`timestamp?`): [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<[`KSUID`](tsdash_ksuid.KSUID.md)\>

Generates a new KSUID asynchronously.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `string` \| `number` \| [`Date`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date ) | (?= Date.now()) A date or timestamp in milliseconds since the epoch |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<[`KSUID`](tsdash_ksuid.KSUID.md)\>

A KSUID

#### Defined in

[ksuid.ts:154](https://github.com/mhodge11/tsdash/blob/326c585/packages/ksuid/src/ksuid.ts#L154)
