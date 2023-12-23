/**
 * check if two types are equal
 * @param a - First type
 * @param b - Second type
 * @returns `true` if types are equal, else `false`
 */

export type Equal<a, b> = (<T>() => T extends a ? 1 : 2) extends <
	T,
>() => T extends b ? 1 : 2
	? true
	: false;
