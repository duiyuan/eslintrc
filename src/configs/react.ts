import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import type { Linter } from 'eslint';

export function react(): Linter.Config[] {
  return [
    {
      name: 'auto:react',
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: {
        'react': reactPlugin,
        'react-hooks': reactHooksPlugin,
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        ...reactPlugin.configs.recommended.rules,
        ...reactHooksPlugin.configs.recommended.rules,
        'react/react-in-jsx-scope': 'off',
      },
    } as Linter.Config,
  ];
}
