# TypeScript 类型债基线（2026-08-18）

> 统一基线 `unified/` 首次可构建化时记录。tsc 全量检查存在 **1,986 个错误 / 518 个文件**，
> 全部继承自 yyc3-xy-05 原始代码，非本次合并引入。
> `next.config.mjs` 暂设 `typescript.ignoreBuildErrors`，构建不做类型门禁，
> 待按下表分阶段清零后移除该开关。

## 错误分布（按 TS 错误码）

| 错误码 | 数量 | 含义 | 清理策略 |
|--------|------|------|---------|
| TS6133 | 408 | 未使用的变量/导入 | 批量 lint 自动修复（--fix 或 biome） |
| TS2322 | 224 | 类型不可赋值 | 逐个核对，多数为宽/窄类型不一致 |
| TS2339 | 209 | 属性不存在 | 核对接口定义与实际数据结构 |
| TS4111 | 156 | 索引访问需通过 ['key'] | tsconfig 关闭 noUncheckedIndexedAccess 或补类型 |
| TS2345 | 133 | 参数类型不匹配 | 补齐参数类型收窄 |
| TS2307 | 121 | 模块不存在 | 部分为真实缺失文件（@/test-widget、jsdom 等） |
| TS2532/TS18048 | 230 | 可能为 undefined | 补空值防护或非空断言 |
| TS2353/TS2305/TS2304 | 134 | 字面量/导出/名称不匹配 | 对齐类型定义与导出 |
| 其他 | ~270 | — | — |

## 已知典型问题

1. `EmotionType` 在 `types/interaction.ts`（type alias）与 `lib/ai/emotion-engine.ts`（enum）双重定义（审计 P1-4）
2. `app/test-widget/page.tsx` 引用不存在的 `@/test-widget` 模块
3. `bun.test.preload.ts` 引用 jsdom（未安装）与 `__mocks__/`（已从 yyc3-xy-03 补齐 framer-motion、motion-dom）
4. `components/analytics/*` 引用 `@/types/analytics` 中不存在的导出（RealtimeMetrics→RealtimeMetric 等）

## 建议清理顺序

1. 先跑 lint --fix 消掉 TS6133（约 -400）
2. 统一 `EmotionType` 定义（审计 P1-4）
3. 清理 10 个 *-test/*-demo 路由（审计 P1-5），连带消除其类型错误
4. 补齐/对齐 types/ 下接口定义，消 TS2305/TS2339 家族
5. 每阶段跑 `bun run type-check` 记录差值，归零后移除 ignoreBuildErrors
