/**
 * Progress - Theme-aware progress components
 */

import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  striped?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showPercentage = false,
  variant = 'primary',
  size = 'md',
  animated = true,
  className = '',
}) => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const barClass = isCyber ? 'cyber-progress-bar' : isAurora ? 'aurora-progress-bar' : 'progress-glow';
  const trackBg = isCyber ? 'bg-cyan-900/20' : isAurora ? 'bg-white/10' : 'bg-emerald-100/40';
  const accentColor = isCyber ? 'text-cyan-400' : isAurora ? 'text-emerald-400' : 'text-emerald-600';
  const labelColor = isDark ? 'text-white/70' : 'text-gray-600';

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className={`text-sm ${labelColor}`} style={{ fontWeight: 500 }}>{label}</span>}
          {showPercentage && (
            <span className={`text-sm ${accentColor}`} style={{ fontWeight: 600 }}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${trackBg} rounded-full overflow-hidden backdrop-blur-sm ${sizeStyles[size]}`}>
        <div
          className={`${sizeStyles[size]} ${barClass} ${animated ? 'transition-all duration-700 ease-out' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  showValue?: boolean;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 120,
  strokeWidth = 8,
  showValue = true,
  className = '',
}) => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const percentage = Math.min(Math.max(value, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const gradId = `circleGrad-${isCyber ? 'cyber' : 'green'}`;
  const trackColor = isCyber ? 'rgba(0, 240, 255, 0.08)' : 'rgba(16, 185, 129, 0.1)';
  const textColor = isCyber ? 'text-cyan-400' : isDark ? 'text-emerald-400' : 'text-emerald-600';
  const filterGlow = isCyber ? 'drop-shadow(0 0 6px rgba(0,240,255,0.5))' : 'drop-shadow(0 0 6px rgba(16,185,129,0.4))';

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke={trackColor}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{ filter: filterGlow }}
        />
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isCyber ? '#00f0ff' : '#10b981'} />
            <stop offset="100%" stopColor={isCyber ? '#ff00ff' : '#059669'} />
          </linearGradient>
        </defs>
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl ${textColor}`} style={{ fontWeight: 700 }}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};
