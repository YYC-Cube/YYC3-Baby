import React, { createContext, useContext, useState } from 'react';

interface NavigationData {
  cultureId?: string;
  [key: string]: unknown;
}

interface NavigationContextType {
  currentPage: string;
  navigateTo: (page: string, data?: NavigationData) => void;
  goBack: () => void;
  goHome: () => void;
  canGoBack: boolean;
  navigationData: NavigationData | null;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<string[]>(['home']);
  const [navigationData, setNavigationData] = useState<NavigationData | null>(null);

  const currentPage = history[history.length - 1] || 'home';
  const canGoBack = history.length > 1;

  const navigateTo = (page: string, data?: NavigationData) => {
    setHistory(prev => [...prev, page]);
    if (data) {
      setNavigationData(data);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const goHome = () => {
    setHistory(['home']);
  };

  return (
    <NavigationContext.Provider value={{ 
      currentPage, 
      navigateTo, 
      goBack, 
      goHome, 
      canGoBack, 
      navigationData 
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
