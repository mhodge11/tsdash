import type { PlainObject } from "@type/PlainObject.ts";

/**
 * Checks if the value is a plain object.
 *
 * Refers to the {@link PlainObject} type.
 *
 * @example
 * ```typescript
 * isPlainObject({}) // => true
 * isPlainObject({ a: 1 }) // => true
 * isPlainObject(null) // => false
 * isPlainObject('1') // => false
 * isPlainObject([]) // => false
 * isPlainObject(new Function()) // => false
 * isPlainObject(new Date()) // => false
 * ```
 *
 * @param value The value to check
 * @returns Boolean indicating if the value is a plain object
 */

export function isPlainObject(value: unknown): value is PlainObject {
	return value?.constructor === Object;
}
