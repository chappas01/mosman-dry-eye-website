import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Microscope, HeartHandshake } from 'lucide-react';
import { useBooking } from '@/components/BookingContext';

const INCLUDED = [
  {
    icon: Microscope,
    title: 'Comprehensive diagnostics',
    body: 'Tear film analysis, meibography and osmolarity testing to image your glands and pinpoint the cause.',
  },
  {
    icon: HeartHandshake,
    title: 'A personalised plan',
    body: 'Gina maps your dry eye against the TFOS DEWS II framework and discusses a tailored plan with you in full.',
  },
  {
    icon: CalendarDays,
    title: 'No obligation',
    body: 'Your consultation is the first step. Nothing begins without your understanding and consent.',
  },
];

export default function Investment() {
  const { openBooking } = useBooking();

  return (
    <section id="investment" className="relative bg-primary text-primary-foreground py-24 sm:py-32 overflow-hidden">
      {/* ambient accent glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-2xl mb-16">
          <p className="text-xs tracking-luxe uppercase text-accent mb-5">Begin Your Restoration</p>
          <h2 className="font-display text-5xl sm:text-6xl leading-[1.02] text-balance">
            Every patient begins with a consultation
          </h2>
          <p className="mt-6 text-primary-foreground/70 leading-relaxed text-lg">
            Your first visit is a thorough, unhurried diagnostic assessment with Gina — a clear picture of what's causing your dry eye, and a plan tailored to you. No two treatment plans are identical, and nothing begins without your understanding.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* What the consultation includes */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-primary-foreground/5 border border-primary-foreground/15 rounded-sm p-10"
          >
            <p className="text-xs tracking-luxe-sm uppercase text-accent mb-8">Your consultation includes</p>
            <div className="grid sm:grid-cols-3 gap-8">
              {INCLUDED.map((item) => (
                <div key={item.title}>
                  <item.icon className="w-5 h-5 text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="font-display text-xl mb-2">{item.title}</h3>
                  <p className="text-sm text-primary-foreground/60 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA + returning patient note */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between gap-8"
          >
            <div className="bg-accent text-accent-foreground rounded-sm p-10">
              <p className="text-xs tracking-luxe-sm uppercase mb-4 opacity-70">Ready to begin?</p>
              <p className="font-display text-3xl leading-tight">Book your consultation with Gina.</p>
              <button
                onClick={openBooking}
                className="group mt-8 inline-flex items-center justify-center gap-3 w-full py-4 bg-accent-foreground text-primary-foreground text-xs tracking-luxe uppercase hover:opacity-90 transition-opacity rounded-sm"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Already a patient? Use the booking form and select <span className="text-accent">"Returning patient"</span> to request a follow-up time directly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}