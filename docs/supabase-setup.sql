-- ============================================================
--  Vibe Caffè — Setup Bază de Date Meniu
--  Rulează în: Supabase → SQL Editor → New query
-- ============================================================

-- 1. Tabel menu_items
-- ============================================================
CREATE TABLE IF NOT EXISTS menu_items (
  id               uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name             text        NOT NULL,
  category         text        NOT NULL,
  price            numeric     NOT NULL,
  description      text,
  image_url        text,
  discount_type    text        CHECK (discount_type IN ('percent', 'value')),
  discount_amount  numeric,
  available        boolean     DEFAULT true,
  sort_order       int         DEFAULT 0,
  created_at       timestamptz DEFAULT now()
);

-- 2. Tabel holiday_config (un singur rând, id = 1)
-- ============================================================
CREATE TABLE IF NOT EXISTS holiday_config (
  id               int         PRIMARY KEY DEFAULT 1,
  discount_type    text        NOT NULL DEFAULT 'value' CHECK (discount_type IN ('percent', 'value')),
  discount_amount  numeric     NOT NULL DEFAULT 5,
  label            text        NOT NULL DEFAULT '1 Decembrie — Ziua Națională'
);

-- Inserează configurația default (dacă nu există)
INSERT INTO holiday_config (id, discount_type, discount_amount, label)
VALUES (1, 'value', 5, '1 Decembrie — Ziua Națională')
ON CONFLICT (id) DO NOTHING;

-- 3. Seed menu_items — date din menuData.ts
-- ============================================================

-- Categorie: Espresso
INSERT INTO menu_items (name, category, price, description, image_url, sort_order) VALUES
  ('Espresso',    'Espresso', 12, 'Shot dublu de espresso intens',      'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&auto=format&fit=crop', 1),
  ('Americano',   'Espresso', 14, 'Espresso diluat cu apă caldă',        'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&auto=format&fit=crop', 2),
  ('Cappuccino',  'Espresso', 16, 'Espresso cu lapte spumat',            'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop', 3),
  ('Flat White',  'Espresso', 17, 'Microfoam mătăsos peste espresso',    'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop', 4),
  ('Latte',       'Espresso', 17, 'Espresso cu lapte abundant',          'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&auto=format&fit=crop', 5);

-- Categorie: Specialty
INSERT INTO menu_items (name, category, price, description, image_url, sort_order) VALUES
  ('V60 Pour Over', 'Specialty', 22, 'Filtru manual, aromă curată și complexă',          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop', 1),
  ('AeroPress',     'Specialty', 20, 'Extracție sub presiune, corp plin',                'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop', 2),
  ('Chemex',        'Specialty', 24, 'Filtru elegant, gust curat și delicat',            'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop', 3),
  ('Cortado',       'Specialty', 18, 'Espresso cu lapte în proporții egale',             'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=600&auto=format&fit=crop', 4),
  ('Magic Coffee',  'Specialty', 19, 'Double ristretto cu lapte microfoam',              'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=600&auto=format&fit=crop', 5),
  ('Cold Drip',     'Specialty', 26, 'Extracție la rece, 12 ore, aromă intensă',         'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop', 6);

-- Categorie: Cold Brew
INSERT INTO menu_items (name, category, price, description, image_url, sort_order) VALUES
  ('Cold Brew Classic',   'Cold Brew', 18, 'Infuzie la rece 18 ore, smooth și răcoritor',      'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop', 1),
  ('Cold Brew Tonic',     'Cold Brew', 22, 'Cold brew cu apă tonică și portocală',              'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop', 2),
  ('Nitro Cold Brew',     'Cold Brew', 24, 'Cold brew cu azot, textură cremoasă',               'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=600&auto=format&fit=crop', 3),
  ('Iced Latte',          'Cold Brew', 19, 'Espresso cu lapte rece și gheață',                  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop', 4),
  ('Iced Matcha Latte',   'Cold Brew', 21, 'Matcha japonez cu lapte de ovăz și gheață',         'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop', 5);

-- Categorie: Patiserie
INSERT INTO menu_items (name, category, price, description, image_url, sort_order) VALUES
  ('Croissant cu Unt', 'Patiserie', 14, 'Foietaj franțuzesc, crocant și aromat',             'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop', 1),
  ('Pain au Chocolat', 'Patiserie', 16, 'Croissant cu ciocolată neagră belgiană',             'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&auto=format&fit=crop', 2),
  ('Cheesecake',       'Patiserie', 22, 'Cremă de brânză pe blat de biscuite',               'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop', 3),
  ('Brownie',          'Patiserie', 18, 'Ciocolată neagră intensă, nucă pecane',              'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&auto=format&fit=crop', 4),
  ('Carrot Cake',      'Patiserie', 20, 'Morcovi, scorțișoară, glazură cream cheese',         'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=600&auto=format&fit=crop', 5),
  ('Banana Bread',     'Patiserie', 16, 'Pâine umedă cu banane și nuci',                     'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&auto=format&fit=crop', 6);

-- ============================================================
--  Verificare — ar trebui să afișeze 21 produse
-- ============================================================
SELECT category, COUNT(*) as nr_produse
FROM menu_items
GROUP BY category
ORDER BY category;
