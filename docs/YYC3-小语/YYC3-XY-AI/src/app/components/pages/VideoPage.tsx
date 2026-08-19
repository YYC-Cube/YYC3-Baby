import React from 'react';
import { PageNavigation } from '../layout/PageNavigation';
import { Card } from '../foundation/Card';
import { Button } from '../foundation/Button';
import { useTheme } from '../../contexts/ThemeContext';

export const VideoPage: React.FC = () => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';
  const videos = [
    { id: 1, title: '龙门石窟探秘', duration: '12:34', thumbnail: '🏛️', category: '文化' },
    { id: 2, title: '古诗词诵读', duration: '08:21', thumbnail: '📖', category: '语文' },
    { id: 3, title: '数学趣味课堂', duration: '15:42', thumbnail: '🔢', category: '数学' },
    { id: 4, title: '科学小实验', duration: '10:15', thumbnail: '🔬', category: '科学' },
  ];

  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <PageNavigation title="视频工坊" icon="🎬" />

      {/* 页面内容 */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>观看精彩视频，学习更有趣</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="cursor-pointer hover:shadow-xl transition-shadow">
              <div className={`aspect-video rounded-lg mb-4 flex items-center justify-center text-6xl ${
                isCyber ? 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30' : isAurora ? 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20' : isDark ? 'bg-white/5' : 'bg-gradient-to-br from-purple-100 to-pink-100'
              }`}>
                {video.thumbnail}
              </div>
              <div className="mb-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  isCyber ? 'bg-cyan-500/15 text-cyan-400' : isAurora ? 'bg-emerald-500/15 text-emerald-400' : 'bg-blue-100 text-blue-700'
                }`}>
                  {video.category}
                </span>
              </div>
              <h4 className={isDark ? 'text-white/90 mb-2' : 'mb-2'}>{video.title}</h4>
              <div className={`flex items-center justify-between text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                <span>⏱️ {video.duration}</span>
                <Button variant="ghost" className="text-sm">观看</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};