import type { Linter } from 'eslint';

export interface OptionsConfig {
  /**
   * 运行环境
   * @default 'auto'
   */
  env?: 'node' | 'browser' | 'auto';

  /**
   * 是否启用 TypeScript 支持
   * @default true
   */
  ts?: boolean;

  /**
   * 是否启用 Vue 支持
   * @default 自动检测
   */
  vue?: boolean;

  /**
   * 是否启用 React 支持
   * @default 自动检测
   */
  react?: boolean;

  /**
   * 是否启用 Next.js 支持
   * @default 自动检测
   */
  next?: boolean;

  /**
   * 是否启用 HTML 支持
   * @default true
   */
  html?: boolean;

  /**
   * 自定义规则覆盖
   */
  overrides?: Linter.Config;
}
