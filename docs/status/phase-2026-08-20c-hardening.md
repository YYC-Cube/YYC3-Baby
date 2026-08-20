---
file: phase-2026-08-20c-hardening.md
description: 2026-08-20 加固收尾阶段（5 个低优先滚动项全部清零，CI 升六门）
author: YYC³
version: v1.0.0
created: 2026-08-20
status: closed
tags: [status, phase, hardening]
category: status
---

# 🛡️ 2026-08-20 加固收尾阶段（C 轮）

> 承接：phase-2026-08-20b 第三节滚动清单，5 个低优先项**全部完成**——开放事项清零

## 一、交付明细

### ① lint 长尾 86 → 56
e2e evaluate 信封类型化（9→1）、chat 路由 zod 化、generate-image fal 响应类型化、
homework 页 exactAge 替换 as any、useSchedule/useInteractions/useAIVideo 持久化解析类型化。

### ② sqlite 吞错 → winston 错误级日志
sqlite-client 全部 9 个 catch 从 console.error 升级为 `logs/error-*.log`（30 天轮转、`[db]` 可检索），
坏表名/约束错误不再只留控制台——告警规则可基于该文件配置。返回空值的既有契约不变（测试仍 7/7）。

### ③ CSRF Origin 显式配置
- `CSRF_TRUSTED_ORIGINS`：受信第三方 Origin 白名单（小程序 WebView/反代场景）
- `CSRF_REQUIRE_ORIGIN=true`：严格模式拒绝缺失 Origin 的 Cookie 写请求
- 测试 +1（受信源 201 / 严格模式 403），.env.example 附说明

### ④ 敏感页未登录重定向
middleware 会话探测（`yyc3_at` Cookie 存在性）：growth/children/homework/badges/interactions/
schedule/curriculum/ai-creative（含 /en 镜像）未登录 → 302 首页 + 一次性 `yyc3_prompt_login` Cookie，
HomeHeader 消费后自动弹登录框。**定位为 UX 门禁**——真正鉴权仍在 API 层（requireAuth），
过期 Cookie 进入仍由 401/自动刷新接管。e2e +1 用例（重定向 + 弹窗断言）。

### ⑤ e2e 自举账号 + 纳入 CI（六门）
- e2e 第 0 步经 register 自举演示账号（重复邮箱静默 no-op）——**彻底脱种子依赖**，
  CI 的 production 模式（不种演示账号）可直接跑
- CI quality-gates 增补：Playwright chromium 安装 + `bun run test:e2e`（JWT_SECRET 注入）
- CI 门禁现为六门：lint / type / test / test:node / build / **e2e**

## 二、终态指标（实测）

type-check 0 错 · bun **257**/0 · node 7/0 · lint **0 err / 56 warn**（治理起点 932）· build ✅ · e2e **3/3**

## 三、滚动开放项

**清零**。遗留观察项（非债务）：
- lint 56 长尾继续随改随消（服务层 BigModel 响应类型、prediction 引擎内部类型）
- dependabot PR #1 待用户在 GitHub 手动关闭（PAT 无 PR 写权限）
- 多实例部署前置（Upstash 限流 / PostgreSQL）见 08-deployment 拓扑约束章节

## 四、阶段状态

closed —— 治理（08-19）→ 迭代（08-20）→ 数据统一（08-20B）→ 加固收尾（08-20C）四阶段完成，
开放事项清单归零，代码库进入常规迭代态。
