import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';

export function vue(options: { ts?: boolean } = {}): Linter.Config[] {
  const { ts } = options;

  return [
    ...(vuePlugin.configs['flat/recommended'] as Linter.Config[]),
    {
      name: 'auto:vue',
      files: ['**/*.vue'],
      languageOptions: {
        parser: vueParser,
        parserOptions: {
          parser: ts ? tseslint.parser : undefined,
          sourceType: 'module',
          ecmaVersion: 'latest',
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    } as Linter.Config,
  ];
}
