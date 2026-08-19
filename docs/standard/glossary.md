---
file: glossary.md
description: YYC3-Baby 项目术语表（术语统一与表述规范化）
author: Intelligent Application Implementation Expert
version: v1.0.0
created: 2026-08-19
updated: 2026-08-19
status: active
tags: [glossary, standard, documentation]
category: standard
---

# 📖 YYC³-Baby 项目术语表

> **用途**：保证项目文档、代码注释、沟通用语的一致性。新增术语请在此登记。

## 主题体系

| 术语（统一用词） | 类型值 | 说明 | 禁用/避免 |
| ---- | ---- | ---- | ---- |
| **暖阳** | `default` | 默认浅色主题，琥珀色系 | 勿写"默认主题"代替名称 |
| **赛博霓虹** | `cyberpunk` | 暗色主题，霓虹青 `#00f0ff` | 勿写"赛博朋克主题"（与设计稿不一致） |
| **液态翡翠** | `liquid` | 浅色主题，翡翠青绿 `#10b981` | 勿写"液态玻璃"（组件名除外） |
| **极光** | `aurora` | 暗色主题，极光流动 `#00ff87` | 勿写"极光主题样式"冗余表述 |
| **统一主题系统** | — | `components/theme-system/` 的四主题机制 | 勿写"多主题系统"（易与旧实现混淆） |

## 架构与模块

| 术语 | 说明 | 禁用/避免 |
| ---- | ---- | ---- |
| **统一基线** | 当前工作仓库 YYC3-Baby | 勿与"兄弟项目"混用 |
| **兄弟项目** | 功能超集参考仓库 YYC3-AI-Growth-Companion | 勿写"目标项目"（语义模糊） |
| **融合（融合路线 P0-x）** | 从兄弟项目移植能力到本仓库 | 勿写"合并/导入" |
| **data-theme 机制** | `<html data-theme>` 驱动的主题切换 | 勿写"CSS 变量切换"（不完整） |

## 工程实践

| 术语 | 说明 | 禁用/避免 |
| ---- | ---- | ---- |
| **语义类** | `text-adaptive`/`bg-surface` 等主题自适应类 | 勿写"主题工具类"（含旧色彩类） |
| **语义 token** | `--background`/`--primary` 等 CSS 变量 | 勿与"兄弟 token"混用 |
| **兄弟 token** | `--bg-app`/`--fg-default` 等品牌层变量 | 勿写"品牌 token"（少见） |
| **四道门禁** | tsc / lint / test / build | 勿遗漏任一 |
| **每日轮转日志** | `logs/error-%DATE%.log` 等 Winston 产物 | 勿写"日志文件"（不精确） |

## 数据与业务

| 术语 | 说明 | 禁用/避免 |
| ---- | ---- | ---- |
| **成长记录** | `growth_records` 表（milestone/observation/emotion/learning） | 勿写"成长日志"（与系统日志冲突） |
| **成长评估** | `growth_assessments` 表 | 勿写"测评"（另有含义） |
| **徽章系统** | 4 等级 × 8 分类真实化体系 | 勿写"勋章系统"（历史遗留用词） |
| **AI 浮窗** | `components/ai-xiaoyu/FixedAIWidget` | 勿写"AI 弹窗"（指 AIFloatWindow 弹层） |

## 命名规范速查

| 对象 | 规范 | 示例 |
| ---- | ---- | ---- |
| 文档文件 | 序号-主题.md / 主题.md | `01-getting-started.md` / `project-status.md` |
| 组件目录 | kebab-case | `theme-system/` `ai-xiaoyu/` |
| React 组件 | PascalCase | `ThemeSwitcher` `AuroraBackground` |
| API 路由 | 小写复数 | `/api/growth-records` |
| 测试文件 | 与被测模块同名 | `theme-system.test.ts` |

---
> "万象归元于云枢 | 深栈智启新纪元"
