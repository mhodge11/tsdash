/**
 * Creates an object with grouped items in the array.
 *
 * @example
 * ```typescript
 * group([6.1, 4.2, 6.3], Math.floor)
 * // => { 4: [4.2], 6: [6.1, 6.3] }
 *
 * group([6.1, 4.2, 6.3], value => value > 5 ? '>5' : '<=5')
 * // => { '<=5': [4.2], '>5': [6.1, 6.3] }
 * ```
 *
 * @param array The array or object to iterate over
 * @param getGroupKey A function that returns the group id for each item
 * @template T The type of the array elements
 * @returns An object with grouped items
 */

export function group<T, K extends PropertyKey>(
	array: readonly T[],
	getGroupKey: (elem: T) => K,
): Record<K, T[]> {
	const result = {} as Record<K, T[]>;

	for (const elem of array) {
		const key = getGroupKey(elem);
		(result[key] ??= []).push(elem);
	}

	return result;
}
