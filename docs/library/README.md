# YYC³ 智能插拔式移动AI系统

<div align="center">

![YYC³ Banner](public/git_1800_400-5.png)

# 🚀 YYC³ 智能插拔式移动AI系统

**Intelligent Pluggable Mobile AI System**

[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/YY-Nexus/yyc3-xy-05)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Bun](https://img.shields.io/badge/runtime-Bun-black.svg)](https://bun.sh)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Code Coverage](https://img.shields.io/badge/coverage-80%25-yellow.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/YY-Nexus/yyc3-xy-05/pulls)

---

**"以智能守护成长，用科技点亮未来"**

**Intelligent Guardianship for Growth, Technology Illuminating the Future**

[快速开始](#快速开始) • [功能特性](#功能特性) • [系统架构](#系统架构) • [文档索引](#文档索引) • [部署指南](#部署指南)

</div>

## 📋 目录

- [项目概述](#项目概述)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [系统架构](#系统架构)
- [项目结构](#项目结构)
- [文档索引](#文档索引)
- [API文档](#api文档)
- [开发指南](#开发指南)
- [部署指南](#部署指南)
- [贡献指南](#贡献指南)
- [许可证](#许可证)
- [联系我们](#联系我们)

---

## 🎯 项目概述

YYC³-XY-AI 智能插拔式移动AI系统是基于四个项目（yyc3-xy-01、yyc3-xy-02、yyc3-xy-03、yyc3-xy-05）深度分析后，选择 **yyc3-xy-05 作为主基座**，整合其他项目优势功能打造的综合性AI系统。

### 项目背景

本项目旨在整合四个项目的优势：
- **yyc3-xy-01**：文档体系完善，架构设计清晰
- **yyc3-xy-02**：UI 组件丰富，Material-UI 集成
- **yyc3-xy-03**：测试配置完善，Winston 日志系统
- **yyc3-xy-05**：技术栈最新，功能最完整（主基座）

### 整合策略

```
主基座: yyc3-xy-05 (70%)
    ├── 元学习系统 ⭐
    ├── Neo4j 知识图谱 ⭐
    ├── 自适应预测引擎 ⭐
    └── 最新技术栈（Next.js 16.1.1）
    ↓
整合来源: yyc3-xy-01 (15%)
    └── 文档体系 ⭐
    ↓
整合来源: yyc3-xy-03 (10%)
    ├── 测试配置 ⭐
    └── Winston 日志系统 ⭐
    ↓
整合来源: yyc3-xy-02 (5%)
    └── Material-UI 组件 ⭐
```

### 核心价值

- **智能成长守护** - 从孕育期到22岁的全生命周期智能陪伴
- **个性化教育** - 基于AI的自适应学习路径和内容推荐
- **多模态交互** - 文本、语音、图像、视频全场景支持
- **知识图谱** - Neo4j驱动的智能知识库和关系推理
- **元学习系统** - 三层智能学习架构（行为、策略、知识）
- **实时监控** - 成长数据实时追踪与分析
- **微服务架构** - 高可用、可扩展的服务编排
- **文档完善** - 完整的架构、API、开发、部署文档

---

## ✨ 功能特性

### 🤖 智能AI助手

- **拖拽式界面** - 基于React DnD的智能组件，支持自由布局
- **多视图切换** - 对话、工具、洞察多模式交互
- **位置优化** - 自动最佳位置计算，提升用户体验
- **实时任务监控** - 动态任务状态跟踪与反馈
- **情感分析** - 实时情绪识别与情感响应
- **语音交互** - Web Speech API驱动的语音识别与合成

### 🧠 核心系统引擎

- **AgenticCore** - 事件驱动+目标驱动混合架构
- **ServiceOrchestrator** - 微服务编排与协调
- **GoalManagementSystem** - 目标生命周期管理
- **MetaLearningSystem** - 三层智能学习架构（行为、策略、知识）
- **RAGEngine** - 检索增强生成，提供精准知识服务
- **PredictionEngine** - 自适应集成预测模型

### 🛠️ 工具与知识系统

- **ToolManager** - 动态工具发现与注册
- **ToolRegistry** - 工具生命周期管理
- **KnowledgeManager** - RAG知识库管理
- **KnowledgeGraphManager** - Neo4j知识图谱管理
- **APIGateway** - 统一API网关与负载均衡
- **RecommendationEngine** - 智能推荐系统

### 🎨 多模态交互

- **文本对话** - 智能回复与上下文理解
- **语音识别** - 实时语音转文字
- **语音合成** - 自然语音输出
- **图像处理** - 视觉内容理解与分析
- **文件上传** - 多格式文件智能处理
- **视频生成** - AI驱动的视频内容创作

### 📊 成长管理

- **成长记录** - 完整的成长数据追踪
- **里程碑管理** - 关键成长节点标记
- **评估系统** - 多维度成长评估
- **课程管理** - 个性化课程推荐
- **作业管理** - 智能作业批改与反馈
- **互动记录** - 亲子互动数据统计

### 🏗️ 基础设施

- **容器化部署** - Docker + Docker Compose
- **微服务架构** - 服务发现与健康检查
- **实时通信** - WebSocket双向通信
- **数据库支持** - PostgreSQL、Neo4j、SQLite、Redis
- **监控告警** - 完善的日志与性能监控
- **PWA支持** - 离线可用，跨平台部署

---

## 💻 技术栈

### 前端技术

- **框架**: Next.js 16.1.1, React 19.2.3
- **语言**: TypeScript 5.9.3
- **样式**: TailwindCSS 4.1.18, Framer Motion 12.23.26
- **状态管理**: Redux Toolkit, SWR
- **UI组件**: Radix UI, shadcn/ui
- **拖拽**: React DnD 16.0.1
- **国际化**: next-intl 4.7.0
- **PWA**: Service Worker, Web App Manifest

### 后端技术

- **运行时**: Bun 1.1.38, Node.js 18+
- **框架**: Hono 4.11.3
- **AI引擎**: Vercel AI SDK 6.0.5, OpenAI 6.15.0
- **数据库**: 
  - PostgreSQL (pg 8.16.3)
  - Neo4j (neo4j-driver 6.0.1)
  - SQLite (sqlite3 5.1.7, sql.js 1.13.0)
  - Redis (ioredis 5.8.2)
- **实时通信**: Socket.IO 4.8.3
- **认证**: JWT (jsonwebtoken 9.0.3)
- **验证**: Zod 4.3.4

### AI与机器学习

- **TensorFlow.js** 4.22.0
- **Universal Sentence Encoder** 1.3.3
- **OpenAI API** 集成
- **本地AI**: Ollama支持
- **RAG**: 向量检索与知识增强

### 开发工具

- **包管理**: Bun
- **代码检查**: ESLint, Prettier
- **类型检查**: TypeScript
- **测试**: Jest, Testing Library
- **容器**: Docker, Docker Compose
- **CI/CD**: GitHub Actions

---

## 🚀 快速开始

### 环境要求

- Bun >= 1.0.0
- Node.js >= 18.0.0
- Docker (可选，用于容器化部署)
- PostgreSQL (可选)
- Neo4j (可选，用于知识图谱)

### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/YY-Nexus/yyc3-xy-05.git
cd yyc3-xy-05
```

2. **安装依赖**

```bash
bun install
```

3. **配置环境变量**

```bash
cp .env.example .env
# 编辑 .env 文件，填入必要的配置
```

4. **启动开发服务器**

```bash
# 启动 Next.js 开发服务器
bun run dev:next

# 或启动 Bun 主服务器
bun run dev
```

5. **访问应用**

打开浏览器访问 [http://localhost:1228](http://localhost:1228)

### Docker 部署

```bash
# 构建并启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

---

## 🏗️ 系统架构

```mermaid
graph TB
    subgraph "前端层 Frontend"
        A[智能AI组件] --> B[Next.js应用]
        B --> C[React DnD拖拽界面]
        B --> D[多模态交互]
    end

    subgraph "API网关层 API Gateway"
        E[API Gateway] --> F[负载均衡]
        E --> G[认证授权]
        E --> H[限流熔断]
        E --> I[路由分发]
    end

    subgraph "服务层 Services"
        J[AgenticCore] --> K[事件处理引擎]
        L[ToolManager] --> M[工具注册中心]
        N[KnowledgeManager] --> O[RAG检索引擎]
        P[GoalManager] --> Q[目标管理系统]
        R[MetaLearning] --> S[三层学习架构]
    end

    subgraph "数据层 Data"
        T[PostgreSQL] --> U[业务数据]
        V[Neo4j] --> W[知识图谱]
        X[Redis] --> Y[缓存与会话]
        Z[SQLite] --> AA[本地存储]
    end

    B --> E
    E --> J
    E --> L
    E --> N
    E --> P
    E --> R
    J --> T
    L --> T
    N --> V
    P --> T
    R --> X
```

### 架构特点

- **事件驱动**: 基于事件的异步处理机制
- **目标驱动**: 明确的目标管理与追踪
- **微服务**: 服务解耦，独立部署扩展
- **插件化**: 动态工具注册与卸载
- **多模态**: 统一的多模态交互接口
- **可观测**: 完善的监控与日志系统

---

## 📁 项目结构

```
yyc3-xy-ai/
├── app/                      # Next.js 应用目录
│   ├── [locale]/             # 国际化路由
│   ├── api/                  # API 路由
│   ├── ai-chat/              # AI 对话页面
│   ├── growth/               # 成长管理页面
│   └── ...                   # 其他页面
├── components/               # React 组件
│   ├── auth/                 # 认证组件
│   ├── ui/                   # UI 组件库
│   └── ...                   # 其他组件
├── core/                     # 核心引擎
│   └── AgenticCore.ts        # 事件驱动核心
├── services/                 # 业务服务
│   ├── ai/                   # AI 服务
│   ├── gateway/              # API 网关
│   ├── knowledge/            # 知识库服务
│   └── ...                   # 其他服务
├── lib/                      # 工具库
│   ├── ai/                   # AI 工具
│   ├── db/                   # 数据库工具
│   └── ...                   # 其他工具
├── hooks/                    # React Hooks
├── types/                    # TypeScript 类型定义
├── docs/                     # 项目文档
├── scripts/                  # 部署脚本
├── public/                   # 静态资源
├── config/                   # 配置文件
├── backend/                  # 后端服务
├── .env.example              # 环境变量示例
├── package.json              # 项目配置
├── tsconfig.json             # TypeScript 配置
├── next.config.mjs           # Next.js 配置
├── docker-compose.yml        # Docker 编排
└── README.md                 # 项目说明
```

---

## 📚 文档索引

### 项目分析文档

- [📊 项目对比分析报告](docs/PROJECT-COMPARISON-ANALYSIS.md) - 四个项目深度对比分析
- [📋 项目整合规划文档](docs/INTEGRATION-PLAN.md) - 详细整合实施计划
- [📊 项目现状分析报告](docs/PROJECT-STATUS-ANALYSIS.md) - 项目现状与改进方向
- [📚 项目整合总结](docs/INTEGRATION-SUMMARY.md) - 整合背景、决策与预期效果

### 架构文档

- [YYC3-XY-架构类-移动AI系统](docs/YYC3-XY-架构类-移动AI系统.md) - 系统架构设计文档
- [YYC3-XY-架构设计](docs/YYC3-XY-架构设计/) - 详细架构设计文档
  - [00-YYC3-XY-设计类文档索引](docs/YYC3-XY-架构设计/设计类/00-YYC3-XY-设计类文档索引.md) - 设计文档索引
  - [01-YYC3-XY-设计类-核心架构设计文档](docs/YYC3-XY-架构设计/设计类/01-YYC3-XY-设计类-核心架构设计文档.md) - 核心架构
  - [02-YYC3-XY-设计类-角色系统设计文档](docs/YYC3-XY-架构设计/设计类/02-YYC3-XY-设计类-角色系统设计文档.md) - 角色系统
  - [03-YYC3-XY-设计类-工具系统设计文档](docs/YYC3-XY-架构设计/设计类/03-YYC3-XY-设计类-工具系统设计文档.md) - 工具系统
  - [04-YYC3-XY-设计类-知识系统设计文档](docs/YYC3-XY-架构设计/设计类/04-YYC3-XY-设计类-知识系统设计文档.md) - 知识系统
  - [05-YYC3-XY-设计类-目标系统设计文档](docs/YYC3-XY-架构设计/设计类/05-YYC3-XY-设计类-目标系统设计文档.md) - 目标系统
  - [06-YYC3-XY-设计类-学习系统设计文档](docs/YYC3-XY-架构设计/设计类/06-YYC3-XY-设计类-学习系统设计文档.md) - 学习系统
  - [07-YYC3-XY-设计类-预测系统设计文档](docs/YYC3-XY-架构设计/设计类/07-YYC3-XY-设计类-预测系统设计文档.md) - 预测系统

### 功能文档

- [AI浮窗为中心全局语音交互弹窗控制系统](docs/AI浮窗为中心全局语音交互弹窗控制系统.md) - AI浮窗系统设计
- [UI系统分层式优化实现报告](docs/UI系统分层式优化实现报告.md) - UI优化报告
- [全页面UI系统分层式优化设计](docs/全页面UI系统分层式优化设计.md) - 全页面UI设计
- [孕育期至22岁全生命周期链路智能守护完善计划](docs/孕育期至22岁全生命周期链路智能守护完善计划.md) - 全生命周期守护计划
- [执行分析报告-12-18](docs/执行分析报告-12-18.md) - 执行分析报告

### 审计报告

- [YYC3_AUDIT_REPORT](docs/YYC3_AUDIT_REPORT.md) - YYC³审计报告

### 脚本工具

- [YYC3-XY-脚本工具](docs/YYC3-XY-脚本工具/) - 脚本工具集合
- [言语记忆](docs/言语记忆/) - 言语记忆相关脚本

### 开发文档

- [YYC3-XY-开发指导-图片路径](public/YYC3-XY-开发指导-图片路径.md) - 图片路径指南

---

## 🔌 API文档

### 核心API端点

#### AI服务

- `POST /api/ai/chat` - AI对话接口
- `POST /api/ai/emotion` - 情感分析接口
- `POST /api/ai/orchestrate` - AI编排接口

#### 成长管理

- `GET /api/growth-records` - 获取成长记录
- `POST /api/growth-records` - 创建成长记录
- `GET /api/homework` - 获取作业列表
- `GET /api/homework/[id]` - 获取作业详情

#### 用户管理

- `GET /api/children` - 获取儿童列表
- `POST /api/children` - 创建儿童档案
- `POST /api/error-report` - 错误报告

### API网关

- **端口**: 3000 (默认)
- **认证**: JWT Bearer Token
- **限流**: 100 req/min (默认)
- **超时**: 30s (默认)

详细API文档请参考 [API文档](docs/YYC3-XY-架构类-移动AI系统.md#api文档)

---

## 🛠️ 开发指南

### 代码规范

项目遵循严格的代码规范：

- **TypeScript严格模式**: 所有类型检查启用
- **ESLint规则**: 使用推荐的TypeScript规则集
- **Prettier格式化**: 统一代码风格
- **提交规范**: 遵循Conventional Commits规范

### 类型安全

项目实施完善的类型安全机制：

- **严格类型检查**: `strict: true`
- **无隐式any**: `noImplicitAny: true`
- **空值检查**: `strictNullChecks: true`
- **类型覆盖率**: 目标 > 80%

### 测试

```bash
# 运行所有测试
bun test

# 运行测试并生成覆盖率
bun test --coverage

# 类型检查
bun run type-check

# 代码检查
bun run lint
```

### 开发工作流

1. 创建功能分支
```bash
git checkout -b feature/your-feature-name
```

2. 进行开发和测试
```bash
bun run dev:next
```

3. 提交代码
```bash
git add .
git commit -m "feat: add your feature"
```

4. 推送并创建PR
```bash
git push origin feature/your-feature-name
```

---

## 🚀 部署指南

### 开发环境部署

```bash
# 启动开发服务器
bun run dev:next

# 访问 http://localhost:1228
```

### 生产环境部署

#### Docker部署

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

#### 手动部署

```bash
# 构建应用
bun run build:next

# 启动生产服务器
bun run start:next
```

### 环境变量配置

参考 [`.env.example`](.env.example) 文件配置必要的环境变量：

```env
# Node环境
NODE_ENV=production

# OpenAI配置
OPENAI_API_KEY=your-api-key
OPENAI_MODEL=gpt-4

# 数据库配置
DATABASE_URL=postgresql://user:password@localhost:5432/yyc3
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your-password

# Redis配置
REDIS_URL=redis://localhost:6379

# JWT密钥
JWT_SECRET=your-jwt-secret
```

### 部署脚本

项目提供多个部署脚本：

- `scripts/deploy-docker.sh` - Docker部署
- `scripts/deploy-local-ai.sh` - 本地AI服务部署
- `scripts/deploy-microservices.sh` - 微服务部署
- `scripts/deploy-to-production.sh` - 生产环境部署

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献

1. Fork本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个Pull Request

### 贡献规范

- 遵循项目的代码规范
- 添加必要的测试
- 更新相关文档
- 确保所有测试通过
- 提交信息清晰明确

### 代码审查

所有PR都需要经过代码审查，确保：
- 代码质量符合标准
- 类型安全检查通过
- 测试覆盖率达标
- 文档完整准确

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 📞 联系我们

### 团队信息

**YYC³ 团队**

**团队标语**: "以智能守护成长，用科技点亮未来"

**联系方式**:
- 📧 Email: [admin@0379.email](mailto:admin@0379.email)
- 🌐 GitHub: [https://github.com/YY-Nexus/yyc3-xy-05](https://github.com/YY-Nexus/yyc3-xy-05)
- 📖 文档: [项目文档](docs/)

### 支持与反馈

如果您有任何问题、建议或反馈，欢迎通过以下方式联系我们：

- 提交 [Issue](https://github.com/YY-Nexus/yyc3-xy-05/issues)
- 发送邮件至 [admin@0379.email](mailto:admin@0379.email)
- 参与 [Discussions](https://github.com/YY-Nexus/yyc3-xy-05/discussions)

---

<div align="center">

**⭐ 如果这个项目对您有帮助，请给我们一个 Star！⭐**

**Made with ❤️ by YYC³ Team**

</div>
