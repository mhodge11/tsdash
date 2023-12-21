/**
 * Creates an object with counts of occurrences of items in the array.
 *
 * @example
 * ```typescript
 * const users = [
 *   { 'user': 'barney', 'active': true, age: 36 },
 *   { 'user': 'betty', 'active': false, age: 36 },
 *   { 'user': 'fred', 'active': true, age: 40 }
 * ]
 *
 * count(users, value => value.active ? 'active' : 'inactive');
 * // => { 'active': 2, 'inactive': 1 }
 *
 * count(users, value => value.age);
 * // => { 36: 2, 40: 1 }
 * ```
 *
 * @param array The array or record to iterate over
 * @param criteria The criteria to count by
 * @template T The type of the array elements
 * @template K The type of the criteria keys
 * @returns Returns the composed aggregate object
 */

export function count<T, K extends PropertyKey>(
	array: readonly T[],
	criteria: (value: T) => K,
): Record<K, number> {
	const result = {} as Record<K, number>;

	for (const value of array) {
		const key = criteria(value);
		result[key] = (result[key] ?? 0) + 1;
	}

	return result;
}
