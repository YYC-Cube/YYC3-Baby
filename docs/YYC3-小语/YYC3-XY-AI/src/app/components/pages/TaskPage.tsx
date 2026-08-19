import React from 'react';
import { PageNavigation } from '../layout/PageNavigation';
import { Card } from '../foundation/Card';
import { Button } from '../foundation/Button';
import { useTheme } from '../../contexts/ThemeContext';

export const TaskPage: React.FC = () => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';
  const tasks = [
    { 
      id: 1, 
      title: '背诵古诗《静夜思》', 
      subject: '语文',
      dueDate: '今天',
      completed: false,
      priority: 'high'
    },
    { 
      id: 2, 
      title: '完成数学练习题 1-10', 
      subject: '数学',
      dueDate: '明天',
      completed: false,
      priority: 'medium'
    },
    { 
      id: 3, 
      title: '绘制科学观察日记', 
      subject: '科学',
      dueDate: '本周五',
      completed: true,
      priority: 'low'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <PageNavigation title="作业任务" icon="📝" />

      {/* 页面内容 */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>认真完成每一项作业，收获满满成就感</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className={`text-center ${isCyber ? 'cyber-gradient-cyan' : isAurora ? 'aurora-gradient-1' : isDark ? '' : 'bg-blue-50'}`}>
            <p className={`text-3xl mb-1 ${isCyber ? 'text-cyan-400' : isAurora ? 'text-emerald-400' : 'text-blue-600'}`} style={{ fontWeight: 700 }}>3</p>
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>待完成</p>
          </Card>
          <Card className={`text-center ${isCyber ? 'cyber-gradient-green' : isAurora ? 'aurora-gradient-2' : isDark ? '' : 'bg-green-50'}`}>
            <p className={`text-3xl mb-1 ${isCyber ? 'text-green-400' : isAurora ? 'text-green-400' : 'text-green-600'}`} style={{ fontWeight: 700 }}>12</p>
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>已完成</p>
          </Card>
          <Card className={`text-center ${isCyber ? 'cyber-gradient-yellow' : isAurora ? 'aurora-gradient-3' : isDark ? '' : 'bg-orange-50'}`}>
            <p className={`text-3xl mb-1 ${isCyber ? 'text-yellow-400' : isAurora ? 'text-amber-400' : 'text-orange-600'}`} style={{ fontWeight: 700 }}>1</p>
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>即将截止</p>
          </Card>
        </div>

        {/* 任务列表 */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card 
              key={task.id}
              className={`${task.completed ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-4">
                <button className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  task.completed 
                    ? (isCyber ? 'bg-cyan-500 border-cyan-500' : isAurora ? 'bg-emerald-500 border-emerald-500' : 'bg-green-500 border-green-500')
                    : (isDark ? 'border-gray-600' : 'border-gray-300')
                }`}>
                  {task.completed && <span className="text-white text-sm">✓</span>}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className={task.completed ? (isDark ? 'line-through text-white/40' : 'line-through text-gray-500') : (isDark ? 'text-white/90' : '')}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded text-xs ${
                          task.subject === '语文' ? (isCyber ? 'bg-cyan-500/15 text-cyan-400' : isAurora ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-100 text-blue-700') :
                          task.subject === '数学' ? (isCyber ? 'bg-purple-500/15 text-purple-400' : isAurora ? 'bg-orange-500/15 text-orange-400' : 'bg-orange-100 text-orange-700') :
                          (isCyber ? 'bg-green-500/15 text-green-400' : isAurora ? 'bg-green-500/15 text-green-400' : 'bg-green-100 text-green-700')
                        }`}>
                          {task.subject}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>📅 {task.dueDate}</span>
                      </div>
                    </div>
                    
                    {!task.completed && (
                      <Button variant="primary" className="text-sm">
                        开始
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};