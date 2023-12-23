import type { Keys } from "./Keys.ts";

export type Values<src> = Keys<src> extends infer keys extends keyof src
	? src[keys]
	: never;
