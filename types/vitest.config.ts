/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		coverage: {
			exclude: ["**/index.ts", "**/dist/**/*.{js,cjs,ts}", "**/tests/**/*.ts"],
		},
	},
	resolve: {
		alias: {
			"@impl": getPath("src/_impl"),
			"@booleans": getPath("src/booleans"),
			"@core": getPath("src/core"),
			"@functions": getPath("src/functions"),
			"@match": getPath("src/match"),
			"@numbers": getPath("src/numbers"),
			"@objects": getPath("src/objects"),
			"@std": getPath("src/std"),
			"@strings": getPath("src/strings"),
			"@tuples": getPath("src/tuples"),
			"@unions": getPath("src/unions"),
		},
	},
});

function getPath(path: string) {
	return fileURLToPath(new URL(path, import.meta.url));
}
