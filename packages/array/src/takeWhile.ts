/**
 * Creates a slice of `array` with elements taken from the beginning.
 * Elements are taken until `predicate` returns falsy.
 *
 * @example
 * ```typescript
 * const users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': false }
 * ]
 *
 * takeWhile(users, user => user.active)
 * // => objects for ['barney', 'fred']
 * ```
 *
 * @param array The array to query.
 * @param predicate The function invoked per iteration.
 * @template T The type of the array elements.
 * @returns A new array of taken elements.
 */

export function takeWhile<T>(
	array: readonly T[],
	predicate: (elem: T) => boolean,
): T[] {
	const result: T[] = [];
	for (const elem of array)
		if (predicate(elem)) result.push(elem);
		else break;
	return result;
}
