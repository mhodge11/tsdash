/**
 * Creates unique array retaining first occurrence of elements.
 *
 * A compare function is optional (default is `===`).
 *
 * @example
 * ```ts
 * unique([2, 1, 2])
 * // => [2, 1]
 *
 * // compare by object values
 * const users = [
 *   { id: 1, name: 'john' },
 *   { id: 2, name: 'john' },
 *   { id: 2, name: 'john' },
 * ]
 *
 * unique(users, isEqual)
 * // => [{ id: 1, name: 'john' }, { id: 2, name: 'john' }]
 *
 * // compare by id
 * unique(users, (a, b) => a.name === b.name)
 * // => [{ id: 1, name: 'john' }]
 * ```
 *
 * @param array Array to inspect
 * @param compareFn Compare function invoked per element
 * @template T Type of the array elements
 * @returns A new unique array
 */

export function unique<T>(
	array: readonly T[],
	compareFn?: (a: T, b: T) => boolean,
): T[] {
	if (!compareFn) return [...new Set(array)];

	const uniqueArray: T[] = [];

	for (const elem of array)
		if (!uniqueArray.some((uniqueElem) => compareFn(elem, uniqueElem)))
			uniqueArray.push(elem);

	return uniqueArray;
}
