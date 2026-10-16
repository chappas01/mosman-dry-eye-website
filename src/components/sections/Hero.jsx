import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { useBooking } from '@/components/BookingContext';
import { Image } from '@/components/ui/image';

const GINA_HEADSHOT = '/images/gina-chapman-davies.jpg';

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="top" className="relative min-h-screen flex items-stretch bg-background pt-20">
      <div className="w-full grid lg:grid-cols-5">
        {/* Portrait */}
        <div className="lg:col-span-3 relative overflow-hidden bg-muted min-h-[42vh] lg:min-h-screen">
          <Image
            src={GINA_HEADSHOT}
            alt="Gina Chapman-Davies, dry eye specialist and UNSW lecturer"
            fittingType="fill"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background/30" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
            <p className="font-display text-2xl text-background drop-shadow-sm">Gina Chapman-Davies</p>
            <p className="text-[11px] tracking-luxe-sm uppercase text-background/80 mt-1">B.Optom · UNSW School of Optometry & Vision Science</p>
          </div>
        </div>

        {/* Headline */}
        <div className="lg:col-span-2 flex items-center px-6 sm:px-10 lg:px-14 py-16 lg:py-0">
          <div className="max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-luxe uppercase text-accent mb-6"
            >
              Advanced Dry Eye Therapy — Mosman
            </motion.p>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-[5.5rem] leading-[0.95] text-primary text-balance">
              <motion.span initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="block">Restore.</motion.span>
              <motion.span initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="block italic text-accent">Refresh.</motion.span>
              <motion.span initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="block">Resolve.</motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-base text-muted-foreground leading-relaxed"
            >
              Evidence-based IPL and meibomian gland expression, delivered in a private Mosman setting by a UNSW-trained dry eye specialist. Relief begins with understanding the cause.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={openBooking}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-luxe uppercase hover:bg-accent hover:text-accent-foreground transition-colors rounded-sm"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#condition"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-xs tracking-luxe uppercase text-foreground hover:border-accent hover:text-accent transition-colors rounded-sm"
              >
                Understand Dry Eye
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <MapPin className="w-4 h-4 text-accent" />
              86 Prince Albert Street, Mosman NSW 2088
            </motion.div>
          </div>
        </div>
      </div>

      {/* thin gauge rule */}
      <div className="hidden lg:block absolute top-1/2 right-0 w-px h-40 -translate-y-1/2 thin-rule" />
    </section>
  );
}