# VIDEO 3.3 - Testare completa, Panou Admin & Deploy
**Durata:** ~25-30 min | **Stil:** Hands-on, demonstratie live

---

## INTRO (1 min)

> "In video-urile trecute am creat baza de date si am conectat formularul. Datele ajung in Supabase. Dar un proprietar de cafenea nu sta sa verifice Supabase Dashboard-ul. Are nevoie de un panou simplu unde vede rezervarile si le confirma. Asta construim azi - plus facem deploy pe Vercel ca sa mearga live."

**Arata pe ecran:** Supabase Dashboard cu 2-3 rezervari din testul anterior.

---

## PAS 1: Completam API Route cu Update si Delete (4 min)

**Pe ecran:** VS Code, deschide `app/api/rezervari/route.ts`

> "Avem deja POST si GET. Pentru admin mai avem nevoie de doua operatii: sa actualizam statusul (confirmare/respingere) si sa stergem o rezervare."

Adauga dupa functia GET:

```typescript
// PATCH = Actualizeaza statusul unei rezervari
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status: newStatus } = body;

    if (!id || !newStatus || !['confirmed', 'rejected', 'pending'].includes(newStatus)) {
      return NextResponse.json(
        { error: 'ID si status valid sunt obligatorii.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rezervari')
      .update({ status: newStatus })
      .eq('id', id)
      .select();

    if (error) {
      return NextResponse.json({ error: 'Eroare la actualizare.' }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Eroare de server.' }, { status: 500 });
  }
}

// DELETE = Sterge o rezervare
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID obligatoriu.' }, { status: 400 });
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from('rezervari')
      .delete()
      .eq('id', Number(id));

    if (error) {
      return NextResponse.json({ error: 'Eroare la stergere.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Sters.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Eroare de server.' }, { status: 500 });
  }
}
```

**Explica scurt:**
- **PATCH** → primeste `id` + `status` nou, actualizeaza in baza de date
- **DELETE** → primeste `id` din URL (`?id=5`), sterge randul
- `.eq('id', id)` → WHERE id = valoarea data (filtreaza exact un rand)

> "Acum avem CRUD complet: Create, Read, Update, Delete. Cele 4 operatii fundamentale pe orice baza de date."

---

## PAS 2: Panoul Admin - pagina noua (10 min)

**Pe ecran:** VS Code

> "Cream o pagina noua: `/admin`. Nu o punem in meniul de navigatie - e o pagina secreta, accesibila doar prin URL."

Creezi `app/admin/page.tsx`.

> "Aceasta e cea mai mare componenta din proiect. O construim impreuna, pas cu pas."

**Cere lui Claude Code sa creeze pagina admin** (demonstreaza vibe coding live):

Prompt sugerat:
> "Creeaza o pagina admin la app/admin/page.tsx care: incarca rezervarile din GET /api/rezervari, le afiseaza intr-un tabel, are filtre pe status (toate/pending/confirmed/rejected), are o bara de cautare dupa nume/telefon/email, butoane de actiune: confirma, respinge, sterge. Design consistent cu restul site-ului (glassmorphism, teal primary). Pe mobil sa arate carduri in loc de tabel."

**Lasa Claude Code sa genereze** → explica pe masura ce codul apare:

### Ce arati si explici (pe rand, cand codul apare):

**TypeScript interfaces:**
> "Aici definim structura unei rezervari - ce campuri are si ce tip. TypeScript ne ajuta sa nu facem greseli."

**State management (5 state-uri):**
> "Avem 5 variabile de stare: lista de rezervari, filtrul activ, textul de cautare, loading, eroare."

**fetchRezervari():**
> "Aceasta functie cere rezervarile de la API-ul nostru cu GET. Se apeleaza automat cand se incarca pagina - asta face useEffect."

**useMemo - filtered:**
> "useMemo e un hook de optimizare. In loc sa filtram lista la fiecare render, o filtram doar cand se schimba datele, filtrul sau cautarea."

**updateStatus() si deleteRezervare():**
> "Doua functii: una trimite PATCH cu noul status, alta trimite DELETE cu id-ul. Dupa fiecare, actualizam lista local - fara sa re-incarcam toata pagina."

**Responsive (tabel vs carduri):**
> "Pe desktop afisam un tabel. Pe mobil, tabelul ar fi prea ingust, asa ca afisam carduri. Tailwind ne ajuta: `hidden md:block` pentru tabel, `md:hidden` pentru carduri."

---

## PAS 3: Test live - flow complet (5 min)

**Pe ecran:** doua taburi browser - `/rezervari` si `/admin`

> "Hai sa testam tot flow-ul, de la cap la coada."

### Test 1: Rezervare noua
1. Deschide `/rezervari`
2. Selecteaza data, ora
3. Completeaza: "Andrei Popescu", email, telefon, 4 persoane
4. Submit → ecran confirmare
5. **Switch la tab `/admin`** → click Refresh → apare rezervarea cu status "In asteptare"

> "Vedeti? Rezervarea a ajuns din formular in baza de date si apare in admin."

### Test 2: Confirmare
1. In admin, click "Confirma" pe rezervarea lui Andrei
2. Badge-ul se schimba instant in "Confirmat" (verde)

> "Status-ul s-a schimbat. Daca verificam in Supabase..."

3. **Deschide Supabase Dashboard** → arata ca status = "confirmed"

### Test 3: Cautare si filtre
1. Fa inca 1-2 rezervari cu nume diferite
2. In admin, testeaza filtrul "In asteptare" → arata doar cele neconfirmate
3. Scrie un nume in cautare → se filtreaza instant

### Test 4: Stergere
1. Click "Sterge" pe o rezervare
2. Confirma dialogul
3. Dispare din lista

> "CRUD complet: Create din formular, Read in admin, Update la confirmare, Delete la stergere."

---

## PAS 4: Deploy pe Vercel (5 min)

**Pe ecran:** VS Code terminal + Vercel

> "Site-ul merge perfect local. Hai sa-l punem live."

### Pas 4.1: Commit + Push

```bash
git add .
git commit -m "Connect reservation form to Supabase + admin panel"
git push origin main
```

> "Primul pas mereu: salvam codul pe GitHub. GitHub e sursa de adevar."

### Pas 4.2: Environment Variables pe Vercel

> "Pe Vercel, site-ul nu stie cheile noastre Supabase - .env.local e doar local. Trebuie sa i le spunem si lui Vercel."

1. Deschide Vercel Dashboard → Project → Settings → Environment Variables
2. Adauga:
   - **NEXT_PUBLIC_SUPABASE_URL** → paste URL-ul Supabase
   - **NEXT_PUBLIC_SUPABASE_ANON_KEY** → paste cheia
3. Click Save

> "Vercel va face automat un redeploy. Asteptam 1-2 minute."

### Pas 4.3: Test pe productie

1. Deschide site-ul live (URL Vercel)
2. Mergi pe `/rezervari` → fa o rezervare
3. Mergi pe `/admin` → verifica ca apare
4. Confirma rezervarea din admin

> "Merge! Site-ul e live, formularul salveaza in baza de date, admin-ul functioneaza. Totul in cloud."

---

## PAS 5: Ce noteaza cursantii in jurnal (2 min)

> "La finalul fiecarei saptamani, notati in jurnalul vostru:"

**Pe ecran:** arata o lista simpla

1. **Link-ul site-ului live:** `https://vibe-website-xxx.vercel.app`
2. **Link-ul admin:** `https://vibe-website-xxx.vercel.app/admin`
3. **Unde ajung datele:** Supabase → tabelul `rezervari`
4. **Ce am invatat:** Supabase, API Routes, CRUD, fetch, async/await, useMemo
5. **Ce nu e clar:** (noteaza intrebarile pentru sesiunea urmatoare)

---

## RECAP SAPTAMANA 3 (2 min)

> "Hai sa privim panoramic ce am construit in toata saptamana 3:"

**Pe ecran:** diagrama completa

```
[Utilizator]
    |
    | completeaza formularul
    v
[/rezervari] --POST--> [API Route] --insert--> [Supabase DB]
                                                     |
[/admin]     --GET-->  [API Route] --select-->       |
    |                                                |
    | confirma/sterge                                |
    v                                                |
[/admin]     --PATCH/DELETE--> [API Route] --------->|
```

**Fisiere noi create in Saptamana 3:**
- `lib/supabase.ts` - conexiunea la baza de date
- `app/api/rezervari/route.ts` - 4 operatii API (POST/GET/PATCH/DELETE)
- `app/admin/page.tsx` - panoul de administrare
- `.env.local` - cheile secrete

**Concepte noi invatate:**
- Baza de date (tabele, randuri, coloane)
- SQL (CREATE TABLE, RLS Policies)
- API Routes (CRUD: Create, Read, Update, Delete)
- fetch + async/await
- useMemo (optimizare)
- Environment Variables
- Deploy cu variabile pe Vercel

> "Felicitari! Aveti un site full-stack functional: frontend frumos, backend cu API, baza de date in cloud, panou admin, si totul deployat live. Saptamana viitoare..."

---

## CHECKLIST CURSANTI

La sfarsitul video-ului, cursantii ar trebui sa aiba:
- [ ] API Route completat cu PATCH + DELETE
- [ ] Pagina `/admin` functionala
- [ ] Testat flow-ul complet: rezervare → admin → confirmare
- [ ] Cod comis pe GitHub
- [ ] Environment variables setate pe Vercel
- [ ] Site-ul live functioneaza cu baza de date
- [ ] Notat in jurnal: link-uri, ce am invatat, intrebari
