/**
 * checks if all of the booleans are true
 * @param bools - Array of booleans
 * @returns `true` if all of the booleans are true, else `false`
 */

export type Every<bools extends boolean[]> = bools[number] extends true
	? true
	: false;