[@tsdash/array](README.md) / Exports

# @tsdash/array

## Table of contents

### Type Aliases

- [CompareFunction](modules.md#comparefunction)

### Functions

- [chunk](modules.md#chunk)
- [count](modules.md#count)
- [difference](modules.md#difference)
- [dropRightWhile](modules.md#droprightwhile)
- [dropWhile](modules.md#dropwhile)
- [flat](modules.md#flat)
- [group](modules.md#group)
- [intersection](modules.md#intersection)
- [move](modules.md#move)
- [range](modules.md#range)
- [shuffle](modules.md#shuffle)
- [sort](modules.md#sort)
- [takeRightWhile](modules.md#takerightwhile)
- [takeWhile](modules.md#takewhile)
- [unique](modules.md#unique)

## Type Aliases

### CompareFunction

Ƭ **CompareFunction**\<`T`\>: (`a`: `T`[``0``][`number`], `b`: `ArrayTail`\<`T`\>[`number`][`number`]) => `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Tuples.MinLength`\<`unknown`[], ``2``\> |

#### Type declaration

▸ (`a`, `b`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T`[``0``][`number`] |
| `b` | `ArrayTail`\<`T`\>[`number`][`number`] |

##### Returns

`boolean`

#### Defined in

[types/CompareFunction.ts:3](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/types/CompareFunction.ts#L3)

## Functions

### chunk

▸ **chunk**\<`T`\>(`array`, `size`): `T`[][]

Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the array elements |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly `T`[] | The array to chunk |
| `size` | `number` | The length of each chunk |

#### Returns

`T`[][]

Returns the new array of chunks

**`Example`**

```typescript
chunk(['a', 'b', 'c', 'd'], 2)
// => [['a', 'b'], ['c', 'd']]

chunk(['a', 'b', 'c', 'd'], 3)
// => [['a', 'b', 'c'], ['d']]
```

#### Defined in

[chunk.ts:19](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/chunk.ts#L19)

___

### count

▸ **count**\<`T`, `K`\>(`array`, `criteria`): `Record`\<`K`, `number`\>

Creates an object with counts of occurrences of items in the array.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` | The type of the array elements |
| `K` | extends `PropertyKey` | The type of the criteria keys |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly `T`[] | The array or record to iterate over |
| `criteria` | (`value`: `T`) => `K` | The criteria to count by |

#### Returns

`Record`\<`K`, `number`\>

Returns the composed aggregate object

**`Example`**

```typescript
const users = [
  { 'user': 'barney', 'active': true, age: 36 },
  { 'user': 'betty', 'active': false, age: 36 },
  { 'user': 'fred', 'active': true, age: 40 }
]

count(users, value => value.active ? 'active' : 'inactive');
// => { 'active': 2, 'inactive': 1 }

count(users, value => value.age);
// => { 36: 2, 40: 1 }
```

#### Defined in

[count.ts:26](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/count.ts#L26)

___

### difference

▸ **difference**\<`U`\>(`...arraysOrCompareFn`): `U`[]

Create a new array with values from the first array that are not present in the other arrays.

Optionally, use a compare function to determine the comparison of elements (default is `===`).

#### Type parameters

| Name | Description |
| :------ | :------ |
| `U` | The type of the array elements |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...arraysOrCompareFn` | [`U`[], `U`[], ...U[][]] | Two or more arrays with an optional compare function at the end |

#### Returns

`U`[]

Returns a new array of filtered values

**`Example`**

```typescript
difference([2, 1], [2, 3], [6])
// => [1]

// ---- Custom compare function ----
const compareByFloor = (a, b) => Math.floor(a) === Math.floor(b);
difference([1.2, 3.1], [1.3, 2.4], compareByFloor)
// => [3.1]

// ---- Only compare by id ----
const arr1 = [{ id: 1, name: 'Yeet' }, { id: 3, name: 'John' }];
const arr2 = [{ id: 3, name: 'Carl' }, { id: 4, name: 'Max' }];

difference(arr1, arr2, (a, b) => a.id === b.id)
// => [{ id: 1, name: 'Yeet' }]
```

#### Defined in

[difference.ts:36](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/difference.ts#L36)

▸ **difference**\<`T`\>(`...arraysOrCompareFn`): `T`[``0``]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`unknown`[], `unknown`[], ...unknown[][]] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...arraysOrCompareFn` | [...T[], [`CompareFunction`](modules.md#comparefunction)\<`T`\>] |

#### Returns

`T`[``0``]

#### Defined in

[difference.ts:39](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/difference.ts#L39)

___

### dropRightWhile

▸ **dropRightWhile**\<`T`\>(`array`, `predicate`): `T`[]

Creates a slice of `array` excluding elements dropped from the end.
Elements are dropped until `predicate` returns falsy.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the array elements |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly `T`[] | The array to query |
| `predicate` | (`value`: `T`) => `boolean` | The function invoked per iteration |

#### Returns

`T`[]

Returns the slice of `array`

**`Example`**

```typescript
const users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': true },
  { 'user': 'pebbles', 'active': true }
]

dropRightWhile(users, user => user.active)
// => objects for ['barney']
```

#### Defined in

[dropRightWhile.ts:23](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/dropRightWhile.ts#L23)

___

### dropWhile

▸ **dropWhile**\<`T`\>(`array`, `predicate`): `T`[]

Creates a slice of `array` excluding elements dropped from the beginning.
Elements are dropped until `predicate` returns falsy.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the array elements |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly `T`[] | The array to query |
| `predicate` | (`value`: `T`) => `boolean` | The function invoked per iteration |

#### Returns

`T`[]

Returns the slice of `array`

**`Example`**

```typescript
const users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': true },
  { 'user': 'pebbles', 'active': false }
]

dropWhile(users, user => user.active)
// => objects for ['pebbles']
```

#### Defined in

[dropWhile.ts:23](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/dropWhile.ts#L23)

___

### flat

▸ **flat**\<`T`\>(`arrays`): `T`[]

Flattens an array of arrays into a single array.
`Array.flat()` is much slower than this on Node >= 19.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the array elements |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrays` | readonly `T`[][] | The array of arrays to flatten |

#### Returns

`T`[]

Returns the flattened array

#### Defined in

[flat.ts:10](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/flat.ts#L10)

___

### group

▸ **group**\<`T`, `K`\>(`array`, `getGroupKey`): `Record`\<`K`, `T`[]\>

Creates an object with grouped items in the array.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` | The type of the array elements |
| `K` | extends `PropertyKey` | - |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly `T`[] | The array or object to iterate over |
| `getGroupKey` | (`elem`: `T`) => `K` | A function that returns the group id for each item |

#### Returns

`Record`\<`K`, `T`[]\>

An object with grouped items

**`Example`**

```typescript
group([6.1, 4.2, 6.3], Math.floor)
// => { 4: [4.2], 6: [6.1, 6.3] }

group([6.1, 4.2, 6.3], value => value > 5 ? '>5' : '<=5')
// => { '<=5': [4.2], '>5': [6.1, 6.3] }
```

#### Defined in

[group.ts:19](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/group.ts#L19)

___

### intersection

▸ **intersection**\<`U`\>(`...arraysOrCompareFn`): `U`[]

Create an array with unique values that are present in all arrays.
The order of the values is based on the first array.

Optionally, use a compare function for element comparison (default is `===`).

#### Type parameters

| Name | Description |
| :------ | :------ |
| `U` | Type of the array elements |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...arraysOrCompareFn` | [`U`[], `U`[], ...U[][]] | Two or more arrays with an optional compare function at the end |

#### Returns

`U`[]

New array of intersecting values

**`Example`**

```typescript
intersection([2, 1], [2, 3], [6, 2])
// => [2]

// ---- Custom compare function ----
const compareFn = (a, b) => Math.floor(a) === Math.floor(b);

intersection([1.2, 1.1], [1.3, 2.4], compareFn)
// => [1.2]

// ---- Only compare by id ----
const arr1 = [{ id: 1, name: 'Yeet' }, { id: 3, name: 'John' }];
const arr2 = [{ id: 3, name: 'Carl' }, { id: 4, name: 'Max' }];

intersection(arr1, arr2, (a, b) => a.id === b.id)
// => [{ id: 3, name: 'John' }]
```

#### Defined in

[intersection.ts:39](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/intersection.ts#L39)

▸ **intersection**\<`T`\>(`...arraysOrCompareFn`): `T`[``0``]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`unknown`[], `unknown`[], ...unknown[][]] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...arraysOrCompareFn` | [...T[], [`CompareFunction`](modules.md#comparefunction)\<`T`\>] |

#### Returns

`T`[``0``]

#### Defined in

[intersection.ts:42](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/intersection.ts#L42)

___

### move

▸ **move**\<`T`\>(`array`, `from`, `to`): `T`[]

Moves an element within an array.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Type of the array elements |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `T`[] | The input array |
| `from` | `number` | Index of the element to move |
| `to` | `number` | Target index for the element |

#### Returns

`T`[]

The modified array with the moved element

**`Example`**

```typescript
move([1, 2, 3, 4, 5], 0, 2);
// => [2, 3, 1, 4, 5]
```

**`Throws`**

If index is out of bounds

#### Defined in

[move.ts:18](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/move.ts#L18)

___

### range

▸ **range**(`start`, `end`, `step?`): `number`[]

Creates an array from start to end (inclusive), stepping by step.
If start is larger than end, the array is generated in reverse

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `start` | `number` | `undefined` | Start number of sequence |
| `end` | `number` | `undefined` | End number of sequence |
| `step` | `number` | `1` | Step between numbers, default: 1 |

#### Returns

`number`[]

An array of numbers

**`Example`**

```typescript
for (const num of range(1, 5)) {
  console.log(num);
}
// => 1 2 3 4 5

// Array of even numbers between 0 and 10:
range(0, 10, 2);
// => [0, 2, 4, 6, 8, 10]

// Descending range:
range(5, 0, 2);
// => [5, 3, 1]
```

**`Throws`**

If range is negative or step is 0

#### Defined in

[range.ts:28](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/range.ts#L28)

___

### shuffle

▸ **shuffle**\<`T`\>(`array`): `T`[]

Creates a new array of shuffled values, using the Fisher-Yates-Durstenfeld Shuffle algorithm.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the array elements |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly `T`[] | Array to shuffle |

#### Returns

`T`[]

A new shuffled array

**`Example`**

```typescript
shuffle([1, 2, 3, 4])
// => [4, 1, 3, 2]
```

#### Defined in

[shuffle.ts:15](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/shuffle.ts#L15)

___

### sort

▸ **sort**\<`T`\>(`array`, `...criteria`): `T`[]

Creates new array sorted in ascending/descending order with single or multiple criteria.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Type of the array elements |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly `T`[] | Array to sort |
| `...criteria` | \{ `by?`: (`item`: `T`) => `string` \| `number` \| `bigint` \| `Date` ; `order?`: ``"asc"`` \| ``"desc"``  }[] | Criteria to sort by |

#### Returns

`T`[]

New sorted array

**`Example`**

```typescript
sort([1, 2, 3, 4], { order: 'desc' })
// => [4, 3, 2, 1]

// --- Sorting by multiple properties ---
const array = [{ a: 2, b: 1 }, { a: 1, b: 2 }, { a: 1, b: 1 }];

sort(array,
  { order: 'asc', by: item => item.a },
  { order: 'desc', by: item => item.b }
)
// => [{ a: 1, b: 2 }, { a: 1, b: 1 }, { a: 2, b: 1 }]
```

#### Defined in

[sort.ts:27](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/sort.ts#L27)

___

### takeRightWhile

▸ **takeRightWhile**\<`T`\>(`array`, `predicate`): `T`[]

Creates a slice of `array` with elements taken from the end.
Elements are taken until `predicate` returns falsy.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the array elements. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly `T`[] | The array to query. |
| `predicate` | (`elem`: `T`) => `boolean` | The function invoked per iteration. |

#### Returns

`T`[]

Returns the slice of `array`.

**`Example`**

```typescript
const users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': true },
  { 'user': 'pebbles', 'active': true }
]

takeRightWhile(users, user => user.active)
// => objects for ['fred', 'pebbles']
```

#### Defined in

[takeRightWhile.ts:23](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/takeRightWhile.ts#L23)

___

### takeWhile

▸ **takeWhile**\<`T`\>(`array`, `predicate`): `T`[]

Creates a slice of `array` with elements taken from the beginning.
Elements are taken until `predicate` returns falsy.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the array elements. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly `T`[] | The array to query. |
| `predicate` | (`elem`: `T`) => `boolean` | The function invoked per iteration. |

#### Returns

`T`[]

A new array of taken elements.

**`Example`**

```typescript
const users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': true },
  { 'user': 'pebbles', 'active': false }
]

takeWhile(users, user => user.active)
// => objects for ['barney', 'fred']
```

#### Defined in

[takeWhile.ts:23](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/takeWhile.ts#L23)

___

### unique

▸ **unique**\<`T`\>(`array`, `compareFn?`): `T`[]

Creates unique array retaining first occurrence of elements.

A compare function is optional (default is `===`).

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Type of the array elements |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly `T`[] | Array to inspect |
| `compareFn?` | (`a`: `T`, `b`: `T`) => `boolean` | Compare function invoked per element |

#### Returns

`T`[]

A new unique array

**`Example`**

```typescript
unique([2, 1, 2])
// => [2, 1]

// compare by object values
const users = [
  { id: 1, name: 'john' },
  { id: 2, name: 'john' },
  { id: 2, name: 'john' },
]

unique(users, isEqual)
// => [{ id: 1, name: 'john' }, { id: 2, name: 'john' }]

// compare by id
unique(users, (a, b) => a.name === b.name)
// => [{ id: 1, name: 'john' }]
```

#### Defined in

[unique.ts:32](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/array/src/unique.ts#L32)
