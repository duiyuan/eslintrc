import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';

export function typescript(): Linter.Config[] {
  return (tseslint.configs.recommended as Linter.Config[]).map(config => ({
    ...config,
    name: `auto:typescript:${config.name || 'recommended'}`,
    files: ['**/*.{ts,tsx,vue}'],
  }));
}
