import type { Tuples } from "@tsdash/types";

import type { CompareFunction } from "./types/index.ts";

import { flat } from "./flat.ts";

/**
 * Create a new array with values from the first array that are not present in the other arrays.
 *
 * Optionally, use a compare function to determine the comparison of elements (default is `===`).
 *
 * @example
 * ```typescript
 * difference([2, 1], [2, 3], [6])
 * // => [1]
 *
 * // ---- Custom compare function ----
 * const compareByFloor = (a, b) => Math.floor(a) === Math.floor(b);
 * difference([1.2, 3.1], [1.3, 2.4], compareByFloor)
 * // => [3.1]
 *
 * // ---- Only compare by id ----
 * const arr1 = [{ id: 1, name: 'Yeet' }, { id: 3, name: 'John' }];
 * const arr2 = [{ id: 3, name: 'Carl' }, { id: 4, name: 'Max' }];
 *
 * difference(arr1, arr2, (a, b) => a.id === b.id)
 * // => [{ id: 1, name: 'Yeet' }]
 * ```
 *
 * @param arraysOrCompareFn Two or more arrays with an optional compare function at the end
 * @template T The type of the arrays provided
 * @template U The type of the array elements
 * @returns Returns a new array of filtered values
 */

export function difference<U>(
	...arraysOrCompareFn: Tuples.MinLength<U[], 2>
): U[];
export function difference<T extends Tuples.MinLength<unknown[], 2>>(
	...arraysOrCompareFn: [...T, CompareFunction<T>]
): T[0];
export function difference<T extends Tuples.MinLength<unknown[], 2>, U>(
	...arraysOrCompareFn: Tuples.MinLength<U[], 2> | [...T, CompareFunction<T>]
): T[0] {
	const compareFnProvided = typeof arraysOrCompareFn.at(-1) === "function";
	const compareFunction =
		compareFnProvided && (arraysOrCompareFn.pop() as CompareFunction<T>);

	const arrays = arraysOrCompareFn as T;
	// biome-ignore lint/style/noNonNullAssertion: arrays will always have at least two elements
	const firstArray = arrays.shift()!;
	const combinedRestArray = flat(arrays);

	if (!compareFunction) {
		const restSet = new Set(combinedRestArray);
		return firstArray.filter((element) => !restSet.has(element));
	}

	const difference: T[0] = [];
	for (const elem of firstArray)
		if (combinedRestArray.every((item) => !compareFunction(elem, item)))
			difference.push(elem);

	return difference;
}
