import React, { useCallback, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export interface CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  actions?: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  bordered?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'outline' | 'glass' | 'glass-green';
  glassVariant?: 1 | 2 | 3 | 4 | 5 | 6;
  enableMicroInteraction?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  actions,
  onClick,
  hoverable = true,
  bordered = false,
  rounded = 'xl',
  padding = 'md',
  variant = 'glass',
  glassVariant,
  enableMicroInteraction = true,
  className = '',
  children,
}) => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';
  const cardRef = useRef<HTMLDivElement>(null);

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const getCardClass = () => {
    if (isCyber) {
      const base = 'cyber-card';
      const micro = enableMicroInteraction ? ' cyber-scan-hover cyber-neon-pulse-hover' : '';
      switch (variant) {
        case 'glass-green':
        case 'gradient':
          return `${base} cyber-gradient-cyan${micro}`;
        case 'outline':
          return `${base} cyber-card-subtle${micro}`;
        default:
          return `${base}${micro}`;
      }
    }

    if (isAurora) {
      const base = 'aurora-card';
      const micro = enableMicroInteraction ? ' aurora-breathe aurora-border-flow' : '';
      const gradientMap: Record<number, string> = { 1: 'aurora-gradient-1', 2: 'aurora-gradient-2', 3: 'aurora-gradient-3', 4: 'aurora-gradient-4', 5: 'aurora-gradient-5' };
      switch (variant) {
        case 'glass-green':
        case 'gradient':
          return `${base} ${gradientMap[glassVariant || 1] || 'aurora-gradient-1'}${micro}`;
        case 'outline':
          return `${base} aurora-card-subtle${micro}`;
        default:
          return glassVariant ? `${base} ${gradientMap[glassVariant] || ''}${micro}` : `${base}${micro}`;
      }
    }

    // Liquid glass (default)
    const base = 'glass-card';
    const micro = enableMicroInteraction ? ' glass-ripple glass-refract-hover' : '';
    const greenClass = glassVariant ? ` glass-green-${glassVariant}` : '';

    switch (variant) {
      case 'glass':
        return `${base}${greenClass}${micro}`;
      case 'glass-green':
        return `${base} glass-green-${glassVariant || 1}${micro}`;
      case 'gradient':
        return `${base} glass-green-3${micro}`;
      case 'outline':
        return `${base} glass-card-subtle${micro}`;
      default:
        return `${base}${micro}`;
    }
  };

  const hoverStyles = hoverable ? '' : 'hover:!transform-none hover:!shadow-none';
  const clickStyles = onClick ? 'cursor-pointer' : '';
  const borderStyles = bordered
    ? (isCyber ? 'border border-cyan-500/30' : isDark ? 'border border-white/10' : 'border border-white/40')
    : '';

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Liquid glass ripple effect
    if (theme === 'liquid-glass' && enableMicroInteraction && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const ripple = document.createElement('div');
      ripple.className = 'ripple-circle';
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      cardRef.current.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
    onClick?.();
  }, [theme, enableMicroInteraction, onClick]);

  return (
    <div
      ref={cardRef}
      className={`
        ${getCardClass()}
        ${hoverStyles}
        ${clickStyles}
        ${borderStyles}
        overflow-hidden
        ${className}
      `}
      onClick={handleClick}
    >
      {/* Cyberpunk scanline element */}
      {isCyber && enableMicroInteraction && <div className="cyber-scanline" />}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className={`absolute inset-0 ${isCyber ? 'bg-gradient-to-t from-black/40 to-transparent' : 'bg-gradient-to-t from-black/20 to-transparent'}`} />
        </div>
      )}
      <div className={paddingStyles[padding]}>
        {title && (
          <h3 className={`mb-1 ${isCyber ? 'text-cyan-300' : isDark ? 'text-white/90' : 'text-gray-800'}`}>{title}</h3>
        )}
        {subtitle && (
          <p className={`text-sm mb-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{subtitle}</p>
        )}
        {children}
        {actions && (
          <div className="mt-4 flex gap-2 justify-end">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};