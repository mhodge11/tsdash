/**
 * Moves an element within an array.
 *
 * @example
 * ```ts
 * move([1, 2, 3, 4, 5], 0, 2);
 * // => [2, 3, 1, 4, 5]
 * ```
 *
 * @param array The input array
 * @param from Index of the element to move
 * @param to Target index for the element
 * @template T Type of the array elements
 * @throws {Error} If index is out of bounds
 * @returns The modified array with the moved element
 */

export function move<T>(array: T[], from: number, to: number): T[] {
	if (from < 0 || from >= array.length)
		throw new Error(
			`Invalid 'from': ${from}. Must be between 0 and ${array.length - 1}.`,
		);

	if (to < 0 || to >= array.length)
		throw new Error(
			`Invalid 'to': ${to}. Must be between 0 and ${array.length - 1}.`,
		);

	if (from === to) return array;

	const item = array[from];

	if (from < to) for (let i = from; i < to; i++) array[i] = array[i + 1] as T;
	else for (let i = from; i > to; i--) array[i] = array[i - 1] as T;

	array[to] = item as T;

	return array;
}
