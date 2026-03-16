# Convenții Vibe Website

Acest fișier definește convențiile pentru generarea codului consistent.

## Stack Tehnic

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **Limbaj:** TypeScript 5 (strict mode)
- **Fonts:** Plus Jakarta Sans (headings) + Inter (body)
- **Smooth Scroll:** Lenis

## Structura Proiectului

```
vibe-website/
├── app/
│   ├── globals.css          # Stiluri globale + CSS variables
│   ├── layout.tsx           # Root layout cu fonts
│   ├── page.tsx             # Homepage
│   ├── locatie/page.tsx     # Pagina Locație
│   └── rezervari/page.tsx   # Pagina Rezervări
├── components/
│   ├── Navigation.tsx       # Navbar sticky
│   ├── Hero.tsx             # Hero section cu video
│   ├── Features.tsx         # Bento grid features
│   ├── Menu.tsx             # Meniu complet cu categorii
│   ├── About.tsx            # Secțiune despre noi
│   ├── Footer.tsx           # Footer cu wave SVG
│   ├── ChatWidget.tsx       # Barista Bot integration
│   ├── Preloader.tsx        # Loading animation
│   ├── SmoothScroll.tsx     # Lenis wrapper
│   └── ThemeToggle.tsx      # Dark mode toggle
├── lib/
│   ├── hooks/useScrollAnimation.ts  # Intersection Observer hook
│   └── knowledge-base.ts    # Date pentru ChatWidget
└── public/
    └── hero-coffee.mp4      # Video pentru Hero
```

## Design System

### Culori (CSS Variables)

```css
:root {
  --primary: #14B8A6;        /* Teal */
  --primary-dark: #0D9488;
  --secondary: #F97316;      /* Orange */
  --secondary-dark: #EA580C;
  --background: #FAFAFA;
  --foreground: #1F2937;
  --glass-bg: rgba(255, 255, 255, 0.85);
}
```

### Tailwind Classes

```typescript
// Primary button
<button className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">

// Secondary button
<button className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-full">

// Glassmorphism card
<div className="glass glass-hover rounded-2xl p-6">

// Section container
<section className="py-20 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
```

### Tipografie

```typescript
// Headings - Plus Jakarta Sans
<h1 className="text-6xl md:text-8xl font-bold">   // Hero
<h2 className="text-4xl md:text-5xl font-bold">   // Section titles
<h3 className="text-3xl font-bold">              // Card titles
<h4 className="text-xl font-bold">               // Subtitles

// Body - Inter
<p className="text-lg text-gray-700 leading-relaxed">
```

## Convenții Componente

### Client Components

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function ComponentName() {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Content */}
      </div>
    </section>
  );
}
```

### Server Components (default)

```typescript
// Fără 'use client' - componente server by default
export default function ComponentName() {
  return (
    <section>
      {/* Content static */}
    </section>
  );
}
```

### Scroll Animations

```typescript
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

export default function Component() {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Content animat la scroll */}
    </div>
  );
}
```

## Patterns Comune

### Grid Responsive

```typescript
// 3 coloane pe desktop, 1 pe mobile
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// 2 coloane cu alignment
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
```

### Imagini cu Fallback

```typescript
<img
  src={item.image}
  alt={item.name}
  className="w-full h-48 object-cover"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  }}
/>
```

### Links și Butoane CTA

```typescript
// Link intern
<a href="/locatie" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full">

// Anchor link
<a href="#menu" className="px-8 py-4 bg-secondary text-white rounded-full">
```

## Meniu - Structura Datelor

```typescript
const menuItems = [
  {
    name: 'Espresso',
    price: 12,
    category: 'Espresso',
    description: 'Shot dublu de espresso intens',
    ingredients: '18g cafea, 36ml extract',
    image: 'https://images.unsplash.com/...',
    vegan: true,
  },
  // ... alte produse
];

const categories = ['Espresso', 'Specialty', 'Vegan', 'Cold', 'Alternative', 'Pastry'];
```

## Dark Mode

```typescript
// Toggle theme
const toggleTheme = () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
};

// Conditional classes
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

## Hero cu Video Background

```typescript
<section className="relative min-h-screen">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/hero-coffee.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
  <div className="relative z-10">
    {/* Content */}
  </div>
</section>
```

## Sticky Navigation

```typescript
<nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    {/* Logo + Links */}
  </div>
</nav>
```

## Footer cu Wave SVG

```typescript
<footer>
  {/* Wave separator */}
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
    <path d="M321.39,56.44c58-10.79..." fill="#3D2B1F" />
  </svg>

  {/* Content */}
  <div className="bg-gradient-to-b from-[#3D2B1F] to-[#1A1A1A] text-gray-300 py-16">
    {/* Grid 3 coloane */}
  </div>
</footer>
```

## Resurse Imagini

Folosim Unsplash pentru imagini royalty-free:

```typescript
// URL cu parametri de optimizare
const imageUrl = 'https://images.unsplash.com/photo-ID?w=800&auto=format&fit=crop';
```

## Performanță

```css
/* GPU acceleration pentru animații */
.gpu-accelerate {
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
}
```
