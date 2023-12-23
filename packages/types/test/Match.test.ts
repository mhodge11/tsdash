import type {
	Booleans,
	Call,
	ComposeLeft,
	Constant,
	Match,
	Numbers,
	Objects,
	Pipe,
	Strings,
	Tuples,
	Unions,
	arg0,
	arg1,
} from "../src/index.ts";

describe("Match", () => {
	test("should match with regular types", () => {
		type MatchTest<T> = Call<
			Match<
				T,
				[
					Match.With<{ msg: string }, Constant<"a">>,
					Match.With<string, Constant<"b">>,
					Match.With<any, Constant<"c">>,
				]
			>
		>;

		type res1 = MatchTest<{ msg: "hello" }>;
		expectTypeOf<res1>().toEqualTypeOf<"a">();

		type res2 = MatchTest<"hello">;
		expectTypeOf<res2>().toEqualTypeOf<"b">();

		type res3 = MatchTest<1>;
		expectTypeOf<res3>().toEqualTypeOf<"c">();
	});

	test("should work with patterns destructuring arguments", () => {
		type MatchTest<T> = Call<
			Match<
				T,
				[
					Match.With<
						{ nested: { value: arg0 } },
						Strings.Prepend<"nested.value === ">
					>,
					Match.With<{ x: arg0; y: arg1 }, Numbers.Add>,
					Match.With<
						{ x: { y: [1, 2, arg0] } },
						Strings.Prepend<"x.y[2] === ">
					>,
					Match.With<string, Strings.Prepend<"string: ">>,
					Match.With<any, Constant<"default value">>,
				]
			>
		>;

		type res1 = MatchTest<{ nested: { value: 123 } }>;
		expectTypeOf<res1>().toEqualTypeOf<"nested.value === 123">();

		type res2 = MatchTest<"world">;
		expectTypeOf<res2>().toEqualTypeOf<"string: world">();

		type res3 = MatchTest<1>;
		expectTypeOf<res3>().toEqualTypeOf<"default value">();

		type res4 = MatchTest<{ x: 1; y: 2 }>;
		expectTypeOf<res4>().toEqualTypeOf<3>();

		type res5 = MatchTest<{ x: { y: [1, 2, 3] } }>;
		expectTypeOf<res5>().toEqualTypeOf<"x.y[2] === 3">();
	});

	test("should work with constrained arguments", () => {
		type MatchTest<T> = Call<
			Match<
				T,
				[
					Match.With<{ msg: arg0<string> }, Strings.Prepend<"msg: ">>,
					Match.With<{ x: arg0<number>; y: arg1<number> }, Numbers.Add>,
					Match.With<{ x: arg0<string>; y: arg1<string> }, Strings.Prepend>,
				]
			>
		>;

		type res1 = MatchTest<{ msg: "hello" }>;
		expectTypeOf<res1>().toEqualTypeOf<"msg: hello">();

		type res2 = MatchTest<{ x: 1; y: 2 }>;
		expectTypeOf<res2>().toEqualTypeOf<3>();

		type res3 = MatchTest<{ x: "a"; y: "b" }>;
		expectTypeOf<res3>().toEqualTypeOf<"ab">();
	});

	test("Handlers can also be regular values", () => {
		type MatchTest<T> = Call<
			Match<
				T,
				[
					Match.With<{ msg: string }, "a">,
					Match.With<string, "b">,
					Match.With<any, "c">,
				]
			>
		>;

		type res1 = MatchTest<{ msg: "hello" }>;
		expectTypeOf<res1>().toEqualTypeOf<"a">();

		type res2 = MatchTest<"hello">;
		expectTypeOf<res2>().toEqualTypeOf<"b">();

		type res3 = MatchTest<1>;
		expectTypeOf<res3>().toEqualTypeOf<"c">();
	});

	describe("Composition", () => {
		test("Map and Match", () => {
			type Transform<xs extends any[]> = Call<
				Tuples.Map<
					Match<
						[
							Match.With<string, Strings.Replace<"0", "1">>,
							Match.With<number, Numbers.Add<1>>,
							Match.With<boolean, Booleans.Not>,
						]
					>,
					xs
				>
			>;

			type res1 = Transform<[1, 2, "101", true]>;
			expectTypeOf<res1>().toEqualTypeOf<[2, 3, "111", false]>();
		});

		test("RouteToParams", () => {
			type RouteToParams<T> = Pipe<
				T,
				[
					Strings.Split<"/">,
					Tuples.Filter<Strings.StartsWith<"<">>,
					Tuples.ToUnion,
					Unions.Map<
						ComposeLeft<
							[
								Strings.Trim<"<" | ">">,
								Strings.Split<":">,
								Objects.Update<
									"[1]",
									Match<
										[
											Match.With<"string", string>,
											Match.With<"number", number>,
											Match.With<"boolean", boolean>,
										]
									>
								>,
							]
						>
					>,
					Objects.FromEntries,
				]
			>;

			type res1 = RouteToParams<"/users/<id:string>/posts/<index:number>">;
			expectTypeOf<res1>().toEqualTypeOf<{ id: string; index: number }>();

			type res2 = RouteToParams<"/dashboard/<dashId:string>">;
			expectTypeOf<res2>().toEqualTypeOf<{ dashId: string }>();
		});
	});
});
