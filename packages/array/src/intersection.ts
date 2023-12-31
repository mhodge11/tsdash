import type { Tuples } from "@tsdash/types";

import type { CompareFunction } from "./types/index.ts";

import { flat } from "./flat.ts";
import { unique } from "./unique.ts";

/**
 * Create an array with unique values that are present in all arrays.
 * The order of the values is based on the first array.
 *
 * Optionally, use a compare function for element comparison (default is `===`).
 *
 * @example
 * ```ts
 * intersection([2, 1], [2, 3], [6, 2])
 * // => [2]
 *
 * // ---- Custom compare function ----
 * const compareFn = (a, b) => Math.floor(a) === Math.floor(b);
 *
 * intersection([1.2, 1.1], [1.3, 2.4], compareFn)
 * // => [1.2]
 *
 * // ---- Only compare by id ----
 * const arr1 = [{ id: 1, name: 'Yeet' }, { id: 3, name: 'John' }];
 * const arr2 = [{ id: 3, name: 'Carl' }, { id: 4, name: 'Max' }];
 *
 * intersection(arr1, arr2, (a, b) => a.id === b.id)
 * // => [{ id: 3, name: 'John' }]
 * ```
 *
 * @param arraysOrCompareFn Two or more arrays with an optional compare function at the end
 * @template T Type of the arrays provided
 * @template U Type of the array elements
 * @returns New array of intersecting values
 */

export function intersection<U>(
	...arraysOrCompareFn: Tuples.MinLength<U[], 2>
): U[];
export function intersection<T extends Tuples.MinLength<unknown[], 2>>(
	...arraysOrCompareFn: [...T, CompareFunction<T>]
): T[0];
export function intersection<T extends Tuples.MinLength<unknown[], 2>, U>(
	...arraysOrCompareFn: Tuples.MinLength<U[], 2> | [...T, CompareFunction<T>]
): T[0] {
	const compareFnProvided = typeof arraysOrCompareFn.at(-1) === "function";
	const compareFunction =
		compareFnProvided && (arraysOrCompareFn.pop() as CompareFunction<T>);

	const arrays = arraysOrCompareFn as T;
	// biome-ignore lint/style/noNonNullAssertion: arrays will always have at least two elements
	const firstArray = unique(arrays.shift()!);
	const combinedRestArray = flat(arrays);

	if (!compareFunction) {
		const restSet = new Set(combinedRestArray);
		return firstArray.filter((elem) => restSet.has(elem));
	}

	const intersection: T[0] = [];
	for (const elem of unique(firstArray))
		if (combinedRestArray.some((item) => compareFunction(elem, item)))
			intersection.push(elem);

	return intersection;
}
