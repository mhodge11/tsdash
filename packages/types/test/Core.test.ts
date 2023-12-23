import type { MergeArgs } from "../src/core/internal/MergeArgs.ts";
import type {
	Call,
	Identity,
	Numbers,
	Pipe,
	PipeRight,
	Strings,
	Tuples,
	_,
	unset,
} from "../src/index.ts";

describe("Core", () => {
	test("Identity", () => {
		// check primitives
		type res1 = Call<Identity, string>;
		expectTypeOf<res1>().toEqualTypeOf<string>();

		type res2 = Call<Identity, undefined>;
		expectTypeOf<res2>().toEqualTypeOf<undefined>();

		// check unions
		type res3 = Call<Identity, string | number>;
		expectTypeOf<res3>().toEqualTypeOf<string | number>();
	});

	describe("MergeArgs", () => {
		test("should remove unset args from partialArgs", () => {
			type pipedArgs1 = ["hello"];
			type partialArgs1 = [unset, unset];
			type res1 = MergeArgs<pipedArgs1, partialArgs1>;
			expectTypeOf<res1>().toEqualTypeOf<["hello"]>();

			type pipedArgs2 = [1, 2];
			type partialArgs2 = [unset, unset];
			type res2 = MergeArgs<pipedArgs2, partialArgs2>;
			expectTypeOf<res2>().toEqualTypeOf<[1, 2]>();
		});

		test("should support never", () => {
			type pipedArgs1 = ["hello"];
			type partialArgs1 = ["a" | "b", never];
			type res1 = MergeArgs<pipedArgs1, partialArgs1>;
			expectTypeOf<res1>().toEqualTypeOf<["a" | "b", never, "hello"]>();
		});
	});

	describe("Composition", () => {
		test("Pipe", () => {
			type res1 = Pipe<
				[1, 2, 3, 4, 3, 4, 124678765435897587654478964568576n],
				[
					Tuples.Map<Numbers.Add<3>>,
					Tuples.Join<".">,
					Strings.Split<".">,
					Tuples.Map<Strings.ToNumber>,
					Tuples.Map<Numbers.Add<10>>,
					Tuples.Map<Numbers.Sub<_, 1>>,
					Tuples.Sum,
				]
			>;
			expectTypeOf<res1>().toEqualTypeOf<124678765435897587654478964568677n>();
		});

		test("PipeRight", () => {
			type res1 = PipeRight<
				[
					Tuples.Sum,
					Tuples.Map<Numbers.Add<10>>,
					Tuples.Map<Strings.ToNumber>,
					Strings.Split<".">,
					Tuples.Join<".">,
					Tuples.Map<Numbers.Add<3>>,
				],
				[1, 2, 3, 4, 3, 4]
			>;

			expectTypeOf<res1>().toEqualTypeOf<95>();
		});
	});
});
