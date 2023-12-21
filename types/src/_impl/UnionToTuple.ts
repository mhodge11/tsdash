import type { GetUnionLast } from "./GetUnionLast.ts";

/**
 * convert union to tuple
 * @param union - Union of any types, can be union of complex, composed or primitive types
 * @returns Tuple of each elements in the union
 */

export type UnionToTuple<union, tuple extends unknown[] = []> = [
	union,
] extends [never]
	? tuple
	: UnionToTuple<
			Exclude<union, GetUnionLast<union>>,
			[GetUnionLast<union>, ...tuple]
	  >;
