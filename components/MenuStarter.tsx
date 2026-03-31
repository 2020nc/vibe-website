'use client';

import { useState, useEffect } from 'react';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string | null;
  discount_type: 'percent' | 'value' | null;
  discount_amount: number | null;
  available: boolean;
  sort_order: number;
}

function calcFinalPrice(item: MenuItem): number {
  if (!item.discount_type || !item.discount_amount) return item.price;
  if (item.discount_type === 'percent') {
    return Math.round((item.price - (item.price * item.discount_amount) / 100) * 100) / 100;
  }
  return Math.round((item.price - item.discount_amount) * 100) / 100;
}

function discountLabel(item: MenuItem): string | null {
  if (!item.discount_type || !item.discount_amount) return null;
  return item.discount_type === 'percent'
    ? `-${item.discount_amount}%`
    : `-${item.discount_amount} RON`;
}

export default function MenuStarter() {
  const [items, setItems]         = useState<MenuItem[]>([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [visible, setVisible]     = useState(true);

  useEffect(() => {
    fetch('/api/menu')
      .then((r) => r.json())
      .then(({ data }) => {
        const available = (data as MenuItem[]).filter((i) => i.available);
        setItems(available);
        if (available.length > 0) setActiveTab(available[0].category);
      })
      .finally(() => setLoading(false));
  }, []);

  // Categorii unice în ordinea în care apar
  const categories = [...new Set(items.map((i) => i.category))];
  const tabItems   = items.filter((i) => i.category === activeTab);

  const handleTabChange = (cat: string) => {
    if (cat === activeTab) return;
    setVisible(false);
    setTimeout(() => {
      setActiveTab(cat);
      setVisible(true);
    }, 200);
  };

  return (
    <section id="menu" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Titlu */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Meniul <span className="text-amber-600">Nostru</span>
          </h2>
          <p className="text-lg text-gray-600">Preparate cu pasiune, servite cu zâmbetul</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-400">
            <div className="inline-block w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-4" />
            <p>Se încarcă meniul...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Tab-uri categorii */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleTabChange(cat)}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === cat
                      ? 'bg-amber-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
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
              {tabItems.map((item) => {
                const finalPrice = calcFinalPrice(item);
                const badge      = discountLabel(item);
                const hasDiscount = badge !== null;

                return (
                  <div
                    key={item.id}
                    className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    {/* Imagine */}
                    <div className="relative overflow-hidden rounded-xl mx-3 mt-3" style={{ aspectRatio: '4/3' }}>
                      {/* Badge reducere */}
                      {hasDiscount && (
                        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                          {badge}
                        </div>
                      )}
                      <img
                        src={item.image_url ?? ''}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Text */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                        <div className="text-right">
                          {hasDiscount && (
                            <span className="block text-xs text-gray-400 line-through">
                              {item.price} RON
                            </span>
                          )}
                          <span className={`font-bold ${hasDiscount ? 'text-red-500' : 'text-amber-600'}`}>
                            {finalPrice} RON
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
