# eslint-config-auto

企业级、全自动、开箱即用的 ESLint 配置预设。

## 特性

-   🚀 **全自动检测**：自动识别项目中的 React, Vue, Next.js, TypeScript 等技术栈。
-   🛠️ **模块化设计**：配置分层，支持按需开启或关闭特定功能。
-   ✨ **现代规则集**：
    -   内置 `eslint-plugin-unicorn` 提供 100+ 最佳代码实践规则。
    -   内置 `eslint-plugin-import-x` 实现严格的导入语句排序与校验。
    -   完美集成 `prettier`，解决格式化冲突。
-   🛡️ **类型安全**：基于 TypeScript 编写，提供完整的 IDE 配置补全。
-   📦 **多格式支持**：同时支持 ESM 和 CommonJS。

## 安装

```bash
npm install -D eslint-config-auto eslint
```

## 使用

在项目根目录创建 `eslint.config.js`：

### 基础用法

```javascript
import auto from 'eslint-config-auto';

export default auto;
```

### 高级配置

你可以使用 `defineConfig` 函数进行自定义：

```javascript
import { defineConfig } from 'eslint-config-auto';

export default defineConfig({
  // 手动指定环境
  env: 'browser',
  
  // 开启/关闭特定功能
  ts: true,
  vue: false,
  unicorn: true,
  
  // 自定义规则覆盖
  overrides: {
    rules: {
      'no-console': 'error',
      'unicorn/filename-case': 'off'
    }
  }
});
```

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `env` | `'node' \| 'browser' \| 'auto'` | `'auto'` | 运行环境，auto 模式下自动检测依赖 |
| `ts` | `boolean` | `true` | 是否启用 TypeScript 支持 |
| `vue` | `boolean` | `auto` | 是否启用 Vue 支持 (自动检测) |
| `react` | `boolean` | `auto` | 是否启用 React 支持 (自动检测) |
| `next` | `boolean` | `auto` | 是否启用 Next.js 支持 (自动检测) |
| `unicorn` | `boolean` | `true` | 是否启用 Unicorn (代码最佳实践) |
| `imports` | `boolean` | `true` | 是否启用导入排序 |
| `html` | `boolean` | `true` | 是否启用 HTML 文件校验 |
| `overrides` | `Linter.Config` | `{}` | 自定义规则覆盖 |

## 导入排序规则

本项目内置了严格的导入排序，默认顺序如下：

1.  React/Vue 等核心框架
2.  外部依赖 (External)
3.  内部别名 (Internal, 如 `@/**`)
4.  父级/兄弟目录 (Parent/Sibling)
5.  类型导入 (Type)

## 开发与贡献

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 构建项目
npm run build
```

## License

MIT
