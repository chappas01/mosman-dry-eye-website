import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Droplets, Layers, Activity, ClipboardList, ScanEye } from 'lucide-react';
import TreatmentCard from '@/components/sections/TreatmentCard';

const DIAGNOSTIC_TESTS = [
  'Meibography — infrared imaging of your gland structure',
  'Tear osmolarity — the salt-balance marker of severity',
  'Tear film break-up time — how stable your tear film is',
  'Lipid layer assessment — the quality of your protective oil',
  'Lid margin & corneal evaluation — surface health and inflammation',
  'Schirmer’s test — your aqueous (water) tear production',
];

const TREATMENTS = [
  {
    icon: Zap,
    name: 'Lumenis IPL Therapy',
    tag: 'Signature therapy',
    what: 'Controlled pulses of broad-spectrum light, delivered via the Lumenis M22 platform to the skin around the eyelids.',
    detail: 'The light is absorbed by the abnormal blood vessels driving inflammation, closing them and reducing the inflammatory mediators that attack your glands. It also warms and stimulates the meibomian glands, restoring their ability to secrete a healthy lipid layer.',
    points: ['Lumenis M22 platform', 'Reduces eyelid inflammation', 'Re-activates gland function', '4 sessions, ~1 week apart'],
  },
  {
    icon: Droplets,
    name: 'Meibomian Gland Expression',
    tag: 'Paired with IPL',
    what: 'Gentle, targeted pressure applied to the eyelids to clear blocked glands and release trapped meibum.',
    detail: 'Performed immediately after each IPL session, while the glands are warmed and most responsive. This dual approach — light, then expression — is what restores the oil layer that stops your tears evaporating.',
    points: ['Clears gland blockages', 'Restores the lipid layer', 'Performed in-house by Gina', 'Paired with every IPL session'],
  },
  {
    icon: Layers,
    name: 'Thermal Pulsation (LipiFlow)',
    tag: 'Where indicated',
    what: 'A single in-office device applying sustained, controlled heat to the inner lids with simultaneous gentle expression.',
    detail: 'Where glands are severely obstructed and IPL with manual expression is not enough, LipiFlow delivers a 12-minute targeted treatment to unblock and restore gland function in a single session.',
    points: ['Single 12-minute session', 'Sustained heat & expression', 'Recommended on assessment', 'For advanced obstruction'],
  },
  {
    icon: Activity,
    name: 'Personalised At-Home Care',
    tag: 'Ongoing',
    what: 'A tailored regimen of eyelid hygiene, warm compresses, preservative-free lubricants and omega-3 supplementation.',
    detail: 'Prescribed from your diagnostic profile and adjusted as your glands recover. This is what protects your in-office results between sessions and maintains your tear film long after the program ends.',
    points: ['Built from your diagnostic data', 'Adjusted at every review', 'Protects in-office results', 'Long-term maintenance'],
  },
];

export default function Treatments() {
  return (
    <section id="treatments" className="bg-background py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-xs tracking-luxe uppercase text-accent mb-5">The Treatments</p>
            <h2 className="font-display text-5xl sm:text-6xl text-primary leading-[1.02] text-balance">
              Restoring the gland, not just the symptom
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-sm">
            Every plan begins with a diagnostic consultation — and every treatment is tracked against your results as you progress.
          </p>
        </div>

        {/* Diagnostic consultation — the essential first step */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-px bg-secondary/50 border border-border rounded-sm p-8 sm:p-12"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <ClipboardList className="w-5 h-5 text-accent" strokeWidth={1.5} />
                <span className="text-xs tracking-luxe-sm uppercase text-accent">The essential first step</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-primary leading-tight mb-4">
                A diagnostic consultation before any treatment
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                No two dry eyes are the same. Before any treatment, Gina runs a comprehensive suite of tests to map the root cause and grade severity. These same measures are repeated at every review to track your glands’ recovery — so your plan is always guided by your results, never guesswork.
              </p>
            </div>
            <div className="lg:col-span-7">
              <p className="text-xs tracking-luxe-sm uppercase text-muted-foreground mb-4">Your diagnostic workup</p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {DIAGNOSTIC_TESTS.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-foreground/80 border-t border-border pt-3">
                    <ScanEye className="w-4 h-4 text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Treatment modalities */}
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {TREATMENTS.map((t, i) => (
            <TreatmentCard key={t.name} treatment={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}