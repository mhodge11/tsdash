[@tsdash/ksuid](README.md) / Exports

# @tsdash/ksuid

## Table of contents

### Classes

- [KSUID](classes/KSUID.md)

### Functions

- [compareKsuids](modules.md#compareksuids)
- [generateKsuid](modules.md#generateksuid)
- [generateKsuidAsync](modules.md#generateksuidasync)
- [isValidKsuid](modules.md#isvalidksuid)

## Functions

### compareKsuids

▸ **compareKsuids**(`ksuidString`, `otherKsuidString`): ``0`` \| ``1`` \| ``-1``

Compare two KSUID strings

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ksuidString` | `string` | KSUID string to compare |
| `otherKsuidString` | `string` | KSUID string to compare with |

#### Returns

``0`` \| ``1`` \| ``-1``

`1` if `otherKsuidString` represents an earlier date,
`-1` if `otherKsuidString` represents a later date,
`0` if they are equal

#### Defined in

[compareKsuids.ts:13](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/compareKsuids.ts#L13)

___

### generateKsuid

▸ **generateKsuid**(`timestamp?`): `string`

Generates a new KSUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `string` \| `number` \| `Date` | (?= Date.now()) A date or timestamp in milliseconds since the epoch |

#### Returns

`string`

A KSUID

#### Defined in

[generateKsuid.ts:9](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/generateKsuid.ts#L9)

___

### generateKsuidAsync

▸ **generateKsuidAsync**(`timestamp?`): `Promise`\<`string`\>

Asynchronously generates a new KSUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `string` \| `number` \| `Date` | (?= Date.now()) A date or timestamp in milliseconds since the epoch |

#### Returns

`Promise`\<`string`\>

A KSUID

#### Defined in

[generateKsuidAsync.ts:9](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/generateKsuidAsync.ts#L9)

___

### isValidKsuid

▸ **isValidKsuid**(`ksuidString`): `boolean`

Checks if a KSUID string is a valid KSUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ksuidString` | `string` | A possible KSUID string |

#### Returns

`boolean`

`true` if the string is a valid KSUID, `false` otherwise

#### Defined in

[isValidKsuid.ts:9](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/ksuid/src/isValidKsuid.ts#L9)
