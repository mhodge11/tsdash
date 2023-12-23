import type { Compose, Fn, PartialApply, unset } from "../core/index.ts";
import type { Equal, Every, Some } from "../internal/index.ts";

export namespace Booleans {
	/**
	 * Returns `true` if `a` extends `b`, otherwise `false`.
	 *
	 * @param a - The first type to compare.
	 * @param b - The second type to compare.
	 * @returns `true` if `a` extends `b`, otherwise `false`.
	 */

	export type Extends<a = unset, b = unset> = PartialApply<
		ExtendsFn,
		b extends unset ? [unset, a] : [a, b]
	>;

	interface ExtendsFn extends Fn {
		return: this["args"] extends [infer first, infer second, ...any]
			? ExtendsImpl<first, second>
			: never;
	}

	type ExtendsImpl<a, b> = [a] extends [b] ? true : false;

	/**
	 * Returns `true` if `a` is `false`, otherwise `true`.
	 *
	 * @param a - The type to check.
	 * @returns `true` if `a` is `false`, else `true`.
	 */

	export type Not<a = unset> = PartialApply<NotFn, [a]>;

	interface NotFn extends Fn {
		return: this["args"] extends [infer first, ...any] ? NotImpl<first> : never;
	}

	type NotImpl<a> = a extends true ? false : true;

	/**
	 * Returns `true` if `a` is equal to `b`, otherwise `false`.
	 *
	 * @param a - The first type to compare.
	 * @param b - The second type to compare.
	 * @returns `true` if `a` is equal to `b`, else `false`.
	 */

	export type Equals<a = unset, b = unset> = PartialApply<EqualsFn, [a, b]>;

	interface EqualsFn extends Fn {
		return: this["args"] extends [infer a, infer b, ...any]
			? Equal<a, b>
			: never;
	}

	/**
	 * Returns `true` if `a` is not equal to `b`, otherwise `false`.
	 *
	 * @param a - The first type to compare.
	 * @param b - The second type to compare.
	 * @returns `true` if `a` is not equal to `b`, else `false`.
	 */

	export type NotEqual<a = unset, b = unset> = Compose<
		[Not, PartialApply<EqualsFn, [a, b]>]
	>;

	/**
	 * Returns `true` if `a` does not extend `b`, otherwise `false`.
	 *
	 * @param a - The first type to compare.
	 * @param b - The second type to compare.
	 * @returns `true` if `a` does not extend `b`, else `false`.
	 */

	export type DoesNotExtend<a = unset, b = unset> = Compose<
		[Not, PartialApply<ExtendsFn, [a, b]>]
	>;

	/**
	 * Returns `true` if `a` and `b` are both `true`, otherwise `false`.
	 *
	 * @param a - The first type to compare.
	 * @param b - The second type to compare.
	 * @returns `true` if `a` and `b` are both `true`, else `false`.
	 */

	export type And<a = unset, b = unset> = PartialApply<AndFn, [a, b]>;

	interface AndFn extends Fn {
		return: this["args"] extends [
			infer first extends boolean,
			infer second extends boolean,
			...any,
		]
			? Every<[first, second]>
			: never;
	}

	/**
	 * Returns `true` if `a` or `b` are `true`, otherwise `false`.
	 *
	 * @param a - The first type to compare.
	 * @param b - The second type to compare.
	 * @returns `true` if `a` or `b` are `true`, else `false`.
	 */

	export type Or<a = unset, b = unset> = PartialApply<OrFn, [a, b]>;

	interface OrFn extends Fn {
		return: this["args"] extends [
			infer first extends boolean,
			infer second extends boolean,
			...any,
		]
			? Some<[first, second]>
			: never;
	}

	/**
	 * Returns `true` if `a` or `b` are `true` (but not both), otherwise `false`.
	 *
	 * @param a - The first type to compare.
	 * @param b - The second type to compare.
	 * @returns `true` if `a` or `b` are `true` (but not both), else `false`.
	 */

	export type XOr<a = unset, b = unset> = PartialApply<XOrFn, [a, b]>;

	interface XOrFn extends Fn {
		return: this["args"] extends [
			infer first extends boolean,
			infer second extends boolean,
			...any,
		]
			? first extends second
				? false
				: true
			: never;
	}
}
