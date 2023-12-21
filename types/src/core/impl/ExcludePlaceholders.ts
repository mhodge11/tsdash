import type { _ } from "@core";
import type { Equal } from "@impl";

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
