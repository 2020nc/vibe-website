-- Tabel rezervări Vibe Caffè
CREATE TABLE IF NOT EXISTS rezervari (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  timestamp WITH TIME ZONE DEFAULT now() NOT NULL,
  nume        text NOT NULL,
  email       text NOT NULL,
  telefon     text NOT NULL,
  data        date NOT NULL,
  ora         time NOT NULL,
  persoane    integer NOT NULL CHECK (persoane >= 1 AND persoane <= 20),
  mesaj       text,
  status      text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

-- Activează Row Level Security
ALTER TABLE rezervari ENABLE ROW LEVEL SECURITY;

-- Oricine poate crea o rezervare (fără cont)
CREATE POLICY "Insert public"
  ON rezervari FOR INSERT
  TO anon
  WITH CHECK (true);

-- Doar utilizatorii autentificați (admin) pot vedea toate rezervările
CREATE POLICY "Select authenticated only"
  ON rezervari FOR SELECT
  TO authenticated
  USING (true);

-- Doar utilizatorii autentificați pot modifica rezervările
CREATE POLICY "Update authenticated only"
  ON rezervari FOR UPDATE
  TO authenticated
  USING (true);

-- Doar utilizatorii autentificați pot șterge rezervările
CREATE POLICY "Delete authenticated only"
  ON rezervari FOR DELETE
  TO authenticated
  USING (true);
