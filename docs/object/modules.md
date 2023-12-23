[@tsdash/object](README.md) / Exports

# @tsdash/object

## Table of contents

### Functions

- [flatKeys](modules.md#flatkeys)
- [merge](modules.md#merge)
- [omit](modules.md#omit)
- [pick](modules.md#pick)
- [set](modules.md#set)

## Functions

### flatKeys

▸ **flatKeys**\<`TObj`\>(`obj`): `Record`\<`Paths`\<`TObj`\>, `unknown`\>

Flattens an object into a single level object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TObj` | extends `PlainObject` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `TObj` | The object to flatten |

#### Returns

`Record`\<`Paths`\<`TObj`\>, `unknown`\>

A new object with flattened keys

**`Example`**

```typescript
const obj = { a: { b: 2, c: [{ d: 3 }, { d: 4 }] } };
flatKeys(obj);
// => { 'a.b': 2, 'a.c[0].d': 3, 'a.c[1].d': 4 }
```

#### Defined in

[flatKeys.ts:19](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/object/src/flatKeys.ts#L19)

___

### merge

▸ **merge**\<`T`, `S`\>(`target`, `...sources`): `MergeDeepObjects`\<[`T`, ...S]\>

This function combines two or more objects into a single new object. Arrays and other types are overwritten.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `PlainObject` | The type of the target object |
| `S` | extends [`PlainObject`, ...PlainObject[]] | The type of the source objects |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `T` | The target object |
| `...sources` | `S` | The source objects |

#### Returns

`MergeDeepObjects`\<[`T`, ...S]\>

A new merged object

**`Example`**

```typescript
// ---- Nested objects are merged ----
merge({ a: 1 }, { b: 2 }, { c: 3, d: { e: 4 } })
// => { a: 1, b: 2, c: 3, d: { e: 4 } }

// ---- Other types are overwritten ----
merge({ a: [1, 2] }, { a: [3, 4] })
// => { a: [3, 4] }

merge({ a: 1 }, { a: "Yes" })
// => { a: "Yes" }
```

#### Defined in

[merge.ts:28](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/object/src/merge.ts#L28)

___

### omit

▸ **omit**\<`T`, `K`\>(`object`, `keysToOmit`): `Omit`\<`T`, `K`\>

Omit specified keys from an object

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `PlainObject` | The type of the object |
| `K` | extends `string` \| `number` \| `symbol` | - |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | - |
| `keysToOmit` | `K`[] | The keys to exclude from the returned object |

#### Returns

`Omit`\<`T`, `K`\>

A new object without the specified keys

**`Example`**

```typescript
const obj = {a: 1, b: 2, c: 3};
omit(obj, ['a', 'b']);
// => {c: 3}
```

#### Defined in

[omit.ts:22](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/object/src/omit.ts#L22)

___

### pick

▸ **pick**\<`T`, `K`\>(`object`, `keysToPick`): `Pick`\<`T`, `K`\>

Creates an object composed of the picked `object` properties.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `PlainObject` | The type of the object |
| `K` | extends `string` \| `number` \| `symbol` | - |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | - |
| `keysToPick` | `K`[] | The property paths to pick |

#### Returns

`Pick`\<`T`, `K`\>

A new object with the specified keys

**`Example`**

```typescript
const object = { 'a': 1, 'b': '2', 'c': 3 }

pick(object, ['a', 'c'])
// => { 'a': 1, 'c': 3 }
```

#### Defined in

[pick.ts:20](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/object/src/pick.ts#L20)

___

### set

▸ **set**\<`T`, `P`, `V`\>(`obj`, `path`, `value`): `UpdateObj`\<`T`, `P`, `V`\>

Sets the value at path of object. If a portion of path doesn’t exist, it’s created.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `PlainObject` | The type of the object |
| `P` | extends `string` \| `string` & {} | The type of the object path |
| `V` | `V` | The type of the value to set |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `T` | The object to modify |
| `path` | `P` | The path of the property to set |
| `value` | `V` | The value to set |

#### Returns

`UpdateObj`\<`T`, `P`, `V`\>

A modified object

**`Example`**

```typescript
const obj = { a: { b: 2 } };
set(obj, 'a.c', 1);
// => { a: { b: 2, c: 1 } }

// `[number]` can be used to access array elements
set(obj, 'a.c[0]', 'hello');
// => { a: { b: 2, c: ['hello'] } }

// numbers with dots are treated as keys
set(obj, 'a.c.0.d', 'world');
// => { a: { b: 2, c: { 0: { d: 'world' } } }

// supports numbers in keys
set(obj, 'a.e0.a', 1);
// => { a: { e0: { a: 1 } } }
```

**`Throws`**

If the path is invalid

#### Defined in

[set.ts:36](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/object/src/set.ts#L36)
