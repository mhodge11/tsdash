import type { Tuples } from "@tsdash/types";

import { useEffectOnce } from "./useEffectOnce.tsx";

/**
 * Runs any number of callbacks once after the component mounts.
 *
 * @param callbacks Functions to run on mount.
 */
export function useMount<T extends () => any>(
	...callbacks: Tuples.MinLength<T, 1>
) {
	useEffectOnce(() => {
		for (const callback of callbacks) callback();
	});
}
