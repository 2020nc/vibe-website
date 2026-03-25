'use client';

import { useState } from 'react';
import { menuData, categories, type Category } from '@/lib/menuData';

export default function MenuStarter() {
  const [activeTab, setActiveTab] = useState<Category>('Espresso');
  const [visible, setVisible] = useState(true);

  const handleTabChange = (cat: Category) => {
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
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Meniul <span className="text-amber-600">Nostru</span></h2>
          <p className="text-lg text-gray-600">Preparate cu pasiune, servite cu zâmbetul</p>
        </div>

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

        {/* Grid produse cu fade transition */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-200"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {menuData[activeTab].map((item) => (
            <div
              key={item.name}
              className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              {/* Imagine 4:3 */}
              <div className="overflow-hidden rounded-xl mx-3 mt-3" style={{ aspectRatio: '4/3' }}>
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

              {/* Text */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <span className="text-amber-600 font-bold">{item.price} RON</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
