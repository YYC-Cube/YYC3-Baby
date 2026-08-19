---
file: phase-2026-08-20b-data-unification.md
description: 2026-08-20 数据统一阶段记录（DELETE 端点补齐 + mock 层移除，承接 08-20 阶段滚动项）
author: YYC³
version: v1.0.0
created: 2026-08-20
status: closed
tags: [status, phase, data-unification]
category: status
---

# 🗄️ 2026-08-20 数据统一阶段记录（B 轮）

> 承接：[phase-2026-08-20.md](./phase-2026-08-20.md) 第三节两个中级滚动项，全部完成

## 一、交付明细

### ① 数据端点补齐（DELETE/PATCH + 统计）

| 端点 | 语义 |
|---|---|
| `PATCH /api/children/[id]` | 字段白名单更新；id/user_id 不可变更；404/403 归属校验 |
| `DELETE /api/children/[id]` | **外键级联删除**（成长记录/作业/里程碑/评估随之清理） |
| `DELETE /api/growth-records/[id]` | 记录 → 孩子 → 用户三级归属校验后删除 |
| `GET /api/stats` | 当前用户聚合统计（children/records/milestones/assessments） |

行为测试 +5（跨用户 403 / 白名单 / 级联 / 404），data-routes 套件 19/19。

### ② mock 层移除（数据统一）

- `useChildren` 重写为服务端 API 客户端（authFetch；选中孩子本地仅持久化 id；401 按空列表优雅降级）
- children 页面 CRUD 全量走 API（错误上屏引导登录）；首页计数走 `/api/stats`；ChildSelector 类型归位
- 领域类型迁至 `lib/db/types.ts`（客户端/服务端共用）；**删除 `lib/db/client.ts`（417 行 localStorage mock 层）**
- 连带发现并删除"注释保活"孤儿链：`DatabaseInitializer.tsx` + `lib/db/database-manager.ts`
  （仅被 layout 里一行**注释掉的 import** 引用——可达性分析的正则不识别注释，此为方法盲区，已记录）
- 附带收益：growth 页"写记录"弹窗此前因 mock child_id 不存在于服务端而必然失败，现走真实数据全链路打通

### ③ e2e 自清理

冒烟流程补第 6 步：删除 e2e 娃娃 + 复核消失（级联清记录）——**开发库不再残留测试数据**。

## 二、终态指标（实测）

type-check 0 错 · bun **256**/0（+5）· node 7/0 · lint **0 err / 86 warn** · build ✅ · e2e 2/2（含自清理）

## 三、滚动开放项（更新后清单）

| 级 | 事项 | 备注 |
|---|---|---|
| 低 | 敏感页未登录空壳 | API 已安全拦截，服务端会话探测重定向为体验优化 |
| 低 | sqlite 吞错告警 / guard Origin 显式配置 | 纵深防御增强 |
| 低 | e2e 纳入 CI | Playwright 官方镜像可解浏览器安装成本 |
| 低 | lint 86 长尾 | 收敛中（932→170→88→86） |
| 新低 | 可达性分析不识别注释引用 | 本次已人工补删；固化脚本时需加注释过滤 |

## 四、运维注意

- **数据迁移**：旧 localStorage mock 数据（yyc3_children 等 key）**不自动迁移**——mock 时代数据仅存于浏览器，
  正式数据以服务端 SQLite 为准；如需找回旧数据可手工经 children 页录入
- dependabot PR #1（docs/YYC3-小语 已删目录的依赖升级）构成 modify/delete 冲突且无合并意义，
  需在 GitHub 手动关闭（当前 PAT 无 PR 写权限）
