/**
 * Learning Type Definitions
 * 学习模块类型定义 - 课程、学习进度
 *
 * @module types/learning
 * @version 1.0.0
 */

/** 课时/课程单元 */
export interface Lesson {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  locked: boolean;
}

/** 科目学习进度数据 */
export interface LearningProgressData {
  subject: string;
  progress: number;
  lessons: Lesson[];
  currentLesson?: Lesson;
}

/** 推荐内容 */
export interface Recommendation {
  id: string;
  type: 'content' | 'action' | 'question';
  title: string;
  description: string;
  image?: string;
}
