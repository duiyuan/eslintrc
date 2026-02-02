# eslint-config-auto

一个自动化的 ESLint 配置包，支持 JS/Node 环境区分，并适配 React、Vue、Next.js、TypeScript 和 HTML。

## 特性

- 🚀 **自动化**: 自动检测项目依赖（React, Vue, Next.js）并应用相应配置。
- 🌍 **环境适配**: 自动区分 Node.js 和 浏览器环境。
- 🛠️ **多语言支持**: 支持 JavaScript, TypeScript, TSX, JSX, Vue, HTML。
- 📦 **开箱即用**: 符合最新的 ESLint Flat Config (eslint.config.js) 标准。

## 安装

```bash
npm install --save-dev eslint-config-auto eslint
```

## 使用方法

在你的项目根目录下创建 `eslint.config.js`:

### 基础用法 (自动检测)

```javascript
import autoConfig from 'eslint-config-auto';

export default [
  ...autoConfig,
  // 你可以在这里添加自定义规则
];
```

### 高级用法 (手动指定)

如果你想手动控制开启哪些功能，可以使用 `defineConfig`:

```javascript
import { defineConfig } from 'eslint-config-auto';

export default defineConfig({
  env: 'node', // 强制指定为 node 环境
  ts: true,    // 开启 TypeScript 支持
  react: true, // 开启 React 支持
  vue: false,  // 关闭 Vue 支持
  html: true,  // 开启 HTML 支持
  overrides: {
    rules: {
      'no-console': 'off'
    }
  }
});
```

## 支持的环境与框架

- **环境**: Node.js, Browser, ES2021+
- **框架**: React, Vue (v3+), Next.js
- **文件类型**: `.js`, `.jsx`, `.ts`, `.tsx`, `.vue`, `.html`

## 默认忽略

默认忽略以下目录：
- `node_modules`
- `dist`
- `build`
- `.next`
- `out`

## 许可证

MIT
