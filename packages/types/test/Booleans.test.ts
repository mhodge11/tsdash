import { Booleans, Call, Tuples, _ } from "../src/index";

describe("Booleans", () => {
	describe("And", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Tuples.Reduce<Booleans.And, true>, [true, true, false]>;
			expectTypeOf<res1>().toEqualTypeOf<false>();
		});

		test("can be called with one pre-filled argument", () => {
			type res1 = Call<Tuples.Map<Booleans.And<true>>, [true, false, true]>;
			expectTypeOf<res1>().toEqualTypeOf<[true, false, true]>();
		});

		test("can be called with 2 pre-filled arguments", () => {
			type res1 = Call<Booleans.And<true, true>>;
			expectTypeOf<res1>().toEqualTypeOf<true>();

			type res2 = Call<Booleans.And<false, false>>;
			expectTypeOf<res2>().toEqualTypeOf<false>();

			type res3 = Call<Booleans.And<true, false>>;
			expectTypeOf<res3>().toEqualTypeOf<false>();

			type res4 = Call<Booleans.And<false, true>>;
			expectTypeOf<res4>().toEqualTypeOf<false>();
		});
	});

	describe("Or", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Tuples.Reduce<Booleans.Or, false>, [false, true, false]>;
			expectTypeOf<res1>().toEqualTypeOf<true>();
		});

		test("can be called with one pre-filled argument", () => {
			type res1 = Call<Tuples.Map<Booleans.Or<true>>, [true, false, true]>;
			expectTypeOf<res1>().toEqualTypeOf<[true, true, true]>();
		});

		test("can be called with 2 pre-filled arguments", () => {
			type res1 = Call<Booleans.Or<false, false>>;
			expectTypeOf<res1>().toEqualTypeOf<false>();

			type res2 = Call<Booleans.Or<true, false>>;
			expectTypeOf<res2>().toEqualTypeOf<true>();

			type res3 = Call<Booleans.Or<false, true>>;
			expectTypeOf<res3>().toEqualTypeOf<true>();

			type res4 = Call<Booleans.Or<true, true>>;
			expectTypeOf<res4>().toEqualTypeOf<true>();
		});
	});

	describe("XOr", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<Tuples.Reduce<Booleans.XOr, true>, [false, true, false]>;
			expectTypeOf<res1>().toEqualTypeOf<false>();
		});

		test("can be called with one pre-filled argument", () => {
			type res1 = Call<Tuples.Map<Booleans.XOr<true>>, [true, false, true]>;
			expectTypeOf<res1>().toEqualTypeOf<[false, true, false]>();
		});

		test("can be called with 2 pre-filled arguments", () => {
			type res1 = Call<Booleans.XOr<true, true>>;
			expectTypeOf<res1>().toEqualTypeOf<false>();

			type res2 = Call<Booleans.XOr<false, false>>;
			expectTypeOf<res2>().toEqualTypeOf<false>();

			type res3 = Call<Booleans.XOr<true, false>>;
			expectTypeOf<res3>().toEqualTypeOf<true>();

			type res4 = Call<Booleans.XOr<false, true>>;
			expectTypeOf<res4>().toEqualTypeOf<true>();
		});
	});

	test("Not", () => {
		type res1 = Call<Booleans.Not, true>;
		expectTypeOf<res1>().toEqualTypeOf<false>();

		type res2 = Call<Booleans.Not<true>>;
		expectTypeOf<res2>().toEqualTypeOf<false>();
	});

	describe("Extends", () => {
		test("should check if a type is assignable to another type", () => {
			type res1 = Call<Booleans.Extends<".">, [1, 2, 3]>;
			expectTypeOf<res1>().toEqualTypeOf<false>();

			type res2 = Call<Booleans.Extends<"a", string>>;
			expectTypeOf<res2>().toEqualTypeOf<true>();

			type res3 = Call<Booleans.Extends<string, "a">>;
			expectTypeOf<res3>().toEqualTypeOf<false>();
		});

		test("should reverse test's function arguments when partial applied", () => {
			type res4 = Call<Booleans.Extends<1, number>>;
			expectTypeOf<res4>().toEqualTypeOf<true>();

			type res5 = Call<Booleans.Extends<_, 2>, 1>;
			expectTypeOf<res5>().toEqualTypeOf<false>();

			type res6 = Call<Tuples.Map<Booleans.Extends<_, number>>, [1, "2", 3]>;
			expectTypeOf<res6>().toEqualTypeOf<[true, false, true]>();

			type res7 = Call<Booleans.Extends<number>, 1>;
			expectTypeOf<res7>().toEqualTypeOf<true>();

			type res8 = Call<Tuples.Map<Booleans.Extends<number>>, [1, "2", 3]>;
			expectTypeOf<res8>().toEqualTypeOf<[true, false, true]>();
		});
	});

	test("Equals", () => {
		type res1 = Call<Booleans.Equals<".">, ".">;
		expectTypeOf<res1>().toEqualTypeOf<true>();
	});

	test("DoesNotExtend", () => {
		type res1 = Call<Booleans.DoesNotExtend<"a">, "b">;
		expectTypeOf<res1>().toEqualTypeOf<true>();
	});
});
