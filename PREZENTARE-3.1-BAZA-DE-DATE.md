# PREZENTARE 3.1 - Baza de Date și Supabase
> Săptămâna 3 - Sistem de rezervări
> Durată: ~25-30 min (prezentare + demo live)

---

## SLIDE 1: Titlu

```
SĂPTĂMÂNA 3
Baza de Date și Supabase

De la site static la aplicație full-stack
```

---

## SLIDE 2: Ce am făcut până acum

```
✅ Săptămâna 1-2: Frontend

→ Landing page
→ Design system (glassmorphism)
→ Animații și interacțiuni
→ Responsive design

Problema: Totul e static. Nicio funcționalitate reală.
```

---

## SLIDE 3: Ce facem în Săptămâna 3

```
SĂPTĂMÂNA 3: De la static la funcțional

→ Bază de date (Supabase)
→ Formular de rezervări
→ Panou admin
→ Site live pe internet

La final: Sistem complet de rezervări
```

---

## SLIDE 4: Ce este o bază de date?

```
BAZĂ DE DATE = Excel în cloud

┌─────────────────────────────────┐
│ Tabel: rezervari                │
├──────┬───────┬────────┬─────────┤
│ Nume │ Email │ Telefon│ Persoane│
├──────┼───────┼────────┼─────────┤
│ Ana  │ ana@..│ 0722.. │    2    │
│ Ion  │ ion@..│ 0733.. │    4    │
└──────┴───────┴────────┴─────────┘

Diferența: Accesibil de oriunde, instant, sigur
```

---

## SLIDE 5: De ce Supabase?

```
SUPABASE = Firebase alternative (open source)

✅ Bază de date PostgreSQL în cloud
✅ Gratuit pentru proiecte mici
✅ Se conectează direct din Next.js
✅ Securitate încorporată
✅ Dashboard vizual (vezi datele)

Alternativele: Firebase, MongoDB, MySQL
Pentru curs: Supabase e perfect
```

---

## SLIDE 6: Arhitectura sistemului

```
┌─────────────┐
│  UTILIZATOR │
└──────┬──────┘
       │ completează formular
       ↓
┌─────────────┐
│  NEXT.JS    │ ← site-ul nostru
└──────┬──────┘
       │ trimite date
       ↓
┌─────────────┐
│  SUPABASE   │ ← baza de date în cloud
└─────────────┘

Toate componentele "vorbesc" între ele
```

---

## SLIDE 7: Ce vom construi astăzi

```
PARTEA 1: Setup Supabase (10 min)
→ Cont Supabase
→ Instalare Supabase CLI
→ Creare proiect
→ Creare tabel rezervări

PARTEA 2: Demo live (15 min)
→ Claude Code face totul prin comenzi
→ 7 comenzi = setup complet
→ Folosim GHID-3.1
```

---

## SLIDE 8: Pregătire pentru demo

```
CE AVEȚI NEVOIE:

✅ Cont Supabase (github.com/supabase)
   → Sign up cu GitHub
   → E gratis

✅ Proiect vibe-website deschis în VS Code

✅ Claude Code activ

✅ GHID-3.1 deschis (material suplimentar)

Gata? Începem demo-ul live!
```

---

## [DEMO LIVE - 15 minute]

**Urmărește GHID-3.1 - 7 comenzi:**

1. "Instalează Supabase CLI"
2. "Conectează-mă la Supabase"
3. "Creează proiect vibe-caffe"
4. "Leagă proiectul local de Supabase"
5. "Creează tabel pentru rezervări"
6. "Trimite tabelul pe Supabase"
7. "Ia cheile și salvează-le în .env.local"

**Timp estimat:** 10-15 minute pentru toate cele 7 comenzi.

---

## SLIDE 9: Recapitulare

```
CE AM FĂCUT:

✅ Instalat Supabase CLI
✅ Conectat la Supabase
✅ Creat proiect în cloud
✅ Creat tabel rezervări cu toate câmpurile
✅ Configurat securitate (RLS)
✅ Salvat cheile local

TOTUL prin comenzi naturale către Claude Code
ZERO cod scris manual
```

---

## SLIDE 10: Ce urmează

```
VIDEO 3.2: Formularul de rezervări
→ Conectare proiect la Supabase
→ Formular cu 3 pași (dată, oră, detalii)
→ Salvare rezervări în baza de date
→ Calendar interactiv

VIDEO 3.3: Admin și Deploy
→ Panou admin pentru gestionare
→ Filtre, căutare, acțiuni
→ Deploy pe Vercel
→ Site live pe internet
```

---

## SLIDE 11: Întrebări?

```
ÎNTREBĂRI FRECVENTE:

"Supabase e doar pentru Node.js?"
→ Nu, funcționează cu orice: React, Vue, Svelte, chiar și vanilla JS

"Ce se întâmplă dacă depășesc free tier?"
→ Proiectele mici rareori depășesc. Dacă da, upgrade la $25/lună

"Pot folosi alt database?"
→ Da: Firebase, MongoDB, MySQL - același principiu

"Claude Code face tot setup-ul singur?"
→ Da, tu doar îi spui ce vrei în limba naturală
```

---

**MATERIALE:**
- **GHID-3.1-SETUP-SUPABASE.md** - Pas cu pas cu comenzi Claude Code
- **PREZENTARE-3.1-BAZA-DE-DATE.md** - Acest fișier (slide-uri)

**DURATA TOTALĂ:** ~25-30 minute (10 min prezentare + 15 min demo live)
