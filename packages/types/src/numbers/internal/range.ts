import type { Add } from "./addition.ts";
import type { AddDigits } from "./digits/index.ts";
import type { Sub } from "./subtraction.ts";
import type { Digit, Num, ToDigitNumber, ToString } from "./utils.ts";

export type RangeOfDigits<
	Min extends number | bigint,
	Max extends number | bigint,
> = SequenceOfDigits<Sub<Add<Max, 1>, Min>, Min>;

export type SequenceOfDigits<
	T extends number | bigint,
	Min extends number | bigint = 0,
	MinDigits extends Digit[] = Num<ToDigitNumber<ToString<Min>>>,
	Acc extends Digit[][] = [MinDigits],
> = Acc["length"] extends T
	? Acc
	: SequenceOfDigits<
			T,
			Min,
			MinDigits,
			[
				...Acc,
				AddDigits<Num<ToDigitNumber<ToString<Acc["length"]>>>, MinDigits>,
			]
	  >;
