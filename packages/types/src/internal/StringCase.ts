/**
 * Converts string casing from snake_case or kebab-case to camelCase.
 */
export type CamelCase<str> = KebabToCamel<SnakeToCamel<str>>;

/**
 * Converts string casing from camelCase or kebab-case to snake_case.
 */
export type SnakeCase<
	str,
	output extends string = "",
> = str extends `${infer first}${infer rest}`
	? first extends UppercaseLetter
		? output extends ""
			? SnakeCase<rest, Lowercase<first>>
			: SnakeCase<rest, `${output}_${Lowercase<first>}`>
		: first extends "-"
		  ? SnakeCase<rest, `${output}_`>
		  : SnakeCase<rest, `${output}${first}`>
	: output extends ""
	  ? str
	  : output;

/**
 * Converts string casing from camelCase or snake_case to kebab-case.
 */
export type KebabCase<
	str,
	output extends string = "",
> = str extends `${infer first}${infer rest}`
	? first extends UppercaseLetter
		? output extends ""
			? KebabCase<rest, Lowercase<first>>
			: KebabCase<rest, `${output}-${Lowercase<first>}`>
		: first extends "_"
		  ? KebabCase<rest, `${output}-`>
		  : KebabCase<rest, `${output}${first}`>
	: output extends ""
	  ? str
	  : output;

type KebabToCamel<str> = str extends `${infer first}-${infer rest}`
	? `${first}${KebabToCamel<Capitalize<rest>>}`
	: str;

type SnakeToCamel<str> = str extends `${infer first}_${infer rest}`
	? `${first}${SnakeToCamel<Capitalize<rest>>}`
	: str;

type UppercaseLetter =
	| "A"
	| "B"
	| "C"
	| "D"
	| "E"
	| "F"
	| "G"
	| "H"
	| "I"
	| "J"
	| "K"
	| "L"
	| "M"
	| "N"
	| "O"
	| "P"
	| "Q"
	| "R"
	| "S"
	| "T"
	| "U"
	| "V"
	| "W"
	| "X"
	| "Y"
	| "Z";
