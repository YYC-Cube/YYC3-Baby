import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type ThemeStyle = 'liquid-glass' | 'aurora' | 'cyberpunk';

export interface ThemeContextValue {
  theme: ThemeStyle;
  setTheme: (theme: ThemeStyle) => void;
  cycleTheme: () => void;
  isDark: boolean; // aurora & cyberpunk are dark themes
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_ORDER: ThemeStyle[] = ['liquid-glass', 'aurora', 'cyberpunk'];

/** Temporarily add a class to <html> that enables CSS transitions on all elements */
const triggerThemeTransition = () => {
  const root = document.documentElement;
  root.classList.add('theme-transitioning');
  // Remove after the transition completes (~550ms to cover the 500ms longest transition)
  setTimeout(() => {
    root.classList.remove('theme-transitioning');
  }, 600);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeStyle>(() => {
    try {
      const saved = localStorage.getItem('xy-theme');
      if (saved && THEME_ORDER.includes(saved as ThemeStyle)) {
        return saved as ThemeStyle;
      }
    } catch {
      // ignore
    }
    return 'cyberpunk';
  });

  const setTheme = useCallback((t: ThemeStyle) => {
    triggerThemeTransition();
    setThemeState(t);
    try { localStorage.setItem('xy-theme', t); } catch { /* ignore */ }
  }, []);

  const cycleTheme = useCallback(() => {
    triggerThemeTransition();
    setThemeState((prev) => {
      const idx = THEME_ORDER.indexOf(prev);
      const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
      try { localStorage.setItem('xy-theme', next); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const isDark = theme === 'aurora' || theme === 'cyberpunk';

  // Sync .dark class on <html> so shadcn/ui and Tailwind dark: variants respond
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};