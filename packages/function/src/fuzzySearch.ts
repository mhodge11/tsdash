/**
 * Fuzzy search an array of strings.
 * It uses a scoring system to determine the best matches.
 * The best matches are returned first.
 *
 * @param pattern The search input string
 * @param array The array to search through
 * @param opts (Optional) Options object
 * @param opts.extract (Optional) Function to extract a string from an element in the array
 * @param opts.pre (Optional) String to put before a matching character
 * @param opts.post (Optional) String to put after a matching character
 * @returns An array of matches
 */
export function fuzzySearch<T extends any[] = string[]>(
	...args: FuzzySearchArgs<T>
): Result[] {
	const [pattern, array, opts] = args;
	if (!array?.length || typeof pattern !== "string")
		return [] as {
			string: string;
			score: number;
			index: number;
			original: string;
		}[];

	const options =
		opts ??
		({} as {
			extract?: (arg: unknown) => string;
			pre?: string;
			post?: string;
			caseSensitive?: boolean;
		});

	return array
		.reduce(
			(prev, elem, i) => {
				let str: string;
				if (options.extract) str = options.extract(elem);
				else str = elem as string;

				const rendered = fuzzySearchMatch(pattern, str, options);

				if (rendered)
					prev.push({
						string: rendered.result,
						score: rendered.score,
						index: i,
						original: elem,
					});

				return prev;
			},
			[] as Result[],
		)
		.sort((a: Result, b: Result) => {
			const compare = b.score - a.score;
			if (compare) return compare;
			return a.index - b.index;
		});
}

/**
 * Fuzzy search an array of strings.
 * It does not use a scoring system
 * and returns the matches in the order they appear in the array.
 *
 * @param pattern The search input string
 * @param array The array to search through
 * @returns An array of matches
 */
export function simpleFuzzySearch(pattern: string, array: string[]) {
	return array.filter((str) => simpleFuzzySearchTest(pattern, str));
}

export function fuzzySearchMatch(
	pattern: string,
	string: string,
	opts?: {
		extract?: (...args: any) => string;
		pre?: string;
		post?: string;
		caseSensitive?: boolean;
	},
) {
	let result = "";
	let score = 0;
	let stepScore = 0;

	const pre = opts?.pre ?? "";
	const post = opts?.post ?? "";
	const compareStr = opts?.caseSensitive ? string : string.toLowerCase();
	pattern = opts?.caseSensitive ? pattern : pattern.toLowerCase();

	let i = 0;
	let j = 0;
	for (let char of string) {
		if (compareStr[i] === pattern[j]) {
			char = pre + char + post;
			stepScore += 1 + stepScore;
			j++;
		} else stepScore = 0;
		score += stepScore;
		result += char;
		i++;
	}

	if (j === pattern.length) {
		score = compareStr === pattern ? Infinity : score;
		return { result, score };
	}

	return null;
}

export function simpleFuzzySearchTest(pattern: string, str: string) {
	return !!fuzzySearchMatch(pattern, str);
}

type FuzzySearchArgs<T extends any[] = string[]> = [
	pattern: string,
	array: T,
	opts?: T extends string[]
		? {
				extract?: (arg: string) => string;
				pre?: string;
				post?: string;
				caseSensitive?: boolean;
		  }
		: {
				extract: (arg: T[number]) => string;
				pre?: string;
				post?: string;
				caseSensitive?: boolean;
		  },
];

type Result = {
	string: string;
	score: number;
	index: number;
	original: string;
};
