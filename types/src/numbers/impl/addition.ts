import type { AddDigits, SubDigits } from "./digits/digits.ts";
import type { CompareDigits } from "./compare.ts";
import type {
	DigitNumber,
	FromDigitNumber,
	InvertSign,
	MakeDigitNumber,
	Normalize,
	Num,
	Sign,
	ToDigitNumber,
	ToNumber,
	ToString,
} from "./utils.ts";

export type Add<
	T extends number | bigint,
	U extends number | bigint,
> = ToNumber<
	FromDigitNumber<
		Normalize<
			AddDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
		>
	>
>;

type AddDigitNumbers<
	T extends DigitNumber,
	U extends DigitNumber,
> = Sign<T> extends Sign<U>
	? MakeDigitNumber<Sign<T>, AddDigits<Num<T>, Num<U>>>
	: CompareDigits<Num<T>, Num<U>> extends 1
	  ? MakeDigitNumber<Sign<T>, SubDigits<Num<T>, Num<U>>>
	  : MakeDigitNumber<InvertSign<T>, SubDigits<Num<U>, Num<T>>>;
