import type { PlainObject } from "@tsdash/validate";

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @example
 * ```ts
 * const object = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * pick(object, ['a', 'c'])
 * // => { 'a': 1, 'c': 3 }
 * ```
 *
 * @param obj The source object
 * @param keysToPick The property paths to pick
 * @template T The type of the object
 * @returns A new object with the specified keys
 */

export function pick<T extends PlainObject, K extends keyof T>(
	object: T,
	keysToPick: K[],
): Pick<T, K> {
	const result = {} as Pick<T, K>;
	for (const key of keysToPick) result[key] = object[key];
	return result;
}
