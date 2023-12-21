import type { _, unset, Call, Fn, PartialApply } from "@core";

export namespace Functions {
	/**
	 * Returns the parameters of a function.
	 *
	 * @param fn - The function to extract the parameters from.
	 * @returns The parameters of the function.
	 *
	 * @example
	 * ```ts
	 * type T0 = Call<Parameters, (a: number, b: string) => void>; // [a: number,b: string]
	 * ```
	 */

	export type Parameters<
		fn extends ((...args: any[]) => any) | _ | unset = unset,
	> = PartialApply<ParametersFn, [fn]>;

	interface ParametersFn extends Fn {
		return: ParametersImpl<this["arg0"]>;
	}

	type ParametersImpl<fn> = fn extends (...args: infer args) => any
		? args
		: never;

	/**
	 * Returns the Nth parameter of a function.
	 *
	 * @param fn - The function to extract the parameter from.
	 * @param N - The index of the parameter to return.
	 * @returns The Nth parameter of the function.
	 *
	 * @example
	 * ```ts
	 * type T0 = Call<Parameter<1>, (a: number, b: string) => void>; // number
	 * type T1 = Call<Parameter, 1, (a: number, b: string) => void>; // string
	 * type T2 = Call<Parameter<0, (a: number, b: string) => void>>; // number
	 */

	export type Parameter<
		N extends number | _ | unset = unset,
		fn extends ((...args: any[]) => any) | _ | unset = unset,
	> = PartialApply<ParameterFn, [fn, N]>;

	interface ParameterFn extends Fn {
		return: ParametersImpl<this["arg0"]>[this["arg1"]];
	}

	/**
	 * ReturnTypes the return type of a function.
	 *
	 * @param fn - The function to extract the return type from.
	 * @returns The return type of the function.
	 *
	 * @example
	 * ```ts
	 * type T0 = Call<ReturnType, (a: number, b: string) => number>; // number
	 * type T1 = Call<ReturnType<(a: number, b: string) => number>>; // number
	 * ```
	 */

	export type ReturnType<
		fn extends ((...args: any[]) => any) | _ | unset = unset,
	> = PartialApply<ReturnTypeFn, [fn]>;
	export interface ReturnTypeFn extends Fn {
		return: ReturnTypeImpl<this["arg0"]>;
	}

	type ReturnTypeImpl<fn> = fn extends (...args: any[]) => infer ret
		? ret
		: never;

	/**
	 * Transforms the return type of a function type.
	 *
	 * @param fn - Type-level function to call on the return type.
	 * @param fnValue - The function type to update.
	 * @returns a function type with an updated return type.
	 *
	 * @example
	 * ```ts
	 * type T0 = Call<
	 *   Functions.MapReturnType<Numbers.ToString>,
	 *   (a: number, b: string) => 1 | 2
	 * >;
	 * // => (a: number, b: string) => "1" | "2"
	 * ```
	 */

	export type MapReturnType<
		fn extends Fn | unset | _ = unset,
		fnValue extends ((...args: any[]) => any) | _ | unset = unset,
	> = PartialApply<MapReturnTypeFn, [fn, fnValue]>;

	interface MapReturnTypeFn extends Fn {
		return: this["args"] extends [infer fn extends Fn, infer fnValue]
			? fnValue extends (...args: infer args) => infer returnType
				? (..._args: args) => Call<fn, returnType>
				: never
			: never;
	}

	/**
   * Transforms the paramaters of a function type.
   *
   * @param fn - Type-level function to call on parameters.
   * @param fnValue - The function type to update.
   * @returns a function type with updated parameters.
   *
   * @example
   * ```ts
   * type T0 = Call<
      F.MapParameters<Tuples.Map<Strings.ToNumber>>,
      (a: "1" | "2", b: "3" | "4") => void
    >;
   * // => (a: 1 | 2, b: 3 | 4) => void
   * ```
   */

	export type MapParameters<
		fn extends Fn | unset | _ = unset,
		fnValue extends ((...args: any[]) => any) | _ | unset = unset,
	> = PartialApply<MapParametersFn, [fn, fnValue]>;

	interface MapParametersFn extends Fn {
		return: this["args"] extends [infer fn extends Fn, infer fnValue]
			? fnValue extends (...args: infer args) => infer returnType
				? (..._args: Extract<Call<fn, args>, readonly any[]>) => returnType
				: never
			: never;
	}
}
