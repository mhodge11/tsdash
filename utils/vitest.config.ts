/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		coverage: {
			exclude: [
				"**/index.ts",
				"**/type/*.ts",
				"**/dist/**/*.{js,cjs,ts}",
				"**/tests/**/*.ts",
			],
		},
	},
	resolve: {
		alias: {
			"@array": getPath("src/array"),
			"@crypto": getPath("src/crypto"),
			"@decorator": getPath("src/decorator"),
			"@function": getPath("src/function"),
			"@number": getPath("src/number"),
			"@object": getPath("src/object"),
			"@promise": getPath("src/promise"),
			"@string": getPath("src/string"),
			"@type": getPath("src/type"),
			"@validate": getPath("src/validate"),
		},
	},
});

function getPath(path: string) {
	return fileURLToPath(new URL(path, import.meta.url));
}
