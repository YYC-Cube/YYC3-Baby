import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  onMore?: () => void;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, onMore }) => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const accentColor = isCyber ? 'text-cyan-400 hover:text-cyan-300' : isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700';

  return (
    <div className="flex justify-between items-end mb-4">
      <div>
        <h3 className={isDark ? 'text-white/90' : 'text-gray-800'} style={{ fontWeight: 600, fontSize: '1.125rem', letterSpacing: isCyber ? '0.5px' : undefined }}>{title}</h3>
        {subtitle && <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{subtitle}</p>}
      </div>
      {onMore && (
        <button
          onClick={onMore}
          className={`${accentColor} text-sm flex items-center gap-0.5 transition-colors`}
          style={{ fontWeight: 500 }}
        >
          {isCyber ? 'MORE' : '查看更多'} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
};
