import React from 'react';
import { Leaf, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export interface HeaderProps {
  userData?: { name?: string };
}

export const Header: React.FC<HeaderProps> = ({ userData }) => {
  const { isCyberpunk } = useTheme();

  return (
    <header className="glass-header px-4 py-3 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md ${
          isCyberpunk
            ? 'bg-gradient-to-br from-[#00f0ff] to-[#ff00ff]'
            : 'bg-gradient-to-br from-emerald-400 to-green-600'
        }`}>
          {isCyberpunk ? <Zap size={16} className="text-black" /> : <Leaf size={16} className="text-white" />}
        </div>
        <span className={isCyberpunk ? 'neon-text' : 'text-emerald-700'} style={{ fontWeight: 600 }}>小语AI</span>
      </div>
      <div className="text-sm text-gray-500">{userData?.name || 'User'}</div>
    </header>
  );
};
