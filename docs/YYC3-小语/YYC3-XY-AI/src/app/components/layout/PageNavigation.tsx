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
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';

  const headerClass = isCyber ? 'cyber-header' : isAurora ? 'aurora-header' : 'glass-header';

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
    <div className={`${headerClass} sticky top-0 z-10 ${className}`}>
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
                  ? isCyber
                    ? 'bg-cyan-500/10 backdrop-blur-md text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 shadow-sm'
                    : isDark
                      ? 'bg-white/10 backdrop-blur-md text-white/80 hover:bg-white/15 border border-white/10'
                      : 'bg-white/40 backdrop-blur-md text-emerald-600 hover:bg-white/60 border border-white/50 shadow-sm'
                  : isDark
                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                    : 'bg-white/20 text-gray-300 cursor-not-allowed'
              }`}
              style={isCyber ? { borderRadius: '8px' } : undefined}
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
            <h1 className={`text-base truncate ${isCyber ? 'text-cyan-300' : isDark ? 'text-white/90' : 'text-gray-800'}`} style={{ fontWeight: 600, letterSpacing: isCyber ? '1px' : undefined, textTransform: isCyber ? 'uppercase' as const : undefined }}>
              {title}
            </h1>
          </div>

          {showHomeButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleHomeClick}
              className={`flex items-center justify-center w-10 h-10 text-white shadow-md transition-shadow ${
                isCyber
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/25 rounded-lg hover:shadow-lg'
                  : 'bg-gradient-to-br from-emerald-400 to-green-600 shadow-emerald-500/20 rounded-2xl hover:shadow-lg'
              }`}
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
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const headerClass = isCyber ? 'cyber-header' : theme === 'aurora' ? 'aurora-header' : 'glass-header';

  return (
    <div className={headerClass}>
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center gap-3">
          {onBack && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className={`px-4 py-2 backdrop-blur-md rounded-xl transition-colors border ${
                isCyber
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20'
                  : isDark
                    ? 'bg-white/10 text-white/80 border-white/10 hover:bg-white/15'
                    : 'bg-white/40 text-gray-700 border-white/50 hover:bg-white/60'
              }`}
              aria-label="返回"
            >
              ← 返回
            </motion.button>
          )}
          <div className="flex items-center gap-2">
            {icon && <span className="text-2xl">{icon}</span>}
            <h1 className={isCyber ? 'text-cyan-300' : isDark ? 'text-white/90' : 'text-gray-800'} style={{ fontWeight: 600 }}>{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
