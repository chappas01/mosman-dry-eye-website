import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STYLE_PRESETS = [
  {
    id: 'editorial',
    name: 'Editorial',
    desc: 'Serif headings · sharp corners',
    tokens: {
      'radius': '0.25rem',
      'font-heading': "'Cormorant Garamond', ui-serif, Georgia, serif",
      'font-display': "'Cormorant Garamond', ui-serif, Georgia, serif",
      'font-body': "'Inter', ui-sans-serif, system-ui, sans-serif",
    },
  },
  {
    id: 'soft-modern',
    name: 'Soft Modern',
    desc: 'Sans headings · rounded corners',
    tokens: {
      'radius': '0.75rem',
      'font-heading': "'Inter', ui-sans-serif, system-ui, sans-serif",
      'font-display': "'Inter', ui-sans-serif, system-ui, sans-serif",
      'font-body': "'Inter', ui-sans-serif, system-ui, sans-serif",
    },
  },
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Serif headings · soft rounded',
    tokens: {
      'radius': '1.25rem',
      'font-heading': "'Cormorant Garamond', ui-serif, Georgia, serif",
      'font-display': "'Cormorant Garamond', ui-serif, Georgia, serif",
      'font-body': "'Inter', ui-sans-serif, system-ui, sans-serif",
    },
  },
  {
    id: 'bold-minimal',
    name: 'Bold Minimal',
    desc: 'Sans headings · crisp square',
    tokens: {
      'radius': '0rem',
      'font-heading': "'Inter', ui-sans-serif, system-ui, sans-serif",
      'font-display': "'Inter', ui-sans-serif, system-ui, sans-serif",
      'font-body': "'Inter', ui-sans-serif, system-ui, sans-serif",
    },
  },
];

const DEFAULT_ID = 'editorial';
const STORAGE_KEY = 'mosman-dryeye-style';

const StyleContext = createContext(null);

export function StyleProvider({ children }) {
  const [styleId, setStyleId] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_ID;
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_ID;
  });

  const applyStyle = useCallback((id) => {
    const preset = STYLE_PRESETS.find((p) => p.id === id) || STYLE_PRESETS[0];
    const root = document.documentElement;
    Object.entries(preset.tokens).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, []);

  useEffect(() => {
    applyStyle(styleId);
    try { localStorage.setItem(STORAGE_KEY, styleId); } catch (e) { /* ignore */ }
  }, [styleId, applyStyle]);

  return (
    <StyleContext.Provider value={{ styleId, setStyleId, stylePresets: STYLE_PRESETS }}>
      {children}
    </StyleContext.Provider>
  );
}

export function useStyle() {
  const ctx = useContext(StyleContext);
  if (!ctx) throw new Error('useStyle must be used within StyleProvider');
  return ctx;
}