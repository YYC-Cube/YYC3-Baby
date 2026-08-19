import React from 'react';
import { motion } from 'motion/react';

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
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`glass-card overflow-hidden cursor-pointer ${className}`}
    >
      {image && (
        <div className="relative h-36 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {type && (
            <span className="absolute top-3 right-3 px-2 py-0.5 bg-white/40 backdrop-blur-md text-xs text-gray-700 rounded-lg border border-white/50" style={{ fontWeight: 500 }}>
              {type}
            </span>
          )}
        </div>
      )}
      <div className="p-4">
        <h4 className="text-gray-800 text-sm mb-1" style={{ fontWeight: 600 }}>{title}</h4>
        {(subtitle || description) && (
          <p className="text-gray-500 text-xs line-clamp-2">{subtitle || description}</p>
        )}
      </div>
    </motion.div>
  );
};
