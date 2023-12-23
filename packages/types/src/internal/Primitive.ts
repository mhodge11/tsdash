/**
 * a primitive value is a member of one of the following built-in types:
 * - undefined
 * - null
 * - boolean
 * - string
 * - number
 * - bigint
 * - symbol
 */

export type Primitive =
	| string
	| number
	| boolean
	| bigint
	| null
	| undefined
	| symbol;
