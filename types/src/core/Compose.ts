import type { Head } from "@impl";

import type { Apply } from "./Apply.ts";
import type { Fn } from "./Fn.ts";

/**
 * Composes a list of functions into a single function that passes the result of each function to the next.
 * Executes the functions from right to left.
 *
 * @param fns - The list of functions to compose.
 * @returns The composed function.
 *
 * @example
 * ```ts
 * type T0 = Call<Compose< [T.Join<'-'>,S.Split<'.'> ]>, 'a.b.c'>; // 'a-b-c'
 * ```
 */

export interface Compose<fns extends Fn[]> extends Fn {
	return: ComposeImpl<fns, this["args"]>;
}

type ComposeImpl<fns extends Fn[], args extends any[]> = fns extends [
	...infer rest extends Fn[],
	infer last extends Fn,
]
	? ComposeImpl<rest, [Apply<last, args>]>
	: Head<args>;
