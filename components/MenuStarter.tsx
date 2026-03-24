'use client';

import { useState } from 'react';

const menuData = {
  Espresso: [
    { name: 'Espresso', price: 12, description: 'Shot dublu de espresso intens', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&auto=format&fit=crop' },
    { name: 'Americano', price: 14, description: 'Espresso diluat cu apă caldă', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&auto=format&fit=crop' },
    { name: 'Cappuccino', price: 16, description: 'Espresso cu lapte spumat', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop' },
    { name: 'Flat White', price: 17, description: 'Microfoam mătăsos peste espresso', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop' },
    { name: 'Latte', price: 17, description: 'Espresso cu lapte abundant', image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&auto=format&fit=crop' },
  ],
  Specialty: [
    { name: 'V60 Pour Over', price: 22, description: 'Filtru manual, aromă curată și complexă', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop' },
    { name: 'AeroPress', price: 20, description: 'Extracție sub presiune, corp plin', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop' },
    { name: 'Chemex', price: 24, description: 'Filtru elegant, gust curat și delicat', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop' },
    { name: 'Cortado', price: 18, description: 'Espresso cu lapte în proporții egale', image: 'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=600&auto=format&fit=crop' },
    { name: 'Magic Coffee', price: 19, description: 'Double ristretto cu lapte microfoam', image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=600&auto=format&fit=crop' },
    { name: 'Cold Drip', price: 26, description: 'Extracție la rece, 12 ore, aromă intensă', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop' },
  ],
  'Cold Brew': [
    { name: 'Cold Brew Classic', price: 18, description: 'Infuzie la rece 18 ore, smooth și răcoritor', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop' },
    { name: 'Cold Brew Tonic', price: 22, description: 'Cold brew cu apă tonică și portocală', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop' },
    { name: 'Nitro Cold Brew', price: 24, description: 'Cold brew cu azot, textură cremoasă', image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=600&auto=format&fit=crop' },
    { name: 'Iced Latte', price: 19, description: 'Espresso cu lapte rece și gheață', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop' },
    { name: 'Iced Matcha Latte', price: 21, description: 'Matcha japonez cu lapte de ovăz și gheață', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop' },
  ],
  Patiserie: [
    { name: 'Croissant cu Unt', price: 14, description: 'Foietaj franțuzesc, crocant și aromat', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop' },
    { name: 'Pain au Chocolat', price: 16, description: 'Croissant cu ciocolată neagră belgiană', image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&auto=format&fit=crop' },
    { name: 'Cheesecake', price: 22, description: 'Cremă de brânză pe blat de biscuite', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop' },
    { name: 'Brownie', price: 18, description: 'Ciocolată neagră intensă, nucă pecane', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&auto=format&fit=crop' },
    { name: 'Carrot Cake', price: 20, description: 'Morcovi, scorțișoară, glazură cream cheese', image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=600&auto=format&fit=crop' },
    { name: 'Banana Bread', price: 16, description: 'Pâine umedă cu banane și nuci', image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&auto=format&fit=crop' },
  ],
};

type Category = keyof typeof menuData;
const categories = Object.keys(menuData) as Category[];

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
