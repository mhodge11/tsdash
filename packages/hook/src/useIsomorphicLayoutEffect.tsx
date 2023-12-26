import { isBrowser } from "@tsdash/validate";
import {
	type DependencyList,
	type EffectCallback,
	useEffect,
	useLayoutEffect,
} from "react";

/**
 * Runs a layout effect callback if client side, otherwise runs an effect callback.
 *
 * @param effect The effect callback to run.
 * @param deps The dependencies to watch for changes.
 */
export function useIsomorphicLayoutEffect(
	effect: EffectCallback,
	deps?: DependencyList,
) {
	const useLayout = isBrowser() ? useLayoutEffect : useEffect;
	useLayout(effect, deps);
}
