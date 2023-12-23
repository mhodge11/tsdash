/**
 * Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
 *
 * @example
 * ```ts
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 * ```
 *
 * @param array The array to chunk
 * @param size The length of each chunk
 * @template T The type of the array elements
 * @returns Returns the new array of chunks
 */

export function chunk<T>(array: readonly T[], size: number): T[][] {
	const intSize = Math.trunc(size);

	if (array.length === 0 || intSize < 1) return [];

	let i = 0;
	let j = 0;

	const result = new Array(Math.ceil(array.length / size)) as T[][];
	while (i < array.length) result[j++] = array.slice(i, (i += intSize));

	return result;
}
