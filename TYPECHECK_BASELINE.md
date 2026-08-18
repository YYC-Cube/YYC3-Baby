# TypeScript 类型债基线（2026-08-18 第二次盘点）

> 统一基线标准化清理后的最新状态：tsc 全量检查 **~804 个错误**（首轮盘点 1,986 → tsconfig 标准化
> 与冗余代码删除后降至 990 → themes/ 排除 + prisma 解耦 + jsdom 补齐后 **804**）。
> 全部为真实类型不匹配（属性不存在 / 赋值不兼容 / 参数不符），无 lint 类噪音。
> `next.config.mjs` 暂设 `typescript.ignoreBuildErrors`，清零后移除。

## 已消除的错误来源（本轮）

| 措施 | 消除量 |
|------|--------|
| tsconfig 回归 Next.js 标准（关闭 noUnusedLocals/noUnusedParameters/noPropertyAccessFromIndexSignature/noUncheckedIndexedAccess/exactOptionalPropertyTypes/noImplicitReturns 等超严苛开关，lint 职责交还 ESLint） | ~996 |
| 删除零引用冗余代码（lib/ai-modules 17 文件、core/AgenticCore-Enhanced、main.ts、根级 performance-optimizer、lib/utils/、ai_roles_enhanced） | 含于上 |
| 删除 8 个 *-test/*-demo 演示路由 | 含于上 |
| themes/（Figma 参考代码，应用零引用）排除出 tsc | ~186 |
| @prisma/client 类型引用改指本地 Child 接口（4 文件） | ~6 |
| 补齐 jsdom devDependency（测试预载依赖） | 3 |

## 剩余错误构成（Top）

| 错误码 | 数量 | 含义 |
|--------|------|------|
| TS2339 | ~150 | 属性不存在（接口定义与实际数据结构不一致） |
| TS2322 | ~110 | 类型不可赋值 |
| TS2307 | 少量 | 模块不存在（剩余：.next 陈旧生成物、测试引用） |
| TS2345/TS2304/TS2305 | ~170 | 参数/名称/导出不匹配 |

## 建议清理顺序

1. `.next` 陈旧类型重新生成（rebuild 后自动消失）
2. `__tests__` 引用与现有模块对齐（测试基建激活）
3. `types/` 下接口定义与实际使用对齐，消 TS2339/TS2305 家族（最大头）
4. 每阶段跑 `bun run type-check` 记录差值，归零后移除 ignoreBuildErrors
