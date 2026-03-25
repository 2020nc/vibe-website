'use client';

/**
 * 🎉 HOLIDAY MENU - Meniu special de sărbători naționale
 *
 * Afișează TOATE produsele (toate categoriile) cu prețul normal tăiat (roșu)
 * și prețul redus (-5 RON). Același sistem de tab-uri ca MenuStarter.
 *
 * Apare doar în zilele de sărbătoare sau când ?preview=true în URL.
 */

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { menuData, categories, type Category } from '@/lib/menuData';

const DISCOUNT = 5;

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
  const key = `${mm}-${dd}`;
  return HOLIDAYS.find((h) => h.date === key)?.label ?? null;
}

// ─── Card individual cu observer propriu ────────────────────────────────────
function HolidayCard({
  item,
  index,
  tabKey,
}: {
  item: { name: string; price: number; description: string; image: string };
  index: number;
  tabKey: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Reset animație la schimbarea tab-ului
    setInView(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // o singură dată per apariție
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [tabKey]); // re-rulează când se schimbă tab-ul

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
        {/* Badge OFERTĂ pulsant */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-0 group-hover:opacity-100 scale-150 transition-opacity duration-150"></span>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-0 group-hover:opacity-75 delay-75 transition-opacity duration-150"></span>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 group-hover:opacity-0 transition-opacity duration-150"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400 shadow-lg shadow-green-400/50"></span>
          </span>
          OFERTĂ
        </div>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.style.display = 'none';
          }}
        />
      </div>

      {/* Text + Prețuri */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.description}</p>

        {/* Prețuri — animația pornește când cardul devine vizibil */}
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
            {item.price - DISCOUNT} RON
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Secțiunea principală ────────────────────────────────────────────────────
export default function HolidayMenu({ holidayLabel }: { holidayLabel: string }) {
  const [activeTab, setActiveTab] = useState<Category>('Espresso');
  const [visible, setVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startConfetti = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        // Particule rare din stânga
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.5 },
          colors: ['#f43f5e', '#fb923c', '#facc15', '#4ade80', '#60a5fa'],
          gravity: 0.8,
          drift: 0.5,
        });
        // Particule rare din dreapta
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.5 },
          colors: ['#f43f5e', '#fb923c', '#facc15', '#4ade80', '#60a5fa'],
          gravity: 0.8,
          drift: -0.5,
        });
      }, 800);
    };

    const stopConfetti = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startConfetti();
        } else {
          stopConfetti();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      stopConfetti();
    };
  }, []);

  const handleTabChange = (cat: Category) => {
    if (cat === activeTab) return;
    setVisible(false);
    setTimeout(() => {
      setActiveTab(cat);
      setVisible(true);
    }, 200);
  };

  return (
    <section ref={sectionRef} id="sarbatori" className="py-20 px-6 bg-gradient-to-b from-rose-50 to-amber-50">
      <div className="max-w-7xl mx-auto">

        {/* Titlu */}
        <div className="text-center mb-12">
          <div className="inline-block bg-rose-100 text-rose-600 font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            🎉 Ofertă specială
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Meniu <span className="text-rose-500">{holidayLabel}</span>
          </h2>
          <p className="text-lg text-gray-600">
            Sărbătorești cu noi? Îți oferim <span className="font-bold text-rose-500">-5 RON</span> la toate produsele!
          </p>
        </div>

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
          {menuData[activeTab].map((item, index) => (
            <HolidayCard
              key={item.name}
              item={item}
              index={index}
              tabKey={activeTab}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
