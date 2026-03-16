# Checkpoints - Vibe Website

Cod de referință pentru fiecare etapă din Video Weeks 1-3.

## Structură

```
checkpoints/
├── video-1.1-setup/         # După Video 1.1 - Setup proiect
├── video-1.2-hero/          # După Video 1.2 - Hero section
├── video-1.3-features/      # După Video 1.3 - Features + About
├── video-2.1-menu/          # După Video 2.1 - Meniu complet
├── video-2.2-footer/        # După Video 2.2 - Footer + Navigation
├── video-3.1-locatie/       # După Video 3.1 - Pagina Locație
├── video-3.2-animations/    # După Video 3.2 - Animații + Dark Mode
└── video-3.3-deploy/        # După Video 3.3 - Deploy final
```

## Cum folosești

### Te-ai blocat?

1. Deschide folderul checkpoint-ului corespunzător
2. Compară codul tău cu cel de referință
3. Identifică diferențele
4. Ajustează codul tău

### Exemplu comparație

```bash
# Compară Hero.tsx
diff components/Hero.tsx checkpoints/video-1.2-hero/Hero.tsx
```

## Ce conține fiecare checkpoint

### video-1.1-setup/

După Video 1.1 - Setup și Layout

```
video-1.1-setup/
├── layout.tsx         # Root layout cu fonts
├── page.tsx          # Homepage placeholder
└── globals.css       # CSS variables + Tailwind
```

### video-1.2-hero/

După Video 1.2 - Hero Section

```
video-1.2-hero/
├── Hero.tsx          # Full-screen hero cu video
└── page.tsx          # Cu Hero integrat
```

**Caracteristici:**
- Video background cu parallax
- Overlay semi-transparent
- Titlu + subtitlu cu animații fade-in
- Butoane CTA
- Scroll indicator animat

### video-1.3-features/

După Video 1.3 - Features + About

```
video-1.3-features/
├── Features.tsx      # Bento grid cu 3 carduri
├── About.tsx         # Secțiune despre noi
└── page.tsx          # Cu toate componentele
```

**Caracteristici:**
- Bento grid layout (1 mare + 2 mici)
- Scroll animations
- Parallax pe imagini
- Lista cu check icons

### video-2.1-menu/

După Video 2.1 - Meniu Complet

```
video-2.1-menu/
├── Menu.tsx          # Meniu cu categorii și produse
└── page.tsx          # Integrat
```

**Caracteristici:**
- 30 produse în 6 categorii
- Tab-uri sticky cu auto-highlight
- Product cards cu imagine, preț, descriere
- Badge vegan
- Info footer pentru personalizare

### video-2.2-footer/

După Video 2.2 - Footer + Navigation

```
video-2.2-footer/
├── Footer.tsx        # Footer cu wave SVG
├── Navigation.tsx    # Navbar sticky
└── page.tsx          # Complet
```

**Caracteristici:**
- Wave SVG separator
- Gradient background
- Grid 3 coloane
- Social icons
- Newsletter form
- Sticky navigation

### video-3.1-locatie/

După Video 3.1 - Pagina Locație

```
video-3.1-locatie/
└── locatie/page.tsx  # Pagina locație
```

**Caracteristici:**
- Hero specific
- Info contact
- Program
- Galerie imagini
- Google Maps placeholder

### video-3.2-animations/

După Video 3.2 - Animații + Dark Mode

```
video-3.2-animations/
├── useScrollAnimation.ts  # Custom hook
├── ThemeToggle.tsx       # Dark mode toggle
├── SmoothScroll.tsx      # Lenis wrapper
├── Preloader.tsx         # Loading animation
└── globals.css           # Cu dark mode
```

**Caracteristici:**
- Intersection Observer
- Lenis smooth scroll
- Dark mode cu data-theme
- Preloader animat

### video-3.3-deploy/

După Video 3.3 - Deploy Final

```
video-3.3-deploy/
└── (toate fișierele finale)
```

**Caracteristici:**
- Optimizări performanță
- Meta tags SEO
- Ready for Vercel

## Notă

Checkpoint-urile sunt **cod de referință**, nu soluții de copiat.

Scopul este să:
1. Înțelegi ce ar trebui să ai la fiecare etapă
2. Compari și identifici diferențe
3. Înveți din cod funcțional

**Recomandare:** Scrie codul singur cu Claude, apoi compară cu checkpoint-ul doar dacă te blochezi.
