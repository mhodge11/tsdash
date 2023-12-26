import { renderHook } from "@testing-library/react";
import { useIsFirstMount } from "../src/index.tsx";

test("should be defined", () => {
	expect(useIsFirstMount).toBeDefined();
});

it("should return boolean", () => {
	expect(renderHook(() => useIsFirstMount()).result.current).toEqual(
		expect.any(Boolean),
	);
});

test("should return true on first render and false on all others", () => {
	const hook = renderHook(() => useIsFirstMount());

	expect(hook.result.current).toBe(true);
	hook.rerender();
	expect(hook.result.current).toBe(false);
	hook.rerender();
	expect(hook.result.current).toBe(false);
});
