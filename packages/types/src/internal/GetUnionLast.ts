import type { UnionToIntersection } from "./UnionToIntersection.ts";

/**
 * get last element of union
 * @param union - union of any types
 * @returns Last element of union
 */

export type GetUnionLast<union> = UnionToIntersection<
	union extends any ? () => union : never
> extends () => infer Last
	? Last
	: never;
