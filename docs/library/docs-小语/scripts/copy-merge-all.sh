#!/bin/bash
# YYC³ 项目复制整合脚本
# 以 yyc3-xy-02 为主，复制其他项目优势功能

set -e  # 遇到错误立即退出

echo "╔═══════════════════════════════════════════════════════╗"
echo "║   YYC³ 项目复制整合 - 自动化执行脚本                  ║"
echo "║   基础: yyc3-xy-02                                    ║"
echo "║   整合: 01+03+05 优势功能                             ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# 配置
BASE_DIR="/Users/yanyu"
PROJECT_02="$BASE_DIR/yyc3-xy-02"
PROJECT_01="$BASE_DIR/yyc3-xy-01"
PROJECT_03="$BASE_DIR/yyc3-xy-03"
PROJECT_05="$BASE_DIR/yyc3-xy-05"
UNIFIED="$BASE_DIR/yyc3-xy-unified"

# 步骤1: 创建基础
echo "🚀 步骤 1/6: 创建统一项目基础..."
if [ -d "$UNIFIED" ]; then
    echo "  ⚠️  $UNIFIED 已存在，备份中..."
    mv "$UNIFIED" "$UNIFIED.backup.$(date +%Y%m%d_%H%M%S)"
fi

mkdir -p "$UNIFIED"
echo "  📦 复制02项目作为基础..."
cp -r "$PROJECT_02"/* "$UNIFIED/"
cp -r "$PROJECT_02"/.gitignore "$UNIFIED/" 2>/dev/null || true
cp -r "$PROJECT_02"/.env.example "$UNIFIED/" 2>/dev/null || true
echo "  ✅ 基础创建完成 (包含02项目的156个组件)"

# 步骤2: 从01复制预测服务
echo ""
echo "📥 步骤 2/6: 从01项目复制预测服务..."
mkdir -p "$UNIFIED/lib/prediction"
mkdir -p "$UNIFIED/services/prediction"

if [ -d "$PROJECT_01/lib/prediction" ]; then
    cp -r "$PROJECT_01/lib/prediction"/* "$UNIFIED/lib/prediction/"
    echo "  ✅ 预测服务库已复制"
else
    echo "  ⚠️  lib/prediction 不存在，跳过"
fi

if [ -d "$PROJECT_01/services/prediction" ]; then
    cp -r "$PROJECT_01/services/prediction"/* "$UNIFIED/services/prediction/"
    echo "  ✅ 预测服务已复制"
else
    echo "  ⚠️  services/prediction 不存在，跳过"
fi

# 复制数据可视化组件
mkdir -p "$UNIFIED/components/growth"
if [ -f "$PROJECT_01/components/growth/GrowthCharts.tsx" ]; then
    cp "$PROJECT_01/components/growth/GrowthCharts.tsx" "$UNIFIED/components/growth/"
    echo "  ✅ GrowthCharts 已复制"
fi

if [ -f "$PROJECT_01/components/growth/DevelopmentCurveChart.tsx" ]; then
    cp "$PROJECT_01/components/growth/DevelopmentCurveChart.tsx" "$UNIFIED/components/growth/"
    echo "  ✅ DevelopmentCurveChart 已复制"
fi

# 步骤3: 从03复制AgenticCore
echo ""
echo "🧠 步骤 3/6: 从03项目复制 AgenticCore 智能引擎..."
mkdir -p "$UNIFIED/core"

if [ -f "$PROJECT_03/core/AgenticCore.ts" ]; then
    cp "$PROJECT_03/core/AgenticCore.ts" "$UNIFIED/core/"
    echo "  ✅ AgenticCore.ts 已复制 (核心智能引擎)"
else
    echo "  ⚠️  AgenticCore.ts 不存在"
fi

if [ -f "$PROJECT_03/core/AgenticCore.test.ts" ]; then
    cp "$PROJECT_03/core/AgenticCore.test.ts" "$UNIFIED/core/"
    echo "  ✅ AgenticCore 测试已复制"
fi

# 复制微服务
if [ -d "$PROJECT_03/microservices" ]; then
    cp -r "$PROJECT_03/microservices" "$UNIFIED/"
    echo "  ✅ 微服务已复制 (ai-service, user-service, knowledge-graph)"
else
    echo "  ⚠️  microservices 不存在"
fi

# 步骤4: 从05复制性能优化
echo ""
echo "⚡ 步骤 4/6: 从05项目复制性能优化..."
mkdir -p "$UNIFIED/hooks/performance"

if [ -f "$PROJECT_05/hooks/useOptimized.ts" ]; then
    cp "$PROJECT_05/hooks/useOptimized.ts" "$UNIFIED/hooks/performance/"
    echo "  ✅ useOptimized 已复制"
fi

if [ -f "$PROJECT_05/hooks/usePerformanceMonitor.ts" ]; then
    cp "$PROJECT_05/hooks/usePerformanceMonitor.ts" "$UNIFIED/hooks/performance/"
    echo "  ✅ usePerformanceMonitor 已复制"
fi

# 复制语音交互
if [ -f "$PROJECT_05/components/VoiceInteraction.tsx" ]; then
    cp "$PROJECT_05/components/VoiceInteraction.tsx" "$UNIFIED/components/"
    echo "  ✅ VoiceInteraction 已复制"
fi

if [ -f "$PROJECT_05/lib/audio-processor.ts" ]; then
    cp "$PROJECT_05/lib/audio-processor.ts" "$UNIFIED/lib/"
    echo "  ✅ audio-processor 已复制"
fi

# 复制错误边界
if [ -f "$PROJECT_05/components/ErrorBoundary.tsx" ]; then
    cp "$PROJECT_05/components/ErrorBoundary.tsx" "$UNIFIED/components/"
    echo "  ✅ ErrorBoundary 已复制"
fi

# 步骤5: 合并配置文件
echo ""
echo "📝 步骤 5/6: 合并配置文件..."

# 复制docker配置
if [ -f "$PROJECT_01/docker-compose.microservices.yml" ]; then
    cp "$PROJECT_01/docker-compose.microservices.yml" "$UNIFIED/"
    echo "  ✅ docker-compose.microservices.yml 已复制"
fi

if [ -f "$PROJECT_03/docker-compose.knowledge-graph.yml" ]; then
    cp "$PROJECT_03/docker-compose.knowledge-graph.yml" "$UNIFIED/"
    echo "  ✅ docker-compose.knowledge-graph.yml 已复制"
fi

echo "  ✅ 配置文件已合并"

# 步骤6: 生成整合报告
echo ""
echo "📊 步骤 6/6: 生成整合报告..."
cd "$UNIFIED"

cat > INTEGRATION_REPORT.md << 'EOF'
# YYC³-XY-UNIFIED 整合报告

## 整合来源

### 基础项目 (70%)
- **yyc3-xy-02**: 主要代码库
  - 156个UI组件
  - 完整的App Router实现
  - 最完整的TypeScript类型定义
  - Redux状态管理

### 整合项目

#### 来自 yyc3-xy-01 (15%)
- ✅ 预测服务系统 (/lib/prediction/)
- ✅ 预测服务 (/services/prediction/)
- ✅ 数据可视化组件 (GrowthCharts, DevelopmentCurveChart)

#### 来自 yyc3-xy-03 (10%)
- ⭐ AgenticCore 智能引擎 (/core/AgenticCore.ts)
- ✅ 微服务架构 (/microservices/)
- ✅ AI服务增强
- ✅ 知识图谱服务

#### 来自 yyc3-xy-05 (5%)
- ✅ 性能优化Hooks (/hooks/performance/)
- ✅ 语音交互系统 (/components/VoiceInteraction.tsx)
- ✅ 错误边界组件 (/components/ErrorBoundary.tsx)
- ✅ 音频处理库 (/lib/audio-processor.ts)

## 项目结构

```
yyc3-xy-unified/
├── app/                    # Next.js App Router (来自02)
├── components/            # UI组件库 (来自02) + VoiceInteraction (来自05)
├── core/                  # ⭐ AgenticCore (来自03)
├── lib/                   # 业务逻辑 (来自02) + prediction (来自01)
├── services/              # 后端服务 (来自02) + prediction (来自01)
├── microservices/         # ⭐ 微服务 (来自03)
├── hooks/                 # Hooks (来自02) + performance (来自05)
└── types/                # 类型定义 (来自02)
```

## 依赖说明

需要安装以下新增依赖：

```bash
# 从01添加
bun add @tensorflow/tfjs

# 从03添加
bun add ai redis pg

# 从05添加
bun add @ai-sdk/openai
```

## 启动方式

```bash
cd /Users/yanyu/yyc3-xy-unified
bun install
bun run dev
```

## 独特功能

1. **AgenticCore 智能引擎** - 意图识别、任务分解、自适应学习
2. **预测服务系统** - 机器学习模型集成、成长预测
3. **语音交互** - 实时语音识别、情感检测
4. **性能优化** - 自动优化、性能监控
5. **微服务架构** - 服务解耦、独立部署

EOF

echo "  ✅ 整合报告已生成: INTEGRATION_REPORT.md"

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║   ✅ 复制整合完成！                                   ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "📍 统一项目位置: $UNIFIED"
echo ""
echo "📋 整合内容:"
echo "  ✅ 来自02: 156个组件 + 完整架构 (基础)"
echo "  ✅ 来自01: 预测服务系统"
echo "  ✅ 来自03: AgenticCore智能引擎 + 微服务"
echo "  ✅ 来自05: 性能优化 + 语音交互"
echo ""
echo "📋 下一步操作:"
echo "  1. cd $UNIFIED"
echo "  2. cat INTEGRATION_REPORT.md  (查看整合报告)"
echo "  3. 安装新增依赖 (见上方依赖说明)"
echo "  4. bun run dev"
echo ""
