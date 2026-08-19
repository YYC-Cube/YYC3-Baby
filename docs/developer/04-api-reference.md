# 04 · API 参考

> Base URL：`http://localhost:1228`。数据接口统一返回 `{ data, success }` 包裹；错误返回 `{ error, success: false }` + 4xx/5xx。

## 数据 CRUD

### GET /api/children
列出宝宝档案。响应 `data: Child[]`（含种子数据）。

### POST /api/children
```json
// 请求（必填 name、birth_date；user_id 需存在于 users 表）
{ "user_id": "<uuid>", "name": "小语", "birth_date": "2026-01-01", "gender": "female" }
// 201 → { data: Child }
// 400 → name/birth_date 缺失；400 → 关联的 user_id 不存在（外键）
```

### GET /api/growth-records
| Query | 说明 |
|-------|------|
| `childId` | 按宝宝过滤 |
| `type` | milestone / observation / emotion / learning |

响应按 `recorded_at` 倒序；`media_urls`、`tags` 已是结构化数组。

### POST /api/growth-records
```json
// 必填 child_id、title、content；recorded_at 缺省为当前时间
{ "child_id": "<uuid>", "type": "observation", "title": "公园社交",
  "content": "主动邀请小朋友玩耍", "media_urls": [], "tags": ["社交"] }
```

### GET /api/homework
Query：`childId`、`status`（pending/in_progress/completed/overdue）。

### POST /api/homework
必填 `child_id`、`subject`、`title`；`status` 默认 pending、`priority` 默认 normal。

### PATCH /api/homework/[id]
部分更新；`status → completed` 时自动补 `completed_at`。404 = 任务不存在。

### DELETE /api/homework/[id]
删除任务，`{ success: true }` 或 404。

## AI 代理（服务端持有密钥）

### POST /api/ai/homework-correction
```json
// 请求：base64 data URL 图片（≤10MB）
{ "image": "data:image/jpeg;base64,..." }
// 200 → { results: [{uuid, question, correct_answer, user_answer, is_correct, explanation, score?}], explanations: [...] }
// 400 图片缺失/格式错；413 超限；500 BigModel 调用失败
```

### POST /api/ai/speech-to-text
`multipart/form-data`，字段 `audio`（≤25MB）。响应 `{ text }`；400 非 multipart；413 超限。

### 其余 AI 端点（预设/轻实现）

| 端点 | 用途 | 现状 |
|------|------|------|
| POST /api/ai/chat | AI 对话 | 预设回复集 + 角色路由（接入 BigModel 的挂点在 `lib/ai_roles`） |
| POST /api/ai/emotion · enhanced-emotion | 情感分析 | 规则引擎实现 |
| POST /api/ai/analyze-record | 记录标题/标签建议 | 轻实现 |
| POST /api/ai/assessment-report | 评估报告 | 模板生成 |
| POST /api/ai/continue-story · generate-image | 故事续写/图片 | 占位实现 |
| POST /api/ai/orchestrate | 任务编排 | AgenticCore 联动 |
| POST /api/error-report | 前端错误上报 | 日志落盘 |

## 错误码约定

| 状态 | 含义 |
|------|------|
| 400 | 参数缺失/格式错误/外键引用不存在（附中文说明） |
| 404 | 资源不存在 |
| 413 | 上传体积超限 |
| 500 | 服务端/上游异常（日志含 `[api]` 前缀可检索） |
