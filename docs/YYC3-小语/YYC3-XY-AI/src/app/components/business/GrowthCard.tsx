import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Eye } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export interface GrowthCardProps {
  ageStage: string;
  growthData: {
    age: number;
    stage: string;
    dimensions: { name: string; progress: number; items: { id: string; completed: boolean }[] }[];
    achievements: { id: string; title: string; icon: string; earnedDate: string }[];
    lastUpdated: string;
  };
  onViewDetails?: () => void;
  onEdit?: () => void;
  className?: string;
}

export const GrowthCard: React.FC<GrowthCardProps> = ({
  ageStage,
  growthData,
  onViewDetails,
  className = '',
}) => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';

  const cardClass = isCyber ? 'cyber-card cyber-gradient-cyan' : isAurora ? 'aurora-card aurora-gradient-1' : 'glass-card glass-green-3';
  const btnClass = isCyber ? 'cyber-btn cyber-btn-primary' : isAurora ? 'aurora-btn' : 'glass-btn';
  const barClass = isCyber ? 'cyber-progress-bar' : isAurora ? 'aurora-progress-bar' : 'progress-glow';
  const trackBg = isCyber ? 'bg-cyan-900/20' : isAurora ? 'bg-white/10' : 'bg-emerald-100/40';
  const textPrimary = isDark ? 'text-white/90' : 'text-gray-800';
  const textSecondary = isDark ? 'text-white/50' : 'text-gray-500';
  const textMuted = isDark ? 'text-white/40' : 'text-gray-400';
  const accentColor = isCyber ? 'text-cyan-400' : isDark ? 'text-emerald-400' : 'text-emerald-600';

  const totalItems = growthData.dimensions.reduce((s, d) => s + d.items.length, 0);
  const completedItems = growthData.dimensions.reduce((s, d) => s + d.items.filter((i) => i.completed).length, 0);
  const overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className={`${cardClass} p-5 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg ${
              isCyber ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 'bg-gradient-to-br from-emerald-400 to-green-600'
            }`}
            style={{ fontWeight: 700, boxShadow: isCyber ? '0 0 15px rgba(0,240,255,0.3)' : '0 4px 15px rgba(16, 185, 129, 0.3)' }}
          >
            {growthData.age}
          </div>
          <div>
            <h4 className={textPrimary} style={{ fontWeight: 600 }}>{ageStage}</h4>
            <p className={`${textMuted} text-xs`}>更新于 {growthData.lastUpdated}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs backdrop-blur-sm ${
            isCyber
              ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20'
              : isDark
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'bg-emerald-100/60 text-emerald-600'
          }`} style={{ fontWeight: 500 }}>
            <TrendingUp size={12} /> 进行中
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className={textSecondary}>成长进度</span>
          <span className={accentColor} style={{ fontWeight: 600 }}>{overallProgress}%</span>
        </div>
        <div className={`w-full ${trackBg} rounded-full h-2.5 backdrop-blur-sm`}>
          <div className={`${barClass} h-2.5 transition-all duration-700`} style={{ width: `${overallProgress}%` }} />
        </div>
      </div>

      {/* Dimensions */}
      <div className="space-y-2 mb-4">
        {growthData.dimensions.slice(0, 3).map((dim, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className={`text-xs ${textSecondary} w-16 shrink-0 truncate`}>{dim.name}</span>
            <div className={`flex-1 ${isDark ? 'bg-white/10' : 'bg-white/30'} rounded-full h-1.5`}>
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isCyber
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                    : 'bg-gradient-to-r from-emerald-400 to-green-500'
                }`}
                style={{ width: `${dim.progress}%` }}
              />
            </div>
            <span className={`text-xs ${textMuted} w-8 text-right`}>{dim.progress}%</span>
          </div>
        ))}
      </div>

      {/* Achievements */}
      {growthData.achievements.length > 0 && (
        <div className="flex gap-2 mb-4">
          {growthData.achievements.slice(0, 4).map((ach) => (
            <motion.div
              key={ach.id}
              whileHover={{ scale: 1.15, rotate: 10 }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg backdrop-blur-sm border ${
                isCyber
                  ? 'bg-yellow-500/15 border-yellow-500/25'
                  : isDark
                    ? 'bg-amber-500/15 border-amber-500/20'
                    : 'bg-amber-100/60 border-amber-200/40'
              }`}
              title={ach.title}
            >
              {ach.icon}
            </motion.div>
          ))}
          {growthData.achievements.length > 4 && (
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs backdrop-blur-sm ${
              isDark ? 'bg-white/8 text-white/50' : 'bg-white/40 text-gray-500'
            }`} style={{ fontWeight: 500 }}>
              +{growthData.achievements.length - 4}
            </div>
          )}
        </div>
      )}

      {onViewDetails && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onViewDetails}
          className={`${btnClass} w-full py-2.5 text-sm ${isCyber ? 'rounded-lg' : 'rounded-xl'} flex items-center justify-center gap-2 ${isCyber ? '' : 'text-white'}`}
        >
          <Eye size={15} className="relative z-10" />
          <span className="relative z-10">查看详情</span>
        </motion.button>
      )}
    </motion.div>
  );
};
