import unicornPlugin from 'eslint-plugin-unicorn';
import type { Linter } from 'eslint';

export function unicorn(): Linter.Config[] {
  return [
    {
      name: 'auto:unicorn',
      plugins: {
        unicorn: unicornPlugin,
      },
      rules: {
        ...unicornPlugin.configs.recommended.rules,
        // 可以在这里根据企业需求覆盖一些过于严格的规则
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              kebabCase: true,
              pascalCase: true,
            },
          },
        ],
      },
    } as Linter.Config,
  ];
}
