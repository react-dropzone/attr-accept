import {defineConfig} from "tsdown";

export default defineConfig({
  entry: {index: "./src/index.ts"},
  format: ["esm", "cjs"],
  target: "es2020",
  dts: {tsconfig: "./tsconfig.build.json"},
  sourcemap: true,
  fixedExtension: false,
  hash: false
});
