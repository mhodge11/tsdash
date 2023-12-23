import type { Call, Numbers, Tuples, _ } from "../src/index.ts";

describe("Numbers", () => {
	describe("Add", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Tuples.Reduce<Numbers.Add, 0>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<6>();
		});

		test("can be called with one pre-filled argument", () => {
			type res1 = Call<Tuples.Map<Numbers.Add<1>>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<[2, 3, 4]>();
		});

		test("can be called with 2 pre-filled arguments", () => {
			type res1 = Call<Numbers.Add<1, 2>>;
			expectTypeOf<res1>().toEqualTypeOf<3>();
		});
	});

	describe("Sub", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Tuples.Reduce<Numbers.Sub, 0>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<-6>();

			type res2 = Call<Numbers.Sub, 0, 1>;
			expectTypeOf<res2>().toEqualTypeOf<-1>();
		});

		test("can be called with one pre-filled argument", () => {
			type res1 = Call<Tuples.Map<Numbers.Sub<_, 1>>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<[0, 1, 2]>();
		});

		test("can be called with 2 pre-filled arguments", () => {
			type res1 = Call<Numbers.Sub<1, 2>>;
			expectTypeOf<res1>().toEqualTypeOf<-1>();
		});
		test("should reverse test's function arguments when partial applied", () => {
			type res1 = Call<Numbers.Sub<1>, 2>;
			expectTypeOf<res1>().toEqualTypeOf<1>();
		});

		test("shouldn't reverse if the position is explicit", () => {
			type res1 = Call<Numbers.Sub<1, _>, 2>;
			expectTypeOf<res1>().toEqualTypeOf<-1>();
		});
	});

	describe("Mul", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Tuples.Reduce<Numbers.Mul, 2>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<12>();

			type res2 = Call<Numbers.Mul, 3, 2>;
			expectTypeOf<res2>().toEqualTypeOf<6>();

			type res3 = Call<Numbers.Mul, 3, -2>;
			expectTypeOf<res3>().toEqualTypeOf<-6>();
		});

		test("can be called with one pre-filled argument", () => {
			type res1 = Call<Tuples.Map<Numbers.Mul<_, 2>>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<[2, 4, 6]>();
		});

		test("can be called with 2 pre-filled arguments", () => {
			type res1 = Call<Numbers.Mul<3, 2>>;
			expectTypeOf<res1>().toEqualTypeOf<6>();
		});
	});

	describe("Div", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Tuples.Reduce<Numbers.Div, 20>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<3>;

			type res2 = Call<Numbers.Div, 6, 2>;
			expectTypeOf<res2>().toEqualTypeOf<3>;
		});

		test("can be called with one pre-filled argument", () => {
			type res1 = Call<Tuples.Map<Numbers.Div<_, 2>>, [2, 4, 6]>;
			expectTypeOf<res1>().toEqualTypeOf<[1, 2, 3]>();
		});

		test("can be called with 2 pre-filled arguments", () => {
			type res1 = Call<Numbers.Div<6, 2>>;
			expectTypeOf<res1>().toEqualTypeOf<3>();
		});
	});

	describe("Mod", () => {
		test("can be called without any pre-filled arguments", () => {
			type res2 = Call<Numbers.Mod, 5, 3>;
			expectTypeOf<res2>().toEqualTypeOf<2>();
		});

		test("can be called with one pre-filled argument", () => {
			type res1 = Call<Tuples.Map<Numbers.Mod<_, 5>>, [2, 4, 6]>;
			expectTypeOf<res1>().toEqualTypeOf<[2, 4, 1]>();
		});

		test("can be called with 2 pre-filled arguments", () => {
			type res1 = Call<Numbers.Mod<5, 3>>;
			expectTypeOf<res1>().toEqualTypeOf<2>();
		});
	});

	describe("Negate", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Tuples.Map<Numbers.Negate>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<[-1, -2, -3]>();
		});

		test("can be called with 1 pre-filled arguments", () => {
			type res1 = Call<Numbers.Negate<100>>;
			expectTypeOf<res1>().toEqualTypeOf<-100>();
		});
	});

	describe("Abs", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Tuples.Map<Numbers.Abs>, [-1, 2, -3]>;
			expectTypeOf<res1>().toEqualTypeOf<[1, 2, 3]>();
		});

		test("can be called with 1 pre-filled arguments", () => {
			type res1 = Call<Numbers.Abs<-100>>;
			expectTypeOf<res1>().toEqualTypeOf<100>();
		});
	});

	describe("Power", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Tuples.Reduce<Numbers.Power, 2>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<64>();

			type res2 = Call<Numbers.Power, 2, 3>;
			expectTypeOf<res2>().toEqualTypeOf<8>();

			type res3 = Call<Numbers.Power, 2, -3>;
			expectTypeOf<res3>().toEqualTypeOf<0>();
		});

		test("can be called with one pre-filled arguments", () => {
			type res1 = Call<Tuples.Map<Numbers.Power<_, 2>>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<[1, 4, 9]>();
		});

		test("can be called with 1 pre-filled arguments", () => {
			type res1 = Call<Numbers.Power<2, 3>>;
			expectTypeOf<res1>().toEqualTypeOf<8>();
		});
	});

	describe("Min", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Tuples.Reduce<Numbers.Min, 2>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<1>();

			type res2 = Call<Numbers.Min, 2, 3>;
			expectTypeOf<res2>().toEqualTypeOf<2>();

			type res3 = Call<Numbers.Min, 2, -3>;
			expectTypeOf<res3>().toEqualTypeOf<-3>();
		});

		test("can be called with one pre-filled arguments", () => {
			type res1 = Call<Tuples.Map<Numbers.Min<_, 2>>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<[1, 2, 2]>();
		});

		test("can be called with 1 pre-filled arguments", () => {
			type res1 = Call<Numbers.Min<2, 3>>;
			expectTypeOf<res1>().toEqualTypeOf<2>();
		});
	});

	describe("Max", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Tuples.Reduce<Numbers.Max, 2>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<3>();

			type res2 = Call<Numbers.Max, 2, 3>;
			expectTypeOf<res2>().toEqualTypeOf<3>();

			type res3 = Call<Numbers.Max, 2, -3>;
			expectTypeOf<res3>().toEqualTypeOf<2>();
		});

		test("can be called with one pre-filled arguments", () => {
			type res1 = Call<Tuples.Map<Numbers.Max<_, 2>>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<[2, 2, 3]>();
		});

		test("can be called with 1 pre-filled arguments", () => {
			type res1 = Call<Numbers.Max<2, 3>>;
			expectTypeOf<res1>().toEqualTypeOf<3>();
		});
	});

	describe("Compare", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Numbers.Compare, 3, 2>;
			expectTypeOf<res1>().toEqualTypeOf<1>();

			type res2 = Call<Numbers.Compare, 2, 3>;
			expectTypeOf<res2>().toEqualTypeOf<-1>();

			type res3 = Call<Numbers.Compare, 2, 2>;
			expectTypeOf<res3>().toEqualTypeOf<0>();
		});

		test("can be called with one pre-filled arguments", () => {
			type res1 = Call<Tuples.Map<Numbers.Compare<_, 2>>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<[-1, 0, 1]>();
		});

		test("can be called with 1 pre-filled arguments", () => {
			type res1 = Call<Numbers.Compare<2, 3>>;
			expectTypeOf<res1>().toEqualTypeOf<-1>();
		});
	});

	describe("LessThan", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Numbers.LessThan, 3, 2>;
			expectTypeOf<res1>().toEqualTypeOf<false>();

			type res2 = Call<Numbers.LessThan, 2, 3>;
			expectTypeOf<res2>().toEqualTypeOf<true>();

			type res3 = Call<Numbers.LessThan, 2, 2>;
			expectTypeOf<res3>().toEqualTypeOf<false>();
		});

		test("can be called with one pre-filled arguments", () => {
			type res1 = Call<Tuples.Map<Numbers.LessThan<_, 2>>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<[true, false, false]>();
		});

		test("can be called with 1 pre-filled arguments", () => {
			type res1 = Call<Numbers.LessThan<2, 3>>;
			expectTypeOf<res1>().toEqualTypeOf<true>();
		});
	});

	describe("LessThanOrEqual", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Numbers.LessThanOrEqual, 3, 2>;
			expectTypeOf<res1>().toEqualTypeOf<false>();

			type res2 = Call<Numbers.LessThanOrEqual, 2, 3>;
			expectTypeOf<res2>().toEqualTypeOf<true>();

			type res3 = Call<Numbers.LessThanOrEqual, 2, 2>;
			expectTypeOf<res3>().toEqualTypeOf<true>();
		});

		test("can be called with one pre-filled arguments", () => {
			type res1 = Call<Tuples.Map<Numbers.LessThanOrEqual<_, 2>>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<[true, true, false]>();
		});

		test("can be called with 1 pre-filled arguments", () => {
			type res1 = Call<Numbers.LessThanOrEqual<2, 3>>;
			expectTypeOf<res1>().toEqualTypeOf<true>();
		});
	});

	describe("GreaterThan", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Numbers.GreaterThan, 3, 2>;
			expectTypeOf<res1>().toEqualTypeOf<true>();

			type res2 = Call<Numbers.GreaterThan, 2, 3>;
			expectTypeOf<res2>().toEqualTypeOf<false>();

			type res3 = Call<Numbers.GreaterThan, 2, 2>;
			expectTypeOf<res3>().toEqualTypeOf<false>();
		});

		test("can be called with one pre-filled arguments", () => {
			type res1 = Call<Tuples.Map<Numbers.GreaterThan<_, 2>>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<[false, false, true]>();
		});

		test("can be called with 1 pre-filled arguments", () => {
			type res1 = Call<Numbers.GreaterThan<2, 3>>;
			expectTypeOf<res1>().toEqualTypeOf<false>();
		});

		test("should reverse test's function arguments when partial applied", () => {
			type res4 = Call<Numbers.GreaterThan<1, 2>>;
			expectTypeOf<res4>().toEqualTypeOf<false>();

			type res5 = Call<Numbers.GreaterThan<_, 2>, 1>;
			expectTypeOf<res5>().toEqualTypeOf<false>();

			type res6 = Call<Tuples.Map<Numbers.GreaterThan<_, 2>>, [1, 2, 3]>;
			expectTypeOf<res6>().toEqualTypeOf<[false, false, true]>();

			type res7 = Call<Numbers.GreaterThan<2>, 1>;
			expectTypeOf<res7>().toEqualTypeOf<false>();

			type res8 = Call<Tuples.Map<Numbers.GreaterThan<2>>, [1, 2, 3]>;
			expectTypeOf<res8>().toEqualTypeOf<[false, false, true]>();
		});
	});

	describe("GreaterThanOrEqual", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Numbers.GreaterThanOrEqual, 3, 2>;
			expectTypeOf<res1>().toEqualTypeOf<true>();

			type res2 = Call<Numbers.GreaterThanOrEqual, 2, 3>;
			expectTypeOf<res2>().toEqualTypeOf<false>();

			type res3 = Call<Numbers.GreaterThanOrEqual, 2, 2>;
			expectTypeOf<res3>().toEqualTypeOf<true>();
		});

		test("can be called with one pre-filled arguments", () => {
			type res1 = Call<Tuples.Map<Numbers.GreaterThanOrEqual<_, 2>>, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<[false, true, true]>();
		});

		test("can be called with 1 pre-filled arguments", () => {
			type res1 = Call<Numbers.GreaterThanOrEqual<2, 3>>;
			expectTypeOf<res1>().toEqualTypeOf<false>();
		});
	});
});
