import { base } from './configs/base';
import { typescript } from './configs/typescript';
import { react } from './configs/react';
import { vue } from './configs/vue';
import { next } from './configs/next';
import { html } from './configs/html';
import { unicorn } from './configs/unicorn';
import { imports } from './configs/imports';
import { prettier } from './configs/prettier';
import type { OptionsConfig } from './types';
import type { Linter } from 'eslint';
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

export function defineConfig(options: OptionsConfig = {}): Linter.Config[] {
  const pkg = getPackageJson();
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  const {
    env = 'auto',
    ts = true,
    html: enableHtml = true,
    unicorn: enableUnicorn = true,
    imports: enableImports = true,
    overrides = {},
  } = options;

  const isNode = env === 'node' || (env === 'auto' && (deps.express || deps.fastify || deps.koa || (!deps.react && !deps.vue && !deps.next)));
  const isBrowser = env === 'browser' || (env === 'auto' && !isNode) || (!!(deps.react || deps.vue || deps.next));

  const hasReact = options.react !== undefined ? options.react : !!deps.react;
  const hasVue = options.vue !== undefined ? options.vue : !!deps.vue;
  const hasNext = options.next !== undefined ? options.next : !!deps.next;

  const configs: Linter.Config[] = [];

  // 1. Ignores
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

  // 2. Base
  configs.push(...base({ isBrowser, isNode }));

  // 3. TypeScript
  if (ts) {
    configs.push(...typescript());
  }

  // 4. React
  if (hasReact || hasNext) {
    configs.push(...react());
  }

  // 5. Next.js
  if (hasNext) {
    configs.push(...next());
  }

  // 6. Vue
  if (hasVue) {
    configs.push(...vue({ ts }));
  }

  // 7. HTML
  if (enableHtml) {
    configs.push(...html());
  }

  // 8. Unicorn
  if (enableUnicorn) {
    configs.push(...unicorn());
  }

  // 9. Imports
  if (enableImports) {
    configs.push(...imports());
  }

  // 10. Overrides
  if (Object.keys(overrides).length > 0) {
    configs.push(overrides);
  }

  // 11. Prettier (must be last)
  configs.push(...prettier());

  return configs;
}
