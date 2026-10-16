import React from 'react';
import SiteNav from '@/components/SiteNav';
import BookingModal from '@/components/BookingModal';
import { BookingProvider } from '@/components/BookingContext';
import { ThemeProvider } from '@/components/ThemeContext';
import { StyleProvider } from '@/components/StyleContext';
import { BackgroundProvider } from '@/components/BackgroundContext';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Hero from '@/components/sections/Hero';
import WhatIsDryEye from '@/components/sections/WhatIsDryEye';
import WhatToExpect from '@/components/sections/WhatToExpect';
import Treatments from '@/components/sections/Treatments';
import Investment from '@/components/sections/Investment';
import About from '@/components/sections/About';
import SiteFooter from '@/components/sections/SiteFooter';

export default function Home() {
  return (
    <ThemeProvider>
      <StyleProvider>
        <BackgroundProvider>
        <BookingProvider>
        <div className="min-h-screen bg-background">
          <SiteNav />
          <main>
            <Hero />
            <WhatIsDryEye />
            <WhatToExpect />
            <Treatments />
            <Investment />
            <About />
          </main>
          <SiteFooter />
          <BookingModal />
          <ThemeSwitcher />
        </div>
      </BookingProvider>
      </BackgroundProvider>
      </StyleProvider>
      </ThemeProvider>
  );
}