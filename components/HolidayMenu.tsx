'use client';

/**
 * HOLIDAY MENU - Meniu special de sărbători naționale
 *
 * Produsele vin din Supabase (/api/menu).
 * Reducerea și eticheta vin din /api/holiday (holiday_config).
 * Apare doar în zilele de sărbătoare sau când ?preview=true în URL.
 */

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

/* ─── TYPES ─────────────────────────────────────────────────── */
interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string | null;
  available: boolean;
}

interface HolidayConfig {
  discount_type: 'percent' | 'value';
  discount_amount: number;
  label: string;
}

/* ─── HELPERS ────────────────────────────────────────────────── */
// Sărbătorile naționale — format MM-DD
const HOLIDAYS: { date: string; label: string }[] = [
  { date: '03-01', label: '1 Martie — Mărțișor' },
  { date: '03-08', label: '8 Martie — Ziua Femeii' },
  { date: '04-23', label: 'Ziua Sfântului Gheorghe' },
  { date: '05-01', label: '1 Mai — Ziua Muncii' },
  { date: '06-01', label: '1 Iunie — Ziua Copilului' },
  { date: '12-01', label: '1 Decembrie — Ziua Națională' },
  { date: '12-25', label: 'Crăciun' },
];

export function getTodayHoliday(): string | null {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return HOLIDAYS.find((h) => h.date === `${mm}-${dd}`)?.label ?? null;
}

function calcDiscounted(price: number, config: HolidayConfig): number {
  if (config.discount_type === 'percent') {
    return Math.round((price - (price * config.discount_amount) / 100) * 100) / 100;
  }
  return Math.round((price - config.discount_amount) * 100) / 100;
}

function discountBadge(config: HolidayConfig): string {
  return config.discount_type === 'percent'
    ? `-${config.discount_amount}%`
    : `-${config.discount_amount} RON`;
}

/* ─── CARD ───────────────────────────────────────────────────── */
function HolidayCard({
  item,
  index,
  tabKey,
  config,
}: {
  item: MenuItem;
  index: number;
  tabKey: string;
  config: HolidayConfig;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [tabKey]);

  const finalPrice = calcDiscounted(item.price, config);

  return (
    <div
      ref={cardRef}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Imagine */}
      <div className="relative overflow-hidden rounded-xl mx-3 mt-3" style={{ aspectRatio: '4/3' }}>
        {/* Badge OFERTĂ */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-0 group-hover:opacity-100 scale-150 transition-opacity duration-150" />
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-0 group-hover:opacity-75 delay-75 transition-opacity duration-150" />
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 group-hover:opacity-0 transition-opacity duration-150" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400 shadow-lg shadow-green-400/50" />
          </span>
          OFERTĂ
        </div>
        {/* Badge reducere */}
        <div className="absolute top-2 right-2 z-10 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          {discountBadge(config)}
        </div>
        <img
          src={item.image_url ?? ''}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      {/* Text + Prețuri */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.description}</p>

        <div className="flex items-center gap-3">
          <span
            className={inView ? 'price-strike text-gray-500 font-semibold text-base' : 'text-gray-500 font-semibold text-base'}
            style={{ '--strike-delay': `${index * 80 + 300}ms` } as React.CSSProperties}
          >
            {item.price} RON
          </span>
          <span
            className={inView ? 'price-new text-green-600 font-bold text-xl' : 'invisible text-green-600 font-bold text-xl'}
            style={{ '--pop-delay': `${index * 80 + 1500}ms` } as React.CSSProperties}
          >
            {finalPrice} RON
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function HolidayMenu({ holidayLabel }: { holidayLabel: string }) {
  const [items, setItems]       = useState<MenuItem[]>([]);
  const [config, setConfig]     = useState<HolidayConfig | null>(null);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [visible, setVisible]   = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/menu').then((r) => r.json()),
      fetch('/api/holiday').then((r) => r.json()),
    ]).then(([menuRes, holidayRes]) => {
      const available = (menuRes.data as MenuItem[]).filter((i) => i.available);
      setItems(available);
      if (available.length > 0) setActiveTab(available[0].category);
      setConfig(holidayRes.data as HolidayConfig);
    }).finally(() => setLoading(false));
  }, []);

  // Confetti la scroll
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startConfetti = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        confetti({ particleCount: 6, angle: 60,  spread: 55, origin: { x: 0, y: 0.5 }, colors: ['#f43f5e','#fb923c','#facc15','#4ade80','#60a5fa'], gravity: 0.8, drift:  0.5 });
        confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1, y: 0.5 }, colors: ['#f43f5e','#fb923c','#facc15','#4ade80','#60a5fa'], gravity: 0.8, drift: -0.5 });
      }, 800);
    };
    const stopConfetti = () => { if (intervalId) { clearInterval(intervalId); intervalId = null; } };
    const observer = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? startConfetti() : stopConfetti(); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { observer.disconnect(); stopConfetti(); };
  }, []);

  const categories = [...new Set(items.map((i) => i.category))];
  const tabItems   = items.filter((i) => i.category === activeTab);

  const handleTabChange = (cat: string) => {
    if (cat === activeTab) return;
    setVisible(false);
    setTimeout(() => { setActiveTab(cat); setVisible(true); }, 200);
  };

  // Eticheta afișată: din Supabase dacă există, altfel prop-ul din page.tsx
  const displayLabel = config?.label ?? holidayLabel;

  // Textul reducerii pentru subtitlu
  const discountText = config
    ? (config.discount_type === 'percent'
        ? `-${config.discount_amount}% la toate produsele`
        : `-${config.discount_amount} RON la toate produsele`)
    : '';

  return (
    <section ref={sectionRef} id="sarbatori" className="py-20 px-6 bg-gradient-to-b from-rose-50 to-amber-50">
      <div className="max-w-7xl mx-auto">

        {/* Titlu */}
        <div className="text-center mb-12">
          <div className="inline-block bg-rose-100 text-rose-600 font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            🎉 Ofertă specială
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Meniu <span className="text-rose-500">{displayLabel}</span>
          </h2>
          {discountText && (
            <p className="text-lg text-gray-600">
              Sărbătorești cu noi? Îți oferim{' '}
              <span className="font-bold text-rose-500">{discountText}</span>!
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-400">
            <div className="inline-block w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mb-4" />
            <p>Se încarcă ofertele...</p>
          </div>
        )}

        {!loading && config && (
          <>
            {/* Tab-uri categorii */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleTabChange(cat)}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === cat
                      ? 'bg-rose-500 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-rose-100 hover:text-rose-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid produse */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-200"
              style={{ opacity: visible ? 1 : 0 }}
            >
              {tabItems.map((item, index) => (
                <HolidayCard
                  key={item.id}
                  item={item}
                  index={index}
                  tabKey={activeTab}
                  config={config}
                />
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
