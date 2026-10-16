import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Droplet, Flame, Sun } from 'lucide-react';
import { Image } from '@/components/ui/image';

const MACRO_EYE = '/images/dry-eye-explained.png';

const SYMPTOMS = [
  { icon: Eye, label: 'Grittiness or foreign-body sensation' },
  { icon: Droplet, label: 'Excessive watering (reflex tearing)' },
  { icon: Flame, label: 'Burning or stinging' },
  { icon: Sun, label: 'Light sensitivity & blurred vision' },
];

export default function WhatIsDryEye() {
  return (
    <section id="condition" className="bg-background py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <Image src={MACRO_EYE} alt="Macro detail of a human iris and tear film" fittingType="fill" className="w-full h-full" />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:right-6 glass-panel border border-border px-6 py-5 max-w-[15rem] shadow-lg">
              <p className="font-display text-4xl text-accent leading-none">86%</p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">of dry eye cases are associated with meibomian gland dysfunction — the most common underlying cause.</p>
            </div>
          </motion.div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <p className="text-xs tracking-luxe uppercase text-accent mb-5">The Condition</p>
            <h2 className="font-display text-5xl sm:text-6xl text-primary leading-[1.02] text-balance">
              Dry eye is a disease of the tear film — not a minor annoyance.
            </h2>
            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                Your tear film is a precise three-layer system: a mucous base, a watery middle, and a delicate lipid (oil) layer on top that stops tears from evaporating. When the <span className="text-foreground font-medium">meibomian glands</span> along your eyelids become blocked or dysfunctional, that oil layer fails — and tears evaporate faster than they're made.
              </p>
              <p>
                The result is <span className="text-foreground font-medium">Meibomian Gland Dysfunction (MGD)</span> — the cause behind the vast majority of dry eye. Over-the-counter drops can ease symptoms temporarily, but addressing the underlying gland function is central to longer-term improvement.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {SYMPTOMS.map((s) => (
                <div key={s.label} className="flex items-start gap-3 py-3 border-t border-border">
                  <s.icon className="w-4 h-4 text-accent mt-1 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm text-foreground/80">{s.label}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-muted-foreground italic border-l-2 border-accent pl-4">
              Our protocols follow the TFOS DEWS II international consensus — the global standard for dry eye diagnosis and management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}