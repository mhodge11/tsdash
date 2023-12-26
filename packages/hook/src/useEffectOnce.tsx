import { type EffectCallback, useEffect } from "react";

/**
 * Runs a useEffect callback once after the component mounts.
 *
 * @param effect The effect callback to run once.
 */
export function useEffectOnce(effect: EffectCallback) {
	useEffect(effect, []);
}
