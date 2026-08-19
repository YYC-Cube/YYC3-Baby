import React from 'react';
import { Leaf, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export interface HeaderProps {
  userData?: { name?: string };
}

export const Header: React.FC<HeaderProps> = ({ userData }) => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';
  const headerClass = isCyber ? 'cyber-header' : isAurora ? 'aurora-header' : 'glass-header';

  return (
    <header className={`${headerClass} px-4 py-3 flex justify-between items-center sticky top-0 z-40`}>
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md ${
          isCyber ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 'bg-gradient-to-br from-emerald-400 to-green-600'
        }`}>
          {isCyber ? <Zap size={16} className="text-white" /> : <Leaf size={16} className="text-white" />}
        </div>
        <span className={isCyber ? 'text-cyan-400' : isDark ? 'text-emerald-400' : 'text-emerald-700'} style={{ fontWeight: 600 }}>
          {isCyber ? 'XY-AI' : '小语AI'}
        </span>
      </div>
      <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{userData?.name || 'User'}</div>
    </header>
  );
};
