'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

// 主题配置定义
const theme = {
  colors: {
    primary: { 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb' },
    secondary: { 500: '#8b5cf6' },
    success: { 500: '#10b981' },
    warning: { 500: '#f59e0b' },
    error: { 500: '#ef4444' },
    info: { 500: '#06b6d4' },
    neutral: {
      50: '#ffffff', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db',
      400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151',
      800: '#1f2937', 900: '#111827', 950: '#030712',
    },
  },
  typography: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: {
      xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem',
      xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem',
    },
    fontWeight: {
      light: 300, normal: 400, medium: 500, semibold: 600, bold: 700,
    },
  },
  spacing: {
    0: '0', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem',
    5: '1.25rem', 6: '1.5rem', 8: '2rem', 10: '2.5rem', 12: '3rem',
    16: '4rem', 20: '5rem', 24: '6rem', 32: '8rem',
  },
  borderRadius: {
    sm: '0.125rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', full: '9999px',
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
    xl: '0 20px 25px rgba(0,0,0,0.15)',
  },
}

interface YYC3ThemeProviderProps {
  children: React.ReactNode
}

export function YYC3ThemeProvider({ children }: YYC3ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          /* 颜色变量 */
          --color-primary: ${theme.colors.primary[500]};
          --color-primary-light: ${theme.colors.primary[400]};
          --color-primary-dark: ${theme.colors.primary[600]};
          --color-secondary: ${theme.colors.secondary[500]};
          --color-success: ${theme.colors.success[500]};
          --color-warning: ${theme.colors.warning[500]};
          --color-error: ${theme.colors.error[500]};
          --color-info: ${theme.colors.info[500]};

          /* 中性色 */
          --color-white: ${theme.colors.neutral[50]};
          --color-gray-100: ${theme.colors.neutral[100]};
          --color-gray-200: ${theme.colors.neutral[200]};
          --color-gray-300: ${theme.colors.neutral[300]};
          --color-gray-400: ${theme.colors.neutral[400]};
          --color-gray-500: ${theme.colors.neutral[500]};
          --color-gray-600: ${theme.colors.neutral[600]};
          --color-gray-700: ${theme.colors.neutral[700]};
          --color-gray-800: ${theme.colors.neutral[800]};
          --color-gray-900: ${theme.colors.neutral[900]};
          --color-black: ${theme.colors.neutral[950]};

          /* 排版变量 */
          --font-family: ${theme.typography.fontFamily};
          --font-size-xs: ${theme.typography.fontSize.xs};
          --font-size-sm: ${theme.typography.fontSize.sm};
          --font-size-md: ${theme.typography.fontSize.md};
          --font-size-lg: ${theme.typography.fontSize.lg};
          --font-size-xl: ${theme.typography.fontSize.xl};
          --font-size-2xl: ${theme.typography.fontSize['2xl']};
          --font-size-3xl: ${theme.typography.fontSize['3xl']};
          --font-size-4xl: ${theme.typography.fontSize['4xl']};

          --font-weight-light: ${theme.typography.fontWeight.light};
          --font-weight-normal: ${theme.typography.fontWeight.normal};
          --font-weight-medium: ${theme.typography.fontWeight.medium};
          --font-weight-semibold: ${theme.typography.fontWeight.semibold};
          --font-weight-bold: ${theme.typography.fontWeight.bold};

          /* 间距变量 */
          --spacing-0: ${theme.spacing[0]};
          --spacing-1: ${theme.spacing[1]};
          --spacing-2: ${theme.spacing[2]};
          --spacing-3: ${theme.spacing[3]};
          --spacing-4: ${theme.spacing[4]};
          --spacing-5: ${theme.spacing[5]};
          --spacing-6: ${theme.spacing[6]};
          --spacing-8: ${theme.spacing[8]};
          --spacing-10: ${theme.spacing[10]};
          --spacing-12: ${theme.spacing[12]};
          --spacing-16: ${theme.spacing[16]};
          --spacing-20: ${theme.spacing[20]};
          --spacing-24: ${theme.spacing[24]};
          --spacing-32: ${theme.spacing[32]};

          /* 边框半径 */
          --border-radius-sm: ${theme.borderRadius.sm};
          --border-radius-md: ${theme.borderRadius.md};
          --border-radius-lg: ${theme.borderRadius.lg};
          --border-radius-xl: ${theme.borderRadius.xl};
          --border-radius-full: ${theme.borderRadius.full};

          /* 阴影 */
          --shadow-sm: ${theme.shadow.sm};
          --shadow-md: ${theme.shadow.md};
          --shadow-lg: ${theme.shadow.lg};
          --shadow-xl: ${theme.shadow.xl};
        }

        /* 全局基础样式 */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          font-size: 16px;
          font-family: var(--font-family);
          line-height: 1.5;
        }

        body {
          color: var(--color-gray-900);
          background-color: var(--color-white);
          font-family: var(--font-family);
        }
      ` }} />
      { children }
    </NextThemesProvider >
  )
}
