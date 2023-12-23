/**
 * Creates a slice of `array` excluding elements dropped from the beginning.
 * Elements are dropped until `predicate` returns falsy.
 *
 * @example
 * ```ts
 * const users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': false }
 * ]
 *
 * dropWhile(users, user => user.active)
 * // => objects for ['pebbles']
 * ```
 *
 * @param array The array to query
 * @param predicate The function invoked per iteration
 * @template T The type of the array elements
 * @returns Returns the slice of `array`
 */

export function dropWhile<T>(
	array: readonly T[],
	predicate: (value: T) => boolean,
): T[] {
	const i = array.findIndex((x) => !predicate(x));
	return array.slice(i === -1 ? array.length : i);
}
