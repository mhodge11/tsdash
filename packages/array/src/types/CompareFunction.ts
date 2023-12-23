import type { Tuples } from "@tsdash/types";

export type CompareFunction<T extends Tuples.MinLength<unknown[], 2>> = (
	a: T[0][number],
	b: ArrayTail<T>[number][number],
) => boolean;

type ArrayTail<T extends unknown[]> = T extends [unknown, ...infer U]
	? U
	: never;
