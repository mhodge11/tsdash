/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		coverage: {
			exclude: ["**/dist/**/*.{js,cjs,ts}", "**/test/**/*.ts", "**/types/*.ts"],
		},
	},
});
