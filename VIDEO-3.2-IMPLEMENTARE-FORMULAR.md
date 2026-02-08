# VIDEO 3.2 - Implementarea formularului conectat la baza de date
**Durata:** ~25-30 min | **Stil:** Hands-on, cod live in VS Code

---

## INTRO (1 min)

> "In video-ul trecut am creat baza de date pe Supabase - tabelul nostru e gol si asteapta date. Acum il conectam la site. La final, cand un utilizator completeaza formularul de rezervare si da Submit, datele ajung direct in baza de date."

**Arata pe ecran:** Supabase Dashboard → tabelul gol → "Il umplem azi."

---

## PAS 1: Instalam libraria Supabase (2 min)

**Pe ecran:** VS Code, terminal

> "Ca sa vorbeasca site-ul nostru cu Supabase, avem nevoie de o librarie - un pachet de cod gata facut care stie sa comunice cu baza de date."

```bash
npm install @supabase/supabase-js
```

> "Gata. O singura comanda. Acum avem tot ce ne trebuie."

Arata in `package.json` ca a aparut `@supabase/supabase-js`.

---

## PAS 2: Fisierul .env.local - cheile secrete (3 min)

**Pe ecran:** VS Code, creezi fisier nou `.env.local`

> "Cheile pe care le-am copiat de pe Supabase le punem intr-un fisier special. Acest fisier NU se urca pe GitHub - e deja in .gitignore. Fiecare dezvoltator isi pune propriile chei."

```bash
# Supabase - Baza de date pentru rezervari
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

**Pune cheile reale** (cele copiate din Supabase Dashboard in video-ul trecut).

> "NEXT_PUBLIC_ la inceput inseamna ca variabila e disponibila si pe frontend - in browser. Fara acest prefix, ar fi vizibila doar pe server."

**Verifica:** arata `.gitignore` - `.env.local` e acolo.

---

## PAS 3: Clientul Supabase - conexiunea (5 min)

**Pe ecran:** VS Code, creezi `lib/supabase.ts`

> "Acum cream o functie care face conexiunea la Supabase. O cream o singura data si o refolosim peste tot - asta se numeste Singleton Pattern."

Scrie (sau cere lui Claude Code sa creeze):

```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your-supabase-url-here') {
    throw new Error(
      'Supabase nu este configurat. Adauga NEXT_PUBLIC_SUPABASE_URL si NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    );
  }

  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  return _supabase;
}
```

**Explica pe rand:**
- `let _supabase = null` → tinem conexiunea intr-o variabila
- `if (_supabase) return _supabase` → daca deja exista, o returnam (nu cream alta)
- Citim cheile din `.env.local`
- Verificam ca exista (altfel aruncam eroare clara)
- `createClient(url, key)` → cream conexiunea
- Exportam functia `getSupabase()` ca s-o folosim in alte fisiere

---

## PAS 4: API Route - "podul" intre formular si baza de date (8 min)

**Pe ecran:** VS Code, creezi `app/api/rezervari/route.ts`

> "Formularul e pe frontend - in browserul utilizatorului. Baza de date e pe server, la Supabase. Intre ele trebuie un pod - API Route. E ca un chelner: primeste comanda de la client si o duce in bucatarie."

```
Utilizator (browser) → API Route (server Next.js) → Supabase (baza de date)
```

> "Cream o singura ruta API care stie sa faca doua lucruri: sa salveze o rezervare noua (POST) si sa citeasca toate rezervarile (GET)."

Scrie `route.ts` - **doar POST si GET** (PATCH si DELETE le adaugam in 3.3 cand facem admin):

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// POST = Salveaza o rezervare noua
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
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Eroare la salvarea rezervarii.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Rezervare salvata cu succes!', data: savedData },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Eroare de server.' },
      { status: 500 }
    );
  }
}

// GET = Citeste toate rezervarile
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rezervari')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Eroare la citirea rezervarilor.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Eroare de server.' },
      { status: 500 }
    );
  }
}
```

**Explica conceptele cheie:**
- `async function POST(request)` → functie asincrona (asteapta raspunsul de la Supabase)
- `request.json()` → citeste datele trimise de formular
- `try/catch` → daca ceva merge prost, prindem eroarea in loc sa crape site-ul
- `.from('rezervari').insert([...])` → insereaza un rand nou in tabel
- `.select()` → returneaza randul inserat (sa confirmam ca s-a salvat)
- Status codes: 201 = creat, 400 = date invalide, 500 = eroare server
- GET: `.select('*')` = toate coloanele, `.order()` = cele mai noi primele

---

## PAS 5: Conectam formularul la API (5 min)

**Pe ecran:** VS Code, deschide `app/rezervari/page.tsx`

> "Acum vine partea magica. Formularul nostru existent avea un handleSubmit cu console.log. Il inlocuim cu un fetch real catre API-ul nostru."

Arata codul vechi:
```typescript
// INAINTE - datele se pierd:
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Rezervare:', { ... });
  setSubmitted(true);
};
```

Inlocuieste cu:
```typescript
// DUPA - datele se salveaza in baza de date:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const response = await fetch('/api/rezervari', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: selectedDate,
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        guests: formData.guests,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Eroare la trimitere.');
    }

    setSubmitted(true);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Eroare la trimitere.');
  } finally {
    setIsLoading(false);
  }
};
```

**Explica:**
- `fetch('/api/rezervari', { method: 'POST' })` → trimite datele la API Route
- `JSON.stringify()` → transforma obiectul in text JSON
- `response.ok` → verifica daca raspunsul e ok (status 200-299)
- `finally` → se executa mereu, indiferent daca a reusit sau nu (opreste loading-ul)

**Adauga state-urile noi** (arata unde, langa celelalte):
```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string>('');
```

**Adauga afisarea erorii** (in JSX, inainte de butonul Submit):
```tsx
{error && (
  <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-center">
    {error}
  </div>
)}
```

---

## PAS 6: Test live! (3 min)

**Pe ecran:** browser pe `localhost:3000/rezervari`

> "Momentul adevarului. Hai sa testam."

1. Porneste `npm run dev` (daca nu ruleaza deja)
2. Deschide `localhost:3000/rezervari`
3. Selecteaza o data, o ora
4. Completeaza: Nume, Email, Telefon, Persoane
5. Click "Confirma rezervarea"
6. **Asteapta** → apare ecranul de confirmare

> "A mers! Dar... chiar s-a salvat? Hai sa verificam."

7. Deschide Supabase Dashboard → Table Editor → rezervari
8. **Arata randul nou** cu datele completate

> "Uite! Datele sunt aici. Numele, emailul, telefonul, data, ora - totul a ajuns in baza de date. Status: pending - in asteptare."

**Fa inca o rezervare** cu date diferite → arata ca apar 2 randuri.

---

## RECAP (2 min)

> "Hai sa recapitulam ce am facut si ce am construit:"

**Pe ecran:** diagrama simpla (sau deseneaz-o rapid)

```
[Formular] --fetch POST--> [API Route] --insert--> [Supabase DB]
   (browser)                (server)                (cloud)
```

1. Libraria Supabase instalata (`npm install`)
2. Chei secrete in `.env.local`
3. Client Supabase (`lib/supabase.ts`) - conexiunea
4. API Route (`app/api/rezervari/route.ts`) - podul
5. Formular conectat la API (`fetch` in `handleSubmit`)
6. Testat - datele ajung in baza de date!

> "In video-ul urmator construim panoul de admin - o pagina unde vedem toate rezervarile, le confirmam sau le stergem. Si facem deploy pe Vercel."

---

## CHECKLIST CURSANTI

La sfarsitul video-ului, cursantii ar trebui sa aiba:
- [ ] `@supabase/supabase-js` instalat
- [ ] `.env.local` cu cheile lor Supabase
- [ ] `lib/supabase.ts` creat
- [ ] `app/api/rezervari/route.ts` creat (POST + GET)
- [ ] `handleSubmit` modificat in `rezervari/page.tsx`
- [ ] State-uri noi: `isLoading`, `error`
- [ ] Testat: cel putin o rezervare apare in Supabase Dashboard
