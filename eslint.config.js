import { FlatCompat } from '@eslint/eslintrc';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import parserTypeScript from '@typescript-eslint/parser';
import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  ...nextConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: parserTypeScript,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      // 生产基线：recommended-type-checked（放弃 strict-type-checked 的风格类严苛项）
      ...pluginTypeScript.configs['recommended-type-checked'].rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,

      // —— 遗留债务降为 warn（可见、不阻断；见 TYPECHECK_BASELINE.md）——
      // any 家族：历史代码 ~300 处，按域逐步消除
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      // 悬浮 Promise：多为 UI 事件处理器中的 fire-and-forget，需逐个补 void/.catch
      '@typescript-eslint/no-floating-promises': 'warn',
      // React 事件属性（onClick 等）传 async 处理器是常见安全模式，豁免 void-return 检查；
      // 其余（条件分支/函数参数）仍严格检查
      '@typescript-eslint/no-misused-promises': ['warn', {
        checksVoidReturn: { attributes: false },
      }],
      // React Compiler 规则（渲染期 refs/非纯调用）：真实问题但存量 ~90 处，分批修复
      'react-hooks/refs': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/static-components': 'warn',
      // async 接口一致性（同步实现的 async 方法是既有 API 契约）
      '@typescript-eslint/require-await': 'warn',
      // 旧式类/对象方法解构模式
      '@typescript-eslint/unbound-method': 'warn',
      // 其余现代化债务
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-base-to-string': 'warn',
      '@typescript-eslint/prefer-promise-reject-errors': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
      '@typescript-eslint/no-confusing-void-expression': 'warn',

      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    // themes/__tests__ 已排除出 tsc（无 project 上下文会解析失败），lint 一致排除
    ignores: [
      'node_modules/',
      '.next/',
      'build/',
      'dist/',
      'themes/',
      '__tests__/',
      '*.log',
      '*.md',
      'docs/',
      'scripts/',
      'xiaoyu-enhanced-server.js',
    ],
  },
  prettierConfig,
];
