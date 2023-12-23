import type { Equal } from "../../internal/Equal.ts";
import type { _ } from "../index.ts";

/**
 * exclude placeholders from an array
 */

export type ExcludePlaceholders<
	array,
	output extends any[] = [],
> = array extends [infer first, ...infer rest]
	? Equal<first, _> extends true
		? ExcludePlaceholders<rest, output>
		: ExcludePlaceholders<rest, [...output, first]>
	: output;
