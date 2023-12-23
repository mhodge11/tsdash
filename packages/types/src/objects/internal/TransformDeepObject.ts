import type { Call, Fn } from "../../core/index.ts";
import type { Equal, IsTuple } from "../../internal/index.ts";

export type TransformObjectDeep<fn extends Fn, type> = type extends
	| Function
	| Date
	? type
	: type extends Map<infer keys, infer values>
	  ? Map<TransformObjectDeep<fn, keys>, TransformObjectDeep<fn, values>>
	  : type extends ReadonlyMap<infer keys, infer values>
		  ? ReadonlyMap<
					TransformObjectDeep<fn, keys>,
					TransformObjectDeep<fn, values>
			  >
		  : type extends WeakMap<infer keys, infer values>
			  ? WeakMap<
						Extract<TransformObjectDeep<fn, keys>, object>,
						TransformObjectDeep<fn, values>
				  >
			  : type extends Set<infer values>
				  ? Set<TransformObjectDeep<fn, values>>
				  : type extends ReadonlySet<infer values>
					  ? ReadonlySet<TransformObjectDeep<fn, values>>
					  : type extends WeakSet<infer values>
						  ? WeakSet<Extract<TransformObjectDeep<fn, values>, object>>
						  : type extends Array<infer values>
							  ? IsTuple<type> extends true
									? Call<
											fn,
											{
												[Key in keyof type]: TransformObjectDeep<fn, type[Key]>;
											}
									  >
									: Array<TransformObjectDeep<fn, values> | undefined>
							  : type extends Promise<infer value>
								  ? Promise<TransformObjectDeep<fn, value>>
								  : type extends object
									  ? Call<
												fn,
												{
													[Key in keyof type]: TransformObjectDeep<
														fn,
														type[Key]
													>;
												}
										  >
									  : Equal<type, unknown> extends true
										  ? unknown
										  : Partial<type>;
