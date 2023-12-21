import type { DivDigits, DivModDigits, ModDigits } from "./digits/digits.ts";
import type {
	Digit,
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

export type Div<
	T extends number | bigint,
	U extends number | bigint,
> = ToNumber<
	FromDigitNumber<
		Normalize<
			DivDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
		>
	>
>;

export type Mod<
	T extends number | bigint,
	U extends number | bigint,
> = ToNumber<
	FromDigitNumber<
		Normalize<
			ModDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
		>
	>
>;

export type DivMod<
	T extends number | bigint,
	U extends number | bigint,
	DivModNumbers extends {
		Quotient: DigitNumber;
		Remainder: DigitNumber;
	} = DivModDigitNumbers<
		ToDigitNumber<ToString<T>>,
		ToDigitNumber<ToString<U>>
	>,
> = {
	Quotient: ToNumber<FromDigitNumber<Normalize<DivModNumbers["Quotient"]>>>;
	Remainder: ToNumber<FromDigitNumber<Normalize<DivModNumbers["Remainder"]>>>;
};

type DivDigitNumbers<
	T extends DigitNumber,
	U extends DigitNumber,
> = MakeDigitNumber<MulSign<Sign<T>, Sign<U>>, DivDigits<Num<T>, Num<U>>>;

type ModDigitNumbers<
	T extends DigitNumber,
	U extends DigitNumber,
> = MakeDigitNumber<Sign<T>, ModDigits<Num<T>, Num<U>>>;

type DivModDigitNumbers<
	T extends DigitNumber,
	U extends DigitNumber,
	DivMod extends { Quotient: Digit[]; Remainder: Digit[] } = DivModDigits<
		Num<T>,
		Num<U>
	>,
> = {
	Quotient: MakeDigitNumber<MulSign<Sign<T>, Sign<U>>, DivMod["Quotient"]>;
	Remainder: MakeDigitNumber<Sign<T>, DivMod["Remainder"]>;
};
