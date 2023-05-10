import { defineConfig } from "tsup";

const isDev = process.env.npm_lifecycle_event === "dev";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  shims: true,
  dts: true,
  sourcemap: true,
  clean: true,
  minify: !isDev,
  metafile: !isDev,
  target: "esnext",
  outDir: "dist",
  tsconfig: "tsconfig.json",
});
