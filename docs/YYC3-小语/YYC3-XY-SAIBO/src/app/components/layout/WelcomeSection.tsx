import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export interface WelcomeSectionProps {
  userData?: { name?: string };
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userData }) => {
  const { isCyberpunk } = useTheme();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="mb-8 p-6 rounded-2xl relative overflow-hidden"
      style={{
        background: isCyberpunk
          ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.9), rgba(255, 0, 255, 0.7))'
          : 'linear-gradient(135deg, #10b981, #059669, #047857)',
        boxShadow: isCyberpunk
          ? '0 0 30px rgba(0, 240, 255, 0.4), 0 0 60px rgba(255, 0, 255, 0.2)'
          : '0 8px 32px rgba(16, 185, 129, 0.25)',
      }}
    >
      <div className="absolute inset-0 shimmer pointer-events-none opacity-20" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          {isCyberpunk
            ? <Zap size={20} className="text-black/60" />
            : <Sparkles size={20} className="text-emerald-200" />
          }
          <h2 style={{ fontWeight: 600, fontSize: '1.5rem', color: isCyberpunk ? '#0a0a0f' : 'white' }}>
            你好，{userData?.name || '小朋友'}！
          </h2>
        </div>
        <p className="text-sm" style={{ color: isCyberpunk ? 'rgba(10,10,15,0.6)' : 'rgba(236,253,245,1)' }}>
          {isCyberpunk ? '系统已就绪，准备探索数据世界 ⚡' : '今天也是充满探索的一天呢！🌿'}
        </p>
      </div>
    </motion.section>
  );
};
