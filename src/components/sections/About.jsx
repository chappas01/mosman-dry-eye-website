import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Microscope, Award, Stethoscope } from 'lucide-react';
import { Image } from '@/components/ui/image';

const GINA_HEADSHOT = 'https://api.research.unsw.edu.au/sites/default/files/images/profile/2022-09-Regine%2BChapman-Davies2.jpg';

const CREDENTIALS = [
  { icon: GraduationCap, title: 'UNSW Lecturer', body: 'Lecturer in the School of Optometry & Vision Science since 2017, teaching and clinically supervising the next generation of optometrists.' },
  { icon: Stethoscope, title: 'Staff Practitioner', body: 'Practising clinician at the UNSW Dry Eye Clinic — a state-wide referral centre for evidence-based dry eye management.' },
  { icon: Microscope, title: 'TFOS DEWS II Framework', body: 'Protocols built on the international consensus for dry eye diagnosis and management — the global standard of care.' },
  { icon: Award, title: 'Masterclass Educator', body: 'Delivers advanced dry eye masterclasses to fellow eyecare professionals, advancing practice across the field.' },
];

export default function About() {
  return (
    <section id="about" className="bg-background py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <Image src={GINA_HEADSHOT} alt="Gina Chapman-Davies, dry eye specialist" fittingType="fill" className="w-full h-full" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground italic">
              Gina Chapman-Davies — bringing UNSW-grade dry eye care to a private Mosman practice.
            </p>
          </motion.div>

          {/* Copy */}
          <div className="lg:col-span-7">
            <p className="text-xs tracking-luxe uppercase text-accent mb-5">Your Practitioner</p>
            <h2 className="font-display text-5xl sm:text-6xl text-primary leading-[1.02] text-balance">
              Gina Chapman-Davies
            </h2>
            <p className="mt-3 text-lg text-accent font-medium">B.Optom · UNSW School of Optometry & Vision Science</p>

            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                Gina has dedicated her career to dry eye — as a clinician, a lecturer and a researcher. After years in private practice she returned to UNSW, where she now trains optometry students and treats complex dry eye cases at the university's specialist clinic.
              </p>
              <p>
                Her approach is thorough and deeply personal: every patient is assessed against the TFOS DEWS II framework, and every treatment plan is built around the individual — not a template. Now, she brings that same standard of care to a quiet home clinic in Mosman.
              </p>
            </div>

            <div className="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-8">
              {CREDENTIALS.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="border-t border-border pt-5"
                >
                  <c.icon className="w-5 h-5 text-accent mb-3" strokeWidth={1.5} />
                  <h3 className="font-display text-2xl text-primary mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}