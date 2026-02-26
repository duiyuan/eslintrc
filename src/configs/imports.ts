import importPlugin from 'eslint-plugin-import-x';
import type { Linter } from 'eslint';

export function imports(): Linter.Config[] {
  return [
    {
      name: 'auto:imports',
      plugins: {
        'import-x': importPlugin,
      },
      rules: {
        'import-x/first': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
            ],
            pathGroups: [
              {
                pattern: '{react,react-dom/**,vue,vuex,pinia}',
                group: 'external',
                position: 'before',
              },
              {
                pattern: '@/**',
                group: 'internal',
              },
            ],
            pathGroupsExcludedImportTypes: ['type'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    } as Linter.Config,
  ];
}
