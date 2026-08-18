# YYC³-XY-05 开发优先级规划

> 基于 UI 页面图示和已整合功能的详细开发路线图

## 📊 项目现状

### 已完成整合功能
| 模块 | 来源 | 状态 | 代码量 |
|------|------|------|--------|
| VoiceInteraction | xy-01 | ✅ 已复制 | 10KB |
| AgenticCore | xy-01 | ✅ 已复制 | 40KB |
| emotion-engine | xy-02 | ✅ 已复制 | 17KB |
| BirthdayThemeProvider | xy-02 | ✅ 已复制 | 5KB |
| EnhancedQVersionCharacter | xy-01 | ✅ 已复制 | 25KB |
| IntelligentInsightsPanel | xy-02 | ✅ 已复制 | 18KB |
| MetaLearningSystem | xy-03 | ✅ 已复制 | 24KB |
| ToolManager | xy-03 | ✅ 已复制 | 15KB |
| adaptive-ensemble | xy-03 | ✅ 已复制 | 20KB |
| specialized-engines | xy-03 | ✅ 已复制 | 24KB |

**总计**: 10 个核心模块，~200KB 代码

### UI 页面图示清单
```
public/UI页面图示/
├── 首页界面.png          ✅ 已查看 - 核心参考
├── 成长记录.png          ✅ 已查看 - 核心参考
├── 作业任务.png
├── 消息中心.png
├── 设置管理.png
├── 创意工坊.png
├── 视频工坊.png
├── 有声绘本.png
├── 公益活动.png
├── 公益课堂.png
└── 智能课表.png
```

---

## 🎯 开发优先级分级

### P0 - 核心基础 (Phase 1: Week 1-2)
**目标**: 搭建核心框架，实现首页基础功能

#### 1.1 首页界面实现
**参考图示**: `首页界面.png`

**关键元素**:
```
┌─────────────────────────────────────────────┐
│  左侧角色区 (4列)      │  右侧功能区 (8列)   │
├───────────────────────┼─────────────────────┤
│ • 儿童信息卡片         │ • 成长数据卡片       │
│ • 对话气泡             │ • 今日计划           │
│ • Q版角色 + 柴犬       │ • 作业中心           │
│ • 摸头互动             │ • 功能入口           │
└───────────────────────┴─────────────────────┘
```

**开发任务**:
- [ ] 创建首页布局组件 (`app/page.tsx`)
- [ ] 实现儿童信息卡片组件
- [ ] 集成 EnhancedQVersionCharacter 组件
- [ ] 实现对话气泡组件
- [ ] 创建成长数据卡片组件
- [ ] 实现今日计划卡片
- [ ] 创建作业中心卡片
- [ ] 实现功能入口网格

**技术要点**:
```typescript
// 使用已复制的组件
import EnhancedQVersionCharacter from '@/components/ui/EnhancedQVersionCharacter'
import VoiceInteraction from '@/components/VoiceInteraction'

// 数据结构
interface ChildInfo {
  id: string
  name: string
  avatar: string
  age: number
  gender: 'male' | 'female'
}

interface GrowthData {
  height: number
  weight: number
  mood: string
  recentActivities: string[]
}
```

#### 1.2 角色系统基础
**使用组件**: `EnhancedQVersionCharacter.tsx`

**配置**:
```typescript
const characterConfig = {
  size: 'xl',           // 尺寸: sm/md/lg/xl/2xl
  mode: 'interactive',   // 模式: default/compact/detailed/interactive
  theme: 'xiaoyu',       // 主题: xiaoyu/xiaoyan
  expression: 'happy',   // 表情: happy/excited/thinking/cool/loving
  interactive: true,     // 启用互动
  showName: true,        // 显示名称
  animationEnabled: true // 启用动画
}
```

#### 1.3 语音交互基础
**使用组件**: `VoiceInteraction.tsx`

**集成位置**: 首页底部浮动按钮

**功能**:
- 实时语音识别
- 情感检测
- 音频可视化
- 对话历史

---

### P1 - 数据层与核心功能 (Phase 2: Week 3-4)

#### 2.1 儿童档案数据结构
**数据库**: SQLite (`lib/db/sqlite-client.ts`)

**表结构**:
```sql
CREATE TABLE children (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female')),
  birth_date TEXT NOT NULL,
  avatar_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE growth_records (
  id TEXT PRIMARY KEY,
  child_id TEXT NOT NULL,
  type TEXT CHECK (type IN ('milestone', 'observation', 'emotion', 'learning')),
  content TEXT NOT NULL,
  media_urls TEXT,
  tags TEXT,
  recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (child_id) REFERENCES children(id)
);

CREATE TABLE homework_tasks (
  id TEXT PRIMARY KEY,
  child_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TEXT,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')),
  FOREIGN KEY (child_id) REFERENCES children(id)
);
```

#### 2.2 成长记录 CRUD
**页面**: `app/growth/page.tsx`
**参考图示**: `成长记录.png`

**功能模块**:
- [ ] 记录列表展示
- [ ] 新增记录表单
- [ ] 媒体文件上传 (图片/视频)
- [ ] 记录编辑与删除
- [ ] 时间轴视图
- [ ] 筛选与搜索

**组件结构**:
```
components/growth/
├── GrowthRecordList.tsx      # 记录列表
├── GrowthRecordForm.tsx      # 新增/编辑表单
├── GrowthTimeline.tsx        # 时间轴
├── MediaUploader.tsx         # 媒体上传
└── GrowthStats.tsx           # 统计数据
```

#### 2.3 作业任务管理
**页面**: `app/homework/page.tsx`
**参考图示**: `作业任务.png`

**功能**:
- [ ] 任务列表展示
- [ ] 任务状态切换
- [ ] 任务创建与编辑
- [ ] 截止日期提醒
- [ ] 科目分类
- [ ] 完成进度统计

---

### P2 - AI能力集成 (Phase 3: Week 5-6)

#### 3.1 情感识别引擎
**模块**: `lib/ai/emotion-engine.ts`
**来源**: xy-02

**应用场景**:
1. **语音情感分析**
   - 实时检测儿童情绪
   - 哭声类型识别
   - 情感趋势分析

2. **文本情感分析**
   - 对话内容情感识别
   - 日记情感标注
   - 评价情感分类

3. **多模态融合**
   - 文本+语音情感融合
   - 年龄段适配 (0-3岁)
   - 情感记忆存储

**集成代码**:
```typescript
import { emotionEngine, EmotionType, AgeGroup } from '@/lib/ai/emotion-engine'

// 初始化
await emotionEngine.initialize()

// 分析情感
const result = await emotionEngine.analyzeEmotion({
  text: "我今天很开心",
  audio: audioBuffer,
  context: {
    age: 24, // 月龄
    timeOfDay: 'morning',
    environment: 'home'
  }
})

// 存储情感记忆
await emotionEngine.storeEmotionalMemory(childId, result)
```

#### 3.2 成长记录页面增强
**参考图示**: `成长记录.png`

**AI增强功能**:
- [ ] 智能标签生成
- [ ] 情感趋势图表
- [ ] 成长里程碑自动检测
- [ ] AI 洞察建议
- [ ] 发展评估报告

**使用组件**: `IntelligentInsightsPanel.tsx`

#### 3.3 作业任务页面
**参考图示**: `作业任务.png`

**AI辅助功能**:
- [ ] 智能作业提醒
- [ ] 学习时间建议
- [ ] 难度评估
- [ ] 错题分析

---

### P3 - 创作与学习 (Phase 4: Week 7-8)

#### 4.1 创意工坊页面
**路径**: `app/creative-workshop/page.tsx`
**参考图示**: `创意工坊.png`

**功能模块**:
1. **AIGC 创作工具**
   - [ ] 文字生成图片
   - [ ] 图片风格转换
   - [ ] 创意提示词库
   - [ ] 作品画廊

2. **创作辅助**
   - [ ] 模板库
   - [ ] 素材库
   - [ ] 分享功能
   - [ ] 作品保存

**技术栈**:
```typescript
// 使用 AgenticCore 进行创作编排
import { AgenticCore } from '@/core/AgenticCore'

const core = new AgenticCore()
await core.executeTask({
  type: 'creative',
  action: 'generate-image',
  params: { prompt: '绘制一个快乐的儿童' }
})
```

#### 4.2 视频工坊页面
**路径**: `app/video-workshop/page.tsx`
**参考图示**: `视频工坊.png`

**功能**:
- [ ] 短剧创作
- [ ] 视频编辑
- [ ] AI 配音
- [ ] 字幕生成
- [ ] 特效添加

#### 4.3 AI 对话系统
**核心功能**: 五大 AI 角色对话

**角色定义**:
```typescript
const AI_ROLES = {
  RECORDER: '记录员',      // 专注成长数据记录
  GUARDIAN: '守护员',      // 负责健康安全守护
  LISTENER: '倾听师',      // 提供情感支持
  ADVISOR: '顾问',         // 给出专业育儿建议
  CULTURE_TUTOR: '文化导师' // 负责文化启蒙
}
```

**对话功能**:
- [ ] 角色切换
- [ ] 多轮对话
- [ ] 上下文记忆
- [ ] 语音交互
- [ ] 情感响应

**集成组件**:
```typescript
import VoiceInteraction from '@/components/VoiceInteraction'
import { emotionEngine } from '@/lib/ai/emotion-engine'

// 对话流程
1. 用户语音输入 → VoiceInteraction
2. 语音转文字 + 情感检测 → emotionEngine
3. AI 角色响应 → AgenticCore
4. TTS 语音输出 → Speech Synthesis
```

#### 4.4 有声绘本页面
**路径**: `app/audiobooks/page.tsx`
**参考图示**: `有声绘本.png`

**功能**:
- [ ] 绘本库
- [ ] TTS 朗读
- [ ] 跟读评测
- [ ] 阅读进度
- [ ] 收藏功能

---

### P4 - 扩展功能 (Phase 5: Week 9-10)

#### 5.1 公益活动页面
**路径**: `app/volunteer/page.tsx`
**参考图示**: `公益活动.png`

**功能**:
- [ ] 活动列表
- [ ] 活动详情
- [ ] 报名管理
- [ ] 志愿时长统计
- [ ] 活动证书

#### 5.2 公益课堂页面
**路径**: `app/courses/page.tsx`
**参考图示**: `公益课堂.png`

**功能**:
- [ ] 课程列表
- [ ] 课程播放
- [ ] 学习进度
- [ ] 作业提交
- [ ] 结业证书

#### 5.3 智能课表页面
**路径**: `app/schedule/page.tsx`
**参考图示**: `智能课表.png`

**功能**:
- [ ] 课表展示
- [ ] 课程提醒
- [ ] 自动排课
- [ ] 冲突检测
- [ ] 导入导出

#### 5.4 消息中心页面
**路径**: `app/messages/page.tsx`
**参考图示**: `消息中心.png`

**功能**:
- [ ] 消息列表
- [ ] 消息详情
- [ ] 系统通知
- [ ] 互动消息
- [ ] 消息标记

#### 5.5 设置管理页面
**路径**: `app/settings/page.tsx`
**参考图示**: `设置管理.png`

**功能**:
- [ ] 个人信息
- [ ] 儿童管理
- [ ] 主题设置
- [ ] 通知设置
- [ ] 隐私设置

---

## 🛠️ 技术架构

### 前端架构
```
app/
├── (main)/                    # 主应用组
│   ├── page.tsx              # 首页 (P0)
│   ├── growth/               # 成长记录 (P1/P2)
│   │   └── page.tsx
│   ├── homework/             # 作业任务 (P1/P2)
│   │   └── page.tsx
│   ├── creative-workshop/    # 创意工坊 (P3)
│   │   └── page.tsx
│   ├── video-workshop/       # 视频工坊 (P3)
│   │   └── page.tsx
│   ├── audiobooks/           # 有声绘本 (P3)
│   │   └── page.tsx
│   ├── volunteer/            # 公益活动 (P4)
│   │   └── page.tsx
│   ├── courses/              # 公益课堂 (P4)
│   │   └── page.tsx
│   ├── schedule/             # 智能课表 (P4)
│   │   └── page.tsx
│   ├── messages/             # 消息中心 (P4)
│   │   └── page.tsx
│   └── settings/             # 设置管理 (P4)
│       └── page.tsx
└── api/                      # API 路由
    ├── ai/                   # AI 接口
    ├── growth/               # 成长记录接口
    └── homework/             # 作业接口
```

### 组件架构
```
components/
├── ui/                       # 基础 UI 组件
│   ├── EnhancedQVersionCharacter.tsx    # Q版角色 (已复制)
│   ├── VoiceInteraction.tsx             # 语音交互 (已复制)
│   └── character-themed/                # 角色主题组件 (已复制)
├── growth/                   # 成长记录组件
│   ├── GrowthRecordList.tsx
│   ├── GrowthRecordForm.tsx
│   └── GrowthTimeline.tsx
├── homework/                 # 作业组件
│   ├── HomeworkList.tsx
│   ├── HomeworkCard.tsx
│   └── HomeworkForm.tsx
├── creative/                 # 创作组件
│   ├── AIGCCanvas.tsx
│   └── TemplateGallery.tsx
└── analytics/                # 分析组件
    └── IntelligentInsightsPanel.tsx      # 智能洞察 (已复制)
```

### 数据层架构
```
lib/
├── db/                       # 数据库
│   ├── sqlite-client.ts      # SQLite 客户端
│   └── schema.ts             # 数据模型
├── ai/                       # AI 引擎
│   ├── emotion-engine.ts     # 情感引擎 (已复制)
│   └── agentic-core.ts       # AI 核心
├── prediction/               # 预测引擎 (已复制)
│   ├── adaptive-ensemble.ts
│   └── specialized-engines.ts
└── services/                 # 服务层
    ├── learning/             # 学习服务
    │   └── MetaLearningSystem.ts        # 元学习 (已复制)
    ├── tools/               # 工具管理
    │   └── ToolManager.ts    # 工具管理器 (已复制)
    └── orchestrator/        # 编排服务
        └── ServiceOrchestrator.ts       # 服务编排 (已复制)
```

---

## 📅 开发时间线

### Week 1-2: P0 核心基础
```
Day 1-3:   首页布局与儿童信息卡片
Day 4-5:   Q版角色组件集成
Day 6-7:   对话气泡与语音交互
Day 8-10:  成长数据卡片与今日计划
Day 11-12: 功能入口网格
Day 13-14: 测试与优化
```

### Week 3-4: P1 数据层与核心功能
```
Day 15-17: 数据库设计与实现
Day 18-20: 成长记录 CRUD
Day 21-22: 作业任务管理
Day 23-24: 媒体文件上传
Day 25-28: 测试与优化
```

### Week 5-6: P2 AI 能力集成
```
Day 29-31: 情感引擎集成
Day 32-34: 成长记录 AI 增强
Day 35-37: 作业任务 AI 辅助
Day 38-40: 智能洞察面板
Day 41-42: 测试与优化
```

### Week 7-8: P3 创作与学习
```
Day 43-46: 创意工坊与 AIGC
Day 47-49: 视频工坊
Day 50-52: AI 对话系统
Day 53-55: 有声绘本
Day 56:   测试与优化
```

### Week 9-10: P4 扩展功能
```
Day 57-59: 公益活动
Day 60-62: 公益课堂
Day 63-65: 智能课表
Day 66-68: 消息中心
Day 69-70: 设置管理
```

---

## 🎯 里程碑

| 里程碑 | 时间点 | 交付物 | 验收标准 |
|--------|--------|--------|----------|
| M1: 核心框架 | Week 2 | 首页基础版 | 布局完整、角色可交互、语音可用 |
| M2: 数据层 | Week 4 | 成长记录与作业任务 | CRUD 完整、数据持久化 |
| M3: AI 集成 | Week 6 | AI 增强功能 | 情感识别、智能洞察可用 |
| M4: 创作平台 | Week 8 | 创作与学习模块 | AIGC、视频工坊、对话系统 |
| M5: 完整系统 | Week 10 | 全功能应用 | 所有页面完成、可上线 |

---

## 🔧 开发规范

### 代码规范
```typescript
// 1. 使用 TypeScript 严格模式
// 2. 组件命名: PascalCase
// 3. 文件命名: kebab-case.tsx
// 4. 常量命名: UPPER_SNAKE_CASE
// 5. 接口命名: PascalCase + I 前缀
```

### Git 工作流
```bash
# 功能分支
feature/homepage
feature/growth-records
feature/homework-management
feature/ai-emotion-engine
feature/creative-workshop

# 提交规范
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

### 代码审查清单
- [ ] TypeScript 类型正确
- [ ] 无 eslint 警告
- [ ] 组件可复用
- [ ] 性能优化 (懒加载、缓存)
- [ ] 响应式设计
- [ ] 无障碍访问
- [ ] 单元测试覆盖

---

## 📊 资源分配

### 已有资源
- 角色照片: 男孩 22 张 + 女孩 18 张 + 联合 3 张
- Logo: 7 个变体
- UI 图示: 11 张参考图
- 代码模块: 10 个核心模块 (~200KB)

### 需要创建
- 组件: ~50 个 React 组件
- 页面: 11 个页面
- API: ~20 个接口
- 测试: ~100 个测试用例

---

## 🚀 启动命令

```bash
# 开发环境
bun run dev:next

# 类型检查
bun run type-check

# 构建生产
bun run build:next

# 运行测试
bun run test

# 代码检查
bun run lint
```

---

**文档版本**: v1.0
**最后更新**: 2026-01-02
**维护者**: YYC³ Team
