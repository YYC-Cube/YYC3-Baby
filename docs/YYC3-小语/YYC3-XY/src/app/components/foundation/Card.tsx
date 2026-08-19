import React from 'react';

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
  className = '',
  children,
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const getCardClass = () => {
    const base = 'glass-card';
    const greenClass = glassVariant ? ` glass-green-${glassVariant}` : '';

    switch (variant) {
      case 'glass':
        return `${base}${greenClass}`;
      case 'glass-green':
        return `${base} glass-green-${glassVariant || 1}`;
      case 'gradient':
        return `${base} glass-green-3`;
      case 'outline':
        return `${base} glass-card-subtle`;
      default:
        return base;
    }
  };

  const hoverStyles = hoverable ? '' : 'hover:!transform-none hover:!shadow-none';
  const clickStyles = onClick ? 'cursor-pointer' : '';
  const borderStyles = bordered ? 'border border-white/40' : '';

  return (
    <div
      className={`
        ${getCardClass()}
        ${hoverStyles}
        ${clickStyles}
        ${borderStyles}
        overflow-hidden
        ${className}
      `}
      onClick={onClick}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <div className={paddingStyles[padding]}>
        {title && (
          <h3 className="mb-1 text-gray-800">{title}</h3>
        )}
        {subtitle && (
          <p className="text-gray-500 text-sm mb-2">{subtitle}</p>
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
