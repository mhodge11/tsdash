import { set } from "../src/index.ts";

test("set a value", () => {
	const obj = { a: { b: 2 } };
	const updatedObj = set(obj, "a.c", 1);

	expectTypeOf(updatedObj).toEqualTypeOf<{ a: { b: number; c: number } }>();
	expect(obj).toEqual({ a: { b: 2, c: 1 } });

	const updatedObj2 = set(obj, "a.c.d", 1);
	expectTypeOf(updatedObj2).toEqualTypeOf<{
		a: { b: number; c: { d: number } };
	}>();
	expect(obj).toEqual({ a: { b: 2, c: { d: 1 } } });
});

test("set a value with array path", () => {
	const obj = { a: { b: 2, c: [1, 2] } };
	set(obj, "a.c[2]", 1);
	expect(obj).toEqual({ a: { b: 2, c: [1, 2, 1] } });

	set(obj, "a.d[0].c", 3);
	expect(obj).toEqual({ a: { b: 2, c: [1, 2, 1], d: [{ c: 3 }] } });

	set(obj, "a[0].c", 3);
	expect(obj).toEqual({ a: [{ c: 3 }] });
});

// TODO Waiting for fix
// test("recognize number key", () => {
//     const obj = { a: 1 };
//     const updatedObj = set(obj, "a[0]", 4);
//     expectTypeOf(updatedObj).toEqualTypeOf<{ a: number[] }>();
//     expect(obj).toEqual({ a: [4] });
// });

test("throw error on incorrect path format", () => {
	const obj = { a: { b: 2 } };
	expect(() => set(obj, "a.c[1", 1)).toThrow();
	expect(() => set(obj, "a.c.", 1)).toThrow();
});

test("allow _ and $ in path", () => {
	const obj = { a: { b: 2 } };
	expect(() => set(obj, "a.c_1", 1)).not.toThrow();
	expect(() => set(obj, "a.c-$1", 1)).not.toThrow();
});
