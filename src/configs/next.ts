import nextPlugin from '@next/eslint-plugin-next';
import type { Linter } from 'eslint';

export function next(): Linter.Config[] {
  return [
    {
      name: 'auto:next',
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: {
        '@next/next': nextPlugin,
      },
      rules: {
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs['core-web-vitals'].rules,
      },
    } as Linter.Config,
  ];
}
