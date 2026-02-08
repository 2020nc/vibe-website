# VIDEO 3.1 - Ce inseamna "baza de date" pentru site-ul nostru
**Durata:** ~20-25 min

---

## SLIDE 1: Coperta

**SAPTAMANA 3: Sistem de Rezervari**
Video 3.1 - Ce inseamna o baza de date

Vibe Coding - Curs practic

---

## SLIDE 2: Unde suntem

In Saptamana 2 am construit landing page-ul complet:
- Hero, Features, Meniu, About, Footer
- Pagina de locatie
- Navigatie, animatii, responsive
- Deploy pe Vercel

**Saptamana 3:** Construim un sistem de rezervari - formular, baza de date, panou admin.

---

## SLIDE 3: Ce construim in Saptamana 3

Un sistem complet in 3 video-uri:

- **3.1 (azi):** Ce e o baza de date + setup Supabase
- **3.2:** Formularul de rezervari conectat la baza de date
- **3.3:** Panou admin + testare + deploy

La final: un utilizator completeaza formularul → datele se salveaza → proprietarul le vede in admin.

---

## SLIDE 4: Obiectivele Video 3.1

La finalul acestui video vei sti:

1. Ce e o baza de date si de ce avem nevoie de una
2. Ce e Supabase si de ce il folosim
3. Cum creezi un cont si un proiect pe Supabase
4. Cum creezi un tabel cu SQL
5. Cum setezi securitatea (Row Level Security)
6. Cum obtii cheile de conectare (URL + Key)

---

## SLIDE 5: Ce e o baza de date?

Ganditi-va la un **tabel Excel**:

| id | nume | email | telefon | persoane | data | ora | status |
|----|------|-------|---------|----------|------|-----|--------|
| 1 | Ion Popescu | ion@gmail.com | 0721... | 4 | Luni, 10 Feb | 18:00 | nou |
| 2 | Maria Ionescu | maria@yahoo.com | 0731... | 2 | Joi, 13 Feb | 20:00 | confirmat |

- **Coloane** = ce informatii stocam (structura)
- **Randuri** = fiecare rezervare individuala
- **Diferenta fata de Excel:** poate fi accesata de cod, automat, de oriunde

---

## SLIDE 6: De ce Supabase?

Exista zeci de optiuni (Firebase, MongoDB, MySQL...).

Noi alegem **Supabase** pentru ca:

- **Gratuit** - planul free ajunge pentru proiecte mici
- **PostgreSQL** - cel mai popular motor de baze de date
- **Dashboard vizual** - vezi datele ca intr-un Excel
- **API automat** - se integreaza usor cu Next.js
- **Nu instalezi nimic** - totul e in cloud

---

## SLIDE 7: Ce vom crea azi

```
Supabase (cloud)
  └── Proiect: vibe-caffe
       └── Tabel: rezervari
            ├── id (auto-increment)
            ├── name (text)
            ├── email (text)
            ├── phone (text)
            ├── guests (numar)
            ├── date (text)
            ├── time (text)
            ├── status (text, default: "pending")
            └── created_at (data+ora, automat)
```

---

## SLIDE 8: Hai la treaba!

**Pasii pe care ii facem acum live:**

1. Cream cont pe supabase.com
2. Cream proiectul `vibe-caffe`
3. Scriem SQL-ul care creeaza tabelul
4. Setam securitatea (RLS policies)
5. Copiem cheile de acces

Deschideti si voi supabase.com si faceti impreuna cu mine.

---

> **AICI INCEPE DEMONSTRATIA LIVE**
>
> Treci din slide-uri pe ecran (browser) si faci totul hands-on.
> Ce urmeaza mai jos e ghidul tau - ce faci si ce spui pe fiecare pas.

---

### DEMO: Cream contul (3 min)

1. Deschide **supabase.com** → "Start your project"
2. Sign up cu GitHub (click, autorizare)
3. Ajungi in Dashboard

> "Gata contul. Acum cream proiectul."

4. Click **"New Project"**
5. Name: `vibe-caffe`
6. Database Password: genereaza una
7. Region: **EU West (Frankfurt)** - cel mai aproape de Romania
8. Click "Create new project"
9. Asteapta 1-2 minute

> "Cat se creeaza, sa ne uitam la SQL-ul pe care il vom rula."

---

### DEMO: Cream tabelul cu SQL (5 min)

1. Mergi la **SQL Editor** → New Query
2. Scrie (sau paste):

```sql
CREATE TABLE rezervari (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  guests INTEGER NOT NULL DEFAULT 2,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

3. Explica pe rand, aratand cu cursorul:
   - `id` = numar unic, creste automat (1, 2, 3...)
   - `TEXT NOT NULL` = text obligatoriu (nu poate fi gol)
   - `INTEGER DEFAULT 2` = numar, implicit 2 persoane
   - `DEFAULT 'pending'` = rezervare noua = "in asteptare"
   - `created_at` = data si ora, se completeaza automat

4. Click **"Run"** → "Success"

5. Mergi la **Table Editor** → `rezervari` → arata tabelul gol cu coloanele

> "Vedeti? E ca un Excel gol cu coloanele definite. Acum trebuie sa ii spunem bazei de date cine are voie sa scrie in ea."

---

### DEMO: Securitate - Row Level Security (3 min)

1. Inapoi in **SQL Editor** → New Query
2. Scrie:

```sql
ALTER TABLE rezervari ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON rezervari
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous select" ON rezervari
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous update" ON rezervari
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous delete" ON rezervari
  FOR DELETE TO anon USING (true);
```

> "Row Level Security e ca un paznic la usa. Fara el, nimeni nu poate accesa datele. Cu aceste 4 reguli, permitem: adaugare, citire, modificare si stergere. Intr-un proiect real ai restrictiona mai mult, dar pentru curs e suficient."

3. Click **"Run"** → "Success"

---

### DEMO: Obtinem cheile de acces (2 min)

1. Mergi la **Settings** (rotita) → **API**
2. Copiaza **Project URL** (arata-l pe ecran)
3. Copiaza **Anon Key** (arata-l pe ecran)

> "URL-ul e adresa bazei de date. Cheia e parola de acces. Salvati-le undeva - le folosim in video-ul urmator cand construim formularul."

---

> **AICI SE TERMINA DEMONSTRATIA**
>
> Revii pe slide-uri pentru recap.

---

## SLIDE 9: Ce am facut azi - Recap

1. Am inteles ce e o baza de date (tabel cu randuri si coloane)
2. Am creat cont Supabase (gratuit, in cloud)
3. Am creat tabelul `rezervari` cu 9 coloane
4. Am setat securitatea (RLS - 4 policies)
5. Am obtinut cheile de conectare (URL + Anon Key)

Tabelul e gol si asteapta date. **In video-ul urmator il umplem!**

---

## SLIDE 10: Checklist - verificati ca aveti

- [ ] Cont Supabase creat
- [ ] Proiect `vibe-caffe` creat
- [ ] Tabel `rezervari` cu coloanele corecte
- [ ] RLS policies active (4 reguli)
- [ ] URL si Anon Key copiate si salvate

---

## SLIDE 11: Urmatorul video

**Video 3.2 - Formularul de rezervari**

Construim formularul si il conectam la baza de date:
- Instalam libraria Supabase in proiect
- Cream formularul cu selectie data, ora, detalii
- Cream API Route (backend)
- Testam: Submit → datele apar in Supabase

Ne vedem acolo!
