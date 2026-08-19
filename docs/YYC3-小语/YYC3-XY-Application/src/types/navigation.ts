/**
 * Navigation Type Definitions
 * 导航系统类型定义
 *
 * @module types/navigation
 * @version 1.0.0
 */

/** 应用页面标识 */
export type AppPage =
  | 'home'
  | 'old_home'
  | 'video'
  | 'task'
  | 'create'
  | 'schedule'
  | 'growth'
  | 'culture'
  | 'culture_detail'
  | 'learning'
  | 'profile'
  | 'settings'
  | 'messages'
  | 'audiobook'
  | 'welfare'
  | 'public_class'
  | 'growth_record'
  | 'growth_system'
  | 'badges'
  | 'character_system'
  | 'growth_tree'
  | 'growth_integration';

/** 导航附带数据 */
export interface NavigationData {
  cultureId?: string;
  [key: string]: unknown;
}

/** 导航上下文完整类型 */
export interface NavigationContextType {
  currentPage: string;
  navigateTo: (page: string, data?: NavigationData) => void;
  goBack: () => void;
  goHome: () => void;
  canGoBack: boolean;
  navigationData: NavigationData | null;
}
