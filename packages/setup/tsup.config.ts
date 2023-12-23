import { defineConfig } from "tsup";
import { config } from "../../tsup.config.base.ts";

export default defineConfig({
	...config,
	esbuildOptions(options, context) {
		if (context.format === "esm") options.entryPoints = ["src/index.ts"];
		else if (context.format === "cjs") options.entryPoints = ["src/index.cts"];
		else throw new Error("Unknown format");
	},
});
