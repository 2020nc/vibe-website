# Vibe Caffè - Ghid pentru Cursanți

Acest repository conține **2 versiuni** ale proiectului Vibe Caffè Website:

## 📦 Branch-uri

### 🌱 Branch `starter` - Punctul de START
**De aici plecăm împreună în curs!**

- **URL live:** http://localhost:3000 (după `git checkout starter`)
- **GitHub:** https://github.com/danutmitrut/vibe-website/tree/starter

#### Ce conține versiunea starter:
```
✅ HeroStarter - Hero simplu cu gradient
✅ FooterStarter - Footer minimal cu copyright
✅ Next.js 16 + React 19
✅ Tailwind CSS 4
✅ TypeScript
```

#### Ce NU conține (vom construi împreună):
```
❌ Navigation (meniu navigare)
❌ Features (carduri beneficii)
❌ Menu (listă produse)
❌ About (secțiune despre)
❌ Animații complexe
❌ Video background
❌ ChatWidget AI
❌ Formular de contact
```

**Structura minimală:**
```
app/
  page.tsx          → Homepage (doar Hero + Footer)
components/
  HeroStarter.tsx   → Hero simplu
  FooterStarter.tsx → Footer minimal
```

---

### 🎯 Branch `main` - Punctul de FINISH
**Aici ajungem la finalul cursului!**

- **URL live:** http://localhost:3000 (după `git checkout main`)
- **GitHub:** https://github.com/danutmitrut/vibe-website

#### Ce conține versiunea finală:
```
✅ Navigation - Meniu modern cu smooth scroll
✅ Hero - Full-screen cu video background + parallax
✅ Features - 3 carduri cu iconuri animate
✅ Menu - Listă completă de produse cu categorii
✅ About - Secțiune poveste + imagine
✅ Footer - Complet cu social media + linkuri
✅ ChatWidget - Asistent AI pentru cafenea (OpenAI)
✅ ThemeToggle - Dark/Light mode
✅ SmoothScroll - Scroll fluid cu Lenis
✅ Preloader - Loading screen
✅ Animații fade-in, parallax, hover effects
✅ Responsive design complet
✅ TypeScript strict
✅ Pagini extra: /locatie, /rezervari
```

**Structura completă:**
```
app/
  page.tsx              → Homepage (toate componentele)
  layout.tsx            → Layout global cu metadata
  locatie/page.tsx      → Pagina locație
  rezervari/page.tsx    → Pagina rezervări
  api/chat/route.ts     → API endpoint pentru ChatWidget

components/
  Navigation.tsx        → Meniu navigare modern
  Hero.tsx              → Hero cu video + parallax
  Features.tsx          → Carduri beneficii
  Menu.tsx              → Lista produse
  About.tsx             → Secțiune despre
  Footer.tsx            → Footer complet
  ChatWidget.tsx        → Asistent AI
  ThemeToggle.tsx       → Buton dark/light
  SmoothScroll.tsx      → Wrapper scroll fluid
  Preloader.tsx         → Loading screen

public/
  hero-coffee.mp4       → Video background
```

---

## 🚀 Setup Local

### 1. Clone repository
```bash
git clone https://github.com/danutmitrut/vibe-website.git
cd vibe-website
```

### 2. Alege branch-ul dorit

**Pentru a începe cursul (versiune starter):**
```bash
git checkout starter
```

**Pentru a vedea versiunea finală:**
```bash
git checkout main
```

### 3. Instalează dependencies
```bash
npm install
```

### 4. Rulează serverul local
```bash
npm run dev
```

### 5. Deschide în browser
```
http://localhost:3000
```

---

## 📊 Comparație Vizuală

### Versiunea STARTER (de unde plecăm)
```
┌─────────────────────────────────┐
│                                 │
│         Vibe Caffè              │
│  Cafeaua ta preferată,          │
│  perfect preparată              │
│                                 │
│      [ Începe acum ]            │
│                                 │
└─────────────────────────────────┘
│  © 2026 Vibe Caffè              │
└─────────────────────────────────┘
```
**2 componente | 0 animații | ~100 linii cod**

### Versiunea FINALĂ (unde ajungem)
```
┌─────────────────────────────────┐
│ Logo  Meniu  Despre  Contact    │ ← Navigation
├─────────────────────────────────┤
│   🎬 VIDEO BACKGROUND           │
│   Cafeaua ta preferată,         │
│   perfect preparată             │
│   [Vezi Meniul] [Vizitează-ne]  │
│          ↓                      │ ← Hero + Parallax
├─────────────────────────────────┤
│  ☕ Rapid  🌟 Calitate  👥 Team  │ ← Features
├─────────────────────────────────┤
│  Espresso    4.5 RON            │
│  Cappuccino  6.0 RON            │
│  Latte       6.5 RON            │ ← Menu
├─────────────────────────────────┤
│  Povestea noastră [IMAGINE]     │ ← About
├─────────────────────────────────┤
│  Facebook | Instagram | Email   │
│  © 2026 Vibe Caffè              │ ← Footer
└─────────────────────────────────┘
   💬 Chat AI                       ← ChatWidget
```
**10+ componente | 15+ animații | ~2000 linii cod**

---

## 🎓 Ce Vei Învăța Construind de la Starter la Final

### Săptămâna 1: Fundații
- ✅ Next.js App Router
- ✅ React Components
- ✅ Tailwind CSS
- ✅ TypeScript basics

### Săptămâna 2: UI/UX
- ✅ Hero Section cu gradient
- ✅ Navigation moderne
- ✅ Responsive design
- ✅ Cards & Layout

### Săptămâna 3: Interactivitate
- ✅ Animații CSS
- ✅ Smooth scroll
- ✅ Hover effects
- ✅ Video background

### Săptămâna 4: Features Avansate
- ✅ ChatWidget cu OpenAI API
- ✅ Dark/Light mode
- ✅ Preloader
- ✅ API Routes

---

## 🔗 Linkuri Utile

- **Repository:** https://github.com/danutmitrut/vibe-website
- **Branch Starter:** https://github.com/danutmitrut/vibe-website/tree/starter
- **Branch Main:** https://github.com/danutmitrut/vibe-website/tree/main
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs
- **React Docs:** https://react.dev

---

## 📝 Notițe pentru Cursanți

### Cum să compari cele 2 versiuni:

**Opțiunea 1: În 2 terminale**
```bash
# Terminal 1 - Starter
git checkout starter
npm run dev

# Terminal 2 - Main (pe port diferit)
git checkout main
npm run dev -- -p 3001
```

**Opțiunea 2: Cu diff GitHub**
```
https://github.com/danutmitrut/vibe-website/compare/starter...main
```

### Resurse pentru debuggare:
- `/checkpoints/README.md` - Checkpoint-uri pentru fiecare lecție
- `CLAUDE.md` - Instrucțiuni pentru Claude Code
- Comentariile din cod - Explicații detaliate

---

## 🎯 Misiunea Ta

**START:** Branch `starter` = landing page minimal (2 componente)
**FINISH:** Branch `main` = website complet cu AI (10+ componente)

**Timp estimat:** 4 săptămâni (12 lecții video)
**Rezultat final:** Website modern, responsive, cu AI chat

**Să construim împreună! 🚀**
