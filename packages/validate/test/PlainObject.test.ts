import type { PlainObject } from "../src/types/PlainObject.ts";

test("PlainObject", () => {
	const obj: PlainObject = { test: "test" };
	expect(obj).toEqual({ test: "test" });
	expectTypeOf<PlainObject>().toEqualTypeOf(obj);
	expectTypeOf<PlainObject>().not.toEqualTypeOf("test");
	expectTypeOf<PlainObject>().not.toEqualTypeOf(1);
	expectTypeOf<PlainObject>().not.toEqualTypeOf(true);
	expectTypeOf<PlainObject>().not.toEqualTypeOf(null);
	expectTypeOf<PlainObject>().not.toEqualTypeOf(undefined);
	expectTypeOf<PlainObject>().not.toEqualTypeOf([]);
	expectTypeOf<PlainObject>().not.toEqualTypeOf(new Set());
	expectTypeOf<PlainObject>().not.toEqualTypeOf(new Map());
	expectTypeOf<PlainObject>().not.toEqualTypeOf(new Uint8Array());
	expectTypeOf<PlainObject>().not.toEqualTypeOf(new BigInt64Array());
});
