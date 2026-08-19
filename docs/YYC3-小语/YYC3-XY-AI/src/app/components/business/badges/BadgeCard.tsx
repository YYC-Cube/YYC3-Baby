import React from 'react';
import { Badge } from '../../../../types/badge';
import { Card } from '../../ui/card';
import { Lock } from 'lucide-react';
import { cn } from '../../ui/utils';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { useTheme } from '../../../contexts/ThemeContext';

interface BadgeCardProps {
  badge: Badge;
  isEarned: boolean;
  onClick: (badge: Badge) => void;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge, isEarned, onClick }) => {
  const { isDark, theme } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';

  // Rarity colors - light and dark variants
  const rarityColors = isDark
    ? {
        common: isCyber ? 'border-slate-600 bg-slate-800/60' : 'border-slate-600 bg-slate-800/40',
        rare: isCyber ? 'border-cyan-700 bg-cyan-900/40' : 'border-blue-700 bg-blue-900/40',
        epic: isCyber ? 'border-purple-600 bg-purple-900/40' : 'border-purple-600 bg-purple-900/40',
        legendary: isCyber ? 'border-yellow-600 bg-yellow-900/30' : 'border-amber-600 bg-amber-900/30',
        mythical: isCyber ? 'border-pink-600 bg-pink-900/30' : 'border-rose-600 bg-rose-900/30',
      }
    : {
        common: 'border-slate-200 bg-slate-50',
        rare: 'border-blue-200 bg-blue-50',
        epic: 'border-purple-200 bg-purple-50',
        legendary: 'border-amber-200 bg-amber-50',
        mythical: 'border-rose-200 bg-rose-50',
      };

  const unearnedStyle = isDark
    ? (isCyber ? 'border-slate-700 bg-slate-900/50' : 'border-slate-700 bg-slate-800/50')
    : 'border-slate-200 bg-slate-100';

  const glowStyles = badge.metadata.glowColor && isEarned ? {
    boxShadow: `0 0 15px ${badge.metadata.glowColor}40`
  } : {};

  return (
    <div 
      className={cn(
        "relative group cursor-pointer transition-all duration-300 hover:scale-105",
        !isEarned && "opacity-70 grayscale hover:grayscale-0 hover:opacity-100"
      )}
      onClick={() => onClick(badge)}
    >
      <Card 
        className={cn(
          "flex flex-col items-center p-4 h-full border-2",
          isEarned ? rarityColors[badge.rarity] : unearnedStyle
        )}
        style={glowStyles}
      >
        <div className="relative w-24 h-24 mb-3">
          {/* Badge Icon */}
          <div className={cn(
            "w-full h-full rounded-full flex items-center justify-center overflow-hidden",
             !isEarned
               ? (isDark ? 'bg-slate-700' : 'bg-slate-200')
               : (isDark ? 'bg-white/10' : 'bg-white')
          )}>
             {badge.icon.startsWith('/') ? (
               // Assuming these are local assets or placeholders. 
               // For now, if it's a path, we might not have the image. 
               // I'll use a placeholder or the ImageWithFallback if available, 
               // but ImageWithFallback is for Figma assets usually.
               // I will use a simple img or a placeholder div.
               <ImageWithFallback src={badge.icon} alt={badge.title} className="w-full h-full object-cover" />
             ) : (
                <span className="text-4xl">{badge.icon}</span> // For emojis in the group, though badge.icon is usually a path in the mock data
             )}
          </div>
          
          {/* Lock Overlay */}
          {!isEarned && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-full">
              <Lock className={cn("w-8 h-8", isDark ? 'text-slate-400' : 'text-slate-500')} />
            </div>
          )}

          {/* Level Badge (Optional) */}
           {isEarned && (
            <div className={cn(
              "absolute -bottom-2 -right-2 text-xs px-2 py-0.5 rounded-full shadow-sm capitalize",
              isDark
                ? 'bg-yellow-500 text-black border border-yellow-400/50'
                : 'bg-yellow-400 border border-white'
            )} style={{ fontWeight: 700 }}>
              {badge.level}
            </div>
           )}
        </div>

        <h3 className={cn("text-sm text-center mb-1 line-clamp-1", isDark ? 'text-white/90' : '')} style={{ fontWeight: 700 }}>{badge.title}</h3>
        <p className={cn("text-xs text-center line-clamp-2", isDark ? 'text-white/50' : 'text-muted-foreground')}>{badge.description}</p>
        
        {badge.progress !== undefined && badge.progress > 0 && badge.progress < 100 && !isEarned && (
           <div className={cn("w-full mt-2 h-1.5 rounded-full overflow-hidden", isDark ? 'bg-slate-700' : 'bg-slate-200')}>
             <div className={cn("h-full", isCyber ? 'bg-cyan-400' : isAurora ? 'bg-emerald-400' : 'bg-blue-500')} style={{ width: `${badge.progress}%` }} />
           </div>
        )}
      </Card>
    </div>
  );
};