import type {
	Apply,
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
	_,
	arg0,
	arg1,
	arg2,
	arg3,
} from "../src/index.ts";

describe("Objects", () => {
	describe("Create", () => {
		test("should support regular objects and output them as is", () => {
			type res1 = Call<Objects.Create, { a: string; b: number }>;
			expectTypeOf<res1>().toEqualTypeOf<{ a: string; b: number }>();
		});

		test("should interpolate arguments", () => {
			type res2 = Apply<Objects.Create<{ a: arg0; b: arg1 }>, [1, 2]>;
			expectTypeOf<res2>().toEqualTypeOf<{ a: 1; b: 2 }>();

			type res3 = Apply<
				Objects.Create<{ a: arg0; b: [arg1, arg2]; c: { d: arg3 } }>,
				[1, 2, 3, 4]
			>;
			expectTypeOf<res3>().toEqualTypeOf<{ a: 1; b: [2, 3]; c: { d: 4 } }>();
		});

		test("should support arbitrary functions", () => {
			type res1 = Call<
				Objects.Create<{
					addition: Numbers.Add<10, _>;
					division: Numbers.Div<_, 2>;
					nested: [Numbers.GreaterThan<0>];
					recursion: ComposeLeft<
						[
							Objects.Create<{
								label: Strings.Prepend<"number: ">;
								content: Strings.Append<" is the number we got!">;
							}>,
							Objects.Create<{
								post: arg0;
							}>,
						]
					>;
				}>,
				10
			>;
			expectTypeOf<res1>().toEqualTypeOf<{
				addition: 20;
				division: 5;
				nested: [true];
				recursion: {
					post: {
						label: "number: 10";
						content: "10 is the number we got!";
					};
				};
			}>();

			type res3 = Apply<
				Objects.Create<{ a: arg0; b: [arg1, arg2]; c: { d: arg3 } }>,
				[1, 2, 3, 4]
			>;
			expectTypeOf<res3>().toEqualTypeOf<{ a: 1; b: [2, 3]; c: { d: 4 } }>();
		});
	});

	describe("Update", () => {
		test("basic", () => {
			type res0 = Call<Objects.Update<"a", Numbers.Add<1>>, { a: 1; b: 1 }>;
			expectTypeOf<res0>().toEqualTypeOf<{ a: 2; b: 1 }>();

			type res1 = Call<Objects.Update<"a[0]", 4>, { a: [1, 2, 3] }>;
			expectTypeOf<res1>().toEqualTypeOf<{ a: [4, 2, 3] }>();

			type res2 = Call<
				Objects.Update<"a.b", Numbers.Add<1>>,
				{ a: { b: 1 }; c: "" }
			>;
			expectTypeOf<res2>().toEqualTypeOf<{ a: { b: 2 }; c: "" }>();

			type res3 = Call<Objects.Update<"a.b", "Hello">, { a: { b: 1 } }>;
			expectTypeOf<res3>().toEqualTypeOf<{ a: { b: "Hello" } }>();
		});

		test("should add new properties if they do not exist", () => {
			type res4 = Call<Objects.Update<"a.b", 2>, { a: { c: 1 } }>;
			expectTypeOf<res4>().toEqualTypeOf<{ a: { c: 1; b: 2 } }>();

			type res5 = Call<Objects.Update<"a.b.c.d", 2>, { a: { e: 1 } }>;
			expectTypeOf<res5>().toEqualTypeOf<{ a: { b: { c: { d: 2 } }; e: 1 } }>();
		});
	});

	test("FromEntries", () => {
		type res1 = Call<Objects.FromEntries, ["a", string] | ["b", number]>;
		expectTypeOf<res1>().toEqualTypeOf<{ a: string; b: number }>();
	});

	test("Entries", () => {
		type res1 = Call<Objects.Entries, { a: string; b: number }>;

		expectTypeOf<res1>().toEqualTypeOf<["a", string] | ["b", number]>();

		type res2 = Call<Objects.Entries, ["a", "b"]>;
		expectTypeOf<res2>().toEqualTypeOf<[0, "a"] | [1, "b"]>();
	});

	test("Entries >> FromEntries identity", () => {
		type res1 = Pipe<
			{ a: string; b: number },
			[Objects.Entries, Objects.FromEntries]
		>;
		expectTypeOf<res1>().toEqualTypeOf<{ a: string; b: number }>();
	});

	test("MapValues", () => {
		type res1 = Call<Objects.MapValues<Strings.ToString>, { a: 1; b: true }>;
		expectTypeOf<res1>().toEqualTypeOf<{ a: "1"; b: "true" }>();
	});

	test("MapKeys", () => {
		type res1 = Call<
			Objects.MapKeys<Strings.Prepend<"get_">>,
			{ a: 1; b: true }
		>;
		expectTypeOf<res1>().toEqualTypeOf<{ get_a: 1; get_b: true }>();
	});

	test("Pick", () => {
		type res1 = Call<Objects.Pick<"a">, { a: 1; b: true }>;
		expectTypeOf<res1>().toEqualTypeOf<{ a: 1 }>();
	});

	test("Readonly", () => {
		type res1 = Call<Objects.Readonly, { a: 1; b: true }>;
		expectTypeOf<res1>().toEqualTypeOf<{ readonly a: 1; readonly b: true }>();

		type res2 = Call<Objects.Readonly<{ a: 1; b: true }>>;
		expectTypeOf<res2>().toEqualTypeOf<{ readonly a: 1; readonly b: true }>();
	});

	test("Required", () => {
		type res1 = Call<Objects.Required, { a?: 1; b?: true }>;
		expectTypeOf<res1>().toEqualTypeOf<{ a: 1; b: true }>();

		type res2 = Call<Objects.Required<{ a?: 1; b?: true }>>;
		expectTypeOf<res2>().toEqualTypeOf<{ a: 1; b: true }>();
	});

	test("Partial", () => {
		type res1 = Call<Objects.Partial, { a: 1; b: true }>;
		expectTypeOf<res1>().toEqualTypeOf<{ a?: 1; b?: true }>();

		type res2 = Call<Objects.Partial<{ a: 1; b: true }>>;
		expectTypeOf<res2>().toEqualTypeOf<{ a?: 1; b?: true }>();
	});

	test("Omit", () => {
		type res1 = Call<Objects.Omit<"a">, { a: 1; b: true }>;
		expectTypeOf<res1>().toEqualTypeOf<{ b: true }>();
	});

	test("PickBy", () => {
		type res1 = Call<
			Objects.PickBy<Booleans.Extends<1>>,
			{ a: 1; b: true; c: 1 }
		>;
		expectTypeOf<res1>().toEqualTypeOf<{ a: 1; c: 1 }>();
	});

	test("OmitBy", () => {
		type res1 = Call<
			Objects.OmitBy<Booleans.Extends<1>>,
			{ a: 1; b: true; c: 1 }
		>;
		expectTypeOf<res1>().toEqualTypeOf<{ b: true }>();
	});

	describe("PartialDeep", () => {
		test("primitives", () => {
			type res0 = Call<Objects.PartialDeep, number>;
			expectTypeOf<res0>().toEqualTypeOf<number>();

			type res1 = Call<Objects.PartialDeep, string>;
			expectTypeOf<res1>().toEqualTypeOf<string>();

			type res2 = Call<Objects.PartialDeep, boolean>;
			expectTypeOf<res2>().toEqualTypeOf<boolean>();

			type res3 = Call<Objects.PartialDeep, bigint>;
			expectTypeOf<res3>().toEqualTypeOf<bigint>();

			type res4 = Call<Objects.PartialDeep, symbol>;
			expectTypeOf<res4>().toEqualTypeOf<symbol>();

			type res5 = Call<Objects.PartialDeep, undefined>;
			expectTypeOf<res5>().toEqualTypeOf<undefined>();

			type res6 = Call<Objects.PartialDeep, null>;
			expectTypeOf<res6>().toEqualTypeOf<null>();

			type res7 = Call<Objects.PartialDeep, Function>;
			expectTypeOf<res7>().toEqualTypeOf<Function>();
		});

		test("Map & Set", () => {
			type res0 = Call<Objects.PartialDeep, Map<string, boolean>>;
			expectTypeOf<res0>().toEqualTypeOf<Map<string, boolean>>();

			type res1 = Call<Objects.PartialDeep, Map<string, { a: number }>>;
			expectTypeOf<res1>().toEqualTypeOf<Map<string, { a?: number }>>();

			type res2 = Call<Objects.PartialDeep, ReadonlyMap<string, boolean>>;
			expectTypeOf<res2>().toEqualTypeOf<ReadonlyMap<string, boolean>>();

			type res3 = Call<
				Objects.PartialDeep,
				ReadonlyMap<string, { checked: boolean }>
			>;
			expectTypeOf<res3>().toEqualTypeOf<
				ReadonlyMap<string, { checked?: boolean }>
			>();

			type res4 = Call<Objects.PartialDeep, WeakMap<{ key: string }, boolean>>;
			expectTypeOf<res4>().toEqualTypeOf<WeakMap<{ key?: string }, boolean>>();

			type res5 = Call<
				Objects.PartialDeep,
				WeakMap<{ key: string }, { value: boolean }>
			>;
			expectTypeOf<res5>().toEqualTypeOf<
				WeakMap<{ key?: string }, { value?: boolean }>
			>();

			type res6 = Call<Objects.PartialDeep, Set<string>>;
			expectTypeOf<res6>().toEqualTypeOf<Set<string>>();

			type res7 = Call<Objects.PartialDeep, Set<number[]>>;
			expectTypeOf<res7>().toEqualTypeOf<Set<(number | undefined)[]>>();

			type res8 = Call<Objects.PartialDeep, ReadonlySet<string>>;
			expectTypeOf<res8>().toEqualTypeOf<ReadonlySet<string>>();
		});

		test("Objects and Arrays", () => {
			type res1 = Call<Objects.PartialDeep, []>;
			expectTypeOf<res1>().toEqualTypeOf<[]>();

			type res2 = Call<Objects.PartialDeep, never[]>;
			expectTypeOf<res2>().toEqualTypeOf<undefined[]>();

			type res3 = Call<Objects.PartialDeep, [1, 2, 3]>;
			expectTypeOf<res3>().toEqualTypeOf<
				[(1 | undefined)?, (2 | undefined)?, (3 | undefined)?]
			>();

			type res4 = Call<Objects.PartialDeep, readonly number[]>;
			expectTypeOf<res4>().toEqualTypeOf<readonly (number | undefined)[]>();

			type res5 = Call<Objects.PartialDeep, number[]>;
			expectTypeOf<res5>().toEqualTypeOf<(number | undefined)[]>();

			type res6 = Call<Objects.PartialDeep, number[]>;
			expectTypeOf<res6>().toEqualTypeOf<Array<number | undefined>>();

			type res7 = Call<
				Objects.PartialDeep,
				{ readonly obj: unknown; readonly arr: readonly unknown[] }
			>;
			expectTypeOf<res7>().toEqualTypeOf<{
				readonly obj?: unknown;
				readonly arr?: readonly unknown[];
			}>();

			type res8 = Call<Objects.PartialDeep, { a: 1; b: 2; c: 3 }>;
			expectTypeOf<res8>().toEqualTypeOf<{ a?: 1; b?: 2; c?: 3 }>();

			type res9 = Call<Objects.PartialDeep, { foo: () => void }>;
			expectTypeOf<res9>().toEqualTypeOf<{ foo?: () => void }>();
		});

		test("Promises", () => {
			type res0 = Call<Objects.PartialDeep, Promise<number>>;
			expectTypeOf<res0>().toEqualTypeOf<Promise<number>>();

			type res1 = Call<
				Objects.PartialDeep,
				Promise<{ api: () => { play: () => void; pause: () => void } }>
			>;
			expectTypeOf<res1>().toEqualTypeOf<
				Promise<{
					api?: () => { play: () => void; pause: () => void };
				}>
			>();
		});

		test("Complex structures", () => {
			type ComplexNestedRequired = {
				simple: number;
				nested: {
					date: Date;
					func: () => string;
					array: { bar: number }[];
					tuple: [string, number, { good: boolean }];
					set: Set<{ name: string }>;
					map: Map<
						string,
						{
							name: string;
						}
					>;
					promise: Promise<{ foo: string; bar: number }>;
				};
			};

			type ComplexNestedPartial = {
				simple?: number;
				nested?: {
					date?: Date;
					func?: () => string;
					array?: ({ bar?: number } | undefined)[];
					set?: Set<{ name?: string }>;
					tuple?: [string?, number?, { good?: boolean }?];
					map?: Map<
						string,
						{
							name?: string;
						}
					>;
					promise?: Promise<{ foo?: string; bar?: number }>;
				};
			};

			type res1 = Call<Objects.PartialDeep, ComplexNestedRequired>;
			expectTypeOf<res1>().toEqualTypeOf<ComplexNestedPartial>();
		});
	});

	describe("Assign", () => {
		test("can be called without any pre-filled arguments", () => {
			type res1 = Call<
				Tuples.Reduce<Objects.Assign, {}>,
				[{ a: 1 }, { b: true }, { c: 1 }]
			>;
			expectTypeOf<res1>().toEqualTypeOf<{ a: 1; b: true; c: 1 }>();

			type res2 = Call<
				Tuples.Reduce<Objects.Assign, {}>,
				[{ a: 2 }, { b: true }, { c: 2 }]
			>;
			expectTypeOf<res2>().toEqualTypeOf<{ a: 2; b: true; c: 2 }>();
		});

		test("can be called with one pre-filled argument", () => {
			type res1 = Call<
				Tuples.Map<Objects.Assign<{ new: "new" }>>,
				[{ a: 2 }, { b: true }, { c: 2 }]
			>;
			expectTypeOf<res1>().toEqualTypeOf<
				[{ new: "new"; a: 2 }, { new: "new"; b: true }, { new: "new"; c: 2 }]
			>();
		});

		test("can be called with 2 pre-filled arguments", () => {
			type res1 = Call<Objects.Assign<{ a: string }, { b: number }>>;
			expectTypeOf<res1>().toEqualTypeOf<{ a: string; b: number }>();
		});
	});

	test("KebabCase", () => {
		type res1 = Call<
			Objects.KebabCase,
			{ helloWorld: string; userName: string }
		>;
		expectTypeOf<res1>().toEqualTypeOf<{
			"hello-world": string;
			"user-name": string;
		}>();
	});

	test("SnakeCase", () => {
		type res1 = Call<
			Objects.SnakeCase,
			{ helloWorld: string; userName: string }
		>;
		expectTypeOf<res1>().toEqualTypeOf<{
			hello_world: string;
			user_name: string;
		}>();
	});

	test("CamelCase", () => {
		type res1 = Call<
			Objects.CamelCase,
			{ hello_world: string; user_name: string }
		>;
		expectTypeOf<res1>().toEqualTypeOf<{
			helloWorld: string;
			userName: string;
		}>();
	});

	test("KebabCaseDeep", () => {
		type res1 = Call<
			Objects.KebabCaseDeep,
			{
				helloWorld: string;
				currentUser: { userName: string };
				friends: { userName: string }[];
			}
		>;
		expectTypeOf<res1>().toEqualTypeOf<{
			"hello-world": string;
			"current-user": {
				"user-name": string;
			};
			friends: {
				"user-name": string;
			}[];
		}>();
	});

	test("SnakeCaseDeep", () => {
		type res1 = Call<
			Objects.SnakeCaseDeep,
			{
				helloWorld: string;
				currentUser: { userName: string };
				friends: { userName: string }[];
			}
		>;
		expectTypeOf<res1>().toEqualTypeOf<{
			hello_world: string;
			current_user: {
				user_name: string;
			};
			friends: {
				user_name: string;
			}[];
		}>();
	});

	test("CamelCaseDeep", () => {
		type res1 = Call<
			Objects.CamelCaseDeep,
			{
				hello_world: string;
				current_user: {
					user_name: string;
				};
				friends: {
					user_name: string;
				}[];
			}
		>;
		expectTypeOf<res1>().toEqualTypeOf<{
			helloWorld: string;
			currentUser: {
				userName: string;
			};
			friends: {
				userName: string;
			}[];
		}>();
	});

	describe("Get", () => {
		test("should retrieve a deep property", () => {
			type res1 = Call<
				Objects.Get<"a.b.c.d", { a: { b: { c: { d: string } } } }>
			>;
			expectTypeOf<res1>().toEqualTypeOf<string>();

			type res2 = Pipe<
				{ a: { b: { c: { d: string } } } },
				[Objects.Get<"a.b.c.d">]
			>;
			expectTypeOf<res2>().toEqualTypeOf<string>();
		});

		test("should support union of objects", () => {
			type input =
				| { a: { b: string | { c: { d: string } } } }
				| { a: { b: { c: { d: number } } } };

			type res1 = Call<Objects.Get<"a.b.c.d", input>>;
			expectTypeOf<res1>().toEqualTypeOf<string | number | undefined>();

			type res2 = Pipe<input, [Objects.Get<"a.b.c.d">]>;
			expectTypeOf<res2>().toEqualTypeOf<string | number | undefined>();
		});

		test("should support arrays", () => {
			type res1 = Call<Objects.Get<"a.b[0].d", { a: { b: { d: string }[] } }>>;
			expectTypeOf<res1>().toEqualTypeOf<string>();
		});

		test("should support tuples", () => {
			type input = { a: { b: [{ d: string }, "hello"] } };
			type res1 = Call<Objects.Get<"a.b[0].d", input>>;
			expectTypeOf<res1>().toEqualTypeOf<string>();

			type res2 = Call<Objects.Get<"a.b[1]", input>>;
			expectTypeOf<res2>().toEqualTypeOf<"hello">();
		});
	});

	test("Record", () => {
		type res1 = Call<Objects.Record<"a" | "b">, number>;
		expectTypeOf<res1>().toEqualTypeOf<{ a: number; b: number }>();

		type res2 = Call<Objects.Record<"a" | "b", number>>;
		expectTypeOf<res2>().toEqualTypeOf<{ a: number; b: number }>();

		type res3 = Apply<Objects.Record, ["a" | "b", number]>;
		expectTypeOf<res3>().toEqualTypeOf<{ a: number; b: number }>();
	});

	test("Composition", () => {
		type User = {
			id: symbol;
			firstName: string;
			lastName: string;
		};

		type APIUser = Pipe<
			User,
			[
				Objects.OmitBy<Booleans.Equals<symbol>>,
				Objects.Assign<{ metadata: { newUser: true } }>,
				Objects.SnakeCaseDeep,
				Objects.Assign<{ id: string }>,
			]
		>;
		expectTypeOf<APIUser>().toEqualTypeOf<{
			id: string;
			metadata: {
				new_user: true;
			};
			first_name: string;
			last_name: string;
		}>();

		// biome-ignore format: Formatting is broken here
		type res5 = Pipe<
			"/users/<id:string>/posts/<index:number>",
			[
				Strings.Split<"/">,
				Tuples.Filter<Strings.StartsWith<"<">>,
				Tuples.Map<
					ComposeLeft<
						[
							Strings.Replace<"<", "">,
							Strings.Replace<">", "">,
							Strings.Split<":">,
						]
					>
				>,
				Tuples.ToUnion,
				Objects.FromEntries,
				Objects.MapValues<
					Match<
						[
							Match.With<"string", Constant<string>>,
							Match.With<"number", Constant<number>>,
						]
					>
				>,
			]
		>;
		expectTypeOf<res5>().toEqualTypeOf<{
			id: string;
			index: number;
		}>();
	});

	test("Keys", () => {
		type res0 = Call<Objects.Keys, [3, 4, 5]>;
		expectTypeOf<res0>().toEqualTypeOf<0 | 1 | 2>();

		type res1 = Call<Objects.Keys, boolean[]>;
		expectTypeOf<res1>().toEqualTypeOf<number>();

		type res2 = Call<Objects.Keys, { type: string; src: { value: string } }>;
		expectTypeOf<res2>().toEqualTypeOf<"type" | "src">();

		type res3 = Call<Objects.Keys, unknown>;
		expectTypeOf<res3>().toEqualTypeOf<never>();

		type res4 = Call<Objects.Keys, Record<string, boolean>>;
		expectTypeOf<res4>().toEqualTypeOf<string>();
	});

	test("Values", () => {
		type res0 = Call<Objects.Values, [3, 4, 5]>;
		expectTypeOf<res0>().toEqualTypeOf<3 | 4 | 5>();

		type res1 = Call<Objects.Values, boolean[]>;
		expectTypeOf<res1>().toEqualTypeOf<boolean>();

		type res2 = Call<Objects.Values, { type: string; src: { value: string } }>;
		expectTypeOf<res2>().toEqualTypeOf<string | { value: string }>();

		type res3 = Call<Objects.Values, unknown>;
		expectTypeOf<res3>().toEqualTypeOf<never>();

		type res4 = Call<Objects.Values, Record<string, boolean>>;
		expectTypeOf<res4>().toEqualTypeOf<boolean>();
	});

	test("AllPaths", () => {
		type res1 = Call<
			Objects.AllPaths,
			{
				shallow: string;
				object: {
					nested: boolean;
				};
				constant: true;
				tuple: [0, 1];
				union:
					| { flag: true; ordinal: number }
					| { flag: false; cardinal: string };
				array: { inner: number }[];
				conditional?: number;
			}
		>;
		expectTypeOf<res1>().toEqualTypeOf<
			| "shallow"
			| "object.nested"
			| "object"
			| "constant"
			| "tuple"
			| "tuple[0]"
			| "tuple[1]"
			| "union"
			| "union.flag"
			| "union.ordinal"
			| "union.cardinal"
			| "array"
			| `array[${number}]`
			| `array[${number}].inner`
			| "conditional"
		>();

		type res2 = Call<Objects.AllPaths, unknown>;
		expectTypeOf<res2>().toEqualTypeOf<string>();

		type res3 = Call<Objects.AllPaths, any>;
		expectTypeOf<res3>().toEqualTypeOf<string>();

		type res4 = Call<Objects.AllPaths, { f: any }>;
		expectTypeOf<res4>().toEqualTypeOf<"f" | `f.${string}`>();

		type res5 = Call<Objects.AllPaths, [0, 1]>;
		expectTypeOf<res5>().toEqualTypeOf<"[0]" | "[1]">();

		type res6 = Call<Objects.AllPaths, boolean[]>;
		expectTypeOf<res6>().toEqualTypeOf<`[${number}]`>();

		const readonlyObj = { a: 1, b: 2, c: [{ d: 3 }, { e: 4 }] } as const;
		type res7 = Call<Objects.AllPaths, typeof readonlyObj>;
		expectTypeOf<res7>().toEqualTypeOf<
			| "a"
			| "b"
			| "c"
			| "c[0]"
			| "c[1]"
			| "c[0].d"
			| "c[1].d"
			| "c[0].e"
			| "c[1].e"
		>();
	});
});
