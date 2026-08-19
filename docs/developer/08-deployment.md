# 08 · 部署

## 本地生产（默认形态）

```bash
bun run build          # Turbopack 构建 + 全类型检查
bun run start          # Node 进程监听 :1228
```

数据落盘 `data/yyc3.db`（进程外文件，重启不丢）。

**部署拓扑约束（单实例锁定）**：当前三种实现均为**单进程语义**，多实例/Serverless 水平扩缩前不可直接复制副本——
1. **限流**（`lib/rate-limit.ts`）：进程内内存桶，多副本时每副本独立计数，实际配额 = 副本数 × 配置值。多实例前接 Upstash Redis 替换存储后端（接口不变，仅换实现）。
2. **SQLite 单写者**：多副本需共享挂载 `data/` 或改用 PostgreSQL（接口已抽象）。
3. **AgenticCore 服务端单例**（`lib/agentic/server.ts`）：状态仅进程内，多副本各自独立（无正确性问题，仅状态不共享）。

**运行环境**：`next start` 为 production 模式——必须配置 `JWT_SECRET`（缺失即拒绝签发令牌），且**不会**种入演示账号（开发专属）。

## 环境变量清单

| 变量 | 必填 | 默认 | 说明 |
|------|------|------|------|
| `BIGMODEL_API_KEY` | ✅ | — | BigModel 服务端密钥 |
| `PORT` | | 1228（脚本内置） | 监听端口 |
| `DATABASE_URL` | | `<cwd>/data/yyc3.db` | SQLite 库文件路径 |
| `NEXT_PUBLIC_AI_API_URL` | | https://api.0379.love/v1 | 客户端 AI 网关（只读） |
| `NEXT_PUBLIC_APP_URL` | | http://localhost:1228 | 站点地址 |

## 脚本（scripts/）

| 脚本 | 用途 |
|------|------|
| deploy-docker.sh / docker-compose 相关 | 容器化部署（注意：Dockerfile 需 node:≥22.13 基础镜像） |
| deploy-to-production.sh / deploy-to-yyc3-33.sh | 历史部署目标 |
| database-schema.sql | 表结构 SQL 独立副本 |
| auto-fix-errors.ts / generate-docs.py | 历史维护工具/文档生成器 |

## 备份与恢复

```bash
# 在线安全备份（VACUUM INTO，不锁写）
# 代码内：getDatabase().backup("./backups/snapshot-$(date +%F).db")

# 恢复：停服后用备份文件替换 data/yyc3.db
```

## 健康检查清单（上线前）

- [ ] `bun run build && bun run start` 本地通过
- [ ] `curl localhost:1228/api/children` 返回 200 且含种子数据
- [ ] `/en` 与根路由均 200（混合路由回归点）
- [ ] `.env.local` 密钥为服务端变量且已轮换过
- [ ] `data/`、`.env*` 均在 .gitignore
- [ ] `npm audit` 0 漏洞

## 运行时约束

- 服务进程必须 **Node ≥ 22.13**（node:sqlite）；Bun 只跑 install/test
- Node 22 的 node:sqlite 打实验警告属预期，可 `NODE_OPTIONS=--no-warnings` 消音
- PWA 资产（manifest.json / sw.js / yyc3-pwa-icon.png）已在 `public/`，manifest 已挂接根 layout
