import type { PlainObject } from "@type";

import { difference } from "@array";

import { pick } from "./pick.ts";

/**
 * Omit specified keys from an object
 *
 * @example
 * ```typescript
 * const obj = {a: 1, b: 2, c: 3};
 * omit(obj, ['a', 'b']);
 * // => {c: 3}
 * ```
 *
 * @param obj The object to filter
 * @param keysToOmit The keys to exclude from the returned object
 * @template T The type of the object
 * @returns A new object without the specified keys
 */

export function omit<T extends PlainObject, K extends keyof T>(
	object: T,
	keysToOmit: K[],
): Omit<T, K> {
	const allKeys = Object.keys(object);
	const filteredKeys = difference(allKeys, keysToOmit as string[]) as Exclude<
		keyof T,
		K
	>[];
	return pick(object, filteredKeys);
}
