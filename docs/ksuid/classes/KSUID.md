[@tsdash/ksuid](../README.md) / [Exports](../modules.md) / KSUID

# Class: KSUID

A KSUID is a unique identifier that is sortable by the time it was created.
It is composed of a timestamp and a payload.

**`Example`**

```typescript
const ksuidFromSync = KSUID.random();
const idFromSync = ksuidFromSync.string;

const ksuidFromAsync = await KSUID.randomAsync();
const idFromAsync = ksuidFromAsync.string;
```

**`See`**

https://github.com/novemberborn/ksuid

## Table of contents

### Constructors

- [constructor](KSUID.md#constructor)

### Properties

- [view](KSUID.md#view)
- [MAX\_STRING\_ENCODED](KSUID.md#max_string_encoded)
- [MIN\_STRING\_ENCODED](KSUID.md#min_string_encoded)

### Accessors

- [[toStringTag]](KSUID.md#[tostringtag])
- [date](KSUID.md#date)
- [length](KSUID.md#length)
- [payload](KSUID.md#payload)
- [raw](KSUID.md#raw)
- [string](KSUID.md#string)
- [timestamp](KSUID.md#timestamp)

### Methods

- [compare](KSUID.md#compare)
- [equals](KSUID.md#equals)
- [toJSON](KSUID.md#tojson)
- [toString](KSUID.md#tostring)
- [fromParts](KSUID.md#fromparts)
- [isValid](KSUID.md#isvalid)
- [parse](KSUID.md#parse)
- [random](KSUID.md#random)
- [randomAsync](KSUID.md#randomasync)

## Constructors

### constructor

• **new KSUID**(`buffer`): [`KSUID`](KSUID.md)

Creates a new KSUID from an ArrayBufferLike.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | `ArrayBufferLike` | An ArrayBufferLike containing a KSUID |

#### Returns

[`KSUID`](KSUID.md)

#### Defined in

[ksuid.ts:29](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L29)

## Properties

### view

• `Private` **view**: `DataView`

#### Defined in

[ksuid.ts:22](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L22)

___

### MAX\_STRING\_ENCODED

▪ `Static` **MAX\_STRING\_ENCODED**: `string` = `"aWgEPTl1tmebfsQzFP4bxwgy80V"`

A string-encoded maximum value for a KSUID

#### Defined in

[ksuid.ts:18](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L18)

___

### MIN\_STRING\_ENCODED

▪ `Static` **MIN\_STRING\_ENCODED**: `string` = `"000000000000000000000000000"`

A string-encoded minimum value for a KSUID

#### Defined in

[ksuid.ts:20](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L20)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

The KSUID tag.

#### Returns

`string`

#### Defined in

[ksuid.ts:82](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L82)

___

### date

• `get` **date**(): `Date`

The date the KSUID was created.

#### Returns

`Date`

#### Defined in

[ksuid.ts:51](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L51)

___

### length

• `get` **length**(): `number`

The byte length of the KSUID.

#### Returns

`number`

#### Defined in

[ksuid.ts:44](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L44)

___

### payload

• `get` **payload**(): `ArrayBuffer`

The payload of the KSUID.

#### Returns

`ArrayBuffer`

#### Defined in

[ksuid.ts:65](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L65)

___

### raw

• `get` **raw**(): `ArrayBuffer`

A copy of the underlying buffer.

#### Returns

`ArrayBuffer`

#### Defined in

[ksuid.ts:37](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L37)

___

### string

• `get` **string**(): `string`

The KSUID as a string.

#### Returns

`string`

#### Defined in

[ksuid.ts:72](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L72)

___

### timestamp

• `get` **timestamp**(): `number`

The timestamp of the KSUID in milliseconds since the epoch.

#### Returns

`number`

#### Defined in

[ksuid.ts:58](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L58)

## Methods

### compare

▸ **compare**(`other`): ``0`` \| ``1`` \| ``-1``

Compares this KSUID to another.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`KSUID`](KSUID.md) | KSUID to compare to |

#### Returns

``0`` \| ``1`` \| ``-1``

`1` if `other` represents an earlier date,
`-1` if `other` represents a later date,
`0` if they are equal

#### Defined in

[ksuid.ts:94](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L94)

___

### equals

▸ **equals**(`other`): `boolean`

Checks if this KSUID is equal to another.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`KSUID`](KSUID.md) | KSUID to compare to |

#### Returns

`boolean`

`true` if they are equal, `false` otherwise

#### Defined in

[ksuid.ts:116](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L116)

___

### toJSON

▸ **toJSON**(): `string`

Converts the KSUID to a string used by `JSON.stringify()`.

#### Returns

`string`

The KSUID as a string

#### Defined in

[ksuid.ts:125](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L125)

___

### toString

▸ **toString**(): `string`

Converts the KSUID to a string used for representation.

#### Returns

`string`

The KSUID as a string

#### Defined in

[ksuid.ts:134](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L134)

___

### fromParts

▸ **fromParts**(`timestamp`, `payload`): [`KSUID`](KSUID.md)

Generates a new KSUID with a custom payload.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `string` \| `number` \| `Date` | (?= Date.now()) A timestamp in milliseconds since the epoch |
| `payload` | `Uint8Array` | A Uint8Array of length 16 that randomizes the KSUID |

#### Returns

[`KSUID`](KSUID.md)

A KSUID

#### Defined in

[ksuid.ts:165](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L165)

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

[ksuid.ts:187](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L187)

___

### parse

▸ **parse**(`data`): [`KSUID`](KSUID.md)

Parses a string-encoded KSUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | A string-encoded KSUID |

#### Returns

[`KSUID`](KSUID.md)

A KSUID

#### Defined in

[ksuid.ts:197](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L197)

___

### random

▸ **random**(`timestamp?`): [`KSUID`](KSUID.md)

Generates a new KSUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `string` \| `number` \| `Date` | (?= Date.now()) A date or timestamp in milliseconds since the epoch |

#### Returns

[`KSUID`](KSUID.md)

A KSUID

#### Defined in

[ksuid.ts:144](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L144)

___

### randomAsync

▸ **randomAsync**(`timestamp?`): `Promise`\<[`KSUID`](KSUID.md)\>

Generates a new KSUID asynchronously.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `string` \| `number` \| `Date` | (?= Date.now()) A date or timestamp in milliseconds since the epoch |

#### Returns

`Promise`\<[`KSUID`](KSUID.md)\>

A KSUID

#### Defined in

[ksuid.ts:154](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/ksuid.ts#L154)
