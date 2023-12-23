import type { Options } from "tsup";

export const config: Options = {
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	minify: true,
	splitting: true,
	treeshake: true,
	sourcemap: true,
	clean: true,
	outDir: "dist",
	dts: true,
};
