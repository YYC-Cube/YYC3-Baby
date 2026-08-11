// lib/db/schema.ts — YYC³ 数据存储与后台记录体系
// 基于 SQLite (sql.js) 的持久化方案，可直接在 Next.js API Routes 中使用

import type { Database } from 'sql.js';

// ============ 数据库 Schema 定义 ============

export const SCHEMA_SQL = `
-- 宝宝档案表
CREATE TABLE IF NOT EXISTS children (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  gender TEXT NOT NULL DEFAULT 'unknown',
  birth_date TEXT NOT NULL,
  birth_height REAL,
  birth_weight REAL,
  avatar TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 成长记录表
CREATE TABLE IF NOT EXISTS growth_records (
  id TEXT PRIMARY KEY,
  child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL, -- 'height' | 'weight' | 'head' | 'milestone' | 'photo' | 'note'
  value REAL,
  unit TEXT,
  note TEXT,
  photo_url TEXT,
  milestone_name TEXT,
  tags TEXT, -- JSON array string
  recorded_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 作业/任务表
CREATE TABLE IF NOT EXISTS homework (
  id TEXT PRIMARY KEY,
  child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT,
  content TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'in_progress' | 'completed' | 'reviewed'
  ai_feedback TEXT,
  score REAL,
  due_date TEXT,
  completed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- AI 对话历史表
CREATE TABLE IF NOT EXISTS ai_conversations (
  id TEXT PRIMARY KEY,
  child_id TEXT REFERENCES children(id),
  role TEXT NOT NULL, -- 'user' | 'assistant' | 'system'
  content TEXT NOT NULL,
  emotion TEXT,
  tokens_used INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 徽章/成就表
CREATE TABLE IF NOT EXISTS badges (
  id TEXT PRIMARY KEY,
  child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  earned_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 用户操作日志（台账）
CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  child_id TEXT REFERENCES children(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  before_value TEXT, -- JSON
  after_value TEXT, -- JSON
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_growth_child ON growth_records(child_id, recorded_at);
CREATE INDEX IF NOT EXISTS idx_homework_child ON homework(child_id, status);
CREATE INDEX IF NOT EXISTS idx_conversations_child ON ai_conversations(child_id, created_at);
CREATE INDEX IF NOT EXISTS idx_audit_child ON audit_log(child_id, created_at);
`;

// ============ TypeScript 类型 ============

export interface Child {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'unknown';
  birth_date: string;
  birth_height?: number;
  birth_weight?: number;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface GrowthRecord {
  id: string;
  child_id: string;
  record_type: 'height' | 'weight' | 'head' | 'milestone' | 'photo' | 'note';
  value?: number;
  unit?: string;
  note?: string;
  photo_url?: string;
  milestone_name?: string;
  tags?: string[];
  recorded_at: string;
  created_at: string;
}

export interface Homework {
  id: string;
  child_id: string;
  title: string;
  subject?: string;
  content?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'reviewed';
  ai_feedback?: string;
  score?: number;
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditEntry {
  id: string;
  child_id?: string;
  action: string;
  entity_type?: string;
  entity_id?: string;
  before_value?: string;
  after_value?: string;
  created_at: string;
}
