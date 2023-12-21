/**
 * check if `tuple` is a tuple
 * @param tuple - Tuple to check
 * @returns `true` if `tuple` is a tuple, else `false`
 */

export type IsTuple<tuple extends readonly any[]> = tuple extends
	| readonly []
	| readonly [any, ...any]
	| readonly [...any, any]
	? true
	: false;
