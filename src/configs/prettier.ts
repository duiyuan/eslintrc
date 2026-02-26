import prettierConfig from 'eslint-config-prettier';
import type { Linter } from 'eslint';

export function prettier(): Linter.Config[] {
  return [
    {
      name: 'auto:prettier',
      ...prettierConfig,
    } as Linter.Config,
  ];
}
