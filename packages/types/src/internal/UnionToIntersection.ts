/**
 * trick to combine multiple unions of objects into a single object
 * only works with objects not primitives
 * @param union - Union of objects
 * @returns Intersection of objects
 */

export type UnionToIntersection<union> = (
	union extends any
		? (k: union) => void
		: never
) extends (k: infer intersection) => void
	? intersection
	: never;
