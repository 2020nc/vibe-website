/**
 * Date comune pentru meniu — folosite în MenuStarter și HolidayMenu
 */

export const menuData = {
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

export type Category = keyof typeof menuData;
export const categories = Object.keys(menuData) as Category[];
