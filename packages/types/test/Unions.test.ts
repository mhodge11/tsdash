import type {
	Booleans,
	Call,
	Compose,
	Fn,
	Pipe,
	Unions,
	_,
} from "../src/index.ts";

describe("Unions", () => {
	test("Exclude", () => {
		type res1 = Pipe<"a" | "b" | "c", [Unions.Exclude<"a">]>;
		expectTypeOf<res1>().toEqualTypeOf<"b" | "c">();
	});

	test("NonNullable", () => {
		type res1 = Pipe<"a" | 1 | null | undefined, [Unions.NonNullable]>;
		expectTypeOf<res1>().toEqualTypeOf<"a" | 1>();

		type res2 = Call<Unions.NonNullable<"a" | 1 | null | undefined>>;
		expectTypeOf<res2>().toEqualTypeOf<"a" | 1>();

		type res3 = Call<Unions.NonNullable, "a" | 1 | null | undefined>;
		expectTypeOf<res3>().toEqualTypeOf<"a" | 1>();
	});

	test("Extract", () => {
		type res1 = Pipe<"a" | "b" | "c", [Unions.Extract<"a" | "b">]>;
		expectTypeOf<res1>().toEqualTypeOf<"a" | "b">();
	});

	test("ExcludeBy", () => {
		type res1 = Pipe<
			"a" | "b" | "c",
			[Unions.ExcludeBy<Booleans.Extends<"a">>]
		>;
		expectTypeOf<res1>().toEqualTypeOf<"b" | "c">();
	});

	test("ExtractBy", () => {
		type res1 = Pipe<
			"a" | "b" | "c",
			[Unions.ExtractBy<Compose<[Booleans.Not, Booleans.Extends<"a">]>>]
		>;
		expectTypeOf<res1>().toEqualTypeOf<"b" | "c">();
	});

	test("Map", () => {
		interface ToTuple extends Fn {
			return: [this["arg0"]];
		}

		type res1 = Pipe<"a" | "b" | "c", [Unions.Map<ToTuple>]>;
		expectTypeOf<res1>().toEqualTypeOf<["a"] | ["b"] | ["c"]>();

		type res2 = Call<Unions.Map<ToTuple, "a" | "b" | "c">>;
		expectTypeOf<res2>().toEqualTypeOf<["a"] | ["b"] | ["c"]>();
	});

	test("Range", () => {
		type res0 = Call<Unions.Range<3>, 7>;
		expectTypeOf<res0>().toEqualTypeOf<3 | 4 | 5 | 6 | 7>();

		type res1 = Call<Unions.Range<_, 10>, 5>;
		expectTypeOf<res1>().toEqualTypeOf<5 | 6 | 7 | 8 | 9 | 10>();

		type res3 = Call<Unions.Range<-2, 2>>;
		expectTypeOf<res3>().toEqualTypeOf<-2 | -1 | 0 | 1 | 2>();

		type res4 = Call<Unions.Range<-5, -2>>;
		expectTypeOf<res4>().toEqualTypeOf<-5 | -4 | -3 | -2>();
	});

	test("ToTuple", () => {
		type res1 = Call<Unions.ToTuple, 1 | 2 | 3>;

		// Since the order isn't stable we can't use `toEqualTypeOf`:
		expectTypeOf<res1>().toMatchTypeOf<[1 | 2 | 3, 1 | 2 | 3, 1 | 2 | 3]>();
		expectTypeOf<res1>().toMatchTypeOf<[any, ...any]>();
	});

	test("ToIntersection", () => {
		type res1 = Call<Unions.ToIntersection, 1 | 2 | 3>;
		expectTypeOf<res1>().toEqualTypeOf<never>();

		type res2 = Call<Unions.ToIntersection, { a: string } | { b: number }>;
		expectTypeOf<res2>().toEqualTypeOf<{ a: string } & { b: number }>();

		type res3 = Call<Unions.ToIntersection, { a: string } & { b: number }>;
		expectTypeOf<res3>().toEqualTypeOf<{ a: string } & { b: number }>();

		type res4 = Call<Unions.ToIntersection, [1, 2, 3]>;
		expectTypeOf<res4>().toEqualTypeOf<[1, 2, 3]>();
	});
});
