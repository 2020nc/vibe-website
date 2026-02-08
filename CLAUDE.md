# Vibe Website - Context proiect

## Ce e
Site cafenea fictivă "Vibe Caffe" - proiect didactic pentru cursul de Vibe Coding (începători).
Fiecare săptămână adaugă un layer nou. Codul trebuie să fie simplu și ușor de explicat.

## Stack
- Next.js 16 (App Router) + React 19 + Tailwind 4 + Supabase + Vercel
- URL producție: https://vibe-website-rho.vercel.app
- Admin: https://vibe-website-rho.vercel.app/admin (fără auth)

## Structura
```
app/page.tsx           - Landing page
app/rezervari/page.tsx - Formular rezervări (3 steps + mini-calendar)
app/admin/page.tsx     - Panou admin (filtre, status, CRUD)
app/locatie/page.tsx   - Pagina locație
app/api/rezervari/route.ts - CRUD API (POST/GET/PATCH/DELETE)
app/api/chat/route.ts     - AI chat
lib/supabase.ts        - Singleton client Supabase
```

## DB: Supabase
- Tabel `rezervari`: id, nume, telefon, email, data, ora, persoane, mesaj, status, created_at
- Status-uri: nou, confirmat, anulat

## Design
- Glassmorphism (backdrop-blur, transparență)
- Primary: Teal #14B8A6 | Secondary: Orange #F97316
- 100% sans-serif | SVG icons (nu emoji)

## Env vars (local + Vercel)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- OPENAI_API_KEY, OPENAI_MODEL

## Reguli specifice proiect
- Cod simplu, explicabil (e pentru începători)
- Nu adăuga librării externe fără motiv întemeiat
- Documentația cursanților: ETAPE_CONSTRUCTIE.md + DOCUMENTATIE_CURSANTI.md
- Deploy: commit+push GitHub ÎNAINTE de Vercel

## Git push - problemă cunoscută
Fine-grained token NU funcționează. Folosește classic token via URL:
```
git push https://danutmitrut:<CLASSIC_TOKEN>@github.com/danutmitrut/vibe-website.git main
```
