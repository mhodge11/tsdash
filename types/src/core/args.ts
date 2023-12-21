import type { Fn } from "./Fn.ts";

/**
 * Get the argument types of a `Fn` type.
 *
 * @param constraint - Constraint of arguments' types (defaults to `unknown[]`)
 */

export interface args<constraint extends unknown[] = unknown[]> extends Fn {
	return: this["args"] extends infer args extends constraint ? args : never;
}

/**
 * Get the argument type of a `Fn` type at a specific index.
 *
 * @param index - Index of argument
 * @param constraint - Constraint of argument type (defaults to `unknown`)
 */

export interface arg<index extends number, constraint = unknown> extends Fn {
	return: this["args"][index] extends infer arg extends constraint
		? arg
		: never;
}

/**
 * Get the first argument type of a `Fn` type.
 *
 * @param constraint - Constraint of argument type (defaults to `unknown`)
 */

export type arg0<constraint = unknown> = arg<0, constraint>;

/**
 * Get the second argument type of a `Fn` type.
 *
 * @param constraint - Constraint of argument type (defaults to `unknown`)
 */

export type arg1<constraint = unknown> = arg<1, constraint>;

/**
 * Get the third argument type of a `Fn` type.
 *
 * @param constraint - Constraint of argument type (defaults to `unknown`)
 */

export type arg2<constraint = unknown> = arg<2, constraint>;

/**
 * Get the fourth argument type of a `Fn` type.
 *
 * @param constraint - Constraint of argument type (defaults to `unknown`)
 */

export type arg3<constraint = unknown> = arg<3, constraint>;
