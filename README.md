<p align="center">
  <img src="public/YYC3-Family.png" alt="YYC³ Family" />
</p>

# YYC³ 小语智能成长守护系统（统一基线）

> YYC³ AI小语智能成长守护系统 — 0-3岁婴幼儿智能陪伴与成长守护平台。
> 本仓库是多版本收敛后的**唯一开发基线**：代码源自 yyc3-xy-05 家族，整合 01/02/03 版本文档与测试、
> ai_xy05 AI 模块、三套 Figma 主题参考。工作区已收敛为本目录单项目。

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 16（App Router）+ React 19 + TypeScript 5.9 |
| 运行时/包管理 | Node ≥ 22.13（`node:sqlite`）+ Bun（测试）/ npm 兼容 |
| 样式 | Tailwind CSS 4 + shadcn/ui（Radix） |
| 状态 | Redux Toolkit + TanStack Query + SWR |
| AI | BigModel 开放平台（作业批改 / 语音 / 情感分析），密钥仅服务端 |
| 数据 | SQLite（`node:sqlite`，`data/yyc3.db`，WAL） |
| i18n | next-intl v4（zh 默认 / en，`/en` 前缀路由） |

## 快速开始

```bash
# 安装依赖（国内网络必须走镜像）
bun install --registry https://registry.npmmirror.com

# 配置环境变量
cp .env.example .env.local   # 填入 BIGMODEL_API_KEY 等

# 开发（端口 1228）
bun run dev

# 构建 / 生产启动
bun run build && bun run start

# 测试（199 个用例）
bun test
```

## 数据层

- **真实持久化**：children / growth-records / homework（含 `[id]`）四个 API 走
  `lib/db/server.ts` → `lib/db/sqlite-client.ts`（`node:sqlite`），数据落盘 `data/yyc3.db`
- 首次访问自动建表并灌入种子数据（示例家庭/作业/课程）
- JSON 列（media_urls/tags 等）由 server 层自动序列化/反序列化
- 外键约束开启，非法引用返回 400 与中文提示
- 重启进程数据不丢失；备份走 `VACUUM INTO`

## 国际化

- `i18n/`（routing/navigation/request）+ `middleware.ts` 为 next-intl v4 标准结构
- `/` 为中文（默认语言无前缀），`/en`、`/en/growth` 等为英文路由
- 文案在 `messages/{zh,en}.json`；`LanguageSwitcher` 组件可直接切换
- 根路由（中文主应用）与 `[locale]` 镜像路由并存，Provider 已注入

## 常用脚本

| 命令 | 作用 |
|------|------|
| `bun run dev` | Next.js 开发服务器（:1228） |
| `bun run build` / `start` | 生产构建 / 启动 |
| `bun test` | 单元测试（199 用例，全绿） |
| `bun run type-check` | 类型检查（应用代码遗留 ~415，见 TYPECHECK_BASELINE.md） |
| `bun run lint` / `lint:fix` | ESLint 检查 / 自动修复 |

## 目录结构

```
unified/
├── app/                  # Next.js App Router
│   ├── api/              #   API 路由（AI 代理 + SQLite CRUD）
│   ├── [locale]/         #   国际化路由（en）
│   └── <feature>/        #   功能页面（growth/homework/books/...）
├── components/           # React 组件（ui/ 基础件 + 业务分组 + 角色主题）
├── lib/
│   ├── ai/               #   AI 引擎（情感/语音/多模态）
│   ├── api/              #   外部 API 客户端（服务端专用）
│   ├── db/               #   SQLite 数据层（server.ts 为 API 统一入口）
│   ├── prediction/       #   预测引擎基座与专项引擎
│   └── store/            #   Redux 状态
├── services/prediction/  # 智能预测服务（模型选择/质量监控）
├── core/                 # AgenticCore 自治核心
├── i18n/ messages/       # next-intl 配置与中英文案
├── middleware.ts         # locale 路由中间件
├── hooks/ types/ config/ # 钩子、类型、配置
├── themes/               # Figma 三套主题参考（未接线，排除出 tsc）
├── __tests__/            # 单元测试（199 用例）
├── public/               # 静态资源（icon/manifest/PWA/角色照片）
├── scripts/              # 部署脚本 + 文档生成器（generate-docs.py）
└── docs/                 # 全部文档资产
    ├── architecture/     #   架构文档（63 篇，源 01）
    ├── plans/            #   规划文档（19 篇，源 01/03）
    ├── xy-02-microservices/ # 微服务文档库（2800+ 篇）
    ├── history-snapshots/   # 历史快照独有文档（440 篇）
    ├── creative/         #   沫语创作集
    ├── library/          #   根文档架（原工作区 docs/，generate-docs.py 产物）
    └── audit/            #   审计报告（原 audit-output/）
```

## 安全约定

- **密钥只进服务端**：`BIGMODEL_API_KEY` 为服务端变量；AI 调用一律走 `app/api/ai/*` 代理路由。
  禁止 `NEXT_PUBLIC_` 前缀承载密钥。
- `.env*` 已 gitignore；`data/`（SQLite 库文件）同样不入库。
- 安全响应头（CSP / X-Frame-Options / nosniff / Referrer-Policy）配置于 `next.config.mjs`。
- 依赖审计：`npm audit --package-lock-only --registry=https://registry.npmjs.org`，当前 **0 漏洞**。

## 开发者文档

完整技术文档套见 **[docs/developer/](./docs/developer/)**：快速上手 · 可视化架构（Mermaid 七图）· 数据模型 · API 参考 · 前端组件体系 · AI 引擎与安全 · 测试与质量门禁 · 部署 · 贡献指南。

## 当前状态

- ✅ 构建通过，生产冒烟 200（含 `/en` i18n 路由、`/manifest.json`、`/icon.svg`）
- ✅ SQLite 真实持久化（写入 → 重启 → 数据在）
- ✅ 测试 216/216 全绿
- ✅ 依赖 0 漏洞；类型债 1,986 → **0**（[TYPECHECK_BASELINE.md](./TYPECHECK_BASELINE.md)，门禁已恢复）
- ✅ 徽章系统：30 枚勋章 × 真实数据评估引擎（`lib/badges/`）
- 📍 下一步建议：按域清理剩余类型债 → 接线 themes 三套主题 → API 鉴权中间件
