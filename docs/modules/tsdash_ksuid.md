[Documentation](../README.md) / [Exports](../modules.md) / @tsdash/ksuid

# Module: @tsdash/ksuid

## Table of contents

### Classes

- [KSUID](../classes/tsdash_ksuid.KSUID.md)

### Functions

- [compareKsuids](tsdash_ksuid.md#compareksuids)
- [generateKsuid](tsdash_ksuid.md#generateksuid)
- [generateKsuidAsync](tsdash_ksuid.md#generateksuidasync)
- [isValidKsuid](tsdash_ksuid.md#isvalidksuid)

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

[compareKsuids.ts:13](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/ksuid/src/compareKsuids.ts#L13)

___

### generateKsuid

▸ **generateKsuid**(`timestamp?`): `string`

Generates a new KSUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `string` \| `number` \| [`Date`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date ) | (?= Date.now()) A date or timestamp in milliseconds since the epoch |

#### Returns

`string`

A KSUID

#### Defined in

[generateKsuid.ts:9](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/ksuid/src/generateKsuid.ts#L9)

___

### generateKsuidAsync

▸ **generateKsuidAsync**(`timestamp?`): [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`string`\>

Asynchronously generates a new KSUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `string` \| `number` \| [`Date`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date ) | (?= Date.now()) A date or timestamp in milliseconds since the epoch |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`string`\>

A KSUID

#### Defined in

[generateKsuidAsync.ts:9](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/ksuid/src/generateKsuidAsync.ts#L9)

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

[isValidKsuid.ts:9](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/ksuid/src/isValidKsuid.ts#L9)
