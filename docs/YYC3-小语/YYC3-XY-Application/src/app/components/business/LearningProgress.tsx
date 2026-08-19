import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ChevronRight } from 'lucide-react';

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
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className={`glass-card p-5 ${className}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
          <BookOpen size={18} className="text-white" />
        </div>
        <h4 className="text-gray-800" style={{ fontWeight: 600 }}>{subject}</h4>
      </div>

      {/* Circular progress */}
      <div className="flex justify-center mb-5">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#greenGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.64} ${264 - progress * 2.64}`}
              style={{ filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.4))' }}
            />
            <defs>
              <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl text-emerald-600" style={{ fontWeight: 700 }}>{progress}%</span>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        className="glass-btn w-full py-2.5 text-white text-sm rounded-xl flex items-center justify-center gap-2"
      >
        <span className="relative z-10">继续学习</span>
        <ChevronRight size={15} className="relative z-10" />
      </motion.button>
    </motion.div>
  );
};
