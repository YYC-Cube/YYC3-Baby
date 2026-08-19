import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  children,
  className = '',
  rounded = 'lg',
}) => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';

  const baseStyles = 'transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none relative overflow-hidden';

  const getVariantStyles = () => {
    if (isCyber) {
      switch (variant) {
        case 'primary':
        case 'success':
          return 'cyber-btn cyber-btn-primary';
        case 'secondary':
          return 'bg-cyan-500/15 backdrop-blur-md text-cyan-400 border border-cyan-500/25 hover:bg-cyan-500/25 hover:-translate-y-0.5';
        case 'outline':
          return 'border-2 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 backdrop-blur-sm hover:-translate-y-0.5';
        case 'ghost':
          return 'text-cyan-400 hover:bg-cyan-500/10 backdrop-blur-sm hover:-translate-y-0.5';
        case 'danger':
          return 'bg-red-500/20 backdrop-blur-md text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:-translate-y-0.5';
        case 'glass':
          return 'bg-white/5 backdrop-blur-md border border-cyan-500/15 text-cyan-300 hover:bg-cyan-500/10 hover:-translate-y-0.5';
        default:
          return 'cyber-btn cyber-btn-primary';
      }
    }

    if (isAurora) {
      switch (variant) {
        case 'primary':
        case 'success':
          return 'aurora-btn text-white';
        case 'secondary':
          return 'bg-emerald-500/15 backdrop-blur-md text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/25 hover:-translate-y-0.5';
        case 'outline':
          return 'border-2 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/10 backdrop-blur-sm hover:-translate-y-0.5';
        case 'ghost':
          return 'text-emerald-300 hover:bg-white/8 backdrop-blur-sm hover:-translate-y-0.5';
        case 'danger':
          return 'bg-red-500/20 backdrop-blur-md text-red-400 border border-red-500/20 hover:bg-red-500/30 hover:-translate-y-0.5';
        case 'glass':
          return 'bg-white/8 backdrop-blur-md border border-white/12 text-white/80 hover:bg-white/12 hover:-translate-y-0.5';
        default:
          return 'aurora-btn text-white';
      }
    }

    // Liquid glass (default)
    const styles: Record<string, string> = {
      primary: 'glass-btn text-white',
      secondary: 'bg-emerald-500/20 backdrop-blur-md text-emerald-700 border border-emerald-200/50 hover:bg-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5',
      outline: 'border-2 border-emerald-400/60 text-emerald-600 hover:bg-emerald-50/50 backdrop-blur-sm hover:-translate-y-0.5',
      ghost: 'text-emerald-700 hover:bg-emerald-100/50 backdrop-blur-sm hover:-translate-y-0.5',
      danger: 'bg-red-500/90 backdrop-blur-md text-white hover:bg-red-600/90 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5',
      success: 'glass-btn text-white',
      glass: 'bg-white/30 backdrop-blur-md border border-white/50 text-gray-700 hover:bg-white/50 hover:shadow-lg hover:-translate-y-0.5',
    };
    return styles[variant] || styles.primary;
  };

  const sizeStyles = {
    xs: 'px-2.5 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const roundedStyles = {
    sm: isCyber ? 'rounded' : 'rounded-lg',
    md: isCyber ? 'rounded-md' : 'rounded-xl',
    lg: isCyber ? 'rounded-lg' : 'rounded-2xl',
    full: 'rounded-full',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${getVariantStyles()}
        ${sizeStyles[size]}
        ${roundedStyles[rounded]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className="animate-spin text-sm">⏳</span>}
      {icon && !loading && iconPosition === 'left' && <span className="inline-flex">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && !loading && iconPosition === 'right' && <span className="inline-flex">{icon}</span>}
    </button>
  );
};
