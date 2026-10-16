import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Microscope, Sparkles, HeartHandshake } from 'lucide-react';
import { Image } from '@/components/ui/image';

const CLINIC = 'https://media.base44.com/images/public/6ad03cd090d2083b062420d2/4db9572b8_generated_ba1d5a5b.png';

const STEPS = [
  {
    n: '01',
    icon: ClipboardCheck,
    title: 'Comprehensive Assessment',
    duration: '1:30 PM · ~90 minutes',
    body: 'Your first visit is a deep diagnostic workup using state-of-the-art instrumentation — tear film analysis, meibography to image your glands, and osmolarity testing. Gina explains every result as you go.',
  },
  {
    n: '02',
    icon: Microscope,
    title: 'Personalised Treatment Plan',
    duration: 'Same visit',
    body: 'Based on the TFOS DEWS II framework, Gina maps the root cause of your dry eye and designs an individualised plan — which may include in-office treatments, at-home care, or both.',
  },
  {
    n: '03',
    icon: Sparkles,
    title: 'In-Office Treatment',
    duration: '4 sessions · 1 week apart',
    body: 'Lumenis IPL reduces inflammation and stimulates the meibomian glands, followed by gentle gland expression to clear blockages. Each session is precise, calm and entirely in-house.',
  },
  {
    n: '04',
    icon: HeartHandshake,
    title: 'Review & Ongoing Care',
    duration: 'Ongoing',
    body: 'A follow-up review assesses your gland function and symptoms, with a maintenance plan to help support your tear film over time.',
  },
];

export default function WhatToExpect() {
  return (
    <section id="visit" className="bg-secondary/40 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-2xl mb-16">
          <p className="text-xs tracking-luxe uppercase text-accent mb-5">The Visit</p>
          <h2 className="font-display text-5xl sm:text-6xl text-primary leading-[1.02] text-balance">
            What to expect at Mosman Dry Eye
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            A calm, unhurried experience in a private Mosman residence — not a busy clinic. Every step is designed around precision and your comfort.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-2">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-6 py-7 border-t border-border last:border-b"
              >
                <div className="shrink-0">
                  <span className="font-display text-3xl text-accent block">{s.n}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <s.icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
                    <h3 className="font-display text-2xl text-primary">{s.title}</h3>
                  </div>
                  <p className="text-xs tracking-luxe-sm uppercase text-muted-foreground mb-3">{s.duration}</p>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <Image src={CLINIC} alt="Interior of the Mosman Dry Eye clinic" fittingType="fill" className="w-full h-full" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground italic">
              A purpose-fitted home clinic — Lumenis IPL and advanced ophthalmic diagnostics, quietly integrated into a serene Mosman setting.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}