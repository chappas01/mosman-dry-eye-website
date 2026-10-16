import React, { useState } from 'react';
import { Palette, X, Check } from 'lucide-react';
import { useTheme } from '@/components/ThemeContext';
import { useStyle } from '@/components/StyleContext';
import { useBackground } from '@/components/BackgroundContext';

export default function ThemeSwitcher() {
  const { themeId, setThemeId, presets } = useTheme();
  const { styleId, setStyleId, stylePresets } = useStyle();
  const { backdropId, setBackdropId, backdrops } = useBackground();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {open && (
        <div className="mb-3 bg-card border border-border rounded-sm shadow-xl p-4 w-64 max-h-[calc(100vh-7rem)] overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-luxe uppercase text-muted-foreground">Look</span>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground" aria-label="Close">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[10px] tracking-luxe-sm uppercase text-muted-foreground/70 mb-1.5 block">Colour</span>
          <div className="flex flex-col gap-0.5 mb-4">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => setThemeId(p.id)}
                className="flex items-center justify-between px-2 py-2 rounded-sm hover:bg-muted transition-colors text-left"
              >
                <span className="flex items-center gap-2.5">
                  <span className="flex gap-0.5">
                    {p.swatch.map((c, i) => (
                      <span key={i} className="w-3 h-3 rounded-full ring-1 ring-black/10" style={{ background: c }} />
                    ))}
                  </span>
                  <span className="text-xs text-foreground">{p.name}</span>
                </span>
                {themeId === p.id && <Check className="w-3.5 h-3.5 text-accent" />}
              </button>
            ))}
          </div>

          <span className="text-[10px] tracking-luxe-sm uppercase text-muted-foreground/70 mb-1.5 block">Style</span>
          <div className="flex flex-col gap-0.5">
            {stylePresets.map((p) => (
              <button
                key={p.id}
                onClick={() => setStyleId(p.id)}
                className="flex items-center justify-between px-2 py-2 rounded-sm hover:bg-muted transition-colors text-left"
              >
                <span className="flex flex-col">
                  <span className="text-xs text-foreground">{p.name}</span>
                  <span className="text-[10px] text-muted-foreground">{p.desc}</span>
                </span>
                {styleId === p.id && <Check className="w-3.5 h-3.5 text-accent" />}
              </button>
            ))}
          </div>

          <span className="text-[10px] tracking-luxe-sm uppercase text-muted-foreground/70 mb-1.5 block">Footer backdrop</span>
          <div className="grid grid-cols-2 gap-1.5">
            {backdrops.map((b) => (
              <button
                key={b.id}
                onClick={() => setBackdropId(b.id)}
                className={`relative h-14 rounded-sm overflow-hidden ring-1 transition ${backdropId === b.id ? 'ring-accent' : 'ring-border hover:ring-foreground/30'}`}
                aria-label={b.name}
              >
                <img src={b.url} alt="" className="w-full h-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 px-1.5 py-0.5 bg-black/55 text-[9px] text-white text-left leading-tight">{b.name}</span>
                {backdropId === b.id && (
                  <span className="absolute top-1 right-1 bg-accent rounded-full p-0.5">
                    <Check className="w-2.5 h-2.5 text-accent-foreground" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Switch look"
      >
        <Palette className="w-5 h-5" />
      </button>
    </div>
  );
}