/**
 * Creates a slice of `array` with elements taken from the end.
 * Elements are taken until `predicate` returns falsy.
 *
 * @example
 * ```typescript
 * const users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': true }
 * ]
 *
 * takeRightWhile(users, user => user.active)
 * // => objects for ['fred', 'pebbles']
 * ```
 *
 * @param array The array to query.
 * @param predicate The function invoked per iteration.
 * @template T The type of the array elements.
 * @returns Returns the slice of `array`.
 */

export function takeRightWhile<T>(
	array: readonly T[],
	predicate: (elem: T) => boolean,
): T[] {
	const result: T[] = [];
	for (let i = array.length - 1; i >= 0; i--)
		if (predicate(array[i] as T)) result.unshift(array[i] as T);
		else break;
	return result;
}
