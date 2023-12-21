import type { Head } from "@impl";

import type { Apply } from "./Apply.ts";
import type { Fn } from "./Fn.ts";

/**
 * Composes a list of functions into a single function that passes the result of each function to the next.
 * Executes the functions from left to right.
 *
 * @param fns - The list of functions to compose.
 * @returns The composed function.
 *
 * @example
 * ```ts
 * type T0 = Call<ComposeLeft< [S.Split<'.'>,T.Join<'-'> ]>, 'a.b.c'>; // 'a-b-c'
 * ```
 */

export interface ComposeLeft<fns extends Fn[]> extends Fn {
	return: ComposeLeftImpl<fns, this["args"]>;
}

type ComposeLeftImpl<fns extends Fn[], args extends any[]> = fns extends [
	infer first extends Fn,
	...infer rest extends Fn[],
]
	? ComposeLeftImpl<rest, [Apply<first, args>]>
	: Head<args>;
