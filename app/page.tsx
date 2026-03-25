'use client';

/**
 * 🏠 HOME PAGE - VERSIUNEA STARTER PENTRU CURSANȚI
 *
 * 💡 FEATURE FLAG pentru testare:
 *    Adaugă ?preview=true în URL ca să vezi meniul de sărbători
 *    indiferent de dată: http://localhost:3000?preview=true
 */

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import HeroStarter from '@/components/HeroStarter';
import FeaturesStarter from '@/components/FeaturesStarter';
import MenuStarter from '@/components/MenuStarter';
import HolidayMenu, { getTodayHoliday } from '@/components/HolidayMenu';
import FooterStarter from '@/components/FooterStarter';
import Preloader from '@/components/Preloader';

function PageContent() {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';

  const todayHoliday = getTodayHoliday();
  const showHoliday = !!todayHoliday || isPreview;
  const holidayLabel = todayHoliday ?? 'Demo Sărbătoare 🎉';

  return (
    <>
      <Preloader />
      <HeroStarter showHoliday={showHoliday} />
      <FeaturesStarter />
      {showHoliday && <HolidayMenu holidayLabel={holidayLabel} />}
      <MenuStarter />
      <FooterStarter />
    </>
  );
}

export default function Home() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}
