import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  eslintConfigPrettier,
];
