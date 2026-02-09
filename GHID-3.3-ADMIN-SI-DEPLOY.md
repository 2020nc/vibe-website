# GHID 3.3 - Panou Admin, Testare & Deploy
> Material suplimentar pentru cursanti - Video 3.3
> Vorbesti cu Claude Code ca si cum vorbesti cu un coleg - in limba naturala.

---

## Inainte de a incepe

Ai nevoie de:
- Pasii din GHID 3.1 si 3.2 finalizati
- Cel putin 1-2 rezervari test in baza de date (din GHID 3.2)
- Proiectul `vibe-website` deschis in VS Code
- Claude Code activ

---

## COMANDA 1: Adaugă funcții pentru confirmare și ștergere

Spune-i lui Claude Code:

> **"Trebuie să pot confirma sau șterge rezervări. Adaugă în fișierul route.ts funcții care schimbă statusul și care șterg o rezervare."**

Claude Code o să te întrebe probabil ce statusuri vrei. Spune-i:

> **"Statusurile sunt: în așteptare, confirmat, respins."**

**Ce face Claude Code:**
- Adaugă cele două funcții noi
- Le verifică
- Le leagă de Supabase

**Ce aștepți să vezi:**
Fișierul `route.ts` actualizat

---

## COMANDA 2: Creează pagina de admin

Spune-i lui Claude Code:

> **"Vreau o pagină admin unde să văd toate rezervările."**

Claude Code o să te întrebe ce vrei pe pagina aia. Răspunzi:

> **"Vreau tabel cu rezervările, filtre pe status, căutare după nume, butoane să confirm/respinge/șterg rezervări."**

Dacă te mai întreabă despre design:

> **"Design ca restul site-ului - fundal transparent cu blur, teal. Pe mobil carduri în loc de tabel."**

**Ce face Claude Code:**
- Creează pagina admin
- Face tabelul cu filtre
- Adaugă butoanele de acțiune
- Design responsive

**Ce aștepți să vezi:**
Fișier nou `app/admin/page.tsx`

---

## COMANDA 3: Testează tot sistemul

Spune-i lui Claude Code:

> **"Pornește serverul, deschide /rezervari și /admin în două taburi."**

**Ce faci tu:**

1. Faci o rezervare nouă în primul tab
2. Te duci în admin, dai refresh
3. Confirmi rezervarea
4. Testezi filtrele
5. Testezi căutarea
6. Ștergi o rezervare

**Verificare:**
- Rezervarea nouă apare în admin
- Statusul se schimbă instant când confirmi
- Filtrele funcționează
- Ștergerea funcționează

---

## COMANDA 4: Commit și push pe GitHub

Spune-i lui Claude Code:

> **"Fă commit și push pe GitHub cu mesajul 'Add complete reservation system with admin panel'."**

**Ce face Claude Code:**
- Face commit cu modificările
- Face push pe GitHub

**Ce aștepți să vezi:**
```
✓ Commit și push pe GitHub
```

---

## COMANDA 5: Pune cheile pe Vercel

Spune-i lui Claude Code:

> **"Pune cheile Supabase pe Vercel, ia-le din .env.local."**

**Ce face Claude Code:**
- Citește cheile din `.env.local`
- Le pune pe Vercel pentru producție
- Confirmă

**Ce aștepți să vezi:**
```
✓ Chei adăugate pe Vercel
```

---

## COMANDA 6: Deploy pe Vercel

Spune-i lui Claude Code:

> **"Fă deploy pe Vercel."**

**Ce face Claude Code:**
- Face deploy
- Îți dă link-ul

**Ce aștepți să vezi:**
```
✓ Deploy reușit
URL: https://vibe-website-xxx.vercel.app
```

Așteaptă 1-2 minute să se termine.

---

## COMANDA 7: Testează online

Spune-i lui Claude Code:

> **"Deschide site-ul live în browser."**

**Ce faci tu:**
1. Mergi pe `/rezervari` → fă o rezervare
2. Mergi pe `/admin` → vezi că apare
3. Confirmă-o
4. Verifică în Supabase că e acolo

> **Gata! Site-ul e live.**

---

## Rezumat: Cele 7 comenzi

| # | Ce i-ai spus | Ce a făcut |
|---|--------------|------------|
| 1 | "Adaugă funcții pentru confirmare și ștergere" | Funcții noi în route.ts |
| 2 | "Vreau pagină admin cu tabel și filtre" | app/admin/page.tsx complet |
| 3 | "Pornește serverul, testează tot" | Test manual complet |
| 4 | "Commit și push pe GitHub" | Commit și push pe GitHub |
| 5 | "Pune cheile pe Vercel" | Chei setate |
| 6 | "Deploy pe Vercel" | Deploy reușit |
| 7 | "Testează online" | Verificare finală |

**7 comenzi scurte = sistem complet online.**

---

## Dacă ceva nu merge

**"Admin arată eroare la încărcare"**
→ Spune-i: *"Verifică cheile Supabase pe Vercel"*

**"Nu merge push-ul pe GitHub"**
→ Spune-i: *"Verifică cu ce cont sunt logat"*

**"Site-ul arată versiunea veche"**
→ Spune-i: *"Verifică că am făcut push pe GitHub"*

**"Ștergerea nu merge"**
→ Spune-i: *"Verifică că route.ts are toate funcțiile"*

**"Pe mobil nu văd carduri"**
→ Spune-i: *"Repară responsive-ul: tabel pe desktop, carduri pe mobil"*

**"Cum ajung la admin?"**
→ Direct: `https://site-tau.vercel.app/admin`
→ Pentru curs e OK așa. La un proiect real pui autentificare.

---

## Ce ai acum - Rezumat Săptămâna 3

✅ Bază de date în cloud
✅ Formular de rezervări
✅ Panou admin
✅ Tot testat și funcțional
✅ Site live pe internet

---

## Total comenzi Săptămâna 3

- **GHID 3.1:** 7 comenzi (Supabase)
- **GHID 3.2:** 7 comenzi (formular)
- **GHID 3.3:** 7 comenzi (admin + online)
- **Total: 21 comenzi = sistem complet**

Nu ai scris cod. Doar ai vorbit cu Claude Code.

---

## Săptămâna 4 (teaser)

- Chat AI
- Mod dark/light
- Animație de încărcare
- Optimizări

**Felicitări!** Ai site funcțional cu tot ce trebuie.
