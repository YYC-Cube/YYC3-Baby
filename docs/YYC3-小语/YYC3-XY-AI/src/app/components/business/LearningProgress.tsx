import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export interface LearningProgressProps {
  subject: string;
  progress: number;
  lessons?: { id: string; title: string; duration: number; completed: boolean; locked: boolean }[];
  currentLesson?: { title: string; duration: number };
  onContinue?: () => void;
  className?: string;
}

export const LearningProgress: React.FC<LearningProgressProps> = ({
  subject,
  progress,
  onContinue,
  className = '',
}) => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';

  const cardClass = isCyber ? 'cyber-card' : isAurora ? 'aurora-card' : 'glass-card';
  const btnClass = isCyber ? 'cyber-btn cyber-btn-primary' : isAurora ? 'aurora-btn' : 'glass-btn';
  const textPrimary = isDark ? 'text-white/90' : 'text-gray-800';
  const accentColor = isCyber ? 'text-cyan-400' : isDark ? 'text-emerald-400' : 'text-emerald-600';

  const gradId = `progGrad-${isCyber ? 'cyber' : 'green'}-${subject}`;
  const strokeTrack = isCyber ? 'rgba(0,240,255,0.08)' : isAurora ? 'rgba(0,255,135,0.08)' : 'rgba(16,185,129,0.1)';
  const filterGlow = isCyber ? 'drop-shadow(0 0 6px rgba(0,240,255,0.5))' : 'drop-shadow(0 0 6px rgba(16,185,129,0.4))';

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className={`${cardClass} p-5 ${className}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
          isCyber ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/25' : 'bg-gradient-to-br from-emerald-400 to-teal-500'
        }`}>
          <BookOpen size={18} className="text-white" />
        </div>
        <h4 className={textPrimary} style={{ fontWeight: 600 }}>{subject}</h4>
      </div>

      {/* Circular progress */}
      <div className="flex justify-center mb-5">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke={strokeTrack} strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.64} ${264 - progress * 2.64}`}
              style={{ filter: filterGlow }}
            />
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isCyber ? '#00f0ff' : '#10b981'} />
                <stop offset="100%" stopColor={isCyber ? '#ff00ff' : '#059669'} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl ${accentColor}`} style={{ fontWeight: 700 }}>{progress}%</span>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        className={`${btnClass} w-full py-2.5 text-sm ${isCyber ? 'rounded-lg' : 'rounded-xl'} flex items-center justify-center gap-2 ${isCyber ? '' : 'text-white'}`}
      >
        <span className="relative z-10">{isCyber ? 'CONTINUE' : '继续学习'}</span>
        <ChevronRight size={15} className="relative z-10" />
      </motion.button>
    </motion.div>
  );
};
