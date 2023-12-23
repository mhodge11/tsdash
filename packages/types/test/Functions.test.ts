import type { Call, Functions, Strings, Tuples } from "../src/index.ts";

describe("Functions", () => {
	test("Parameters", () => {
		type res1 = Call<Functions.Parameters, (a: string, b: number) => void>;
		expectTypeOf<res1>().toEqualTypeOf<[string, number]>();
	});

	test("Parameter", () => {
		type res1 = Call<Functions.Parameter<0>, (a: string, b: number) => void>;
		expectTypeOf<res1>().toEqualTypeOf<string>();

		type res2 = Call<Functions.Parameter, (a: string, b: number) => void, 0>;
		expectTypeOf<res2>().toEqualTypeOf<string>();
	});

	test("ReturnType", () => {
		type res1 = Call<Functions.ReturnType, (a: string, b: number) => boolean>;
		expectTypeOf<res1>().toEqualTypeOf<boolean>();
	});

	test("MapReturnType", () => {
		type res1 = Call<
			Functions.MapReturnType<Strings.ToNumber>,
			(a: string, b: number) => "1" | "2"
		>;
		expectTypeOf<res1>().toEqualTypeOf<(a: string, b: number) => 1 | 2>();
	});

	test("MapParameters", () => {
		type res1 = Call<
			Functions.MapParameters<Tuples.Map<Strings.ToNumber>>,
			(a: "1" | "2", b: "3" | "4") => void
		>;
		expectTypeOf<res1>().toEqualTypeOf<(a: 1 | 2, b: 3 | 4) => void>();
	});
});
