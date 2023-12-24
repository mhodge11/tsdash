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

[ksuid.ts:31](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L31)

## Properties

### view

• `Private` **view**: [`DataView`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView )

#### Defined in

[ksuid.ts:24](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L24)

___

### MAX\_STRING\_ENCODED

▪ `Static` **MAX\_STRING\_ENCODED**: `string` = `"aWgEPTl1tmebfsQzFP4bxwgy80V"`

A string-encoded maximum value for a KSUID

#### Defined in

[ksuid.ts:20](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L20)

___

### MIN\_STRING\_ENCODED

▪ `Static` **MIN\_STRING\_ENCODED**: `string` = `"000000000000000000000000000"`

A string-encoded minimum value for a KSUID

#### Defined in

[ksuid.ts:22](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L22)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

The KSUID tag.

#### Returns

`string`

#### Defined in

[ksuid.ts:84](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L84)

___

### date

• `get` **date**(): [`Date`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date )

The date the KSUID was created.

#### Returns

[`Date`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date )

#### Defined in

[ksuid.ts:53](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L53)

___

### length

• `get` **length**(): `number`

The byte length of the KSUID.

#### Returns

`number`

#### Defined in

[ksuid.ts:46](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L46)

___

### payload

• `get` **payload**(): [`ArrayBuffer`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer )

The payload of the KSUID.

#### Returns

[`ArrayBuffer`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer )

#### Defined in

[ksuid.ts:67](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L67)

___

### raw

• `get` **raw**(): [`ArrayBuffer`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer )

A copy of the underlying buffer.

#### Returns

[`ArrayBuffer`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer )

#### Defined in

[ksuid.ts:39](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L39)

___

### string

• `get` **string**(): `string`

The KSUID as a string.

#### Returns

`string`

#### Defined in

[ksuid.ts:74](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L74)

___

### timestamp

• `get` **timestamp**(): `number`

The timestamp of the KSUID in milliseconds since the epoch.

#### Returns

`number`

#### Defined in

[ksuid.ts:60](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L60)

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

[ksuid.ts:96](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L96)

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

[ksuid.ts:118](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L118)

___

### toJSON

▸ **toJSON**(): `string`

Converts the KSUID to a string used by `JSON.stringify()`.

#### Returns

`string`

The KSUID as a string

#### Defined in

[ksuid.ts:127](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L127)

___

### toString

▸ **toString**(): `string`

Converts the KSUID to a string used for representation.

#### Returns

`string`

The KSUID as a string

#### Defined in

[ksuid.ts:136](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L136)

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

[ksuid.ts:167](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L167)

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

[ksuid.ts:189](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L189)

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

[ksuid.ts:199](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L199)

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

[ksuid.ts:146](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L146)

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

[ksuid.ts:156](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/ksuid/src/ksuid.ts#L156)
