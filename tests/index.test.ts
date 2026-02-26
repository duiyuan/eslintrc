import { describe, it, expect } from 'vitest';
import { defineConfig } from '../src/factory';

describe('defineConfig', () => {
  it('should return default configs', () => {
    const configs = defineConfig();
    expect(Array.isArray(configs)).toBe(true);
    // 检查是否包含基础配置
    expect(configs.some(c => c.name === 'auto:base')).toBe(true);
    // 检查是否包含 Prettier
    expect(configs.some(c => c.name === 'auto:prettier')).toBe(true);
  });

  it('should support overrides', () => {
    const configs = defineConfig({
      overrides: {
        rules: {
          'no-console': 'error'
        }
      }
    });
    expect(configs.some(c => c.rules && c.rules['no-console'] === 'error')).toBe(true);
  });

  it('should disable ts when requested', () => {
    const configs = defineConfig({ ts: false });
    expect(configs.some(c => c.name?.startsWith('auto:typescript'))).toBe(false);
  });
});
