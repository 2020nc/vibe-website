'use client';

/**
 * 🏠 HOME PAGE - VERSIUNEA STARTER PENTRU CURSANȚI
 *
 * Aceasta este versiunea SIMPLĂ de la care plecăm.
 *
 * 💡 FEATURE FLAG pentru testare:
 *    Adaugă ?preview=true în URL ca să vezi meniul de sărbători
 *    indiferent de dată: http://localhost:3000?preview=true
 */

import { useSearchParams } from 'next/navigation';
import HeroStarter from '@/components/HeroStarter';
import FeaturesStarter from '@/components/FeaturesStarter';
import MenuStarter from '@/components/MenuStarter';
import HolidayMenu, { getTodayHoliday } from '@/components/HolidayMenu';
import FooterStarter from '@/components/FooterStarter';
import Preloader from '@/components/Preloader';

export default function Home() {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';

  // Verifică dacă azi e sărbătoare
  const todayHoliday = getTodayHoliday();

  // Afișează meniul de sărbători dacă e sărbătoare SAU dacă e preview
  const showHoliday = !!todayHoliday || isPreview;

  // Label-ul afișat: sărbătoarea reală sau un label demo pentru preview
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
