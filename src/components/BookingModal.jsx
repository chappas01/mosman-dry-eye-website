import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, CalendarDays, Clock, User, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useBooking } from '@/components/BookingContext';
import { submitBooking } from '@/api/client';

const TIME_SLOTS = (() => {
  const slots = [];
  for (let h = 9; h <= 17; h++) {
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const suffix = h < 12 ? 'AM' : 'PM';
    slots.push(`${hour12}:00 ${suffix}`);
    if (h !== 17) slots.push(`${hour12}:30 ${suffix}`);
  }
  return slots;
})();

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [step, setStep] = useState('form'); // form | submitting | done
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    patient_type: 'new',
    preferred_date: '', preferred_time: '', symptoms: '',
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStep('submitting');
    try {
      await submitBooking(form);
      setStep('done');
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again or call us.');
      setStep('form');
    }
  };

  const handleClose = () => {
    closeBooking();
    setTimeout(() => {
      setStep('form');
      setForm({ name: '', email: '', phone: '', patient_type: 'new', preferred_date: '', preferred_time: '', symptoms: '' });
      setError('');
    }, 300);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={handleClose} aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-card rounded-sm shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Book a consultation"
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close booking"
            >
              <X className="w-5 h-5" />
            </button>

            {step === 'done' ? (
              <div className="px-8 sm:px-12 py-16 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-accent" strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-4xl text-primary mb-3">Request received</h2>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Thank you, {form.name.split(' ')[0]}. Gina will personally review your request and our concierge will be in touch within one business day to confirm your appointment.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-8 inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground text-sm tracking-luxe-sm uppercase hover:bg-primary/90 transition-colors rounded-sm"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="px-8 sm:px-12 py-10">
                <div className="mb-8">
                  <p className="text-xs tracking-luxe uppercase text-accent mb-3">Begin Your Restoration</p>
                  <h2 className="font-display text-4xl sm:text-5xl text-primary leading-tight">Request a Consultation</h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-lg">
                    Share your availability and a brief note on your symptoms. Gina will review every request personally.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs tracking-luxe-sm uppercase text-muted-foreground mb-2">
                      Are you a new or returning patient?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'new', label: 'New patient' },
                        { value: 'returning', label: 'Returning patient' },
                      ].map((opt) => (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => setForm((f) => ({ ...f, patient_type: opt.value }))}
                          className={`px-4 py-3 text-sm rounded-sm border transition-colors text-left ${
                            form.patient_type === opt.value
                              ? 'border-accent bg-accent/10 text-primary'
                              : 'border-border text-muted-foreground hover:border-accent/50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full name" icon={User} required>
                      <input type="text" required value={form.name} onChange={update('name')} className="booking-input" placeholder="Jane Doe" />
                    </Field>
                    <Field label="Email" icon={Mail} required>
                      <input type="email" required value={form.email} onChange={update('email')} className="booking-input" placeholder="jane@email.com" />
                    </Field>
                  </div>

                  <Field label="Phone" icon={Phone}>
                    <input type="tel" value={form.phone} onChange={update('phone')} className="booking-input" placeholder="04XX XXX XXX" />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Preferred date" icon={CalendarDays}>
                      <input type="date" min={today} value={form.preferred_date} onChange={update('preferred_date')} className="booking-input" />
                    </Field>
                    <Field label="Preferred time" icon={Clock}>
                      <select value={form.preferred_time} onChange={update('preferred_time')} className="booking-input">
                        <option value="">Select a time</option>
                        {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed -mt-1">
                    Initial consultations run for 90 minutes to allow time for comprehensive imaging and assessment.
                  </p>

                  <div>
                    <label className="block text-xs tracking-luxe-sm uppercase text-muted-foreground mb-2">
                      {form.patient_type === 'returning' ? 'Reason for your visit' : 'Briefly describe your symptoms'}
                    </label>
                    <textarea
                      value={form.symptoms}
                      onChange={update('symptoms')}
                      rows={3}
                      className="booking-input resize-none"
                      placeholder={form.patient_type === 'returning' ? 'e.g. follow-up review, or anything you’d like Gina to know…' : 'e.g. gritty, burning sensation, worse in the evenings…'}
                    />
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <div className="flex items-start gap-2 pt-1">
                    <ShieldCheck className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your details are held in strict confidence and used only to arrange your consultation.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={step === 'submitting'}
                    className="w-full py-4 bg-primary text-primary-foreground text-sm tracking-luxe uppercase hover:bg-accent hover:text-accent-foreground transition-colors rounded-sm disabled:opacity-60"
                  >
                    {step === 'submitting' ? 'Sending…' : 'Request Consultation'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, icon: Icon, required, children }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs tracking-luxe-sm uppercase text-muted-foreground mb-2">
        <Icon className="w-3.5 h-3.5" />
        {label}{required && <span className="text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}