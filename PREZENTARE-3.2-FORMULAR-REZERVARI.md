# PREZENTARE 3.2 - Formular de Rezervări
> Săptămâna 3 - Sistem de rezervări
> Durată: ~25-30 min (prezentare + demo live)

---

## SLIDE 1: Titlu

```
SĂPTĂMÂNA 3 - VIDEO 3.2
Formular de Rezervări

Conectăm site-ul la baza de date
```

---

## SLIDE 2: Unde suntem

```
✅ VIDEO 3.1: Baza de date Supabase
   → Proiect creat
   → Tabel rezervări configurat
   → Chei salvate local

🎯 ACUM: Formularul de rezervări
   → Conectare proiect la Supabase
   → Formular cu 3 pași
   → Salvare date în cloud

📍 URMEAZĂ: Admin panel + deploy
```

---

## SLIDE 3: Ce construim astăzi

```
FORMULAR DE REZERVĂRI - 3 PAȘI

Pasul 1: ALEGE DATA
→ Calendar interactiv
→ Butoane rapide (14 zile)

Pasul 2: ALEGE ORA
→ Butoane ore 10:00-22:00
→ Interval 30 minute

Pasul 3: DETALIILE TALE
→ Nume, email, telefon
→ Câți oameni (1-12)

Submit → Salvare în Supabase → Confirmare
```

---

## SLIDE 4: Cum funcționează

```
┌─────────────────┐
│  UTILIZATOR     │
└────────┬────────┘
         │ completează formular
         ↓
┌─────────────────┐
│  NEXT.JS        │
│  /rezervari     │ ← pagina noastră
└────────┬────────┘
         │ trimite date
         ↓
┌─────────────────┐
│  FIȘIER MIJLOC  │
│  route.ts       │ ← primește și validează
└────────┬────────┘
         │ salvează
         ↓
┌─────────────────┐
│  SUPABASE       │ ← baza de date
└─────────────────┘
```

---

## SLIDE 5: Ce vom face astăzi

```
7 COMENZI = FORMULAR FUNCȚIONAL

1. Instalează ce trebuie pentru Supabase
2. Conectează proiectul la baza de date
3. Fă legătura formular - Supabase
4. Adaugă citirea rezervărilor
5. Creează pagina cu formularul (3 pași)
6. Testează formularul
7. Verifică că totul compilează

Totul prin Claude Code + GHID-3.2
```

---

## SLIDE 6: Pregătire pentru demo

```
CE AI NEVOIE:

✅ VIDEO 3.1 finalizat (Supabase configurat)
✅ Proiect vibe-website deschis în VS Code
✅ Claude Code activ
✅ GHID-3.2 deschis

Gata? Demo live!
```

---

## [DEMO LIVE - 15-20 minute]

**Urmărește GHID-3.2 - 7 comenzi:**

1. "Trebuie să instalez ceva pentru Supabase?"
2. "Conectează proiectul la Supabase"
3. "Fă legătura formular - bază de date"
4. "Adaugă citirea rezervărilor"
5. "Vreau pagină cu formular în 3 pași"
6. "Pornește serverul și testează"
7. "Verifică că totul compilează"

**Demo include:**
- Testare formular în browser
- Verificare date în Supabase
- Calendar interactiv funcțional

---

## SLIDE 7: Recapitulare

```
CE AM FĂCUT:

✅ Conectat proiectul la Supabase
✅ Creat fișierul care salvează datele
✅ Creat fișierul care citește datele
✅ Creat pagină cu formular (3 pași)
✅ Calendar + ore + detalii
✅ Testat - rezervările se salvează

TOTUL prin comenzi simple către Claude Code
```

---

## SLIDE 8: Ce urmează

```
VIDEO 3.3: Admin Panel + Deploy

→ Pagină admin pentru gestionare
→ Filtre pe status
→ Căutare după nume/email
→ Acțiuni: confirmă, respinge, șterge
→ Deploy pe Vercel
→ Site live pe internet

Ultimul video din Săptămâna 3!
```

---

## SLIDE 9: Întrebări?

```
ÎNTREBĂRI FRECVENTE:

"De ce 3 pași în formular?"
→ UX mai bun - utilizatorul nu e copleșit cu toate câmpurile deodată

"Pot face formularul diferit?"
→ Da, poți personaliza - 2 pași, 4 pași, layout diferit

"Calendar-ul e librărie externă?"
→ Nu, e custom - scris de Claude Code, zero dependințe

"Cum știu că datele s-au salvat?"
→ Vezi confirmare în UI + verifici în Supabase Dashboard
```

---

**MATERIALE:**
- **GHID-3.2-FORMULAR-SI-API.md** - Pas cu pas cu comenzi Claude Code
- **PREZENTARE-3.2-FORMULAR-REZERVARI.md** - Acest fișier (slide-uri)

**DURATA TOTALĂ:** ~25-30 minute (10 min prezentare + 15-20 min demo live)
