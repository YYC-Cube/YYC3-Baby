import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  onMore?: () => void;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, onMore }) => {
  const { isCyberpunk } = useTheme();

  return (
    <div className="flex justify-between items-end mb-4">
      <div>
        <h3 className="text-gray-800" style={{ fontWeight: 600, fontSize: '1.125rem' }}>{title}</h3>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
      {onMore && (
        <button
          onClick={onMore}
          className={`text-sm flex items-center gap-0.5 transition-colors ${
            isCyberpunk
              ? 'text-[#00f0ff] hover:text-[#66f7ff]'
              : 'text-emerald-600 hover:text-emerald-700'
          }`}
          style={{ fontWeight: 500 }}
        >
          查看更多 <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
};
