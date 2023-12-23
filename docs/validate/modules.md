[@tsdash/validate](README.md) / Exports

# @tsdash/validate

## Table of contents

### Type Aliases

- [PlainObject](modules.md#plainobject)

### Functions

- [isEmpty](modules.md#isempty)
- [isEqual](modules.md#isequal)
- [isPlainObject](modules.md#isplainobject)
- [isUrl](modules.md#isurl)

## Type Aliases

### PlainObject

Ƭ **PlainObject**: `Record`\<`PropertyKey`, `unknown`\>

The type of a plain object.

This is a more strict type than the `object` type which also includes functions and arrays.

You can validate if a value is a plain object with [isPlainObject](modules.md#isplainobject).

**`Example`**

```typescript
let obj: PlainObject = { a: 1, b: 2 };

obj = [1, 2, 3];
// => Type 'number[]' is not assignable to type 'PlainObject'.
```

#### Defined in

[types/PlainObject.ts:17](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/validate/src/types/PlainObject.ts#L17)

## Functions

### isEmpty

▸ **isEmpty**(`value`): `boolean`

Checks if a value is empty.

Supports: strings, arrays, objects, maps, sets, typed arrays.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` \| ``null`` \| `string` \| `object` | The value to check |

#### Returns

`boolean`

Returns `true` if `value` is empty, else `false`

**`Example`**

```typescript
isEmpty(null)
// => true

isEmpty({})
// => true

isEmpty("")
// => true

isEmpty([1, 2, 3])
// => false

isEmpty('abc')
// => false

isEmpty({ 'a': 1 })
// => false
```

#### Defined in

[isEmpty.ts:31](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/validate/src/isEmpty.ts#L31)

___

### isEqual

▸ **isEqual**(`a`, `b`): `boolean`

Performs a deep comparison between two values to determine if they are
equivalent.

Supports: primitives, arrays, objects, dates, regexes, maps, sets, buffers, typed arrays

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `unknown` | The value to compare. |
| `b` | `unknown` | The other value to compare. |

#### Returns

`boolean`

Returns `true` if the values are equivalent, else `false`.

**`Example`**

```typescript
const object = { a: { b: 2 } };
const other = { a: { b: 2 } };

isEqual(object, other);
// => true

object === other;
// => false
```

#### Defined in

[isEqual.ts:28](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/validate/src/isEqual.ts#L28)

___

### isPlainObject

▸ **isPlainObject**(`value`): value is PlainObject

Checks if the value is a plain object.

Refers to the [PlainObject](modules.md#plainobject) type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to check |

#### Returns

value is PlainObject

Boolean indicating if the value is a plain object

**`Example`**

```typescript
isPlainObject({}) // => true
isPlainObject({ a: 1 }) // => true
isPlainObject(null) // => false
isPlainObject('1') // => false
isPlainObject([]) // => false
isPlainObject(new Function()) // => false
isPlainObject(new Date()) // => false
```

#### Defined in

[isPlainObject.ts:23](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/validate/src/isPlainObject.ts#L23)

___

### isUrl

▸ **isUrl**(`str`): `boolean`

Checks if given string is a valid URL

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to check |

#### Returns

`boolean`

Returns `true` if given string is a valid URL, else `false`

**`Example`**

```typescript
isUrl('https://google.com')
// => true
isUrl('google.com')
// => false
```

#### Defined in

[isUrl.ts:16](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/validate/src/isUrl.ts#L16)
