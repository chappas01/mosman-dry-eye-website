import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useBooking } from '@/components/BookingContext';

const LINKS = [
  { label: 'The Condition', href: '#condition' },
  { label: 'The Visit', href: '#visit' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Consultation', href: '#investment' },
  { label: 'Your Practitioner', href: '#about' },
];

export default function SiteNav() {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass-panel border-b border-border/60' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between h-20">
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-display text-2xl text-primary tracking-wide">Mosman Dry Eye</span>
          <span className="text-[10px] tracking-luxe uppercase text-muted-foreground mt-1">Advanced Dry Eye Therapy</span>
        </a>

        <div className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-xs tracking-luxe-sm uppercase text-foreground/70 hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={openBooking}
            className="px-6 py-3 bg-primary text-primary-foreground text-xs tracking-luxe uppercase hover:bg-accent hover:text-accent-foreground transition-colors rounded-sm"
          >
            Book Consultation
          </button>
        </div>

        <button className="lg:hidden p-2 text-primary" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background lg:hidden flex flex-col"
        >
          <div className="flex items-center justify-between h-20 px-6 border-b border-border">
            <span className="font-display text-2xl text-primary">Mosman Dry Eye</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2"><X className="w-6 h-6" /></button>
          </div>
          <div className="flex flex-col px-6 py-8 gap-6">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display text-3xl text-primary">
                {l.label}
              </a>
            ))}
            <button
              onClick={() => { setOpen(false); openBooking(); }}
              className="mt-4 py-4 bg-primary text-primary-foreground text-sm tracking-luxe uppercase rounded-sm"
            >
              Book Consultation
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}