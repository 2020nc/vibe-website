# GHID 3.2 - Formularul de rezervari conectat la baza de date
> Material suplimentar pentru cursanti - Video 3.2
> Tot ce facem aici e prin prompturi date lui Claude Code.

---

## Inainte de a incepe

Ai nevoie de:
- Pasii din GHID 3.1 finalizati (Supabase configurat, `.env.local` cu chei)
- Proiectul `vibe-website` deschis in VS Code
- Claude Code activ

---

## Pasul 1: Instalam libraria Supabase

> **Tu catre Claude Code:**
> "Instaleaza libraria @supabase/supabase-js in proiect"

**Ce va rula Claude Code:**
```bash
npm install @supabase/supabase-js
```

**Ce se intampla:** Se adauga pachetul in `package.json` sub `dependencies`. Aceasta librarie stie sa comunice cu Supabase (sa trimita si sa primeasca date).

---

## Pasul 2: Cream clientul Supabase (fisierul de conexiune)

> **Tu catre Claude Code:**
> "Creeaza un fisier lib/supabase.ts care exporta o functie getSupabase(). Functia sa citeasca NEXT_PUBLIC_SUPABASE_URL si NEXT_PUBLIC_SUPABASE_ANON_KEY din environment variables, sa creeze un client Supabase cu createClient si sa il returneze. Foloseste Singleton pattern - sa nu creeze un client nou de fiecare data. Daca variabilele lipsesc, sa arunce o eroare clara."

**Ce va crea Claude Code:**

Fisierul `lib/supabase.ts`:
```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase nu este configurat. Adauga cheile in .env.local');
  }

  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  return _supabase;
}
```

> **Ce face:**
> - Citeste URL-ul si cheia din `.env.local`
> - Creeaza conexiunea la Supabase o singura data (Singleton)
> - Daca lipsesc cheile, arunca eroare clara in loc sa crape misterios

---

## Pasul 3: Cream API Route - POST (salvare rezervare)

> **Tu catre Claude Code:**
> "Creeaza un API route la app/api/rezervari/route.ts. Adauga o functie POST care: primeste din body name, email, phone, guests, date, time. Valideaza ca toate campurile exista. Apoi salveaza in tabelul 'rezervari' din Supabase cu insert. Returneaza 201 la succes, 400 la date invalide, 500 la eroare. Foloseste getSupabase din lib/supabase.ts."

**Ce va crea Claude Code:**

Fisierul `app/api/rezervari/route.ts` cu functia POST:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, guests, date, time } = body;

    if (!name || !email || !phone || !guests || !date || !time) {
      return NextResponse.json(
        { error: 'Toate campurile sunt obligatorii.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data: savedData, error } = await supabase
      .from('rezervari')
      .insert([{ name, email, phone, guests: Number(guests), date, time }])
      .select();

    if (error) {
      return NextResponse.json(
        { error: 'Eroare la salvare.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Rezervare salvata!', data: savedData },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Eroare de server.' },
      { status: 500 }
    );
  }
}
```

> **Ce face:**
> - Primeste datele din formular (body-ul request-ului)
> - Verifica ca nimic nu lipseste
> - Salveaza in tabelul `rezervari` pe Supabase
> - Returneaza mesaj de succes sau eroare

---

## Pasul 4: Adaugam GET in API Route (citire rezervari)

> **Tu catre Claude Code:**
> "In acelasi fisier app/api/rezervari/route.ts, adauga o functie GET care citeste toate rezervarile din tabelul 'rezervari', ordonate dupa created_at descrescator (cele mai noi primele). Returneaza 200 cu datele sau 500 la eroare."

**Ce va adauga Claude Code** in acelasi fisier:
```typescript
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rezervari')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Eroare la citire.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Eroare de server.' },
      { status: 500 }
    );
  }
}
```

> **Ce face:**
> - Citeste TOATE randurile din tabelul `rezervari`
> - Le sorteaza: cele mai noi primele
> - Returneaza lista (o vom folosi in panoul admin, in Video 3.3)

---

## Pasul 5: Cream pagina de rezervari cu formular

> **Tu catre Claude Code:**
> "Creeaza pagina app/rezervari/page.tsx - o pagina de rezervari pentru cafenea cu 3 pasi:
>
> Pasul 1: Selecteaza data - afiseaza un mini-calendar cu navigare pe luni (maxim 6 luni in viitor, zilele trecute disabled) si sub el butoane rapide pentru urmatoarele 14 zile.
>
> Pasul 2: Selecteaza ora - butoane cu slot-uri orare de la 10:00 la 22:00, din 30 in 30 de minute. Apare doar dupa ce ai selectat data.
>
> Pasul 3: Detalii - formular cu nume, email, telefon, numar persoane (1-12). Apare doar dupa ce ai selectat ora.
>
> La submit, trimite datele cu fetch POST la /api/rezervari. Afiseaza loading pe buton, erori daca apar, si un ecran de confirmare la succes cu buton 'Rezervare noua'.
>
> Design: glassmorphism (backdrop-blur, bg-white/80), culoare primara teal (#14B8A6), secondary orange (#F97316). Responsive. Adauga un link inapoi spre pagina principala."

**Ce va crea Claude Code:**

Fisierul `app/rezervari/page.tsx` - pagina completa cu:
- Calendar lunar cu navigare `<` `>` intre luni
- Butoane rapide pentru 14 zile
- Slot-uri orare 10:00-22:00
- Formular cu validare
- `handleSubmit` cu `fetch POST` la API
- State-uri: `selectedDate`, `selectedTime`, `formData`, `isLoading`, `error`, `submitted`
- Ecran confirmare la succes

> **Ce face:**
> - Userul alege data (calendar sau butoane rapide)
> - Alege ora
> - Completeaza datele personale
> - Da Submit → datele se trimit la API Route → se salveaza in Supabase
> - Vede ecranul de confirmare

---

## Pasul 6: Testam local

> **Tu catre Claude Code:**
> "Porneste serverul de dezvoltare"

**Ce va rula Claude Code:**
```bash
npm run dev
```

Deschide browserul la `localhost:3000/rezervari`.

### Test:
1. Selecteaza o data din calendar
2. Selecteaza o ora
3. Completeaza: Nume, Email, Telefon, Persoane
4. Click **"Confirma rezervarea"**
5. Ar trebui sa apara ecranul de confirmare

### Verificare in Supabase:

> **Tu catre Claude Code:**
> "Verifica daca rezervarea s-a salvat in Supabase - fa un GET la /api/rezervari"

**Ce va rula Claude Code:**
```bash
curl http://localhost:3000/api/rezervari
```

Ar trebui sa vezi un JSON cu rezervarea ta. Sau verifica direct in Supabase Dashboard → Table Editor → `rezervari`.

> **Fa inca o rezervare** cu date diferite si verifica din nou.

---

## Pasul 7: Verificam build-ul

> **Tu catre Claude Code:**
> "Ruleaza build-ul sa verificam ca totul e ok"

**Ce va rula Claude Code:**
```bash
npm run build
```

Ar trebui sa treaca fara erori. Daca sunt erori, Claude Code le va rezolva automat.

---

## Rezumat: Ce i-ai cerut lui Claude Code

| # | Ce i-ai spus | Ce a creat/rulat |
|---|-------------|-----------------|
| 1 | "Instaleaza @supabase/supabase-js" | `npm install @supabase/supabase-js` |
| 2 | "Creeaza lib/supabase.ts cu getSupabase()" | Fisier conexiune Supabase (singleton) |
| 3 | "Creeaza API route cu POST" | `app/api/rezervari/route.ts` - salvare |
| 4 | "Adauga GET in API route" | Functie citire rezervari |
| 5 | "Creeaza pagina de rezervari cu formular" | `app/rezervari/page.tsx` complet |
| 6 | "Porneste serverul" | `npm run dev` + test manual |
| 7 | "Ruleaza build-ul" | `npm run build` - verificare |

**7 prompturi = formular de rezervari complet conectat la baza de date.**

---

## Ce am construit - diagrama

```
[Utilizator in browser]
        |
        | completeaza formularul si da Submit
        v
[app/rezervari/page.tsx]  --fetch POST-->  [app/api/rezervari/route.ts]
                                                    |
                                                    | getSupabase().from('rezervari').insert()
                                                    v
                                            [Supabase - tabel rezervari]
```

---

## Probleme frecvente

**"Eroare la salvare" / "Eroare de server"**
→ Verifica `.env.local` - cheile Supabase sunt corecte?
→ Cere-i lui Claude Code: "Verifica ca .env.local are cheile Supabase corecte si ca tabelul rezervari exista"

**Formularul nu apare / pagina goala**
→ Cere-i: "Verifica daca app/rezervari/page.tsx exista si porneste serverul"

**"Supabase nu este configurat"**
→ Fisierul `.env.local` lipseste sau cheile sunt gresite
→ Cere-i: "Arata-mi continutul .env.local"

**Build esueaza**
→ Cere-i lui Claude Code: "Rezolva erorile de build" - le va fixa automat
