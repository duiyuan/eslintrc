import htmlPlugin from 'eslint-plugin-html';
import type { Linter } from 'eslint';

export function html(): Linter.Config[] {
  return [
    {
      name: 'auto:html',
      files: ['**/*.html'],
      plugins: {
        html: htmlPlugin,
      },
      settings: {
        'html/html-extensions': ['.html'],
      },
    } as Linter.Config,
  ];
}
