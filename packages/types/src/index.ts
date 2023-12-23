import type { Booleans } from "./booleans/index.ts";
import type {
	Apply,
	Call,
	Compose,
	ComposeLeft,
	Constant,
	Fn,
	Identity,
	Jsonifiable,
	PartialApply,
	Pipe,
	PipeRight,
	_,
	arg,
	arg0,
	arg1,
	arg2,
	arg3,
	args,
	unset,
} from "./core/index.ts";
import type { Functions } from "./functions/index.ts";
import type { Match } from "./match/index.ts";
import type { Numbers } from "./numbers/index.ts";
import type { Objects } from "./objects/index.ts";
import type { Strings } from "./strings/index.ts";
import type { Tuples } from "./tuples/index.ts";
import type { Unions } from "./unions/index.ts";

export type {
	// booleans
	Booleans,
	Booleans as B,
	// core
	_,
	arg,
	arg0,
	arg1,
	arg2,
	arg3,
	args,
	unset,
	Apply,
	Call as $,
	Call,
	Compose,
	ComposeLeft,
	Constant,
	Fn,
	Identity,
	Jsonifiable,
	PartialApply,
	Pipe,
	PipeRight,
	// functions
	Functions,
	Functions as F,
	// match
	Match,
	Match as M,
	// numbers
	Numbers,
	Numbers as N,
	// objects
	Objects,
	Objects as O,
	// strings
	Strings,
	// tuples
	Tuples,
	// unions
	Unions,
	Unions as U,
};
