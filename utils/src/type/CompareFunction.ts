import type { ArrayMinLength } from "./ArrayMinLength.ts";

export type CompareFunction<T extends ArrayMinLength<unknown[], 2>> = (
	a: T[0][number],
	b: ArrayTail<T>[number][number],
) => boolean;

type ArrayTail<T extends unknown[]> = T extends [unknown, ...infer U]
	? U
	: never;
