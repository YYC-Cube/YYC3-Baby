# 版本合并日志

> 合并日期: 2026-08-11（首轮）/ 2026-08-18（补全与安全加固）
> 合并策略: 以 yyc3-xy-05 为唯一基线，整合多版本优势资产

## 合并来源

| 来源版本 | 整合内容 | 目标路径 | 状态 |
|----------|---------|---------|------|
| yyc3-xy-05 | 全部核心代码（app/components/lib/types/hooks/core/config） | unified/ | ✅ 完成 |
| yyc3-xy-05 | 配置文件（package.json/tsconfig.json/next.config.mjs等） | unified/ | ✅ 完成 |
| yyc3-xy-03 | 测试配置（bun.test.config.ts/bun.test.preload.ts） | unified/ | ✅ 完成 |
| ai_xy05 | AI引擎模块（17个TS文件） | unified/lib/ai-modules/ | ✅ 完成 |
| YYC3-XY-SAIBO | 赛博朋克主题组件 | unified/themes/cyberpunk/ | ✅ 完成 |
| YYC3-XY-Application | 标准主题页面 | unified/themes/default/pages/ | ✅ 完成 |
| YYC3-Y | 液态主题组件 | unified/themes/liquid/ | ✅ 完成 |
| yyc3-xy-01 | 架构文档（63个md） | unified/docs/architecture/ | ✅ 完成（2026-08-18） |
| yyc3-xy-01 + yyc3-xy-03 | 规划/计划类文档（19个md） | unified/docs/plans/ | ✅ 完成（2026-08-18） |
| yyc3-xy-02 | 微服务文档库（2800+ md） | unified/docs/xy-02-microservices/ | ✅ 完成（2026-08-18） |

## 修复项

| 修复 | 详情 | 状态 |
|------|------|------|
| 断裂软链接 | core/AgenticCore.ts 从软链接改为实体文件 | ✅ 已修复（2026-08-11） |
| .env.local 安全 | 替换明文API Key为占位符 | ✅ 已修复（2026-08-11） |
| package.json 依赖被清空 | 恢复完整依赖清单（84 deps + 34 devDeps），移除已废弃仓库地址 | ✅ 已修复（2026-08-18） |
| API Key 客户端暴露 | BIGMODEL_API_KEY 改为服务端变量；新增 /api/ai/homework-correction 与 /api/ai/speech-to-text 代理路由，SmartHomeworkHelper 不再在浏览器内持有密钥 | ✅ 已修复（2026-08-18） |

## 冗余版本处理建议

| 版本 | 处理方式 | 原因 |
|------|---------|------|
| yyc3-xy/ | 建议删除 | 与 yyc3-xy-05 完全相同（0 diff） |
| yyc3-xy-ai/ | 建议删除 | app/ 与 yyc3-xy-05 完全相同（0 diff） |
| yyc3-xy-01/ | 文档已并入 unified/docs，源目录可归档 | 有独特文档体系 |
| yyc3-xy-02/ | 文档已并入 unified/docs，源目录可归档 | 有微服务编排参考价值 |
| yyc3-xy-03/ | 测试配置+情感模块已在 unified，源目录可归档 | 注意：其 .env.local 含真实API密钥，归档前先删除该文件 |
| YYC3-XY-Application/ | 主题已提取，源目录可删除 | Figma 导出 |
| YYC3-XY-SAIBO/ | 主题已提取，源目录可删除 | Figma 导出 |
| YYC3-Y/ | 主题已提取，源目录可删除 | Figma 导出 |

## Git 提交记录

- `init` - 从 yyc3-xy-05 派生统一基线，整合多版本资产 (2026-08-11)
- `chore: 添加 SQLite schema，清理临时文件` (2026-08-11，注意：该提交误删了依赖清单)
- 2026-08-18 补全提交：恢复依赖、文档并入、API Key 服务端化
