/**
 * Base interface for all functions.
 *
 * @description You need to extend this interface to create a function
 * that can be composed with other TSdash functions.
 * Usually you will just convert some utility type you already have
 * by wrapping it inside a TSdash function.
 *
 * Use `this['args']`, `this['arg0']`, `this['arg1']` etc to access
 * function arguments.
 *
 * The `return` property is the value returned by your function.
 *
 * @example
 * ```typescript
 * export interface CustomOmitFn extends Fn {
 *  return: Omit<this['arg0'], this['arg1']>
 * }
 *
 * type T = Call<CustomOmitFn, { a, b, c }, 'a'> // { b, c }
 * ```
 */

export interface Fn {
	[rawArgs]: unknown;
	args: this[rawArgs] extends infer args extends unknown[] ? args : never;
	arg0: this[rawArgs] extends [infer arg, ...any] ? arg : never;
	arg1: this[rawArgs] extends [any, infer arg, ...any] ? arg : never;
	arg2: this[rawArgs] extends [any, any, infer arg, ...any] ? arg : never;
	arg3: this[rawArgs] extends [any, any, any, infer arg, ...any] ? arg : never;
	return: unknown;
}

declare const rawArgs: unique symbol;
type rawArgs = typeof rawArgs;
