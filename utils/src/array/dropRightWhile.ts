/**
 * Creates a slice of `array` excluding elements dropped from the end.
 * Elements are dropped until `predicate` returns falsy.
 *
 * @example
 * ```typescript
 * const users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': true }
 * ]
 *
 * dropRightWhile(users, user => user.active)
 * // => objects for ['barney']
 * ```
 *
 * @param array The array to query
 * @param predicate The function invoked per iteration
 * @template T The type of the array elements
 * @returns Returns the slice of `array`
 */

export function dropRightWhile<T>(
	array: readonly T[],
	predicate: (value: T) => boolean,
): T[] {
	let i = array.length;
	while (i > 0 && predicate(array[i - 1] as T)) i--;
	return array.slice(0, i);
}
