import React from 'react';
import { BadgeGroup } from '../../../../types/badge';
import { Card, CardContent } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { cn } from '../../ui/utils';
import { Trophy } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface BadgeSeriesCardProps {
  group: BadgeGroup;
  onClick: (groupId: string) => void;
  isActive?: boolean;
}

export const BadgeSeriesCard: React.FC<BadgeSeriesCardProps> = ({ group, onClick, isActive }) => {
  const { isDark, theme } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';

  return (
    <div 
      className={cn(
        "cursor-pointer transition-all duration-200",
        isActive
          ? (isCyber ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900 rounded-xl' :
             isAurora ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900 rounded-xl' :
             'ring-2 ring-primary ring-offset-2 rounded-xl')
          : "hover:opacity-80"
      )}
      onClick={() => onClick(group.id)}
    >
      <Card className={cn(
        "h-full",
        isDark && 'border-white/10'
      )}>
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-4">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
              isDark
                ? (isCyber ? 'bg-cyan-500/15' : isAurora ? 'bg-emerald-500/15' : 'bg-primary/15')
                : 'bg-primary/10'
            )}>
              {group.icon}
            </div>
            <div className="flex-1">
              <h3 className={cn("text-lg", isDark ? 'text-white/90' : '')} style={{ fontWeight: 700 }}>{group.name}</h3>
              <div className={cn("flex items-center gap-2 text-sm", isDark ? 'text-white/50' : 'text-muted-foreground')}>
                 <Trophy className="w-3 h-3" />
                 <span>{group.earnedCount}/{group.badgeCount}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-auto">
             <div className={cn("flex justify-between text-xs mb-1", isDark ? 'text-white/60' : '')}>
               <span>进度</span>
               <span>{Math.round(group.progress)}%</span>
             </div>
             <Progress value={group.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};