import type { Tuples } from "@tsdash/types";

import { useRef } from "react";
import { useEffectOnce } from "./useEffectOnce.tsx";

/**
 * Runs any number of callbacks once as the component unmounts.
 *
 * @param callbacks Functions to run on unmount.
 */
export function useUnmount<T extends () => any>(
	...callbacks: Tuples.MinLength<T, 1>
) {
	const callbacksRef = useRef(callbacks);
	callbacksRef.current = callbacks;
	useEffectOnce(() => () => {
		for (const callback of callbacksRef.current) callback();
	});
}
