// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

interface Colors {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryDark: string;
}

interface NavigationTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
}

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isDark: boolean;
  colors: Colors;
  navigationTheme: NavigationTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(systemTheme || 'dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDark = theme === 'dark';

  const colors: Colors = {
    background: isDark ? '#0f0f10' : '#f6f6f7',
    surface: isDark ? '#1e1f22' : '#ffffff',
    surfaceAlt: isDark ? '#2b2d31' : '#f2f3f5',
    border: isDark ? '#2f3136' : '#e3e5e8',
    text: isDark ? '#ffffff' : '#060607',
    textMuted: isDark ? '#b9bbbe' : '#5c5e66',
    primary: '#5865f2',
    primaryDark: '#4752c4',
  };

  const navigationTheme: NavigationTheme = {
    dark: isDark,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: '#ed4245',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark, colors, navigationTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};