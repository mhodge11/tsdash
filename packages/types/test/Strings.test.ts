import type { Call, Compose, Strings, _ } from "../src/index.ts";

describe("Strings", () => {
	test("Length", () => {
		type res1 = Call<Strings.Length, "">;
		expectTypeOf<res1>().toEqualTypeOf<0>();

		type res2 = Call<Strings.Length, "123">;
		expectTypeOf<res2>().toEqualTypeOf<3>();

		type res3 = Call<Compose<[Strings.Length, Strings.Repeat<1001>]>, "a">;
		expectTypeOf<res3>().toEqualTypeOf<1001>();
	});

	test("TrimLeft", () => {
		type res1 = Call<Strings.TrimLeft, "  abc  ">;
		expectTypeOf<res1>().toEqualTypeOf<"abc  ">();

		type res2 = Call<Strings.TrimLeft<"0">, "0001000">;
		expectTypeOf<res2>().toEqualTypeOf<"1000">();
	});

	test("TrimRight", () => {
		type res1 = Call<Strings.TrimRight, "  abc  ">;
		expectTypeOf<res1>().toEqualTypeOf<"  abc">();

		type res2 = Call<Strings.TrimRight<"0">, "0001000">;
		expectTypeOf<res2>().toEqualTypeOf<"0001">();
	});

	test("Trim", () => {
		type res1 = Call<Strings.Trim, "  abc  ">;
		expectTypeOf<res1>().toEqualTypeOf<"abc">();

		type res2 = Call<Strings.Trim<"0">, "0001000">;
		expectTypeOf<res2>().toEqualTypeOf<"1">();
	});

	describe("Replace", () => {
		test("replaces single letters", () => {
			type res1 = Call<Strings.Replace<"a", "b">, "abc">;
			expectTypeOf<res1>().toEqualTypeOf<"bbc">();
		});

		test("is identity on empty strings", () => {
			type res2 = Call<Strings.Replace<"a", "b">, "">;
			expectTypeOf<res2>().toEqualTypeOf<"">();
		});

		test("replacing by empty string", () => {
			type res3 = Call<Strings.Replace<"a", "">, "abc">;
			expectTypeOf<res3>().toEqualTypeOf<"bc">();
		});

		test("supports multi char strings", () => {
			type res4 = Call<Strings.Replace<"hello", "hi!">, "hello world!">;
			expectTypeOf<res4>().toEqualTypeOf<"hi! world!">();

			type res5 = Call<Strings.Replace<"many", "more">, "many more than many">;
			expectTypeOf<res5>().toEqualTypeOf<"more more than more">();
		});

		test("supports union types", () => {
			type res6 = Call<Strings.Replace<"a" | "b", "c">, "abc">;
			expectTypeOf<res6>().toEqualTypeOf<"ccc">();

			type res4 = Call<
				Strings.Replace<"hello" | "hi", "sup">,
				"hello world! hi!"
			>;
			expectTypeOf<res4>().toEqualTypeOf<"sup world! sup!">();
		});
	});

	test("Slice", () => {
		type res1 = Call<Strings.Slice<1, 3>, "123">;
		expectTypeOf<res1>().toEqualTypeOf<"23">();

		type res2 = Call<Strings.Slice<0, 3>, "123">;
		expectTypeOf<res2>().toEqualTypeOf<"123">();

		type res3 = Call<Strings.Slice<1, 4>, "123">;
		expectTypeOf<res3>().toEqualTypeOf<"23">();

		type res4 = Call<Strings.Slice<1, 1>, "123">;
		expectTypeOf<res4>().toEqualTypeOf<"">();
	});

	test("Split", () => {
		type res1 = Call<Strings.Split<".">, "1.2.3">;
		expectTypeOf<res1>().toEqualTypeOf<["1", "2", "3"]>();

		type res2 = Call<Strings.Split<"">, "123">;
		expectTypeOf<res2>().toEqualTypeOf<["1", "2", "3"]>();

		type res3 = Call<Strings.Split<"">, "">;
		expectTypeOf<res3>().toEqualTypeOf<[]>();

		type res4 = Call<Strings.Split<"--" | ".">, "1--2-3.4..5">;
		expectTypeOf<res4>().toEqualTypeOf<["1", "2-3", "4", "5"]>();
	});

	test("Repeat", () => {
		type res1 = Call<Strings.Repeat<3>, "a">;
		expectTypeOf<res1>().toEqualTypeOf<"aaa">();

		type res2 = Call<Strings.Repeat<0>, "a">;
		expectTypeOf<res2>().toEqualTypeOf<"">();

		type res3 = Call<Strings.Repeat<1>, "a">;
		expectTypeOf<res3>().toEqualTypeOf<"a">();

		type res4 = Call<Strings.Repeat<2>, "hello!">;
		expectTypeOf<res4>().toEqualTypeOf<"hello!hello!">();
	});

	test("StartsWith", () => {
		type res1 = Call<Strings.StartsWith<"hello">, "hello world">;
		expectTypeOf<res1>().toEqualTypeOf<true>();

		type res2 = Call<Strings.StartsWith<"hello">, "world hello">;
		expectTypeOf<res2>().toEqualTypeOf<false>();

		type res3 = Call<Strings.StartsWith<"">, "hello world">;
		expectTypeOf<res3>().toEqualTypeOf<true>();

		type res4 = Call<Strings.StartsWith<"">, "">;
		expectTypeOf<res4>().toEqualTypeOf<true>();
	});

	test("EndsWith", () => {
		type res1 = Call<Strings.EndsWith<"world">, "hello world">;
		expectTypeOf<res1>().toEqualTypeOf<true>();

		type res2 = Call<Strings.EndsWith<"world">, "world hello">;
		expectTypeOf<res2>().toEqualTypeOf<false>();

		type res3 = Call<Strings.EndsWith<"">, "hello world">;
		expectTypeOf<res3>().toEqualTypeOf<true>();

		type res4 = Call<Strings.EndsWith<"">, "">;
		expectTypeOf<res4>().toEqualTypeOf<true>();
	});

	test("ToTuple", () => {
		type res1 = Call<Strings.ToTuple, "abc">;
		expectTypeOf<res1>().toEqualTypeOf<["a", "b", "c"]>();

		type res2 = Call<Strings.ToTuple, "">;
		expectTypeOf<res2>().toEqualTypeOf<[]>();
	});

	test("ToNumber", () => {
		type res1 = Call<Strings.ToNumber, "11">;
		expectTypeOf<res1>().toEqualTypeOf<11>();
	});

	test("ToString", () => {
		type res1 = Call<Strings.ToString, 11>;
		expectTypeOf<res1>().toEqualTypeOf<"11">();
	});

	test("Prepend", () => {
		type res1 = Call<Strings.Prepend<"1 ">, "abc">;
		expectTypeOf<res1>().toEqualTypeOf<"1 abc">();
	});

	test("Append", () => {
		type res1 = Call<Strings.Append<" 1">, "abc">;
		expectTypeOf<res1>().toEqualTypeOf<"abc 1">();
	});

	test("Uppercase", () => {
		type res1 = Call<Strings.Uppercase, "abc">;
		expectTypeOf<res1>().toEqualTypeOf<"ABC">();
	});

	test("Lowercase", () => {
		type res1 = Call<Strings.Lowercase, "ABC">;
		expectTypeOf<res1>().toEqualTypeOf<"abc">();
	});

	test("Capitalize", () => {
		type res1 = Call<Strings.Capitalize, "abc">;
		expectTypeOf<res1>().toEqualTypeOf<"Abc">();
	});

	test("Uncapitalize", () => {
		type res1 = Call<Strings.Uncapitalize, "ABC">;
		expectTypeOf<res1>().toEqualTypeOf<"aBC">();
	});

	test("SnakeCase", () => {
		type res1 = Call<Strings.SnakeCase, "helloWorldYo">;
		expectTypeOf<res1>().toEqualTypeOf<"hello_world_yo">();

		type res2 = Call<Strings.SnakeCase, "HelloWorldYo">;
		expectTypeOf<res2>().toEqualTypeOf<"hello_world_yo">();
	});

	test("KebabCase", () => {
		type res1 = Call<Strings.KebabCase, "helloWorldYo">;
		expectTypeOf<res1>().toEqualTypeOf<"hello-world-yo">();

		type res2 = Call<Strings.KebabCase, "HelloWorldYo">;
		expectTypeOf<res2>().toEqualTypeOf<"hello-world-yo">();
	});

	test("CamelCase", () => {
		type res1 = Call<Strings.CamelCase, "hello_world_yo">;
		expectTypeOf<res1>().toEqualTypeOf<"helloWorldYo">();
	});

	test("Compare", () => {
		type res1 = Call<Strings.Compare<"a">, "a">;
		expectTypeOf<res1>().toEqualTypeOf<0>();

		type res2 = Call<Strings.Compare<"a">, "b">;
		expectTypeOf<res2>().toEqualTypeOf<1>();

		type res3 = Call<Strings.Compare<"a", _>, "b">;
		expectTypeOf<res3>().toEqualTypeOf<-1>();

		type res4 = Call<Strings.Compare<"b">, "a">;
		expectTypeOf<res4>().toEqualTypeOf<-1>();

		type res5 = Call<Strings.Compare, "ab", "b">;
		expectTypeOf<res5>().toEqualTypeOf<-1>();

		type res6 = Call<Strings.Compare, "b", "ab">;
		expectTypeOf<res6>().toEqualTypeOf<1>();

		type res7 = Call<Strings.Compare, "ab", "ab">;
		expectTypeOf<res7>().toEqualTypeOf<0>();

		type res8 = Call<Strings.Compare, "ab", "ac">;
		expectTypeOf<res8>().toEqualTypeOf<-1>();
	});

	test("LessThan", () => {
		type res1 = Call<Strings.LessThan<"a">, "b">;
		expectTypeOf<res1>().toEqualTypeOf<false>();

		type res2 = Call<Strings.LessThan<"b">, "a">;
		expectTypeOf<res2>().toEqualTypeOf<true>();

		type res3 = Call<Strings.LessThan<"a">, "a">;
		expectTypeOf<res3>().toEqualTypeOf<false>();

		type res4 = Call<Strings.LessThan, "a", "aa">;
		expectTypeOf<res4>().toEqualTypeOf<true>();
	});

	test("LessThanOrEqual", () => {
		type res1 = Call<Strings.LessThanOrEqual<"a">, "b">;
		expectTypeOf<res1>().toEqualTypeOf<false>();

		type res2 = Call<Strings.LessThanOrEqual<"b">, "a">;
		expectTypeOf<res2>().toEqualTypeOf<true>();

		type res3 = Call<Strings.LessThanOrEqual<"a">, "a">;
		expectTypeOf<res3>().toEqualTypeOf<true>();

		type res4 = Call<Strings.LessThanOrEqual, "a", "aa">;
		expectTypeOf<res4>().toEqualTypeOf<true>();
	});

	test("GreaterThan", () => {
		type res1 = Call<Strings.GreaterThan<"a">, "b">;
		expectTypeOf<res1>().toEqualTypeOf<true>();

		type res2 = Call<Strings.GreaterThan<"b">, "a">;
		expectTypeOf<res2>().toEqualTypeOf<false>();

		type res3 = Call<Strings.GreaterThan<"a">, "a">;
		expectTypeOf<res3>().toEqualTypeOf<false>();

		type res4 = Call<Strings.GreaterThan, "a", "aa">;
		expectTypeOf<res4>().toEqualTypeOf<false>();
	});

	test("GreaterThanOrEqual", () => {
		type res1 = Call<Strings.GreaterThanOrEqual<"a">, "b">;
		expectTypeOf<res1>().toEqualTypeOf<true>();

		type res2 = Call<Strings.GreaterThanOrEqual<"b">, "a">;
		expectTypeOf<res2>().toEqualTypeOf<false>();

		type res3 = Call<Strings.GreaterThanOrEqual<"a">, "a">;
		expectTypeOf<res3>().toEqualTypeOf<true>();

		type res4 = Call<Strings.GreaterThanOrEqual, "a", "aa">;
		expectTypeOf<res4>().toEqualTypeOf<false>();
	});
});
