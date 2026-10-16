import React, { createContext, useContext, useState, useEffect } from 'react';

const BACKDROPS = [
  {
    id: 'balmoral-ai',
    name: 'Balmoral Beach',
    desc: 'AI-rendered panorama',
    url: '/images/balmoral-beach.png',
  },
  {
    id: 'harbour-pines',
    name: 'Harbour Pines',
    desc: 'Norfolk pines by the harbour',
    url: 'https://images.unsplash.com/photo-1776483073311-d81778151ff8?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'harbour-sunrise',
    name: 'Harbour Sunrise',
    desc: 'Sydney Harbour at dawn',
    url: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'harbour-panorama',
    name: 'Harbour Panorama',
    desc: 'Opera House & Bridge',
    url: 'https://images.unsplash.com/photo-1523428096881-5bd79d043006?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'headland-bay',
    name: 'Headland & Bay',
    desc: 'Rocky headland, Sydney',
    url: 'https://images.unsplash.com/photo-1786197753825-54c49df8150a?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'aerial-cliffs',
    name: 'Aerial Cliffs',
    desc: 'Drone shot, NSW coast',
    url: 'https://images.unsplash.com/photo-1757713247288-450349befff6?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'aerial-beach',
    name: 'Aerial Beach',
    desc: 'Beach & city, Terrigal NSW',
    url: 'https://images.unsplash.com/photo-1692502599197-2ee45433c10a?auto=format&fit=crop&w=1600&q=80',
  },
];

const DEFAULT_ID = 'balmoral-ai';
const STORAGE_KEY = 'mosman-dryeye-backdrop';

const BackgroundContext = createContext(null);

export function BackgroundProvider({ children }) {
  const [backdropId, setBackdropId] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_ID;
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_ID;
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, backdropId); } catch (e) { /* ignore */ }
  }, [backdropId]);

  const backdrop = BACKDROPS.find((b) => b.id === backdropId) || BACKDROPS[0];

  return (
    <BackgroundContext.Provider
      value={{ backdropId, setBackdropId, backdrops: BACKDROPS, backdropUrl: backdrop.url }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) throw new Error('useBackground must be used within BackgroundProvider');
  return ctx;
}