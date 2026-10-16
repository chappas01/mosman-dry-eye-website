import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useBooking } from '@/components/BookingContext';
import { useBackground } from '@/components/BackgroundContext';

export default function SiteFooter() {
  const { openBooking } = useBooking();
  const { backdropUrl } = useBackground();
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-primary-foreground pt-20 pb-10 overflow-hidden">
      <img
        src={backdropUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-primary/90" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-12 pb-16 border-b border-primary-foreground/15">
          {/* Signature sign-off */}
          <div>
            <p className="text-xs tracking-luxe uppercase text-accent mb-5">A note from Gina</p>
            <p className="font-display text-3xl sm:text-4xl leading-snug text-balance max-w-md">
              "Dry eye is real, it is treatable, and you shouldn't have to just live with it. I'd be honoured to help you find lasting relief."
            </p>
            <p className="mt-6 font-display text-2xl italic text-accent">Gina Chapman-Davies</p>
          </div>

          {/* Contact */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="text-xs tracking-luxe-sm uppercase text-primary-foreground/50 mb-4">The Clinic</p>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-4 h-4 text-accent mt-1 shrink-0" />
                <p className="text-primary-foreground/80 leading-relaxed">
                  86 Prince Albert Street<br />Mosman, NSW 2088<br />Australia
                </p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+61299681247" className="text-primary-foreground/80 hover:text-accent transition-colors">(02) 9968 1247</a>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <p className="text-primary-foreground/80">Contact via booking</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent mt-1 shrink-0" />
                <p className="text-primary-foreground/80 leading-relaxed">
                  Mon – Fri · By appointment<br />Sessions 9:00 AM – 5:00 PM
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs tracking-luxe-sm uppercase text-primary-foreground/50 mb-1">Begin</p>
              <button
                onClick={openBooking}
                className="px-6 py-4 bg-accent text-accent-foreground text-xs tracking-luxe uppercase hover:opacity-90 transition-opacity rounded-sm text-left"
              >
                Book a Consultation
              </button>
              <a
                href="#top"
                className="px-6 py-4 border border-primary-foreground/20 text-xs tracking-luxe uppercase text-primary-foreground/80 hover:border-accent hover:text-accent transition-colors rounded-sm text-center"
              >
                Back to Top
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
          <p>© {year} Mosman Dry Eye. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="tracking-luxe-sm uppercase hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/legal" className="tracking-luxe-sm uppercase hover:text-accent transition-colors">Terms &amp; Legal</Link>
            <p className="tracking-luxe-sm uppercase">Mosman · NSW · Australia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}