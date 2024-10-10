import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier/recommended";

export default [
  importPlugin.flatConfigs.recommended,
  {
    files: ["src/**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "import/no-nodejs-modules": "warn",
    },
  },
  prettier,
];
