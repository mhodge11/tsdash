import { type DependencyList, type EffectCallback, useEffect } from "react";

import { useIsFirstMount } from "./useIsFirstMount.tsx";

/**
 * Runs a useEffect callback after the component mounts, but not on the first render.
 *
 * @param effect The effect callback to run.
 * @param deps The dependencies to watch for changes.
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
	const isFirstMount = useIsFirstMount();

	// biome-ignore lint/correctness/useExhaustiveDependencies: isFirstMount is a ref
	useEffect(() => {
		if (!isFirstMount) return effect();
	}, deps);
}
