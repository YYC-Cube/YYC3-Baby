import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export interface WelcomeSectionProps {
  userData?: { name?: string };
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userData }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    className="mb-8 p-6 rounded-2xl relative overflow-hidden"
    style={{
      background: 'linear-gradient(135deg, #10b981, #059669, #047857)',
      boxShadow: '0 8px 32px rgba(16, 185, 129, 0.25)',
    }}
  >
    <div className="absolute inset-0 shimmer pointer-events-none opacity-20" />
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={20} className="text-emerald-200" />
        <h2 className="text-white" style={{ fontWeight: 600, fontSize: '1.5rem' }}>
          你好，{userData?.name || '小朋友'}！
        </h2>
      </div>
      <p className="text-emerald-100 text-sm">今天也是充满探索的一天呢！🌿</p>
    </div>
  </motion.section>
);
