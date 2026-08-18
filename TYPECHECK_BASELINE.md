# TypeScript 类型债基线（2026-08-18 第四次盘点·完整化阶段）

> 当前状态：应用代码 **~415 个错误**（演进：1,986 → tsconfig 标准化/冗余清除 990 →
> themes 排除等 804 → **本阶段系统性修复 415**，累计 **-79%**）。
> `__tests__/` 已按惯例移出 tsc（运行时由 `bun test` 把关，199/199 全绿），
> `themes/`（Figma 参考）维持排除。`next.config.mjs` 的 `ignoreBuildErrors` 保留至清零。

## 本阶段消除的错误来源

| 措施 | 效果 |
|------|------|
| 补写从未提交的类型定义（types/ai 的 Chat 家族、schedule 输入、analytics 实时指标、prediction 的 20+ 接口） | 消除整族 TS2305/TS2304 |
| 重写 `lib/prediction/base-predictor.ts` 为富基类（配置/模型标识/训练态/特征工程） | 预测引擎族 138 → ~15 |
| `components/CharacterThemeContext` API 对齐 + `CharacterTheme` 类型落地 | 角色主题族清零 |
| AgenticCore：SubtaskResult/PreprocessingResult/AgentContext 宽容化 + unknown error 安全取值 + 返回值包装 | 20 → 0 |
| RealtimeMetrics 独立定义（原误设为 RealtimeMetric 别名） | MetricsOverview 清零 |
| useSchedule 时间戳联合类型 + 默认课表补字段 | 28 → 个位数 |
| 删除零引用死代码：supabase-client、三个未接线 AI 引擎、verify-integration 脚本 | -70 |

## 剩余 ~415 的构成（应用代码）

- TS2339/TS2322 属性与赋值不匹配：约 55%（types/ 接口与组件实际用法的历史分歧，需逐域对齐）
- TS2345/TS2353 参数与字面量多余属性：约 30%
- 其余为少量 TS2304/TS7006

## 建议清理顺序

1. 按目录域推进：`lib/ai/` → `components/analytics|prediction` → `hooks/` → `app/`
2. 每个域先对齐 `types/` 下的接口定义再修组件
3. 每阶段跑 `bun run type-check` 记录差值；归零后移除 `ignoreBuildErrors` 与本文件
