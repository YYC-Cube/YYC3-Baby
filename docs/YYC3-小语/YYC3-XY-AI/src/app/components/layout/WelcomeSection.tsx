import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export interface WelcomeSectionProps {
  userData?: { name?: string };
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userData }) => {
  const { theme } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';
  const shimmerClass = isCyber ? 'cyber-shimmer' : isAurora ? 'aurora-shimmer' : 'shimmer';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`mb-8 p-6 relative overflow-hidden ${isCyber ? 'rounded-lg' : 'rounded-2xl'}`}
      style={{
        background: isCyber
          ? 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(255,0,255,0.1))'
          : isAurora
            ? 'linear-gradient(135deg, rgba(0,255,135,0.2), rgba(96,239,255,0.15))'
            : 'linear-gradient(135deg, #10b981, #059669, #047857)',
        boxShadow: isCyber
          ? '0 0 25px rgba(0,240,255,0.15), inset 0 0 25px rgba(0,240,255,0.05)'
          : '0 8px 32px rgba(16, 185, 129, 0.25)',
        border: isCyber ? '1px solid rgba(0,240,255,0.25)' : isAurora ? '1px solid rgba(255,255,255,0.1)' : 'none',
      }}
    >
      <div className={`absolute inset-0 ${shimmerClass} pointer-events-none opacity-20`} />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          {isCyber ? <Zap size={20} className="text-cyan-300" /> : <Sparkles size={20} className="text-emerald-200" />}
          <h2 className={isCyber ? 'text-cyan-300' : 'text-white'} style={{ fontWeight: 600, fontSize: '1.5rem' }}>
            {isCyber ? `WELCOME, ${userData?.name || '小朋友'}` : `你好，${userData?.name || '小朋友'}！`}
          </h2>
        </div>
        <p className={`text-sm ${isCyber ? 'text-cyan-200/70' : isAurora ? 'text-emerald-200' : 'text-emerald-100'}`}>
          {isCyber ? 'NEURAL INTERFACE READY // EXPLORE THE DIGITAL REALM ⚡' : '今天也是充满探索的一天呢！🌿'}
        </p>
      </div>
    </motion.section>
  );
};
