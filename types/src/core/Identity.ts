import type { Fn } from "./Fn.ts";

/**
 * Returns the the function's first argument.
 *
 * @returns The first argument of the function.
 */

export interface Identity extends Fn {
	return: this["arg0"];
}
