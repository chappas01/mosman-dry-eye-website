import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const PRESETS = [
  {
    id: 'ivory-navy',
    name: 'Ivory & Navy',
    swatch: ['#1a2a4a', '#d4a574', '#faf8f3'],
    tokens: {
      'background': '40 33% 98%',
      'foreground': '213 55% 12%',
      'card': '0 0% 100%',
      'card-foreground': '213 55% 12%',
      'popover': '0 0% 100%',
      'popover-foreground': '213 55% 12%',
      'primary': '213 55% 12%',
      'primary-foreground': '40 33% 98%',
      'secondary': '40 20% 92%',
      'secondary-foreground': '213 55% 12%',
      'muted': '40 20% 94%',
      'muted-foreground': '213 10% 42%',
      'accent': '32 52% 64%',
      'accent-foreground': '213 55% 12%',
      'border': '220 14% 90%',
      'input': '220 14% 88%',
      'ring': '32 52% 64%',
    },
  },
  {
    id: 'sage-stone',
    name: 'Sage & Stone',
    swatch: ['#2d4a3e', '#c08555', '#f4f1ea'],
    tokens: {
      'background': '60 20% 96%',
      'foreground': '150 15% 22%',
      'card': '0 0% 100%',
      'card-foreground': '150 15% 22%',
      'popover': '0 0% 100%',
      'popover-foreground': '150 15% 22%',
      'primary': '150 18% 25%',
      'primary-foreground': '60 20% 96%',
      'secondary': '60 15% 90%',
      'secondary-foreground': '150 15% 22%',
      'muted': '60 15% 93%',
      'muted-foreground': '150 8% 40%',
      'accent': '25 55% 55%',
      'accent-foreground': '150 15% 22%',
      'border': '60 12% 88%',
      'input': '60 12% 86%',
      'ring': '25 55% 55%',
    },
  },
  {
    id: 'charcoal-blush',
    name: 'Charcoal & Blush',
    swatch: ['#2b2620', '#e89bb5', '#f7f4f1'],
    tokens: {
      'background': '30 15% 97%',
      'foreground': '30 10% 18%',
      'card': '0 0% 100%',
      'card-foreground': '30 10% 18%',
      'popover': '0 0% 100%',
      'popover-foreground': '30 10% 18%',
      'primary': '30 10% 18%',
      'primary-foreground': '30 15% 97%',
      'secondary': '30 12% 92%',
      'secondary-foreground': '30 10% 18%',
      'muted': '30 12% 94%',
      'muted-foreground': '30 6% 42%',
      'accent': '340 45% 72%',
      'accent-foreground': '30 10% 18%',
      'border': '30 10% 88%',
      'input': '30 10% 86%',
      'ring': '340 45% 72%',
    },
  },
  {
    id: 'midnight-pearl',
    name: 'Midnight & Pearl',
    swatch: ['#172a4d', '#7a9cc6', '#eef1f5'],
    tokens: {
      'background': '220 25% 96%',
      'foreground': '225 40% 15%',
      'card': '0 0% 100%',
      'card-foreground': '225 40% 15%',
      'popover': '0 0% 100%',
      'popover-foreground': '225 40% 15%',
      'primary': '225 40% 15%',
      'primary-foreground': '220 25% 96%',
      'secondary': '220 18% 90%',
      'secondary-foreground': '225 40% 15%',
      'muted': '220 18% 93%',
      'muted-foreground': '225 12% 40%',
      'accent': '210 30% 60%',
      'accent-foreground': '225 40% 15%',
      'border': '220 15% 88%',
      'input': '220 15% 86%',
      'ring': '210 30% 60%',
    },
  },
];

const DEFAULT_ID = 'ivory-navy';
const STORAGE_KEY = 'mosman-dryeye-theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_ID;
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_ID;
  });

  const applyTheme = useCallback((id) => {
    const preset = PRESETS.find((p) => p.id === id) || PRESETS[0];
    const root = document.documentElement;
    Object.entries(preset.tokens).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, []);

  useEffect(() => {
    applyTheme(themeId);
    try { localStorage.setItem(STORAGE_KEY, themeId); } catch (e) { /* ignore */ }
  }, [themeId, applyTheme]);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, presets: PRESETS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}