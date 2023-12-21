/**
 * checks if at least one of the booleans is true
 * @param bools - Array of booleans
 * @returns `true` if at least one of the booleans is true, else `false`
 */

export type Some<bools extends boolean[]> = true extends bools[number]
	? true
	: false;
