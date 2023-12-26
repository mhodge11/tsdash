import { renderHook } from "@testing-library/react";
import { useMountedState } from "../src/index.js";

test("should be defined", () => {
	expect(useMountedState).toBeDefined();
});

test("should return a function", () => {
	const hook = renderHook(() => useMountedState(), { initialProps: false });

	expect(typeof hook.result.current).toEqual("function");
});

test("should return true if component is mounted", () => {
	const hook = renderHook(() => useMountedState(), { initialProps: false });

	expect(hook.result.current()).toBeTruthy();
});

test("should return false if component is unmounted", () => {
	const hook = renderHook(() => useMountedState(), { initialProps: false });

	hook.unmount();

	expect(hook.result.current()).toBeFalsy();
});
