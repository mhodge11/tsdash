[Documentation](../README.md) / [Exports](../modules.md) / @tsdash/uuid

# Module: @tsdash/uuid

## Table of contents

### Variables

- [uuidUrlAlphabet](tsdash_uuid.md#uuidurlalphabet)

### Functions

- [generateCustomUuid](tsdash_uuid.md#generatecustomuuid)
- [generateCustomUuidAsync](tsdash_uuid.md#generatecustomuuidasync)
- [generateUuid](tsdash_uuid.md#generateuuid)
- [generateUuidAsync](tsdash_uuid.md#generateuuidasync)

## Variables

### uuidUrlAlphabet

• `Const` **uuidUrlAlphabet**: ``"useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"``

#### Defined in

[index.ts:6](https://github.com/mhodge11/tsdash/blob/c625984/packages/uuid/src/index.ts#L6)

## Functions

### generateCustomUuid

▸ **generateCustomUuid**(`alphabet`, `defaultSize?`): (`size`: `number`) => `string`

Generates a UUID using a custom alphabet.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `alphabet` | `string` | `undefined` | Custom alphabet to generate the UUID from. |
| `defaultSize` | `number` | `21` | Default size of the UUID. |

#### Returns

`fn`

A function that generates a UUID.

▸ (`size?`): `string`

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `size` | `number` | `defaultSize` |

##### Returns

`string`

#### Defined in

[index.ts:44](https://github.com/mhodge11/tsdash/blob/c625984/packages/uuid/src/index.ts#L44)

___

### generateCustomUuidAsync

▸ **generateCustomUuidAsync**(`alphabet`, `defaultSize?`): [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<(`size`: `number`) => `string`\>

Asynchronously generates a UUID using a custom alphabet.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `alphabet` | `string` | `undefined` | Custom alphabet to generate the UUID from. |
| `defaultSize` | `number` | `21` | Default size of the UUID. |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<(`size`: `number`) => `string`\>

A promise resolving to a function that generates a UUID.

#### Defined in

[index.ts:110](https://github.com/mhodge11/tsdash/blob/c625984/packages/uuid/src/index.ts#L110)

___

### generateUuid

▸ **generateUuid**(`size?`): `string`

Generates a UUID.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `size` | `number` | `21` | Size of the UUID. |

#### Returns

`string`

A UUID.

#### Defined in

[index.ts:86](https://github.com/mhodge11/tsdash/blob/c625984/packages/uuid/src/index.ts#L86)

___

### generateUuidAsync

▸ **generateUuidAsync**(`size?`): [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`string`\>

Asynchronously generates a UUID.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `size` | `number` | `21` | Size of the UUID. |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`string`\>

A promise resolving to UUID.

#### Defined in

[index.ts:123](https://github.com/mhodge11/tsdash/blob/c625984/packages/uuid/src/index.ts#L123)
