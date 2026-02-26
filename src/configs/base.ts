import js from '@eslint/js';
import globals from 'globals';
import type { Linter } from 'eslint';

export function base(options: { isBrowser?: boolean; isNode?: boolean } = {}): Linter.Config[] {
  const { isBrowser, isNode } = options;

  return [
    js.configs.recommended,
    {
      name: 'auto:base',
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          ...(isBrowser ? globals.browser : {}),
          ...(isNode ? globals.node : {}),
          ...globals.es2021,
        },
      },
      rules: {
        'no-unused-vars': 'warn',
        'no-console': isNode ? 'off' : 'warn',
      },
    },
  ];
}
