import type { Call, Objects } from "@tsdash/types";
import { type PlainObject, isPlainObject } from "@tsdash/validate";

/**
 * Flattens an object into a single level object.
 *
 * @example
 * ```typescript
 * const obj = { a: { b: 2, c: [{ d: 3 }, { d: 4 }] } };
 * flatKeys(obj);
 * // => { 'a.b': 2, 'a.c[0].d': 3, 'a.c[1].d': 4 }
 * ```
 *
 * @param obj The object to flatten
 * @template T The type of the object to flatten
 * @returns A new object with flattened keys
 */

export function flatKeys<TObj extends PlainObject>(
	obj: TObj,
): Record<Paths<TObj>, unknown> {
	const flatObject: Record<string, unknown> = {};
	for (const [k, v] of Object.entries(obj)) addToResult(k, v, flatObject);
	return flatObject;
}

function addToResult(
	prefix: string,
	value: unknown,
	flatObject: Record<string, unknown>,
) {
	if (isPlainObject(value)) {
		const flatObj = flatKeys(value);
		for (const [k, v] of Object.entries(flatObj))
			flatObject[`${prefix}.${k}`] = v;
	} else if (Array.isArray(value))
		for (const [i, elem] of value.entries())
			addToResult(`${prefix}[${i}]`, elem, flatObject);
	else flatObject[prefix] = value;
}

type StringIfNever<Type> = [Type] extends [never] ? string : Type;
type Paths<TObj> = StringIfNever<Call<Objects.AllPaths, TObj>>;
