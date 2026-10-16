import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Lock, Eye, Mail } from 'lucide-react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/sections/SiteFooter';
import BookingModal from '@/components/BookingModal';
import { BookingProvider } from '@/components/BookingContext';
import { ThemeProvider } from '@/components/ThemeContext';
import { StyleProvider } from '@/components/StyleContext';
import { BackgroundProvider } from '@/components/BackgroundContext';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'who', label: 'Who we are' },
  { id: 'laws', label: 'The laws we follow' },
  { id: 'collect', label: 'Information we collect' },
  { id: 'how', label: 'How we collect it' },
  { id: 'why', label: 'Why we collect & use it' },
  { id: 'notify', label: 'Notification at collection' },
  { id: 'use', label: 'Use & disclosure' },
  { id: 'marketing', label: 'Direct marketing' },
  { id: 'overseas', label: 'Overseas disclosure' },
  { id: 'identifiers', label: 'Government identifiers' },
  { id: 'quality', label: 'Data quality' },
  { id: 'security', label: 'Security & storage' },
  { id: 'payments', label: 'Payments & card data' },
  { id: 'retention', label: 'Retention & disposal' },
  { id: 'access', label: 'Access & correction' },
  { id: 'anonymity', label: 'Anonymity' },
  { id: 'breach', label: 'Data breach response' },
  { id: 'children', label: 'Children & young people' },
  { id: 'third-parties', label: 'Third parties & service providers' },
  { id: 'cookies', label: 'Cookies & website analytics' },
  { id: 'complaints', label: 'Complaints' },
  { id: 'contact', label: 'Contacting us' },
  { id: 'changes', label: 'Changes to this policy' },
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 py-8 border-t border-border first:border-t-0">
      <h2 className="font-display text-3xl text-primary mb-4">{title}</h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <ThemeProvider>
      <StyleProvider>
        <BackgroundProvider>
        <BookingProvider>
          <div id="top" className="min-h-screen bg-background text-foreground">
            <SiteNav />

            {/* Header */}
            <header className="bg-primary text-primary-foreground pt-32 pb-20">
              <div className="max-w-5xl mx-auto px-6 sm:px-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    <p className="text-xs tracking-luxe uppercase text-accent">Your privacy</p>
                  </div>
                  <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] text-balance">
                    Privacy Policy
                  </h1>
                  <p className="mt-6 text-primary-foreground/70 text-lg leading-relaxed max-w-2xl">
                    How Mosman Dry Eye collects, uses, stores and protects your personal and health
                    information — in accordance with Australian privacy law and optometry practice standards.
                  </p>
                  <p className="mt-6 text-xs tracking-luxe-sm uppercase text-primary-foreground/50">
                    Effective 15 October 2026 · Version 1.0
                  </p>
                </motion.div>
              </div>
            </header>

            {/* Body */}
            <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16">
              {/* Table of contents */}
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

              <Section id="overview" title="1. Overview">
                <p>
                  Mosman Dry Eye (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;the practice&rdquo;) is a
                  specialist dry eye clinic based in Mosman, New South Wales, providing optometric
                  assessment and treatment. We respect your privacy and are committed to protecting
                  the personal and health information you share with us.
                </p>
                <p>
                  This Privacy Policy explains, in plain language, what information we collect, why we
                  collect it, how we use and safeguard it, and the rights you have over your own
                  information. It applies to information collected through this website, through our
                  online booking form, and during your consultations with us.
                </p>
                <p>
                  This policy is designed to meet our obligations under the <em>Privacy Act 1988</em>{' '}
                  (Cth) and the Australian Privacy Principles (APPs), the <em>Health Records and
                  Information Privacy Act 2002</em> (NSW) and its 15 Health Privacy Principles (HPPs),
                  and the professional standards set by the Optometry Board of Australia.
                </p>
              </Section>

              <Section id="who" title="2. Who we are">
                <p>
                  Mosman Dry Eye is the trading name of the optometric practice operated by Gina
                  Chapman-Davies, an optometrist registered with the Optometry Board of Australia
                  under the <em>Health Practitioner Regulation National Law</em>.
                </p>
                <p>
                  We are the &ldquo;APP entity&rdquo; and &ldquo;health service provider&rdquo;
                  responsible for the personal and health information described in this policy. For
                  contact details, see <a href="#contact" className="text-accent hover:underline">section 24</a>.
                </p>
              </Section>

              <Section id="laws" title="3. The laws we follow">
                <p>We handle your information in accordance with:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>The <em>Privacy Act 1988</em> (Cth), including the 13 Australian Privacy Principles (APPs);</li>
                  <li>The <em>Health Records and Information Privacy Act 2002</em> (NSW) and its 15 Health Privacy Principles (HPPs);</li>
                  <li>The Notifiable Data Breaches (NDB) scheme under the <em>Privacy Act 1988</em>;</li>
                  <li>The <em>My Health Records Act 2012</em> (Cth), where the My Health Record system is used;</li>
                  <li>The Code of Conduct for Optometrists and professional guidelines published by the Optometry Board of Australia and Optometry Australia.</li>
                </ul>
                <p>
                  Where Commonwealth and NSW laws both apply, we comply with the more stringent
                  obligation. Health information is treated as &ldquo;sensitive information&rdquo; under
                  the APPs and as &ldquo;health information&rdquo; under the HRIP Act, which means it is
                  held to a higher standard of protection.
                </p>
              </Section>

              <Section id="collect" title="4. Information we collect">
                <p>We collect two broad kinds of information:</p>
                <p className="font-medium text-foreground">Personal information</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Your full name, date of birth, address and contact details (phone, email);</li>
                  <li>Your patient type (new or returning) and preferred appointment details;</li>
                  <li>Medicare number and any private health fund details, where relevant to billing;</li>
                  <li>Correspondence you send us, including notes provided in the booking form.</li>
                </ul>
                <p className="font-medium text-foreground">Health (sensitive) information</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Your eye and general health history, medications and relevant medical conditions;</li>
                  <li>Symptoms you describe and the reason for your visit;</li>
                  <li>Clinical findings and diagnostic imaging — including tear film analysis, meibography, ocular imaging and osmolarity results;</li>
                  <li>Treatment provided (such as Lumenis IPL and meibomian gland expression), treatment plans and follow-up notes;</li>
                  <li>Records of consent to assessment and treatment.</li>
                </ul>
                <p>
                  We only collect health information that is necessary for providing your eye care. We
                  do not collect more information than is reasonably required for that purpose.
                </p>
              </Section>

              <Section id="how" title="5. How we collect it">
                <p>We collect information directly from you, including:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Details you enter in our online booking form on this website;</li>
                  <li>Information you provide during consultations, in person or by phone or email;</li>
                  <li>Diagnostic and imaging data generated during your assessment; and</li>
                  <li>Information you authorise us to obtain, such as records transferred from a referring practitioner.</li>
                </ul>
                <p>
                  We generally collect information directly from you. We will only collect health
                  information from a third party where it is unreasonable or impracticable to collect it
                  from you directly, or where you have consented. If we receive information about you
                  that you did not provide, we will take reasonable steps to let you know.
                </p>
              </Section>

              <Section id="why" title="6. Why we collect & use it">
                <p>We collect and use your information for the primary purpose of providing your eye care, including to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Assess, diagnose and treat your dry eye and related conditions;</li>
                  <li>Plan and deliver your treatment, including IPL and gland expression protocols;</li>
                  <li>Communicate with you about appointments, results and follow-up care;</li>
                  <li>Manage billing, accounts and Medicare or health fund claims;</li>
                  <li>Maintain accurate clinical records as required by our profession; and</li>
                  <li>Meet our legal, regulatory and professional obligations.</li>
                </ul>
                <p>
                  We may also use your information for directly related secondary purposes — such as
                  appointment reminders, practice administration and clinical quality assurance —
                  where you would reasonably expect us to do so. Any other use requires your consent,
                  or falls within a permitted exception under the APPs and HPPs.
                </p>
              </Section>

              <Section id="notify" title="7. Notification at collection">
                <p>
                  When we collect your information, we take reasonable steps to make clear that we are
                  collecting it, why, how we will use it, and who else may see it. This policy, together
                  with the information provided at the time of booking and consultation, fulfils that
                  notification. We will also tell you of any legal requirement to provide particular
                  information and the consequences if you choose not to.
                </p>
              </Section>

              <Section id="use" title="8. Use & disclosure">
                <p>
                  We use and disclose your personal and health information for the primary purpose for
                  which it was collected, and for directly related purposes you would reasonably expect.
                </p>
                <p>We may disclose your information to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Other health practitioners involved in your care, with your consent or where clinically appropriate;</li>
                  <li>Medicare and your private health fund, for the purposes of billing and claims;</li>
                  <li>Our practice management software and secure cloud service providers (see sections 13 and 21);</li>
                  <li>Anyone you have authorised in writing to receive your information.</li>
                </ul>
                <p>
                  We will not use or disclose your information for a secondary purpose without your
                  consent, unless an exception applies — for example, where disclosure is necessary to
                  lessen or prevent a serious threat to life, health or safety, or where required or
                  authorised by law (such as a subpoena or mandatory reporting obligation). In those
                  limited circumstances we disclose only what is necessary.
                </p>
              </Section>

              <Section id="marketing" title="9. Direct marketing">
                <p>
                  We may use your contact details to send you appointment reminders and clinically
                  relevant follow-up communications, which you would reasonably expect to receive. We
                  will not use your information for promotional direct marketing without your consent.
                </p>
                <p>
                  You can ask us not to send you marketing or non-essential communications at any time,
                  and we will action your request promptly. To opt out, contact us using the details in{' '}
                  <a href="#contact" className="text-accent hover:underline">section 24</a>.
                </p>
              </Section>

              <Section id="overseas" title="10. Overseas disclosure">
                <p>
                  Some of our service providers (such as cloud-hosted practice management software)
                  may store or process data outside Australia. Before disclosing your information
                  overseas, we take reasonable steps to ensure the recipient handles it in accordance
                  with the APPs, and we remain accountable for that information. Where we use overseas
                  providers, we will tell you the country or countries involved on request.
                </p>
              </Section>

              <Section id="identifiers" title="11. Government identifiers">
                <p>
                  We may collect your Medicare number and any healthcare identifiers where necessary
                  for billing and for providing or coordinating your health care. We do not adopt a
                  government identifier as our own identifier, and we only use or disclose government
                  identifiers where permitted by law.
                </p>
              </Section>

              <Section id="quality" title="12. Data quality">
                <p>
                  We take reasonable steps to ensure the personal and health information we collect,
                  use and disclose is accurate, up to date, complete and relevant for its purpose. We
                  rely on you to help us keep your details current — please let us know if your contact
                  or health information changes.
                </p>
              </Section>

              <Section id="security" title="13. Security & storage">
                <p>
                  We take reasonable steps to protect your information from misuse, interference, loss,
                  and unauthorised access, modification or disclosure. Our safeguards include:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Storing electronic records in access-controlled, password-protected systems;</li>
                  <li>Positioning screens and records so they cannot be viewed by others in the practice;</li>
                  <li>Limiting access to staff who need it to provide your care or run the practice;</li>
                  <li>Keeping paper records secure and disposing of them by secure destruction; and</li>
                  <li>Regularly reviewing our security practices against current threats.</li>
                </ul>
                <p>
                  All staff and contractors who handle your information are made aware of their privacy
                  and confidentiality obligations. Clinical records are never left where other patients
                  can see or overhear them.
                </p>
              </Section>

              <Section id="payments" title="14. Payments & card data">
                <p>
                  We do <strong>not</strong> collect, process or store credit or debit card details on
                  this website. Any payment for consultations or treatment is handled separately and
                  securely, away from the website. Where a third-party payment processor is used, that
                  processor is responsible for handling card data in accordance with the applicable
                  Payment Card Industry (PCI) standards — card details never pass through or remain on
                  our website or our own systems.
                </p>
              </Section>

              <Section id="retention" title="15. Retention & disposal">
                <p>
                  We retain your health records for the period required by law and by our professional
                  obligations — as a general guide, at least seven (7) years from the last entry for
                  adult patients, and until a patient first seen as a child turns twenty-five (25) (or
                  for seven years after the last entry, whichever is longer).
                </p>
                <p>
                  When information is no longer required, we destroy or permanently de-identify it
                  securely, and keep a record of the disposal as required. We do not keep information
                  longer than is necessary for the purposes for which it was collected.
                </p>
              </Section>

              <Section id="access" title="16. Access & correction">
                <p>
                  You have the right to access the personal and health information we hold about you,
                  and to ask us to correct it if it is inaccurate, out of date, incomplete, irrelevant or
                  misleading. We will provide access without excessive delay or expense, subject to the
                  limited exceptions in the APPs and HRIP Act (for example, where access would pose a
                  serious threat to life or health, or where giving access would be unlawful).
                </p>
                <p>
                  To request access to or correction of your records, contact us using the details in{' '}
                  <a href="#contact" className="text-accent hover:underline">section 24</a>. We may ask
                  you to verify your identity before releasing information.
                </p>
              </Section>

              <Section id="anonymity" title="17. Anonymity">
                <p>
                  Where it is lawful and practicable, you may choose to deal with us anonymously or
                  under a pseudonym — for example, when making a general enquiry. Please note that we
                  cannot provide a clinical assessment or treatment without identifying you and
                  maintaining a health record, as this is required for safe, accountable care.
                </p>
              </Section>

              <Section id="breach" title="18. Data breach response">
                <p>
                  We have procedures to respond to suspected data breaches. If we become aware that an
                  &ldquo;eligible data breach&rdquo; has occurred — that is, unauthorised access to or
                  disclosure of your information that is likely to result in serious harm — we will
                  take reasonable steps to contain the breach, assess it, and notify you and the Office
                  of the Australian Information Commissioner (OAIC) as required by the Notifiable Data
                  Breaches scheme.
                </p>
              </Section>

              <Section id="children" title="19. Children & young people">
                <p>
                  Where a patient is a child or young person, we handle their information in
                  accordance with the same privacy standards. A young person who is sufficiently mature
                  to make decisions about their own health care may exercise their own privacy and
                  access rights. Before that point, a parent or guardian generally has access to their
                  child&rsquo;s information, unless a court order states otherwise. We will verify
                  authority before releasing a child&rsquo;s information to any party.
                </p>
              </Section>

              <Section id="third-parties" title="20. Third parties & service providers">
                <p>
                  We use trusted service providers to help run the practice — for example, secure
                  cloud hosting and practice management software. These providers only receive the
                  information necessary to perform their function, are bound by confidentiality, and
                  are required to handle your information in line with Australian privacy law. We
                  remain responsible for your information when we use these providers.
                </p>
                <p>
                  We do not sell or rent your personal or health information to anyone.
                </p>
              </Section>

              <Section id="cookies" title="21. Cookies & website analytics">
                <p>
                  This website may use cookies and similar technologies for basic functionality and,
                  where enabled, to understand how the site is used so we can improve it. These
                  technologies do not collect your health information. You can control or disable
                  cookies through your browser settings; some site features may not function if
                  cookies are disabled.
                </p>
              </Section>

              <Section id="complaints" title="22. Complaints">
                <p>
                  If you believe we have mishandled your information, please contact us first — we
                  take privacy complaints seriously and will try to resolve your concern promptly. You
                  also have the right to complain to an external regulator:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Office of the Australian Information Commissioner (OAIC): 1300 363 992 · <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">oaic.gov.au</a></li>
                  <li>Information and Privacy Commission NSW (IPC): 1800 472 679 · <a href="https://www.ipc.nsw.gov.au" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">ipc.nsw.gov.au</a></li>
                </ul>
                <p>
                  We ask that you give us the opportunity to address your concern before escalating,
                  but you are entitled to contact a regulator at any time.
                </p>
              </Section>

              <Section id="contact" title="23. Contacting us">
                <p>
                  For any privacy question, access or correction request, or complaint, please contact
                  our Privacy Contact Officer:
                </p>
                <div className="p-6 bg-secondary/40 border border-border rounded-sm space-y-2">
                  <p className="font-medium text-foreground">Mosman Dry Eye — Privacy Contact Officer</p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /> Via the booking form or clinic reception</p>
                  <p className="flex items-center gap-2"><Eye className="w-4 h-4 text-accent" /> 86 Prince Albert Street, Mosman NSW 2088</p>
                  <p className="flex items-center gap-2"><FileText className="w-4 h-4 text-accent" /> (02) 9968 1247</p>
                </div>
                <p>
                  We will respond to written privacy requests within a reasonable time, generally
                  within 30 days.
                </p>
              </Section>

              <Section id="changes" title="24. Changes to this policy">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our
                  practices, the law, or the services we offer. The &ldquo;Effective&rdquo; date at the
                  top of this page indicates when the policy was last revised. We encourage you to
                  review this page periodically.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-accent hover:underline"
                >
                  <Lock className="w-4 h-4" /> Return to the home page
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