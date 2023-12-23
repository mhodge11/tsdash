import type {
	Booleans,
	Call,
	Fn,
	Numbers,
	Pipe,
	Strings,
	Tuples,
	_,
} from "../src/index.ts";

describe("Tuples", () => {
	test("Head", () => {
		type res1 = Call<Tuples.Head, [1, 2, 3]>;
		expectTypeOf<res1>().toEqualTypeOf<1>();

		type res2 = Call<Tuples.Head<[1, 2, 3]>>;
		expectTypeOf<res2>().toEqualTypeOf<1>();
	});

	test("Tail", () => {
		type res1 = Call<Tuples.Tail, [1, 2, 3]>;
		expectTypeOf<res1>().toEqualTypeOf<[2, 3]>();

		type res2 = Call<Tuples.Tail<[1, 2, 3]>>;
		expectTypeOf<res2>().toEqualTypeOf<[2, 3]>();
	});

	test("Last", () => {
		type res1 = Call<Tuples.Last, [1, 2, 3]>;
		expectTypeOf<res1>().toEqualTypeOf<3>();

		type res2 = Call<Tuples.Last<[1, 2, 3]>>;
		expectTypeOf<res2>().toEqualTypeOf<3>();
	});

	test("Map", () => {
		interface ToPhrase extends Fn {
			return: `number is ${Extract<this["arg0"], string | number | boolean>}`;
		}

		type res1 = Call<Tuples.Map<ToPhrase>, [1, 2, 3]>;
		expectTypeOf<res1>().toEqualTypeOf<
			["number is 1", "number is 2", "number is 3"]
		>();

		type res2 = Call<Tuples.Map<ToPhrase, [1, 2, 3]>>;
		expectTypeOf<res2>().toEqualTypeOf<
			["number is 1", "number is 2", "number is 3"]
		>();
	});

	test("Filter", () => {
		interface IsNumber extends Fn {
			return: this["arg0"] extends number ? true : false;
		}

		type res1 = Call<Tuples.Filter<IsNumber>, [1, 2, "oops", 3]>;
		expectTypeOf<res1>().toEqualTypeOf<[1, 2, 3]>();

		type res2 = Call<Tuples.Filter<IsNumber>, readonly [1, 2, "oops", 3]>;
		expectTypeOf<res2>().toEqualTypeOf<[1, 2, 3]>();

		type res3 = Call<Tuples.Filter<IsNumber, [1, 2, "oops", 3]>>;
		expectTypeOf<res3>().toEqualTypeOf<[1, 2, 3]>();

		type res4 = Call<Tuples.Filter<IsNumber, readonly [1, 2, "oops", 3]>>;
		expectTypeOf<res4>().toEqualTypeOf<[1, 2, 3]>();
	});

	test("Reduce", () => {
		interface ToUnaryTupleArray extends Fn {
			return: this["args"] extends [infer acc extends any[], infer item]
				? [...acc, [item]]
				: never;
		}

		type res1 = Call<Tuples.Reduce<ToUnaryTupleArray, []>, [1, 2, 3]>;
		expectTypeOf<res1>().toEqualTypeOf<[[1], [2], [3]]>();

		type res2 = Call<Tuples.Reduce<ToUnaryTupleArray, [], [1, 2, 3]>>;
		expectTypeOf<res2>().toEqualTypeOf<[[1], [2], [3]]>();
	});

	test("ReduceRight", () => {
		interface ToUnaryTupleArray extends Fn {
			return: this["args"] extends [infer acc extends any[], infer item]
				? [...acc, [item]]
				: never;
		}

		type res1 = Call<Tuples.ReduceRight<ToUnaryTupleArray, []>, [1, 2, 3]>;
		expectTypeOf<res1>().toEqualTypeOf<[[3], [2], [1]]>();

		type res2 = Call<Tuples.ReduceRight<ToUnaryTupleArray, [], [1, 2, 3]>>;
		expectTypeOf<res2>().toEqualTypeOf<[[3], [2], [1]]>();
	});

	test("FlatMap", () => {
		interface Duplicate extends Fn {
			return: [this["arg0"], this["arg0"]];
		}

		type res1 = Call<Tuples.FlatMap<Duplicate>, [1, 2, 3]>;
		expectTypeOf<res1>().toEqualTypeOf<[1, 1, 2, 2, 3, 3]>();

		type res2 = Call<Tuples.FlatMap<Duplicate, [1, 2, 3]>>;
		expectTypeOf<res2>().toEqualTypeOf<[1, 1, 2, 2, 3, 3]>();
	});

	test("Find", () => {
		interface IsNumber extends Fn {
			return: this["arg0"] extends number ? true : false;
		}

		type res1 = Call<Tuples.Find<IsNumber>, ["a", "b", "c", 2, "d"]>;
		expectTypeOf<res1>().toEqualTypeOf<2>();

		interface IsSecond extends Fn {
			return: this["arg1"] extends 1 ? true : false;
		}

		type res2 = Call<Tuples.Find<IsSecond>, ["a", "b", "c", 2, "d"]>;
		expectTypeOf<res2>().toEqualTypeOf<"b">();

		type res3 = Call<Tuples.Find<IsSecond, ["a", "b", "c", 2, "d"]>>;
		expectTypeOf<res3>().toEqualTypeOf<"b">();
	});

	test("Reverse", () => {
		type res1 = Call<Tuples.Reverse, ["a", "b", "c", 2, "d"]>;
		expectTypeOf<res1>().toEqualTypeOf<["d", 2, "c", "b", "a"]>();
	});

	test("Drop", () => {
		type res1 = Call<Tuples.Drop<1>, ["a", "b", "c", 2, "d"]>;
		expectTypeOf<res1>().toEqualTypeOf<["b", "c", 2, "d"]>();

		type res2 = Call<Tuples.Drop<2>, ["a", "b", "c", 2, "d"]>;
		expectTypeOf<res2>().toEqualTypeOf<["c", 2, "d"]>();

		type res3 = Call<Tuples.Drop<2, ["a", "b", "c", 2, "d"]>>;
		expectTypeOf<res3>().toEqualTypeOf<["c", 2, "d"]>();
	});

	test("Take", () => {
		type res1 = Call<Tuples.Take<1>, ["a", "b", "c", 2, "d"]>;
		expectTypeOf<res1>().toEqualTypeOf<["a"]>();

		type res2 = Call<Tuples.Take<2>, ["a", "b", "c", 2, "d"]>;
		expectTypeOf<res2>().toEqualTypeOf<["a", "b"]>();

		type res3 = Call<Tuples.Take<2, ["a", "b", "c", 2, "d"]>>;
		expectTypeOf<res3>().toEqualTypeOf<["a", "b"]>();
	});

	test("TakeWhile", () => {
		type res1 = Call<
			Tuples.TakeWhile<Booleans.Extends<_, string>>,
			["a", "b", "c", 2, "d"]
		>;
		expectTypeOf<res1>().toEqualTypeOf<["a", "b", "c"]>();

		type res2 = Call<
			Tuples.TakeWhile<Booleans.Extends<_, number>>,
			[1, 2, "a", "b", "c", 2, "d"]
		>;
		expectTypeOf<res2>().toEqualTypeOf<[1, 2]>();

		type res3 = Call<
			Tuples.TakeWhile<
				Booleans.Extends<_, number>,
				[1, 2, "a", "b", "c", 2, "d"]
			>
		>;
		expectTypeOf<res3>().toEqualTypeOf<[1, 2]>();
	});

	test("Every", () => {
		type res1 = Call<
			Tuples.Every<Booleans.Extends<_, string>>,
			["a", "b", "c", "d"]
		>;
		expectTypeOf<res1>().toEqualTypeOf<true>();

		type res2 = Call<
			Tuples.Every<Booleans.Extends<_, number>>,
			[1, 2, "a", "b", "c", 2, "d"]
		>;
		expectTypeOf<res2>().toEqualTypeOf<false>();
	});

	test("Some", () => {
		type res1 = Call<
			Tuples.Some<Booleans.Extends<_, number>>,
			["a", "b", "c", "d"]
		>;
		expectTypeOf<res1>().toEqualTypeOf<false>();

		type res2 = Call<
			Tuples.Some<Booleans.Extends<_, number>>,
			[1, 2, "a", "b", "c", 2, "d"]
		>;
		expectTypeOf<res2>().toEqualTypeOf<true>();
	});

	test("Sort Numbers (default)", () => {
		type res1 = Call<Tuples.Sort, [7, 1, 3, 2, 6, 5, 8, 4]>;
		expectTypeOf<res1>().toEqualTypeOf<[1, 2, 3, 4, 5, 6, 7, 8]>();
	});

	test("Sort Numbers (custom)", () => {
		type res1 = Call<
			Tuples.Sort<Numbers.GreaterThanOrEqual>,
			[7, 1, 3, 2, 6, 5, 8, 4]
		>;
		expectTypeOf<res1>().toEqualTypeOf<[8, 7, 6, 5, 4, 3, 2, 1]>();
	});

	test("Sort Strings (custom)", () => {
		type res1 = Call<
			Tuples.Sort<Strings.LessThanOrEqual>,
			["c", "a", "f", "b", "e", "d"]
		>;
		expectTypeOf<res1>().toEqualTypeOf<["a", "b", "c", "d", "e", "f"]>();
	});

	test("Join", () => {
		type res1 = Call<Tuples.Join<".">, [1, 2, 3]>;
		expectTypeOf<res1>().toEqualTypeOf<"1.2.3">();
	});

	test("Append", () => {
		type res1 = Call<Tuples.Append<4>, [1, 2, 3]>;
		expectTypeOf<res1>().toEqualTypeOf<[1, 2, 3, 4]>();

		type res2 = Call<Tuples.Append<4, [1, 2, 3]>>;
		expectTypeOf<res2>().toEqualTypeOf<[1, 2, 3, 4]>();
	});

	test("Prepend", () => {
		type res1 = Call<Tuples.Prepend<0>, [1, 2, 3]>;
		expectTypeOf<res1>().toEqualTypeOf<[0, 1, 2, 3]>();

		type res2 = Call<Tuples.Prepend<0, [1, 2, 3]>>;
		expectTypeOf<res2>().toEqualTypeOf<[0, 1, 2, 3]>();
	});

	test("Concat", () => {
		type res1 = Call<Tuples.Concat<[0]>, [1, 2, 3]>;
		expectTypeOf<res1>().toEqualTypeOf<[0, 1, 2, 3]>();

		type res2 = Call<Tuples.Concat<[1, 2], [3]>>;
		expectTypeOf<res2>().toEqualTypeOf<[1, 2, 3]>();
	});

	test("Partition", () => {
		type res1 = Call<
			Tuples.Partition<Booleans.Extends<number>>,
			[1, "a", 2, "b", 3, "c"]
		>;
		expectTypeOf<res1>().toEqualTypeOf<[[1, 2, 3], ["a", "b", "c"]]>();

		type res2 = Pipe<
			[1, "a", 2, "b", 3, "c"],
			[Tuples.Partition<Booleans.Extends<number>>, Tuples.At<0>, Tuples.At<2>]
		>;
		expectTypeOf<res2>().toEqualTypeOf<3>();
	});

	test("At", () => {
		type res1 = Call<Tuples.At<2, [1, "a", 2, "b", 3, "c"]>>;
		expectTypeOf<res1>().toEqualTypeOf<2>();

		// check out of bounds
		type res2 = Call<Tuples.At<6, [1, "a", 2, "b", 3, "c"]>>;
		expectTypeOf<res2>().toEqualTypeOf<undefined>();
	});

	test("SplitAt", () => {
		type res0 = Call<Tuples.SplitAt<2>, [1, 2, 3, 4]>;
		expectTypeOf<res0>().toEqualTypeOf<[[1, 2], [3, 4]]>();

		type res1 = Call<Tuples.SplitAt<2>, [1]>;
		expectTypeOf<res1>().toEqualTypeOf<[[1], []]>();
	});

	test("IsEmpty", () => {
		type res1 = Call<Tuples.IsEmpty<[1, "a", 2, "b", 3, "c"]>>;
		expectTypeOf<res1>().toEqualTypeOf<false>();

		type res2 = Call<Tuples.IsEmpty, []>;
		expectTypeOf<res2>().toEqualTypeOf<true>();

		type res3 = Call<Tuples.IsEmpty<[]>>;
		expectTypeOf<res3>().toEqualTypeOf<true>();
	});

	test("Zip", () => {
		type res1 = Call<Tuples.Zip<[1, 2, 3]>, ["a", "b", "c"]>;
		expectTypeOf<res1>().toEqualTypeOf<[[1, "a"], [2, "b"], [3, "c"]]>();

		type res2 = Call<Tuples.Zip, [1, 2, 3], ["a", "b", "c"]>;
		expectTypeOf<res2>().toEqualTypeOf<[[1, "a"], [2, "b"], [3, "c"]]>();

		type res3 = Call<Tuples.Zip<[1, 2, 3], ["a", "b", "c"]>>;
		expectTypeOf<res3>().toEqualTypeOf<[[1, "a"], [2, "b"], [3, "c"]]>();

		type res4 = Call<
			Tuples.Zip<[1, 2, 3], ["a", "b", "c"], [true, false, true]>
		>;
		expectTypeOf<res4>().toEqualTypeOf<
			[[1, "a", true], [2, "b", false], [3, "c", true]]
		>();
	});

	test("ZipWith", () => {
		type res1 = Call<Tuples.ZipWith<Numbers.Add>, [1, 2, 3], [4, 5, 6]>;
		expectTypeOf<res1>().toEqualTypeOf<[5, 7, 9]>();

		type res2 = Call<Tuples.ZipWith<Numbers.Add, [1, 2, 3], [4, 5, 6]>>;
		expectTypeOf<res2>().toEqualTypeOf<[5, 7, 9]>();

		type res3 = Pipe<[1, 2, 3], [Tuples.ZipWith<Numbers.Add, [4, 5, 6]>]>;
		expectTypeOf<res3>().toEqualTypeOf<[5, 7, 9]>();
	});

	test("GroupBy", () => {
		interface GetTypeKey extends Fn {
			return: this["arg0"] extends { type: infer Type } ? Type : never;
		}
		type res1 = Call<
			Tuples.GroupBy<GetTypeKey>,
			[
				{ type: "img"; src: string },
				{ type: "video"; src: 1 },
				{ type: "video"; src: 2 },
			]
		>;
		expectTypeOf<res1>().toEqualTypeOf<{
			img: [{ type: "img"; src: string }];
			video: [{ type: "video"; src: 1 }, { type: "video"; src: 2 }];
		}>();
	});

	test("Range", () => {
		type res0 = Call<Tuples.Range<3>, 7>;
		expectTypeOf<res0>().toEqualTypeOf<[3, 4, 5, 6, 7]>();

		type res1 = Call<Tuples.Range<_, 10>, 5>;
		expectTypeOf<res1>().toEqualTypeOf<[5, 6, 7, 8, 9, 10]>();

		type res3 = Call<Tuples.Range<-2, 2>>;
		expectTypeOf<res3>().toEqualTypeOf<[-2, -1, 0, 1, 2]>();

		type res4 = Call<Tuples.Range<-5, -2>>;
		expectTypeOf<res4>().toEqualTypeOf<[-5, -4, -3, -2]>();
	});

	test("Min", () => {
		type res1 = Call<Tuples.Min<[1, 2, 3]>>;
		expectTypeOf<res1>().toEqualTypeOf<1>();

		type res2 = Call<Tuples.Min<[-1, -2, -3]>>;
		expectTypeOf<res2>().toEqualTypeOf<-3>();

		type res3 = Call<Tuples.Min<[]>>;
		expectTypeOf<res3>().toEqualTypeOf<never>();
	});

	test("Max", () => {
		type res1 = Call<Tuples.Max<[1, 2, 3]>>;
		expectTypeOf<res1>().toEqualTypeOf<3>();

		type res2 = Call<Tuples.Max<[-1, -2, -3]>>;
		expectTypeOf<res2>().toEqualTypeOf<-1>();

		type res3 = Call<Tuples.Max<[]>>;
		expectTypeOf<res3>().toEqualTypeOf<never>();
	});

	test("ToUnion", () => {
		type res1 = Call<Tuples.ToUnion<[1, "a", 2, "b", 3, "c"]>>;
		expectTypeOf<res1>().toEqualTypeOf<1 | "a" | 2 | "b" | 3 | "c">();
	});

	test("ToIntersection", () => {
		type res1 = Call<Tuples.ToIntersection, [1, 2, 3]>;
		expectTypeOf<res1>().toEqualTypeOf<never>();

		type res2 = Call<Tuples.ToIntersection, [{ a: string }, { b: number }]>;
		expectTypeOf<res2>().toEqualTypeOf<{ a: string } & { b: number }>();

		type res3 = Call<Tuples.ToIntersection, [{ a: string } & { b: number }]>;
		expectTypeOf<res3>().toEqualTypeOf<{ a: string } & { b: number }>();

		type res4 = Call<Tuples.ToIntersection, [[1, 2, 3]]>;
		expectTypeOf<res4>().toEqualTypeOf<[1, 2, 3]>();

		type res5 = Call<
			Tuples.ToIntersection,
			[string | number, string, "hello" | "hi"]
		>;
		expectTypeOf<res5>().toEqualTypeOf<"hello" | "hi">();
	});

	test("Composition", () => {
		interface Duplicate extends Fn {
			return: [this["arg0"], this["arg0"]];
		}

		// biome-ignore format: Formatting is broken here
		type res = Pipe<
			[1, 2, 3, 4, 5, 5, 6],
			[
				Tuples.FlatMap<Duplicate>,
				Tuples.Map<Numbers.Add<3>>,
				Tuples.Drop<3>,
				Tuples.Take<6>,
				Tuples.Sum,
			]
		>;

		expectTypeOf<res>().toEqualTypeOf<39>();

		type Factorial<N extends number> = Pipe<
			N,
			[Tuples.Range<1, _>, Tuples.Reduce<Numbers.Mul, 1>]
		>;

		type res2 = Factorial<7>;
		expectTypeOf<res2>().toEqualTypeOf<5040>();

		type res3 = Factorial<9>;
		expectTypeOf<res3>().toEqualTypeOf<362880>();
	});
});
