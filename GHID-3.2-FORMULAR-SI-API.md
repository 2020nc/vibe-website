# GHID 3.2 - Formularul de rezervari conectat la baza de date
> Material suplimentar pentru cursanti - Video 3.2
> Vorbesti cu Claude Code ca si cum vorbesti cu un coleg - in limba naturala.

---

## Inainte de a incepe

Ai nevoie de:
- Pasii din GHID 3.1 finalizati (Supabase configurat)
- Proiectul `vibe-website` deschis in VS Code
- Claude Code activ

---

## COMANDA 1: Instalează ce trebuie

Spune-i lui Claude Code:

> **"Trebuie să instalez ceva ca să vorbesc cu Supabase din proiect?"**

Claude Code o să-ți spună ce trebuie și o să instaleze.

**Ce aștepți să vezi:**
```
✓ Instalat
```

---

## COMANDA 2: Conectează proiectul la Supabase

Spune-i lui Claude Code:

> **"Vreau să conectez proiectul la Supabase. Fă un fișier care citește cheile din .env.local și mă conectează."**

**Ce face Claude Code:**
- Creează fișierul de conectare
- Citește cheile din `.env.local`
- Setează conexiunea

**Ce aștepți să vezi:**
Fișier nou `lib/supabase.ts`

---

## COMANDA 3: Fă legătura dintre formular și baza de date

Spune-i lui Claude Code:

> **"Trebuie să pot salva rezervările în Supabase. Fă un fișier care primește datele din formular și le salvează în tabelul rezervari."**

Claude Code o să te întrebe ce date primește. Spune-i:

> **"Nume, email, telefon, câți oameni, data, ora."**

**Ce face Claude Code:**
- Creează fișierul
- Face funcția care salvează datele
- Verifică că e totul completat

**Ce aștepți să vezi:**
Fișier nou `app/api/rezervari/route.ts`

---

## COMANDA 4: Adaugă și citirea rezervărilor

Spune-i lui Claude Code:

> **"În același fișier, vreau să pot citi și toate rezervările din tabel, cele mai noi primele."**

**Ce face Claude Code:**
- Adaugă funcția de citire
- Sortează: noi → vechi

**Ce aștepți să vezi:**
Fișierul `route.ts` actualizat

---

## COMANDA 5: Creează pagina cu formularul

Spune-i lui Claude Code:

> **"Vreau pagină de rezervări cu formular în 3 pași: alegi data, alegi ora, completezi detaliile."**

Claude Code o să te întrebe detalii. Răspunzi:

> **"La data: calendar cu navigare pe luni, maxim 6 luni în viitor, și butoane rapide pentru următoarele 14 zile."**

> **"La ore: butoane de la 10:00 la 22:00, din 30 în 30 de minute."**

> **"La detalii: nume, email, telefon, câți oameni între 1 și 12."**

Dacă te întreabă despre ce se întâmplă când trimiți:

> **"Când dai submit, datele merg la fișierul route.ts, arată spinner pe buton, și dacă merge arată 'Rezervare confirmată!' cu buton pentru rezervare nouă."**

Dacă te întreabă despre design:

> **"Fundal transparent cu blur, teal principal, portocaliu secundar. Să meargă bine și pe telefon."**

**Ce face Claude Code:**
- Creează pagina
- Face formularul cu 3 pași
- Calendar + butoane rapide
- Butoane ore
- Câmpuri detalii
- Mesaje de confirmare

**Ce aștepți să vezi:**
Fișier nou `app/rezervari/page.tsx`

---

## COMANDA 6: Testează formularul

Spune-i lui Claude Code:

> **"Pornește serverul și deschide pagina de rezervări."**

**Ce faci tu:**
1. Deschide link-ul în browser
2. Alege o dată
3. Alege o oră
4. Completează detaliile
5. Trimite
6. Ar trebui să vezi confirmare

**Apoi verifică:**

> **"Verifică dacă rezervarea s-a salvat în Supabase. Arată-mi ce e în tabel."**

**Ce aștepți să vezi:**
Rezervarea ta în listă

---

## COMANDA 7: Verifică că totul compilează

Spune-i lui Claude Code:

> **"Verifică că totul compilează și nu sunt erori."**

**Ce face Claude Code:**
- Rulează verificarea
- Îți arată dacă sunt probleme

**Ce aștepți să vezi:**
```
✓ Totul OK
```

---

## Rezumat: Cele 7 comenzi

| # | Ce i-ai spus | Ce a făcut |
|---|--------------|------------|
| 1 | "Trebuie să instalez ceva pentru Supabase?" | A instalat |
| 2 | "Conectează proiectul la Supabase" | lib/supabase.ts creat |
| 3 | "Fă legătura formular - bază de date" | Fișier care salvează |
| 4 | "Adaugă citirea rezervărilor" | Funcție de citire |
| 5 | "Vreau pagină cu formular în 3 pași" | Pagină completă |
| 6 | "Pornește serverul și testează" | Test + verificare |
| 7 | "Verifică că totul compilează" | Verificare erori |

**7 comenzi = formular funcțional care salvează în baza de date.**

---

## Dacă ceva nu merge

**"Nu văd formularul"**
→ Spune-i: *"Verifică dacă pagina există și pornește serverul"*

**"Eroare: Supabase nu e configurat"**
→ Spune-i: *"Verifică că .env.local are cheile corecte"*

**"Nu compilează"**
→ Spune-i: *"Rezolvă erorile"*

**"Rezervarea nu apare în Supabase"**
→ Spune-i: *"De ce nu se salvează? Arată-mi erorile."*

**"Calendarul nu merge bine"**
→ Spune-i: *"Repară calendarul"*

---

## Ce ai acum

✅ Conexiune la Supabase
✅ Salvare rezervări
✅ Citire rezervări
✅ Pagină cu formular
✅ Sistem testat

**În video-ul următor:** Panoul admin.

---

## Cum funcționează

```
Utilizator completează formularul
        ↓
Datele merg la fișierul de mijloc
        ↓
Se salvează în Supabase
        ↓
Utilizator vede: "Rezervare confirmată!"
```
