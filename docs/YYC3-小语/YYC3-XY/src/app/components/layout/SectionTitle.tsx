import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  onMore?: () => void;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, onMore }) => (
  <div className="flex justify-between items-end mb-4">
    <div>
      <h3 className="text-gray-800" style={{ fontWeight: 600, fontSize: '1.125rem' }}>{title}</h3>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </div>
    {onMore && (
      <button
        onClick={onMore}
        className="text-emerald-600 text-sm flex items-center gap-0.5 hover:text-emerald-700 transition-colors"
        style={{ fontWeight: 500 }}
      >
        查看更多 <ChevronRight size={14} />
      </button>
    )}
  </div>
);
