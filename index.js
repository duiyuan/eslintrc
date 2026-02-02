import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vuePlugin from 'eslint-plugin-vue';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import htmlPlugin from 'eslint-plugin-html';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';
import prettierConfig from 'eslint-config-prettier';
import fs from 'node:fs';
import path from 'node:path';

function getPackageJson() {
  try {
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    if (fs.existsSync(pkgPath)) {
      return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    }
  } catch (e) {
    // Ignore
  }
  return {};
}

/**
 * Automatically generates ESLint flat configuration based on project context.
 * 
 * @param {Object} options
 * @param {'node' | 'browser' | 'auto'} [options.env='auto'] - Environment
 * @param {boolean} [options.ts=true] - Enable TypeScript support
 * @param {boolean} [options.jsx=true] - Enable JSX support
 * @param {boolean} [options.vue] - Enable Vue support (auto-detected if undefined)
 * @param {boolean} [options.react] - Enable React support (auto-detected if undefined)
 * @param {boolean} [options.next] - Enable Next.js support (auto-detected if undefined)
 * @param {boolean} [options.html=true] - Enable HTML support
 * @param {Object} [options.overrides] - Custom ESLint rules/overrides
 */
export function defineConfig(options = {}) {
  const pkg = getPackageJson();
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  const {
    env = 'auto',
    ts = true,
    html = true,
    overrides = {},
  } = options;

  // Detection
  const isNode = env === 'node' || (env === 'auto' && (deps.express || deps.fastify || deps.koa || !deps.react && !deps.vue && !deps.next));
  const isBrowser = env === 'browser' || (env === 'auto' && !isNode) || (deps.react || deps.vue || deps.next);

  const hasReact = options.react !== undefined ? options.react : !!deps.react;
  const hasVue = options.vue !== undefined ? options.vue : !!deps.vue;
  const hasNext = options.next !== undefined ? options.next : !!deps.next;

  const configs = [];

  // 1. Ignore patterns
  configs.push({
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/build/**',
      '**/.next/**',
      '**/out/**',
      '**/.vuepress/dist/**',
    ],
  });

  // 2. Base Javascript Configuration
  configs.push(js.configs.recommended);

  // 3. Language Options & Globals
  configs.push({
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
    }
  });

  // 4. TypeScript Configuration
  if (ts) {
    configs.push(...tseslint.configs.recommended.map(config => ({
      ...config,
      files: ['**/*.{ts,tsx,vue}'], // Apply TS rules to vue files as well
    })));
  }

  // 5. React Configuration
  if (hasReact || hasNext) {
    configs.push({
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
        'react/react-in-jsx-scope': 'off', // React 17+
      },
    });
  }

  // 6. Next.js Configuration
  if (hasNext) {
    configs.push({
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: {
        '@next/next': nextPlugin,
      },
      rules: {
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs['core-web-vitals'].rules,
      },
    });
  }

  // 7. Vue Configuration
  if (hasVue) {
    configs.push(...vuePlugin.configs['flat/recommended']);
    configs.push({
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
    });
  }

  // 8. HTML Configuration
  if (html) {
    configs.push({
      files: ['**/*.html'],
      plugins: {
        html: htmlPlugin,
      },
      settings: {
        'html/html-extensions': ['.html'],
      }
    });
  }

  // 9. Overrides
  if (Object.keys(overrides).length > 0) {
    configs.push(overrides);
  }

  // 10. Prettier (must be last)
  configs.push(prettierConfig);

  return configs;
}

export default defineConfig();
