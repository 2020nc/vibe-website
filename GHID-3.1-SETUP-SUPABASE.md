# GHID 3.1 - Setup Supabase prin Claude Code
> Material suplimentar pentru cursanti - Video 3.1
> Tot ce facem aici e prin comenzi in terminal, ghidate de Claude Code.

---

## Inainte de a incepe

Ai nevoie de:
- **VS Code** cu extensia Claude Code (instalata in Saptamana 1)
- **Cont GitHub** (creat in Saptamana 1)
- **Cont Supabase** - il cream acum (Sign up cu GitHub pe supabase.com)
- **Supabase CLI** instalat (vezi Pasul 1)

---

## Pasul 1: Instalam Supabase CLI

Deschide Claude Code in VS Code si scrie:

> **Tu catre Claude Code:**
> "Instaleaza Supabase CLI pe Mac cu Homebrew"

**Ce va rula Claude Code:**
```bash
brew install supabase/tap/supabase
```

**Verificare - cere-i lui Claude Code:**
> "Verifica ca Supabase CLI e instalat"

```bash
supabase --version
```

Ar trebui sa vezi ceva de genul: `Supabase CLI 2.75.0`

> **Daca nu ai Homebrew:** Claude Code te va ghida sa il instalezi, sau poti folosi varianta cu npm: `npm install -g supabase`

---

## Pasul 2: Autentificare in Supabase

> **Tu catre Claude Code:**
> "Logheaza-ma in Supabase CLI"

**Ce va rula Claude Code:**
```bash
supabase login
```

Se deschide browserul automat. Daca nu ai cont Supabase:
1. Click "Sign up with GitHub" pe supabase.com
2. Autorizeaza accesul
3. Revii in terminal - apare "Token saved"

**Verificare:**
> "Arata-mi proiectele mele Supabase"

```bash
supabase projects list
```

Daca e prima data, lista e goala - normal.

---

## Pasul 3: Cream proiectul `vibe-caffe`

> **Tu catre Claude Code:**
> "Creeaza un proiect Supabase numit vibe-caffe in regiunea EU West. Genereaza o parola de baza de date."

**Ce va rula Claude Code:**
```bash
supabase projects create vibe-caffe \
  --org-id <id-ul organizatiei tale> \
  --region eu-west-1 \
  --db-password <parola generata>
```

> **Nota:** Claude Code va citi mai intai organizatiile tale cu `supabase orgs list` ca sa gaseasca `--org-id` corect. Nu trebuie sa stii tu.

Raspunsul arata cam asa:
```
Created a new project vibe-caffe at https://supabase.com/dashboard/project/abcdefghijk
```

Retine **reference ID** (sirul de litere, ex: `abcdefghijk`) - Claude Code il foloseste automat in pasii urmatori.

**Asteapta ~2 minute** pana se creeaza proiectul (Supabase provisioneaza serverul PostgreSQL).

---

## Pasul 4: Initializam Supabase in proiect si link

> **Tu catre Claude Code:**
> "Initializeaza Supabase in proiectul nostru si leaga-l la proiectul vibe-caffe de pe Supabase"

**Ce va rula Claude Code:**
```bash
supabase init
```

Asta creeaza un folder `supabase/` in proiect cu structura:
```
supabase/
  └── config.toml    (configurare locala)
  └── migrations/    (folder gol, aici punem SQL-ul)
  └── seed.sql       (date initiale - optional)
```

Apoi:
```bash
supabase link --project-ref <reference-id>
```

> Claude Code foloseste automat reference ID-ul din pasul anterior. Ti se va cere parola bazei de date (cea generata la pasul 3).

---

## Pasul 5: Cream tabelul cu SQL (migration)

> **Tu catre Claude Code:**
> "Creeaza o migratie SQL pentru tabelul de rezervari. Tabelul sa aiba: id auto-increment, name, email, phone (toate text obligatorii), guests (numar, default 2), date si time (text), status (text, default pending), created_at (timestamp automat). Adauga si Row Level Security cu policies care permit insert, select, update si delete pentru anonimi."

**Ce va face Claude Code:**

1. Creeaza fisierul de migratie:
```bash
supabase migration new create_rezervari_table
```

Asta creeaza un fisier in `supabase/migrations/` cu un timestamp, de exemplu:
`supabase/migrations/20260208_create_rezervari_table.sql`

2. Scrie SQL-ul in fisier:

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

> **Ce face SQL-ul?**
> - `CREATE TABLE` = creeaza tabelul cu coloanele definite
> - `id ... IDENTITY PRIMARY KEY` = numar unic, creste automat (1, 2, 3...)
> - `TEXT NOT NULL` = text obligatoriu (nu poate fi gol)
> - `DEFAULT 2` = daca nu specifici, implicit 2 persoane
> - `DEFAULT 'pending'` = orice rezervare noua incepe cu status "in asteptare"
> - `ENABLE ROW LEVEL SECURITY` = activeaza "paznicul" pe tabel
> - `CREATE POLICY` = 4 reguli: oricine poate adauga, citi, modifica, sterge
> - Intr-un proiect real ai restrictiona mai mult, dar pentru curs e suficient

---

## Pasul 6: Trimitem migratia pe Supabase (remote)

> **Tu catre Claude Code:**
> "Ruleaza migratia pe baza de date remote (Supabase cloud)"

**Ce va rula Claude Code:**
```bash
supabase db push
```

Raspunsul:
```
Applying migration 20260208_create_rezervari_table.sql...
Finished supabase db push.
```

**Gata!** Tabelul `rezervari` exista acum pe Supabase, in cloud, cu securitatea setata.

---

## Pasul 7: Obtinem cheile de acces

> **Tu catre Claude Code:**
> "Arata-mi URL-ul si cheile API pentru proiectul vibe-caffe de pe Supabase. Salveaza-le in fisierul .env.local"

**Ce va rula Claude Code:**

1. Obtine cheile:
```bash
supabase projects api-keys --project-ref <reference-id>
```

Raspunsul arata cam asa:
```
   NAME     |                          API KEY
------------|------------------------------------------------------------
  anon key  | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYm...
  service   | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYm...
```

2. Creeaza fisierul `.env.local` in radacina proiectului:

```bash
# Supabase - Baza de date pentru rezervari
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **IMPORTANT:**
> - **URL-ul** = `https://<reference-id>.supabase.co`
> - **Anon Key** = cheia publica (permite accesul de pe site)
> - Fisierul `.env.local` e deja in `.gitignore` - **NU se urca pe GitHub**
> - `NEXT_PUBLIC_` la inceput = variabila e disponibila si in browser

---

## Verificare finala

> **Tu catre Claude Code:**
> "Verifica ca totul e configurat corect: proiectul Supabase e linkat, tabelul rezervari exista, si .env.local are cheile"

**Ce va rula Claude Code:**
```bash
# Verificare link
supabase projects list

# Verificare migratie aplicata
supabase migration list

# Verificare .env.local exista
cat .env.local
```

---

## Rezumat: Ce i-ai cerut lui Claude Code

| # | Ce i-ai spus | Ce a facut |
|---|-------------|-----------|
| 1 | "Instaleaza Supabase CLI" | `brew install supabase/tap/supabase` |
| 2 | "Logheaza-ma in Supabase" | `supabase login` (deschide browser) |
| 3 | "Creeaza proiect vibe-caffe" | `supabase projects create vibe-caffe ...` |
| 4 | "Initializeaza si leaga proiectul" | `supabase init` + `supabase link` |
| 5 | "Creeaza migratie pentru tabelul rezervari" | Fisier SQL in `supabase/migrations/` |
| 6 | "Ruleaza migratia pe remote" | `supabase db push` |
| 7 | "Salveaza cheile in .env.local" | `supabase projects api-keys` + scrie `.env.local` |

**7 prompturi date lui Claude Code = baza de date complet configurata.**

---

## Probleme frecvente

**"supabase: command not found"**
→ Cere-i lui Claude Code: "Instaleaza Supabase CLI cu npm global"
→ Va rula: `npm install -g supabase`

**"Error: not logged in"**
→ Cere-i: "Logheaza-ma in Supabase" → `supabase login`

**"Project not yet active"**
→ Proiectul e inca in curs de creare. Asteapta 2 minute si incearca din nou.

**"relation rezervari already exists"**
→ Tabelul e deja creat. Totul e ok.

**"Cannot find project ref"**
→ Cere-i: "Leaga proiectul la Supabase vibe-caffe" → `supabase link --project-ref <id>`
