/**
 * User Type Definitions
 * 用户相关类型定义
 *
 * @module types/user
 * @version 1.0.0
 */

/** 用户基础数据（展示用） */
export interface UserData {
  id: string;
  name: string;
  age: number;
  avatar: string;
  growthStage: string;
}

/**
 * 儿童档案
 * 用于角色系统中的儿童信息管理
 */
export interface Child {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  birthday?: Date;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
