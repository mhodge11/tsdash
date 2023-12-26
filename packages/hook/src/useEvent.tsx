import { isBrowser } from "@tsdash/validate";
import { useEffect } from "react";

import { off, on } from "./utils.ts";

export interface ListenerType1 extends Window {
	addEventListener: (
		name: string,
		handler: (event?: any) => void,
		...args: any[]
	) => any;
	removeEventListener: (
		name: string,
		handler: (event?: any) => void,
		...args: any[]
	) => any;
	[key: string]: any;
}

export interface ListenerType2 {
	on: (name: string, handler: (event?: any) => void, ...args: any[]) => any;
	off: (name: string, handler: (event?: any) => void, ...args: any[]) => any;
	[key: string]: any;
}

export type UseEventTarget = ListenerType1 | ListenerType2;

export type UseEventOptions<T> = Parameters<AddEventListener<T>>[2];

type AddEventListener<T> = T extends ListenerType1
	? T["addEventListener"]
	: T extends ListenerType2
	  ? T["on"]
	  : never;

function defaultTarget() {
	return isBrowser() ? globalThis.window : null;
}

function isListenerType1(target: any): target is ListenerType1 {
	return !!target.addEventListener;
}

function isListenerType2(target: any): target is ListenerType2 {
	return !!target.on;
}

export function useEvent<T extends UseEventTarget>(
	name: Parameters<AddEventListener<T>>[0],
	handler?: null | undefined | Parameters<AddEventListener<T>>[1],
	target: null | T | Window = defaultTarget(),
	options?: UseEventOptions<T>,
) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!handler || !target) return;

		if (isListenerType1(target)) on(target, name, handler, options);
		else if (isListenerType2(target)) target.on(name, handler, options);

		return () => {
			if (isListenerType1(target)) off(target, name, handler, options);
			else if (isListenerType2(target)) target.off(name, handler, options);
		};
	}, [name, handler, target, JSON.stringify(options)]);
}
