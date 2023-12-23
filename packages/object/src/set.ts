import type { Call, Objects } from "@tsdash/types";
import { type PlainObject, isPlainObject } from "@tsdash/validate";

/**
 * Sets the value at path of object. If a portion of path doesn’t exist, it’s created.
 *
 * @example
 * ```typescript
 * const obj = { a: { b: 2 } };
 * set(obj, 'a.c', 1);
 * // => { a: { b: 2, c: 1 } }
 *
 * // `[number]` can be used to access array elements
 * set(obj, 'a.c[0]', 'hello');
 * // => { a: { b: 2, c: ['hello'] } }
 *
 * // numbers with dots are treated as keys
 * set(obj, 'a.c.0.d', 'world');
 * // => { a: { b: 2, c: { 0: { d: 'world' } } }
 *
 * // supports numbers in keys
 * set(obj, 'a.e0.a', 1);
 * // => { a: { e0: { a: 1 } } }
 * ```
 *
 * @param obj The object to modify
 * @param path The path of the property to set
 * @param value The value to set
 * @template T The type of the object
 * @template P The type of the object path
 * @template V The type of the value to set
 * @throws If the path is invalid
 * @returns A modified object
 */

export function set<T extends PlainObject, P extends Paths<T>, V>(
	obj: T,
	path: P,
	value: V,
): UpdateObj<T, P, V> {
	if (!validPathRegex.test(path))
		throw new Error(
			`Invalid path: ${path}. Look at the examples for the correct format.`,
		);

	const pathParts = (path as string).split(pathSplitRegex);
	let currentObj: PlainObject = obj;

	for (let i = 0; i < pathParts.length; i++) {
		const key = (pathParts[i] as string).replace(matchBracketsRegex, "");

		if (i === pathParts.length - 1) {
			currentObj[key] = value;
			break;
		}

		const nextElementInArray = (pathParts[i + 1] as string).startsWith("[");
		const nextElementInObject = !nextElementInArray;

		if (nextElementInArray && !Array.isArray(currentObj[key]))
			currentObj[key] = [];

		if (nextElementInObject && !isPlainObject(currentObj[key]))
			currentObj[key] = {};

		currentObj = currentObj[key] as PlainObject;
	}

	return obj as UpdateObj<T, P, V>;
}

const validPathRegex =
	/^[^.[\]]+(?:\.[^.[\]]+)*(?:\[\d+])*(?:\.[^.[\]]+(?:\[\d+])*)*$/;
const pathSplitRegex = /\.|(?=\[)/g;
const matchBracketsRegex = /[[\]]/g;

type Paths<TObj> = Call<Objects.AllPaths, TObj> | (string & {});
type UpdateObj<TObj extends PlainObject, TPath extends string, TVal> = Call<
	Objects.Update<TPath, TVal>,
	TObj
>;
