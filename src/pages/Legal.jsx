import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, HeartPulse, Mail, FileText, Phone } from 'lucide-react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/sections/SiteFooter';
import BookingModal from '@/components/BookingModal';
import { BookingProvider } from '@/components/BookingContext';
import { ThemeProvider } from '@/components/ThemeContext';
import { StyleProvider } from '@/components/StyleContext';
import { BackgroundProvider } from '@/components/BackgroundContext';

const SECTIONS = [
  { id: 'about', label: 'About this information' },
  { id: 'health', label: 'General health disclaimer' },
  { id: 'advertising', label: 'Health service advertising (AHPRA)' },
  { id: 'tga', label: 'Therapeutic goods information' },
  { id: 'consumer', label: 'Australian Consumer Law' },
  { id: 'spam', label: 'Electronic messages (Spam Act)' },
  { id: 'donotcall', label: 'Do Not Call Register' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'copyright', label: 'Copyright & intellectual property' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'links', label: 'External links' },
  { id: 'liability', label: 'Limitation of liability' },
  { id: 'governing', label: 'Governing law' },
  { id: 'contact', label: 'Contact & complaints' },
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 py-8 border-t border-border first:border-t-0">
      <h2 className="font-display text-3xl text-primary mb-4">{title}</h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

export default function Legal() {
  return (
    <ThemeProvider>
      <StyleProvider>
        <BackgroundProvider>
        <BookingProvider>
          <div id="top" className="min-h-screen bg-background text-foreground">
            <SiteNav />

            <header className="bg-primary text-primary-foreground pt-32 pb-20">
              <div className="max-w-5xl mx-auto px-6 sm:px-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Scale className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    <p className="text-xs tracking-luxe uppercase text-accent">Legal &amp; compliance</p>
                  </div>
                  <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] text-balance">
                    Terms of Use &amp; Legal Information
                  </h1>
                  <p className="mt-6 text-primary-foreground/70 text-lg leading-relaxed max-w-2xl">
                    The legal terms that apply to this website and to Mosman Dry Eye, and the
                    Australian laws and regulations we comply with — including health-service
                    advertising, consumer protection, electronic communications and accessibility.
                  </p>
                  <p className="mt-6 text-xs tracking-luxe-sm uppercase text-primary-foreground/50">
                    Effective 15 October 2026 · Version 1.0
                  </p>
                </motion.div>
              </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16">
              <div className="mb-14 p-8 bg-secondary/40 border border-border rounded-sm">
                <p className="text-xs tracking-luxe-sm uppercase text-accent mb-5">Contents</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                  {SECTIONS.map((s, i) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors py-1"
                    >
                      <span className="text-accent/60 mr-2">{String(i + 1).padStart(2, '0')}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              <Section id="about" title="1. About this information">
                <p>
                  This page sets out the terms on which you may use this website and explains the
                  Australian laws and regulations that govern the way Mosman Dry Eye operates and
                  advertises. By accessing or using this website, you accept these terms.
                </p>
                <p>
                  This information is provided for general purposes and does not constitute legal
                  advice. Where a specific legal or clinical question arises, we recommend obtaining
                  advice from a qualified professional.
                </p>
              </Section>

              <Section id="health" title="2. General health disclaimer">
                <p>
                  The information published on this website — including descriptions of dry eye,
                  diagnostic procedures and treatments such as intense pulsed light (IPL) and
                  meibomian gland expression — is general in nature and is provided for educational
                  purposes only.
                </p>
                <p>
                  It is not a substitute for, and must not be relied upon as, professional health
                  advice, a diagnosis, or a treatment plan. Dry eye is a complex condition with many
                  causes, and outcomes vary between individuals. Your treatment, if any, can only be
                  determined following a personal consultation and assessment.
                </p>
                <p>
                  Always seek the advice of a qualified health professional with any questions about a
                  medical condition. Never disregard or delay seeking professional advice because of
                  something you have read on this website.
                </p>
              </Section>

              <Section id="advertising" title="3. Health service advertising (AHPRA & the National Law)">
                <p>
                  Mosman Dry Eye provides a regulated health service. Our advertising complies with
                  section 133 of the <em>Health Practitioner Regulation National Law</em> and the
                  advertising guidelines published by Ahpra and the Optometry Board of Australia.
                </p>
                <p>In particular, we do not advertise our service in a way that:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>is false, misleading or deceptive, or likely to be;</li>
                  <li>uses testimonials or purported testimonials about our service;</li>
                  <li>creates an unreasonable expectation of beneficial treatment;</li>
                  <li>directly or indirectly encourages the indiscriminate or unnecessary use of our service; or</li>
                  <li>offers a gift, discount or other inducement without stating the terms and conditions of the offer.</li>
                </ul>
                <p>
                  We do not publish patient reviews, ratings or success stories on this website, as
                  the use of testimonials in advertising a regulated health service is prohibited. Any
                  information that appears to describe outcomes is general and educational, not a
                  guarantee of result.
                </p>
              </Section>

              <Section id="tga" title="4. Therapeutic goods information">
                <p>
                  Where this website refers to specific devices or products used in your care (for
                  example, IPL platforms or diagnostic instruments), the reference is to identify the
                  equipment used in our clinical practice and is not consumer advertising of a
                  therapeutic good for sale. We do not sell therapeutic goods through this website.
                </p>
                <p>
                  Any therapeutic goods or medical devices used in the practice are appropriately
                  included on the Australian Register of Therapeutic Goods (ARTG) where required, or
                  used in accordance with the applicable exemptions, and are used by or under the
                  direction of a registered health practitioner. We do not make therapeutic claims
                  about products that are not supported by the product&rsquo;s intended purpose.
                </p>
              </Section>

              <Section id="consumer" title="5. Australian Consumer Law">
                <p>
                  We conduct our practice in accordance with the <em>Competition and Consumer Act
                  2010</em> (Cth) and the Australian Consumer Law (ACL), including the prohibition on
                  misleading or deceptive conduct and false or misleading representations.
                </p>
                <p>
                  We take reasonable steps to ensure that information published on this website is
                  accurate, current and capable of substantiation. If you become aware of any
                  information on this site that you believe is inaccurate or out of date, please
                  contact us so we can review it.
                </p>
              </Section>

              <Section id="spam" title="6. Electronic messages (Spam Act 2003)">
                <p>
                  Where we send commercial electronic messages (such as email or SMS), we comply with
                  the <em>Spam Act 2003</em> (Cth). This means we only send such messages with your
                  consent, every message clearly identifies Mosman Dry Eye as the sender and provides
                  accurate contact details, and every message includes a functional, free
                  unsubscribe facility that we honour within five business days.
                </p>
                <p>
                  Appointment reminders and messages that relate to an existing booking or your
                  clinical care are not &ldquo;commercial electronic messages&rdquo; and are sent to
                  facilitate your care. You may ask us at any time to change how we contact you.
                </p>
              </Section>

              <Section id="donotcall" title="7. Do Not Call Register">
                <p>
                  We respect the <em>Do Not Call Register Act 2006</em> (Cth). We do not make
                  telemarketing calls to numbers listed on the Do Not Call Register, and we only
                  contact you by telephone where it relates to your existing care or where you have
                  consented.
                </p>
              </Section>

              <Section id="privacy" title="8. Privacy">
                <p>
                  Our handling of personal and health information is governed by our Privacy Policy,
                  which complies with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy
                  Principles, the <em>Health Records and Information Privacy Act 2002</em> (NSW), and
                  the Notifiable Data Breaches scheme.
                </p>
                <Link to="/privacy" className="inline-flex items-center gap-2 text-accent hover:underline">
                  <FileText className="w-4 h-4" /> Read our Privacy Policy
                </Link>
              </Section>

              <Section id="copyright" title="9. Copyright & intellectual property">
                <p>
                  Unless otherwise indicated, all content on this website — including text, graphics,
                  logos, images and design — is owned by or licensed to Mosman Dry Eye and is
                  protected by the <em>Copyright Act 1968</em> (Cth) and other intellectual property
                  laws.
                </p>
                <p>
                  You may view and print material from this website for your personal, non-commercial
                  use. You must not copy, reproduce, republish, distribute or otherwise exploit any
                  content without our prior written permission, except as permitted by law.
                </p>
              </Section>

              <Section id="accessibility" title="10. Accessibility">
                <p>
                  We are committed to making this website as accessible as possible, in the spirit of
                  the <em>Disability Discrimination Act 1992</em> (Cth) and the Web Content
                  Accessibility Guidelines (WCAG) 2.1 at level AA. We aim for clear text, sufficient
                  colour contrast, keyboard navigability and compatibility with assistive
                  technologies.
                </p>
                <p>
                  If you experience difficulty accessing any part of this site, please contact us —
                  we welcome feedback and will make reasonable efforts to provide information in an
                  accessible alternative format on request.
                </p>
              </Section>

              <Section id="links" title="11. External links">
                <p>
                  This website may contain links to external sites for reference or convenience. We
                  do not control and are not responsible for the content, privacy practices or
                  accuracy of those sites, and linking to them does not imply endorsement. You access
                  external sites at your own risk.
                </p>
              </Section>

              <Section id="liability" title="12. Limitation of liability">
                <p>
                  To the extent permitted by law, Mosman Dry Eye and its practitioners exclude all
                  liability for any loss or damage arising from your use of, or reliance on,
                  information on this website, except where liability cannot be excluded (such as
                  liability for negligence causing personal injury, or for a guarantee under the
                  Australian Consumer Law that cannot be excluded).
                </p>
              </Section>

              <Section id="governing" title="13. Governing law">
                <p>
                  These terms are governed by the laws of New South Wales, Australia. Any dispute
                  arising in connection with this website is subject to the exclusive jurisdiction of
                  the courts of New South Wales.
                </p>
              </Section>

              <Section id="contact" title="14. Contact & complaints">
                <p>
                  For any question about these terms, or to make a complaint, please contact us:
                </p>
                <div className="p-6 bg-secondary/40 border border-border rounded-sm space-y-2">
                  <p className="font-medium text-foreground">Mosman Dry Eye</p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /> Via the booking form or clinic reception</p>
                  <p className="flex items-center gap-2"><HeartPulse className="w-4 h-4 text-accent" /> 86 Prince Albert Street, Mosman NSW 2088</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /> (02) 9968 1247</p>
                </div>
                <p>
                  Health-service advertising complaints may also be directed to Ahpra. Consumer
                  complaints may be directed to NSW Fair Trading or the Australian Competition and
                  Consumer Commission (ACCC).
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-accent hover:underline"
                >
                  <Scale className="w-4 h-4" /> Return to the home page
                </Link>
              </Section>
            </div>

            <SiteFooter />
            <BookingModal />
          </div>
        </BookingProvider>
        </BackgroundProvider>
      </StyleProvider>
    </ThemeProvider>
  );
}