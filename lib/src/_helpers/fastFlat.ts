/**
 * Flattens an array of arrays into a single array.
 * `Array.flat()` is much slower than this on Node >= 19.
 *
 * @param arrays The array of arrays to flatten
 * @template T The type of the array elements
 * @returns Returns the flattened array
 */

export function fastFlat<T>(arrays: readonly T[][]): T[] {
	let result: T[] = [];
	for (const array of arrays) result = [...result, ...array];
	return result;
}
