# GHID 3.3 - Panou Admin, Testare & Deploy
> Material suplimentar pentru cursanti - Video 3.3
> Tot ce facem aici e prin prompturi date lui Claude Code.

---

## Inainte de a incepe

Ai nevoie de:
- Pasii din GHID 3.1 si 3.2 finalizati
- Cel putin 1-2 rezervari test in baza de date (facute in 3.2)
- Proiectul `vibe-website` deschis in VS Code
- Claude Code activ

---

## Pasul 1: Completam API Route cu Update si Delete

In Video 3.2 am creat POST (salvare) si GET (citire). Acum adaugam PATCH (actualizare status) si DELETE (stergere) - necesare pentru panoul admin.

> **Tu catre Claude Code:**
> "In fisierul app/api/rezervari/route.ts, adauga doua functii noi:
>
> PATCH - primeste din body un id si un status nou (confirmed, rejected sau pending). Actualizeaza statusul rezervarii cu acel id in Supabase. Returneaza 200 la succes, 400 daca lipseste id sau statusul e invalid, 500 la eroare.
>
> DELETE - primeste id-ul ca query parameter (?id=5). Sterge rezervarea cu acel id din Supabase. Returneaza 200 la succes, 400 daca lipseste id, 500 la eroare."

**Ce va adauga Claude Code** in `app/api/rezervari/route.ts`:

Functia PATCH:
```typescript
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
```

Functia DELETE:
```typescript
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

    return NextResponse.json({ message: 'Rezervare stearsa.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Eroare de server.' }, { status: 500 });
  }
}
```

> **Ce am adaugat:**
> - **PATCH** = actualizeaza statusul unei rezervari (din "in asteptare" in "confirmata" sau "respinsa")
> - **DELETE** = sterge o rezervare complet din baza de date
> - Acum avem **CRUD complet**: Create (POST), Read (GET), Update (PATCH), Delete (DELETE)

---

## Pasul 2: Cream panoul admin

> **Tu catre Claude Code:**
> "Creeaza pagina app/admin/page.tsx - un panou de administrare pentru rezervari:
>
> - Incarca rezervarile cu fetch GET de la /api/rezervari la montarea paginii (useEffect)
> - Afiseaza-le intr-un tabel cu coloanele: Nume, Contact (email + telefon), Data, Ora, Persoane, Status, Actiuni
> - Adauga filtre pe status: Toate, In asteptare (pending), Confirmate (confirmed), Respinse (rejected) - cu numar de rezervari pe fiecare filtru
> - Adauga o bara de cautare care filtreaza dupa nume, telefon sau email
> - Buton de refresh pentru reincarcarea datelor
> - Butoane de actiune pe fiecare rezervare: Confirma (PATCH status=confirmed), Respinge (PATCH status=rejected), Sterge (DELETE cu confirmare dialog)
> - Foloseste useMemo pentru filtrare si cautare
> - Foloseste optimistic updates la schimbarea statusului (actualizeaza local imediat, fara re-fetch)
> - Pe desktop: afiseaza tabel. Pe mobil: afiseaza carduri (hidden md:block / md:hidden)
> - Badge-uri colorate pe status: galben pentru pending, verde pentru confirmed, rosu pentru rejected
> - Design: glassmorphism consistent cu restul site-ului, culoare primara teal. Link inapoi spre pagina principala.
> - Pagina sa fie 'use client' (componenta interactiva)"

**Ce va crea Claude Code:**

Fisierul `app/admin/page.tsx` - pagina completa cu:
- TypeScript interfaces (`Rezervare`, `FilterType`)
- 5 state-uri: `rezervari`, `filter`, `search`, `loading`, `error`
- `fetchRezervari()` cu `useEffect`
- `updateStatus()` cu PATCH + optimistic update
- `deleteRezervare()` cu DELETE + confirmare
- `useMemo` pentru filtrare + cautare
- `useMemo` pentru contorizare pe status
- Tabel responsive (desktop) + carduri (mobil)
- Badge-uri colorate pe status
- Bara de cautare + filtre + refresh

> **Ce face:**
> - Incarca automat toate rezervarile cand deschizi pagina
> - Poti filtra: vezi doar cele noi, sau doar confirmate, etc.
> - Poti cauta dupa nume, telefon, email
> - Confirmi sau respingi cu un click (se actualizeaza instant)
> - Stergi cu confirmare (dialog "Esti sigur?")
> - Pe telefon arata carduri, pe desktop tabel

---

## Pasul 3: Testam local - flow complet

> **Tu catre Claude Code:**
> "Porneste serverul de dezvoltare daca nu ruleaza deja"

```bash
npm run dev
```

### Test 1: Verifica admin-ul
1. Deschide `localhost:3000/admin`
2. Ar trebui sa vezi rezervarile din testele anterioare (din GHID 3.2)
3. Daca tabelul e gol, fa o rezervare pe `localhost:3000/rezervari` si revino

### Test 2: Flow complet - rezervare noua
1. Deschide `localhost:3000/rezervari` intr-un tab nou
2. Fa o rezervare (data, ora, nume, email, telefon)
3. Revino pe tab-ul `/admin` → click **Refresh**
4. Rezervarea noua ar trebui sa apara cu status "In asteptare"

### Test 3: Confirmare
1. In admin, click **"Confirma"** pe o rezervare
2. Badge-ul se schimba instant in verde ("Confirmat")

### Test 4: Cautare si filtre
1. Scrie un nume in bara de cautare → se filtreaza instant
2. Click pe filtrul "In asteptare" → vezi doar cele neconfirmate
3. Click pe "Toate" → revii la lista completa

### Test 5: Stergere
1. Click **"Sterge"** pe o rezervare
2. Confirma in dialogul care apare
3. Rezervarea dispare din lista

> Daca toate testele trec, sistemul e complet si functional!

---

## Pasul 4: Commit pe GitHub

> **Tu catre Claude Code:**
> "Salveaza toate modificarile cu git: adauga fisierele noi, commit cu mesajul 'Add reservation system with Supabase + admin panel' si push pe GitHub"

**Ce va rula Claude Code:**
```bash
git add app/rezervari/page.tsx app/admin/page.tsx app/api/rezervari/route.ts lib/supabase.ts
git commit -m "Add reservation system with Supabase + admin panel"
git push origin main
```

> **Nota:** `.env.local` NU se adauga la commit (e in `.gitignore`) - cheile raman private.

---

## Pasul 5: Adaugam variabilele de mediu pe Vercel

> **Tu catre Claude Code:**
> "Adauga variabilele de mediu pe Vercel pentru productie: NEXT_PUBLIC_SUPABASE_URL si NEXT_PUBLIC_SUPABASE_ANON_KEY. Ia valorile din .env.local"

**Ce va rula Claude Code:**
```bash
# Citeste valorile din .env.local
# Apoi le adauga pe Vercel:
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

> **De ce e necesar:** Vercel nu are acces la `.env.local` - e fisier local. Trebuie sa ii spunem separat cheile pentru productie.

---

## Pasul 6: Deploy pe Vercel

> **Tu catre Claude Code:**
> "Deploya proiectul pe Vercel in productie"

**Ce va rula Claude Code:**
```bash
vercel --prod
```

Sau, daca ai Vercel conectat la GitHub, deploy-ul se face automat la push. Asteapta 1-2 minute.

---

## Pasul 7: Test pe productie

> **Tu catre Claude Code:**
> "Care e URL-ul site-ului pe Vercel?"

Claude Code va rula:
```bash
vercel ls
```

Deschide URL-ul in browser si testeaza:

1. **`/rezervari`** → Fa o rezervare
2. **`/admin`** → Verifica ca apare
3. **Confirma** rezervarea din admin
4. Verifica in Supabase Dashboard ca datele sunt acolo

> **Merge! Site-ul e live, cu baza de date in cloud, formular functional si panou admin.**

---

## Rezumat: Ce i-ai cerut lui Claude Code

| # | Ce i-ai spus | Ce a creat/rulat |
|---|-------------|-----------------|
| 1 | "Adauga PATCH si DELETE in API route" | Functii update + delete in `route.ts` |
| 2 | "Creeaza pagina admin" | `app/admin/page.tsx` complet |
| 3 | "Porneste serverul" | `npm run dev` + teste manuale |
| 4 | "Commit si push pe GitHub" | `git add` + `git commit` + `git push` |
| 5 | "Adauga variabilele pe Vercel" | `vercel env add` x2 |
| 6 | "Deploy pe Vercel" | `vercel --prod` |
| 7 | "Care e URL-ul?" | `vercel ls` + test manual |

**7 prompturi = panou admin + deploy complet.**

---

## Ce am construit in toata Saptamana 3 - Rezumat final

### Fisiere create:
```
lib/supabase.ts              ← conexiune baza de date
app/api/rezervari/route.ts   ← API: POST/GET/PATCH/DELETE
app/rezervari/page.tsx       ← formular rezervari cu calendar
app/admin/page.tsx           ← panou admin complet
.env.local                   ← chei Supabase (local, nu pe GitHub)
supabase/migrations/         ← SQL pentru tabel + securitate
```

### Flow-ul complet:
```
Utilizator → /rezervari → formular → fetch POST → API Route → Supabase INSERT
Admin → /admin → fetch GET → API Route → Supabase SELECT → tabel/carduri
Admin → Confirma → fetch PATCH → API Route → Supabase UPDATE
Admin → Sterge → fetch DELETE → API Route → Supabase DELETE
```

### Total prompturi date lui Claude Code in Saptamana 3:
- **GHID 3.1:** 7 prompturi (setup Supabase)
- **GHID 3.2:** 7 prompturi (formular + API)
- **GHID 3.3:** 7 prompturi (admin + deploy)
- **Total: ~21 prompturi = sistem complet de rezervari**

---

## Probleme frecvente

**Admin-ul arata "Eroare la incarcarea rezervarilor"**
→ Variabilele de mediu lipsesc pe Vercel
→ Cere-i lui Claude Code: "Verifica ca variabilele Supabase sunt setate pe Vercel"

**Push pe GitHub da eroare de autentificare**
→ Cere-i: "Verifica cu ce cont GitHub sunt logat" → `gh auth status`

**Site-ul pe Vercel arata versiunea veche**
→ Modificarile nu au fost push-uite pe GitHub
→ Cere-i: "Fa commit si push cu toate modificarile"

**Butonul de stergere nu functioneaza**
→ Functia DELETE lipseste din API route
→ Cere-i: "Verifica ca app/api/rezervari/route.ts are functia DELETE"

**Pe mobil nu apar carduri**
→ Cere-i: "Verifica ca pagina admin are layout responsiv: tabel pe desktop, carduri pe mobil"
