import type { CompareDigits } from "../compare.ts";
import type { Digit, Digits, TrimZeros } from "../utils.ts";
import type { AddDigits } from "./addition.ts";
import type { SubDigits } from "./subtraction.ts";

/**
 * compute the long division of a number by a divisor
 * @param A the Numerator Cut after M digits
 * @param D the Numerator Cut with M first digits
 * @param M the Divisor
 * @param Q the Quotient
 * @see https://en.wikipedia.org/wiki/Long_division#Algorithm_for_arbitrary_base
 */

export type _DivModDigits<
	A extends Digit[],
	D extends Digit[],
	M extends Digit[],
	Q extends Digit[] = [],
> = DivModByDigit<D, M> extends {
	Quotient: infer B extends Digit;
	Remainder: infer R extends Digit[];
}
	? A extends [infer A1 extends Digit, ...infer AR extends Digit[]]
		? _DivModDigits<AR, TrimZeros<[...R, A1]>, M, [...Q, B]>
		: { Quotient: [...Q, B]; Remainder: R }
	: never;

export type Rest<T extends Digit[]> = T extends [
	Digit,
	...infer R extends Digit[],
]
	? R
	: never;

type TruncateWith<
	T extends Digit[],
	U extends Digit[],
	Acc extends Digit[] = [],
> = U extends []
	? [T, Acc]
	: T extends [infer D extends Digit, ...infer DR extends Digit[]]
	  ? TruncateWith<DR, Rest<U>, [...Acc, D]>
	  : [T, Acc];

type DivModByDigit<
	D extends Digit[],
	M extends Digit[],
	Mul extends Digit[] = [0],
	IterTable extends Digit[] = Digits,
	NextMul extends Digit[] = AddDigits<M, Mul>,
	Comp = CompareDigits<D, NextMul>,
> = IterTable extends [
	infer Iteration extends Digit,
	...infer Next extends Digit[],
]
	? Comp extends 0
		? { Quotient: Next[0]; Remainder: [0] }
		: Comp extends 1
		  ? DivModByDigit<D, M, NextMul, Next>
		  : {
					Quotient: Iteration;
					Remainder: SubDigits<D, Mul>;
			  }
	: never;

export type DivDigits<N extends Digit[], M extends Digit[]> = TruncateWith<
	N,
	M
> extends [infer A extends Digit[], infer D extends Digit[]]
	? _DivModDigits<A, D, M>["Quotient"]
	: never;

export type ModDigits<N extends Digit[], M extends Digit[]> = TruncateWith<
	N,
	M
> extends [infer A extends Digit[], infer D extends Digit[]]
	? _DivModDigits<A, D, M>["Remainder"]
	: never;

export type DivModDigits<N extends Digit[], M extends Digit[]> = TruncateWith<
	N,
	M
> extends [infer A extends Digit[], infer D extends Digit[]]
	? _DivModDigits<A, D, M>
	: never;
