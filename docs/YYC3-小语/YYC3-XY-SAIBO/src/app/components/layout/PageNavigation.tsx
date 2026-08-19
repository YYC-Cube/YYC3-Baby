/**
 * PageNavigation - Theme-aware page navigation
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useTheme } from '../../contexts/ThemeContext';

export interface PageNavigationProps {
  title: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  className?: string;
  onBackClick?: () => void;
  onHomeClick?: () => void;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  title,
  icon,
  showBackButton = true,
  showHomeButton = true,
  className = '',
  onBackClick,
  onHomeClick,
}) => {
  const { goBack, goHome, canGoBack } = useNavigation();
  const { isCyberpunk } = useTheme();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      goBack();
    }
  };

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      goHome();
    }
  };

  return (
    <div className={`glass-header sticky top-0 z-10 ${className}`}>
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          {showBackButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBackClick}
              disabled={!canGoBack && !onBackClick}
              className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all ${
                canGoBack || onBackClick
                  ? isCyberpunk
                    ? 'bg-[rgba(0,240,255,0.08)] backdrop-blur-md text-[#00f0ff] hover:bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.2)] shadow-sm'
                    : 'bg-white/40 backdrop-blur-md text-emerald-600 hover:bg-white/60 border border-white/50 shadow-sm'
                  : isCyberpunk
                    ? 'bg-[rgba(0,240,255,0.03)] text-[#333355] cursor-not-allowed'
                    : 'bg-white/20 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="返回上一页"
            >
              <ArrowLeft size={20} />
            </motion.button>
          )}

          <div className="flex-1 flex items-center justify-center gap-2 mx-4">
            {icon && (
              <span className="text-xl" aria-hidden="true">
                {icon}
              </span>
            )}
            <h1 className={`text-base truncate ${isCyberpunk ? 'neon-text' : 'text-gray-800'}`} style={{ fontWeight: 600 }}>
              {title}
            </h1>
          </div>

          {showHomeButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleHomeClick}
              className={`flex items-center justify-center w-10 h-10 rounded-2xl shadow-md hover:shadow-lg transition-shadow ${
                isCyberpunk
                  ? 'bg-gradient-to-br from-[#00f0ff] to-[#ff00ff] text-black'
                  : 'bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-emerald-500/20'
              }`}
              style={isCyberpunk ? { boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' } : undefined}
              aria-label="返回主页"
            >
              <Home size={18} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export interface SimplePageNavigationProps {
  title: string;
  icon?: React.ReactNode;
  onBack?: () => void;
}

export const SimplePageNavigation: React.FC<SimplePageNavigationProps> = ({
  title,
  icon,
  onBack,
}) => {
  const { isCyberpunk } = useTheme();

  return (
    <div className="glass-header">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center gap-3">
          {onBack && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className={`px-4 py-2 backdrop-blur-md rounded-xl hover:bg-white/60 transition-colors ${
                isCyberpunk
                  ? 'bg-[rgba(0,240,255,0.08)] text-[#00f0ff] border border-[rgba(0,240,255,0.2)]'
                  : 'bg-white/40 text-gray-700 border border-white/50'
              }`}
              aria-label="返回"
            >
              ← 返回
            </motion.button>
          )}
          <div className="flex items-center gap-2">
            {icon && <span className="text-2xl">{icon}</span>}
            <h1 className="text-gray-800" style={{ fontWeight: 600 }}>{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
