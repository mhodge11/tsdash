import type { IsTuple } from "./IsTuple.ts";

/**
 * check if `array` is an Array
 * @param array - Array to check
 * @returns `true` if `array` is an array, else `false`
 */

export type IsArrayStrict<array> = array extends readonly any[]
	? Not<IsTuple<array>>
	: false;

type Not<T extends boolean> = T extends true ? false : true;
