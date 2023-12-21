import type { Fn } from "./Fn.ts";

/**
 * A function that returns it's generic parameter.
 *
 * @param T - The type to return.
 * @returns The type `T`.
 */

export interface Constant<T> extends Fn {
	return: T;
}
