import { defineConfig } from "tsup";
import { config } from "../../tsup.config.base.ts";

export default defineConfig({ ...config, entry: ["src/index.tsx"] });
