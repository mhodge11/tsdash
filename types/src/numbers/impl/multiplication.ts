import type { MulDigits } from "./digits/digits.ts";
import type {
	DigitNumber,
	FromDigitNumber,
	MakeDigitNumber,
	MulSign,
	Normalize,
	Num,
	Sign,
	ToDigitNumber,
	ToNumber,
	ToString,
} from "./utils.ts";

export type Mul<
	T extends number | bigint,
	U extends number | bigint,
> = ToNumber<
	FromDigitNumber<
		Normalize<
			MulDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
		>
	>
>;

type MulDigitNumbers<
	T extends DigitNumber,
	U extends DigitNumber,
> = MakeDigitNumber<MulSign<Sign<T>, Sign<U>>, MulDigits<Num<T>, Num<U>>>;
