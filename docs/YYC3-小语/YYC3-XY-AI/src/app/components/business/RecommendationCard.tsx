import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

export interface RecommendationCardProps {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  type?: string;
  onClick?: () => void;
  className?: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  subtitle,
  description,
  image,
  type,
  onClick,
  className = '',
}) => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';
  const cardClass = isCyber ? 'cyber-card' : isAurora ? 'aurora-card' : 'glass-card';

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${cardClass} overflow-hidden cursor-pointer ${className}`}
    >
      {image && (
        <div className="relative h-36 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {type && (
            <span className={`absolute top-3 right-3 px-2 py-0.5 backdrop-blur-md text-xs rounded-lg border ${
              isCyber ? 'bg-black/40 text-cyan-300 border-cyan-500/25' : isDark ? 'bg-black/30 text-white/80 border-white/15' : 'bg-white/40 text-gray-700 border-white/50'
            }`} style={{ fontWeight: 500 }}>
              {type}
            </span>
          )}
        </div>
      )}
      <div className="p-4">
        <h4 className={`text-sm mb-1 ${isDark ? 'text-white/90' : 'text-gray-800'}`} style={{ fontWeight: 600 }}>{title}</h4>
        {(subtitle || description) && (
          <p className={`text-xs line-clamp-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{subtitle || description}</p>
        )}
      </div>
    </motion.div>
  );
};