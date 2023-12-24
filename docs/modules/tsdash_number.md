[Documentation](../README.md) / [Exports](../modules.md) / @tsdash/number

# Module: @tsdash/number

## Table of contents

### Functions

- [average](tsdash_number.md#average)
- [median](tsdash_number.md#median)
- [round](tsdash_number.md#round)
- [sum](tsdash_number.md#sum)

## Functions

### average

▸ **average**(`numbers`): `number`

Calculates the average of an array of numbers

Returns `NaN` if the input array is empty.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `numbers` | readonly `number`[] | The input array of numbers |

#### Returns

`number`

The average of the input array, or NaN if the input array is empty

**`Example`**

```ts
average([1, 2, 3, 4, 5]) // => 3
```

#### Defined in

[average.ts:17](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/number/src/average.ts#L17)

___

### median

▸ **median**(`numbers`): `number`

Calculates the median of an array of numbers

Returns `NaN` if the input array is empty.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `numbers` | readonly `number`[] | The input array of numbers |

#### Returns

`number`

The median of the input array

**`Example`**

```ts
median([1, 2, 3, 4, 5]) // => 3
median([1, 2, 3, 4, 5, 6]) // => 3.5
```

#### Defined in

[median.ts:16](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/number/src/median.ts#L16)

___

### round

▸ **round**(`number`, `precision?`): `number`

Rounds a number to the given precision.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `number` | `number` | `undefined` | The number to be rounded |
| `precision` | `number` | `2` | The number of decimal places to round to. Defaults to 2 |

#### Returns

`number`

The rounded number

**`Example`**

```ts
round(1.23456, 2); // => 1.23
round(1.235, 1); // => 1.2
round(1234.56); // => 1234.56
```

#### Defined in

[round.ts:16](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/number/src/round.ts#L16)

___

### sum

▸ **sum**(`numbers`): `number`

Calculates the sum of an array of numbers.

Returns `NaN` if the input array is empty.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `numbers` | `number`[] | The input array of numbers |

#### Returns

`number`

The sum of the input array

**`Example`**

```ts
sum([1, 2, 3, 4, 5]) // => 15
```

#### Defined in

[sum.ts:18](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/number/src/sum.ts#L18)

▸ **sum**\<`T`\>(`numbers`): `Call`\<`Tuples.Sum`, `T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends readonly `number`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `numbers` | `T` |

#### Returns

`Call`\<`Tuples.Sum`, `T`\>

#### Defined in

[sum.ts:19](https://github.com/mhodge11/tsdash/blob/e8b0bb0/packages/number/src/sum.ts#L19)
