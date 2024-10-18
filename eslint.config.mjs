import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

export default [
  eslint.configs.recommended,
  importPlugin.flatConfigs.recommended
]
