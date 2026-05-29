import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import daStyle from 'eslint-config-dicodingacademy';
import reactPlugin from 'eslint-plugin-react';

export default defineConfig([
  js.configs.recommended,
  daStyle,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      react: reactPlugin
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'eol-last': ['error', 'always'],
      'no-unused-vars': ['error', {
        vars: 'all',
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
      }],

      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',

      'react/self-closing-comp': ['error', {
        component: true,
        html: true,
      }],

      'react/jsx-wrap-multilines': ['error', {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
      }],

      'react/jsx-curly-brace-presence': ['error', {
        props: 'never',
        children: 'never',
      }],

      'react/jsx-pascal-case': 'error',
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'always' }],
      'react/jsx-boolean-value': ['error', 'never'],
    },
  },
]);
