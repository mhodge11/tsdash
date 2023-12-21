import type { PowerDigits } from "./digits/digits.ts";
import type {
	DigitNumber,
	FromDigitNumber,
	MakeDigitNumber,
	Normalize,
	Num,
	PowerSign,
	Sign,
	ToDigitNumber,
	ToNumber,
	ToString,
} from "./utils.ts";

export type Power<
	T extends number | bigint,
	U extends number | bigint,
> = ToNumber<
	FromDigitNumber<
		Normalize<
			PowerDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
		>
	>
>;

type PowerDigitNumbers<
	T extends DigitNumber,
	U extends DigitNumber,
> = Sign<U> extends "-"
	? MakeDigitNumber<Sign<T>, [0]>
	: MakeDigitNumber<PowerSign<Sign<T>, U>, PowerDigits<Num<T>, Num<U>>>;
