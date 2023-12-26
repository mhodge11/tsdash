/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { defineProject } from "vitest/config";

export default defineProject({
	test: {
		globals: true,
		coverage: {
			exclude: ["**/dist/**/*.{js,cjs,ts}", "**/test/**/*.ts", "**/types/*.ts"],
		},
	},
});
