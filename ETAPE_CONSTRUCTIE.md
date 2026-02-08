# 🏗️ Etape de Construcție - Vibe Coffee Website

> **Ghid complet pentru cursanți:** Cum să construiești site-ul pas cu pas, în 2 săptămâni

---

## 📋 Cuprins

1. [Pregătirea Mediului](#-săptămâna-1-zi-1-pregătirea-mediului)
2. [Setup Proiect Next.js](#-săptămâna-1-zi-1-setup-proiect-nextjs)
3. [Stilizare Globală & Culori](#-săptămâna-1-zi-2-stilizare-globală--culori)
4. [Hero Section](#-săptămâna-1-zi-2-3-hero-section)
5. [Features Section](#-săptămâna-1-zi-3-4-features-section)
6. [Menu Component](#-săptămâna-1-zi-4-5-menu-component)
7. [About Section](#-săptămâna-2-zi-1-about-section)
8. [Footer](#-săptămâna-2-zi-1-footer)
9. [Pagina Locație](#-săptămâna-2-zi-2-pagina-locație)
10. [Pagina Rezervări](#-săptămâna-2-zi-3-4-pagina-rezervări)
11. [Deploy pe Vercel](#-săptămâna-2-zi-5-deploy-pe-vercel)

---

# 📅 SĂPTĂMÂNA 1: Structura de Bază

## 🔧 Săptămâna 1, Zi 1: Pregătirea Mediului

### **Pasul 1.1: Instalează Node.js**

```bash
# Verifică dacă ai Node.js instalat
node --version  # trebuie să vezi v18 sau mai nou

# Dacă nu ai, descarcă de la nodejs.org
```

### **Pasul 1.2: Instalează un Editor de Cod**

- Descarcă **VS Code** de la code.visualstudio.com
- Instalează extensia "ES7+ React/Redux/React-Native snippets"
- Instalează extensia "Tailwind CSS IntelliSense"

---

## 🚀 Săptămâna 1, Zi 1: Setup Proiect Next.js

### **Pasul 2.1: Creează Proiectul**

```bash
# Deschide terminalul și navighează unde vrei să creezi proiectul
cd ~/Desktop

# Creează proiect Next.js nou
npx create-next-app@latest vibe-website

# Răspunde la întrebări:
# ✅ TypeScript? → Yes
# ✅ ESLint? → Yes
# ✅ Tailwind CSS? → Yes
# ✅ `src/` directory? → No
# ✅ App Router? → Yes
# ✅ customize import alias? → No
```

### **Pasul 2.2: Pornește Serverul de Development**

```bash
cd vibe-website
npm run dev

# Deschide browser la http://localhost:3000
# Ar trebui să vezi pagina default Next.js
```

### **Pasul 2.3: Creează Structura de Foldere**

```bash
# Creează folder pentru componente
mkdir components

# Structura finală:
# vibe-website/
# ├── app/              # Pagini (Next.js App Router)
# ├── components/       # Componente refolosibile
# ├── public/           # Fișiere statice (imagini, etc.)
# └── package.json
```

---

## 🎨 Săptămâna 1, Zi 2: Stilizare Globală & Culori

### **Pasul 3.1: Definește Culorile în `app/globals.css`**

Deschide `app/globals.css` și **șterge tot conținutul**. Apoi adaugă:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 🎨 VARIABILE CSS - Culorile site-ului */
:root {
  /* Culori principale */
  --primary: #14B8A6;           /* Teal - culoarea principală */
  --primary-dark: #0D9488;      /* Teal mai întunecat (hover) */
  --secondary: #F97316;         /* Orange - culoarea secundară */
  --secondary-dark: #EA580C;    /* Orange mai întunecat (hover) */

  /* Culori de fundal */
  --background: #FAFAFA;         /* Gri foarte deschis */
  --foreground: #1F2937;         /* Gri foarte întunecat (text) */

  /* Glassmorphism - efectul de sticlă */
  --glass-bg: rgba(255, 255, 255, 0.85);      /* Fundal semi-transparent */
  --glass-border: rgba(255, 255, 255, 0.3);   /* Bordură subtilă */
}

/* 🌙 Dark mode (opțional - pentru viitor) */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #1F2937;
    --foreground: #F9FAFB;
  }
}

/* 🪟 CLASA GLASSMORPHISM - Efectul de sticlă blurata */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);              /* Blurează ce e în spate */
  -webkit-backdrop-filter: blur(10px);      /* Pentru Safari */
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}

/* Hover state pentru glass */
.glass:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* 🎯 STILURI GENERALE */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}
```

**💡 Ce face fiecare parte:**
- `:root` = definește variabile CSS globale (ca niște constante)
- `--primary`, `--secondary` = culorile principale ale site-ului
- `.glass` = clasa pentru efectul de sticlă blurată (glassmorphism)
- `backdrop-filter: blur(10px)` = blurează fundalul din spatele elementului

---

## 🎯 Săptămâna 1, Zi 2-3: Hero Section

### **Pasul 4.1: Creează Componenta Hero**

Creează fișierul `components/Hero.tsx`:

```tsx
/**
 * 🎯 HERO SECTION - Prima secțiune pe care o vede utilizatorul
 */

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🖼️ BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay întunecat pentru contrast */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 🪟 GLASSMORPHISM CARD */}
      <div className="glass relative z-10 max-w-4xl mx-auto px-6 py-16 md:px-12 md:py-20 rounded-3xl text-center">
        {/* 📝 TITLU */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
          Cafeaua ta preferată,{' '}
          <span className="text-secondary" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>perfect preparată</span>
        </h1>

        {/* 📄 SUBTITLU */}
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto font-medium" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6)' }}>
          Descoperă aromele autentice ale cafelei de specialitate într-un ambient modern și prietenos
        </p>

        {/* 🔘 CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#menu"
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Vezi Meniul
          </a>
          <a
            href="/locatie"
            className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Vizitează-ne
          </a>
        </div>
      </div>

      {/* ⬇️ SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
```

**💡 Concepte Importante:**

- **`className`** = cum adaugi CSS în React (în loc de `class`)
- **Tailwind CSS** = framework CSS cu clase predefinite
  - `min-h-screen` = înălțime minimă 100vh (full screen)
  - `flex items-center justify-center` = centrează conținutul
  - `text-5xl` = text foarte mare (48px)
  - `md:text-7xl` = pe desktop devine 72px
  - `hover:bg-primary-dark` = la hover schimbă culoarea
- **`style={{ }}` în JSX** = stil inline pentru valori dinamice
- **`z-10`, `z-0`** = z-index (stratificare elemente)

### **Pasul 4.2: Adaugă Hero în Homepage**

Deschide `app/page.tsx` și **înlocuiește tot conținutul** cu:

```tsx
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

**💡 Concepte:**
- **`import`** = importă componenta Hero
- **`@/`** = shortcut pentru root folder (aliasing)
- **`<Hero />`** = folosește componenta (self-closing tag)

### **Pasul 4.3: Testează**

Salvează fișierele și verifică în browser:
- Ar trebui să vezi Hero section cu fundal de cafea
- Textul alb cu shadow
- 2 butoane orange și teal
- Efectul de glassmorphism (blur)

**🐛 Debugging:**
- Dacă nu vezi nimic → verifică că serverul rulează (`npm run dev`)
- Dacă culorile nu merg → verifică `globals.css`
- Dacă imaginea lipsește → verifică link-ul Unsplash

---

## ⭐ Săptămâna 1, Zi 3-4: Features Section

### **Pasul 5.1: Creează Componenta Features**

Creează `components/Features.tsx`:

```tsx
/**
 * ⭐ FEATURES SECTION - Prezintă 3 avantaje principale
 */

export default function Features() {
  // 📊 DATE PENTRU CARDURI
  const features = [
    {
      icon: '☕',
      title: 'Cafea de specialitate',
      description: 'Boabe proaspăt prăjite din plantații selectate, pentru aroma perfectă în fiecare ceașcă',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
    },
    {
      icon: '🥐',
      title: 'Patiserie artizanală',
      description: 'Deserturi și produse de patiserie pregătite zilnic cu ingrediente premium',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop',
    },
    {
      icon: '🪴',
      title: 'Ambient relaxant',
      description: 'Spațiu modern și primitor, perfect pentru lucru, studiu sau întâlniri',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 📝 TITLU SECȚIUNE */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            De ce <span className="text-primary">Vibe Coffee</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experiență unică, ingrediente premium, atmosferă perfectă
          </p>
        </div>

        {/* 🎴 GRID CARDURI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-3xl overflow-hidden group cursor-pointer"
            >
              {/* IMAGINE CU ICON PESTE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* ICON CIRCULAR PESTE IMAGINE */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  {feature.icon}
                </div>
              </div>

              {/* TEXT */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**💡 Concepte Noi:**

- **`const features = [...]`** = array cu obiecte (date)
- **`.map()`** = metodă JavaScript care "transformă" un array
  - Ia fiecare element din array
  - Returnează JSX pentru fiecare element
  - Rezultat: 3 carduri generate automat
- **`key={index}`** = identificator unic pentru fiecare element (obligatoriu în React)
- **`group`** = Tailwind class pentru hover effects pe părinte
- **`group-hover:scale-110`** = la hover pe părinte, copilul crește 110%

**📚 De ce folosim .map()?**

Compară:

```tsx
// ❌ FĂRĂ .map() - cod repetat (DRY violation)
<div>Card 1</div>
<div>Card 2</div>
<div>Card 3</div>

// ✅ CU .map() - un singur template, date separate
{features.map(feature => <div>{feature.title}</div>)}
```

### **Pasul 5.2: Adaugă Features în Homepage**

`app/page.tsx`:

```tsx
import Hero from '@/components/Hero';
import Features from '@/components/Features';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}
```

---

## ☕ Săptămâna 1, Zi 4-5: Menu Component

### **Pasul 6.1: Creează Componenta Menu (Client Component)**

Creează `components/Menu.tsx`:

**⚠️ IMPORTANT:** Adaugă `'use client';` la început!

```tsx
'use client';

/**
 * ☕ MENU COMPONENT - Meniul complet cu produse
 *
 * IMPORTANT: 'use client' = această componentă rulează în browser
 * De ce? Pentru că folosim onError (event handler) pe imagini
 */

export default function Menu() {
  // 📊 ARRAY CU TOATE PRODUSELE
  const menuItems = [
    {
      name: 'Espresso',
      price: 12,
      category: 'Espresso',
      description: 'Shot dublu de espresso intens, aromat',
      ingredients: '18g cafea, 36ml extract',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop',
      vegan: true,
    },
    {
      name: 'Cappuccino',
      price: 15,
      category: 'Espresso',
      description: 'Espresso cu spumă de lapte cremoasă',
      ingredients: 'Espresso + lapte spumat',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop',
      vegan: false,
    },
    // ... adaugă restul produselor (vezi fișierul complet)
  ];

  // 📂 CATEGORII UNICE
  const categories = ['Espresso', 'Specialty', 'Vegan', 'Cold', 'Alternative', 'Pastry'];

  return (
    <section id="menu" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meniul <span className="text-primary">nostru</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cafea de specialitate, preparată cu grijă de bariștii noștri certificați
          </p>
        </div>

        {/* LOOP PRIN CATEGORII */}
        {categories.map((category) => (
          <div key={category} className="mb-16">
            {/* TITLU CATEGORIE */}
            <h3 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-primary/20 pb-3">
              {category === 'Espresso' && '☕ Espresso Classics'}
              {category === 'Specialty' && '🌟 Specialty Coffee'}
              {category === 'Vegan' && '🌱 Opțiuni Vegane'}
              {category === 'Cold' && '❄️ Cold Brew & Iced'}
              {category === 'Alternative' && '🫖 Alternative'}
              {category === 'Pastry' && '🥐 Patiserie Artizanală'}
            </h3>

            {/* GRID PRODUSE DIN CATEGORIE */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems
                .filter((item) => item.category === category)
                .map((item, index) => (
                  <div
                    key={index}
                    className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    {/* IMAGINE PRODUS */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => {
                          // ERROR HANDLING - dacă imaginea nu se încarcă
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.fallback-icon')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'fallback-icon absolute inset-0 flex items-center justify-center text-6xl';
                            fallback.textContent = '☕';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                      {/* BADGE VEGAN */}
                      {item.vegan && (
                        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Vegan
                        </div>
                      )}
                    </div>

                    {/* DETALII PRODUS */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-bold text-foreground">{item.name}</h4>
                        <span className="text-2xl font-bold text-secondary">{item.price} lei</span>
                      </div>
                      <p className="text-gray-600 mb-3 leading-relaxed">{item.description}</p>
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Ingrediente:</span> {item.ingredients}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**💡 Concepte AVANSATE:**

1. **`'use client'`** = React Server Components vs Client Components
   - **Server Components** (default) = rulează pe server, nu au interactivitate
   - **Client Components** = rulează în browser, au event handlers (onClick, onError, etc.)
   - Folosim `'use client'` pentru că avem `onError` handler

2. **`.filter()`** = metodă JavaScript care filtrează un array
   ```js
   menuItems.filter(item => item.category === 'Espresso')
   // Returnează doar produsele din categoria Espresso
   ```

3. **Chaining: `.filter().map()`** = combină două metode
   ```js
   menuItems
     .filter(item => item.category === category)  // Filtrează
     .map(item => <div>{item.name}</div>)         // Transformă în JSX
   ```

4. **Error Handling pe imagine** = `onError`
   - Dacă imaginea nu se încarcă → ascunde `<img>`
   - Adaugă fallback emoji ☕

### **Pasul 6.2: Adaugă Menu în Homepage**

`app/page.tsx`:

```tsx
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Menu from '@/components/Menu';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Menu />
    </main>
  );
}
```

### **Pasul 6.3: Creează lista COMPLETĂ de 30 produse**

În fișierul `components/Menu.tsx`, array-ul `menuItems` trebuie să conțină toate cele 30 de produse.

**💡 Tip:** Copiază lista completă din fișierul final `Menu.tsx` din repository.

**Categorii și produse:**
- **Espresso**: Espresso, Cappuccino, Latte, Americano, Flat White, Macchiato (6 produse)
- **Specialty**: Affogato, Mocha, Caramel Latte, Vanilla Latte (4 produse)
- **Vegan**: Almond Milk Latte, Oat Milk Cappuccino, Coconut Milk Mocha, Soy Latte (4 produse)
- **Cold**: Cold Brew, Iced Latte, Nitro Cold Brew, Iced Americano (4 produse)
- **Alternative**: Matcha Latte, Chai Latte (2 produse)
- **Pastry**: Croissant, Pain au Chocolat, Brownie, Cheesecake, Tiramisu, Eclair, Muffin, Cookie, Tarta, Affogato (10 produse)

---

# 📅 SĂPTĂMÂNA 2: Pagini Suplimentare & Deploy

## 📖 Săptămâna 2, Zi 1: About Section

### **Pasul 7.1: Creează Componenta About**

`components/About.tsx`:

```tsx
export default function About() {
  return (
    <section className="py-20 px-6 bg-white/50">
      <div className="max-w-7xl mx-auto">
        {/* GRID 2 COLOANE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* IMAGINE */}
          <div className="order-2 md:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop"
                alt="Interior cafenea"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="order-1 md:order-2">
            <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary font-semibold rounded-full mb-4">
              Despre Noi
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Pasiunea pentru cafea,{' '}
              <span className="text-primary">din 2020</span>
            </h2>

            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Vibe Coffee a început din dorința de a aduce experiența autentică
              a cafelei de specialitate în inima orașului. Fiecare ceașcă este
              pregătită cu grijă de bariștii noștri experimentați.
            </p>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Colaborăm direct cu plantații din America de Sud și Africa,
              selectând doar cele mai bune boabe, prăjite la perfecție pentru a
              scoate în evidență notele unice de aromă.
            </p>

            {/* LISTA BENEFICII */}
            <ul className="space-y-3 mb-8">
              {[
                'Boabe proaspăt prăjite săptămânal',
                'Bariști certificați internațional',
                'Produse locale și sustenabile',
                'WiFi gratuit & loc de muncă',
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/rezervari"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Programează o Vizită
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**💡 Concepte:**
- **`order-2 md:order-1`** = schimbă ordinea pe mobile vs desktop
  - Mobile: text sus, imagine jos
  - Desktop: imagine stânga, text dreapta
- **Grid cu 2 coloane** = `grid grid-cols-1 md:grid-cols-2`

---

## 📧 Săptămâna 2, Zi 1: Footer

### **Pasul 8.1: Creează Footer**

`components/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* COLOANA 1 - LOGO & DESPRE */}
        <div>
          <h3 className="text-2xl font-bold text-primary mb-4">Vibe Coffee</h3>
          <p className="text-gray-400 leading-relaxed">
            Cafea de specialitate în inima orașului. Boabe proaspete, bariști
            certificați, atmosferă perfectă.
          </p>
        </div>

        {/* COLOANA 2 - LINK-URI */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Link-uri rapide</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#menu" className="hover:text-primary transition-colors">Meniu</a></li>
            <li><a href="/locatie" className="hover:text-primary transition-colors">Locație</a></li>
            <li><a href="/rezervari" className="hover:text-primary transition-colors">Rezervări</a></li>
          </ul>
        </div>

        {/* COLOANA 3 - CONTACT */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>📍 Str. Cafenelei 123, București</li>
            <li>📞 0721 234 567</li>
            <li>✉️ hello@vibecoffee.ro</li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; 2024 Vibe Coffee. Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
}
```

### **Pasul 8.2: Adaugă About și Footer în Homepage**

`app/page.tsx`:

```tsx
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Menu from '@/components/Menu';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Menu />
      <About />
      <Footer />
    </main>
  );
}
```

---

## 📍 Săptămâna 2, Zi 2: Pagina Locație

### **Pasul 9.1: Creează Folder și Pagină**

Next.js folosește **file-based routing**:
- `app/page.tsx` = homepage (/)
- `app/locatie/page.tsx` = /locatie

```bash
# Creează folder
mkdir app/locatie

# Creează pagina
touch app/locatie/page.tsx
```

### **Pasul 9.2: Scrie Pagina Locație**

`app/locatie/page.tsx`:

```tsx
import Link from 'next/link';

export default function LocatiePage() {
  // 🖼️ GALERIE IMAGINI
  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop',
      title: 'Interior elegant',
      description: 'Spațiu modern și primitor',
    },
    {
      url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop',
      title: 'Zona de lucru',
      description: 'Perfect pentru laptop și WiFi gratuit',
    },
    // ... adaugă restul imaginilor (6 total)
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HERO LOCAȚIE */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <Link href="/" className="inline-block mb-4 hover:text-primary transition-colors">
            ← Înapoi
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold">Vizitează-ne</h1>
        </div>
      </section>

      {/* INFORMAȚII & HARTĂ */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* CONTACT INFO */}
            <div className="glass p-8 rounded-3xl">
              <h2 className="text-3xl font-bold text-foreground mb-6">Informații</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>📍 Adresă:</strong> Str. Cafenelei 123, București</p>
                <p><strong>📞 Telefon:</strong> 0721 234 567</p>
                <p><strong>✉️ Email:</strong> hello@vibecoffee.ro</p>
                <p><strong>🕐 Program:</strong> Luni - Duminică, 08:00 - 22:00</p>
              </div>
            </div>

            {/* HARTĂ PLACEHOLDER */}
            <div className="glass p-8 rounded-3xl">
              <h2 className="text-3xl font-bold text-foreground mb-6">Hartă</h2>
              <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                <p className="text-gray-500">Google Maps embed aici</p>
              </div>
            </div>
          </div>

          {/* GALERIE FOTO */}
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Galerie Foto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                    <p className="text-sm">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

**💡 Concepte:**
- **File-based routing** = foldere în `app/` devin rute automat
- **Link component** = folosește `<Link>` din Next.js pentru navigare (nu `<a>`)
- **Hover overlay** = gradient peste imagine care apare la hover

---

## 📅 Săptămâna 2, Zi 3-4: Pagina Rezervări (INTERACTIVĂ)

### **Pasul 10.1: Creează Pagina Rezervări**

```bash
mkdir app/rezervari
touch app/rezervari/page.tsx
```

`app/rezervari/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RezervarePage() {
  // 📊 STATE MANAGEMENT
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
  });
  const [submitted, setSubmitted] = useState(false);

  // 📅 GENERARE ZILE (următoarele 14 zile)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  // ⏰ SLOT-URI ORARE
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  // 📝 FORMAT DATA
  const formatDate = (date: Date) => {
    const days = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
    const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  // 🎯 HANDLE SUBMIT
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Rezervare:', { date: selectedDate, time: selectedTime, ...formData });
    setSubmitted(true);
  };

  // ✅ ECRAN CONFIRMARE
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-20">
        <div className="glass max-w-2xl w-full rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Rezervare confirmată!</h1>
          <p className="text-xl text-gray-600 mb-8">Vă așteptăm cu drag la Vibe Coffee</p>

          <div className="glass bg-white/50 rounded-2xl p-6 mb-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Data & Ora</p>
                <p className="text-lg font-semibold text-foreground">{selectedDate} la {selectedTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Număr persoane</p>
                <p className="text-lg font-semibold text-foreground">{formData.guests} persoane</p>
              </div>
            </div>
          </div>

          <Link href="/" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
            Înapoi Acasă
          </Link>
        </div>
      </div>
    );
  }

  // 📋 FORMULAR REZERVARE
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6 text-primary hover:text-primary-dark transition-colors">
            ← Înapoi
          </Link>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Rezervă o <span className="text-primary">masă</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-12">
          {/* STEP 1: DATA */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
              Selectează data
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableDates.map((date, index) => {
                const dateStr = formatDate(date);
                const isSelected = selectedDate === dateStr;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      isSelected ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white hover:border-primary'
                    }`}
                  >
                    <div className="text-2xl font-bold">{date.getDate()}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: ORA */}
          {selectedDate && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                Selectează ora
              </h2>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-xl border-2 font-semibold transition-all duration-300 ${
                        isSelected ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white hover:border-primary'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DETALII */}
          {selectedDate && selectedTime && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                Detalii rezervare
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nume complet *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                    placeholder="Ion Popescu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                    placeholder="ion@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                    placeholder="0712 345 678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Număr persoane *</label>
                  <select
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'persoană' : 'persoane'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* SUBMIT */}
          {selectedDate && selectedTime && (
            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              Confirmă rezervarea
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
```

**💡 Concepte AVANSATE:**

1. **useState Hook** = gestionează starea componentei
   ```tsx
   const [value, setValue] = useState('initial');
   // value = valoarea curentă
   // setValue = funcție pentru a actualiza valoarea
   ```

2. **Conditional Rendering** = afișează ceva doar dacă condiția e true
   ```tsx
   {selectedDate && <div>Afișează ora</div>}
   // Afișează div-ul DOAR dacă selectedDate are valoare
   ```

3. **Form Handling**
   - `onSubmit` = când se submitează formularul
   - `e.preventDefault()` = previne refresh-ul paginii
   - `onChange` = când se schimbă valoarea input-ului

4. **Multi-step Form** = formular cu pași multipli
   - Step 1: alegi data
   - Step 2: alegi ora (apare DOAR dacă ai ales data)
   - Step 3: completezi detalii (apare DOAR dacă ai ales data + ora)

---

## 🚀 Săptămâna 2, Zi 5: Deploy pe Vercel

### **Pasul 11.1: Creează Cont GitHub**

1. Mergi pe github.com
2. Creează cont (dacă nu ai)
3. Verifică email-ul

### **Pasul 11.2: Instalează Git**

```bash
# Verifică dacă ai git
git --version

# Dacă nu ai, descarcă de la git-scm.com
```

### **Pasul 11.3: Inițializează Git Repository**

```bash
# În folder-ul proiectului
cd vibe-website

# Inițializează git
git init

# Adaugă toate fișierele
git add .

# Creează primul commit
git commit -m "Initial commit: Vibe Coffee website complete"
```

### **Pasul 11.4: Creează Repository pe GitHub**

```bash
# Instalează GitHub CLI (sau folosește interfața web)
gh auth login

# Creează repository și push
gh repo create vibe-website --public --source=. --push
```

**SAU manual:**
1. Pe GitHub.com: New Repository
2. Nume: vibe-website
3. Copiază comenzile de push:
```bash
git remote add origin https://github.com/USERNAME/vibe-website.git
git branch -M main
git push -u origin main
```

### **Pasul 11.5: Deploy pe Vercel**

**Opțiunea 1: Vercel CLI**

```bash
# Instalează Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Răspunde la întrebări:
# - Link with existing project? → No
# - Project name → vibe-website
# - Directory → ./
# - Override settings? → No
```

**Opțiunea 2: Vercel Website (mai simplu)**

1. Mergi pe vercel.com
2. Sign up cu GitHub
3. Click "New Project"
4. Import repository "vibe-website"
5. Click "Deploy"
6. Așteaptă 1-2 minute
7. Primești URL: `https://vibe-website-abc123.vercel.app`

### **Pasul 11.6: Auto-Deploy Setup**

Vercel detectează automat Next.js și configurează:
- ✅ Build command: `npm run build`
- ✅ Output directory: `.next`
- ✅ Install command: `npm install`

**De acum înainte:**
```bash
# Faci o modificare
git add .
git commit -m "Update hero text"
git push

# → Vercel deployează AUTOMAT în ~1 minut! 🎉
```

---

## 🎓 Recapitulare Finală

### **Ce ai învățat:**

**Săptămâna 1:**
- ✅ Setup Next.js + TypeScript + Tailwind
- ✅ CSS Variables & Glassmorphism
- ✅ React Components (Hero, Features, Menu)
- ✅ Props & Array.map()
- ✅ Client vs Server Components
- ✅ Tailwind CSS utility classes

**Săptămâna 2:**
- ✅ File-based routing (Next.js App Router)
- ✅ useState Hook
- ✅ Multi-step forms
- ✅ Conditional rendering
- ✅ Git & GitHub
- ✅ Vercel deployment

### **Skills dobândite:**

1. **HTML/JSX** - structură pagină web
2. **CSS/Tailwind** - stilizare modernă
3. **TypeScript** - type safety
4. **React** - componente, hooks, state
5. **Next.js** - routing, optimization
6. **Git** - version control
7. **Deployment** - hosting production

---

## 📚 Resurse Suplimentare

### **Documentație Oficială:**
- Next.js: nextjs.org/docs
- React: react.dev
- Tailwind CSS: tailwindcss.com/docs
- TypeScript: typescriptlang.org/docs

### **Tutoriale Video:**
- YouTube: "Next.js 15 Tutorial"
- YouTube: "Tailwind CSS Crash Course"
- YouTube: "React Hooks Explained"

### **Practice Projects:**
După ce termini Vibe Coffee, construiește:
1. **Todo App** - state management practice
2. **Weather App** - API calls & data fetching
3. **E-commerce** - complex forms & routing

---

## 🐛 Troubleshooting Comun

### **Error: Module not found**
```bash
# Șterge node_modules și reinstalează
rm -rf node_modules package-lock.json
npm install
```

### **Error: Port 3000 already in use**
```bash
# Oprește procesul pe port 3000
lsof -ti:3000 | xargs kill -9

# Sau pornește pe alt port
npm run dev -- -p 3001
```

### **Tailwind styles nu funcționează**
- Verifică că ai `@tailwind` directives în `globals.css`
- Restart dev server: Ctrl+C, apoi `npm run dev`

### **Imaginile Unsplash nu se încarcă**
- Verifică conexiunea internet
- Înlocuiește cu alte imagini de pe Unsplash
- Sau folosește imagini locale din `public/`

### **TypeScript errors**
- Ignoră warning-urile (linii galbene)
- Fixează doar errors (linii roșii)
- Rulează `npx tsc --noEmit` pentru type checking

---

## ✅ Checklist Final

Înainte de a considera proiectul complet:

- [ ] Toate componentele create (Hero, Features, Menu, About, Footer)
- [ ] Pagini suplimentare funcționale (/locatie, /rezervari)
- [ ] Toate imaginile se încarcă corect
- [ ] Site responsive pe mobile, tablet, desktop
- [ ] Formular rezervări funcțional
- [ ] Fără erori în consolă
- [ ] Git repository creat
- [ ] Push pe GitHub
- [ ] Deploy pe Vercel
- [ ] URL live funcțional
- [ ] Auto-deploy configurat

---

## 🎉 Felicitări!

Ai construit un site web modern, profesional, cu:
- 🎨 Design glassmorphism
- 📱 Fully responsive
- ⚡ Next.js 15 optimization
- 🔥 Interactive features
- 🚀 Production-ready deployment

**Next Steps:**
1. Adaugă propriile customizări
2. Experimentează cu alte culori
3. Adaugă mai multe produse
4. Integrează un API real pentru rezervări
5. Construiește următorul proiect! 🚀

---

**Succes la curs! ☕💻**

---

# 📅 SĂPTĂMÂNA 3: Bază de Date & Panou Admin

> **Obiectiv:** Conectăm formularul de rezervări la o bază de date reală (Supabase) și construim un panou admin pentru gestionarea rezervărilor.

## Ce vei învăța în Săptămâna 3:
- ✅ Supabase (PostgreSQL-as-a-Service) - bază de date în cloud
- ✅ API Routes în Next.js (POST, GET, PATCH, DELETE)
- ✅ Fetch API - comunicare frontend ↔ backend
- ✅ CRUD complet (Create, Read, Update, Delete)
- ✅ useMemo hook - optimizare performanță
- ✅ Panou admin cu filtrare, căutare și acțiuni

---

## 🗄️ Săptămâna 3, Zi 1: Setup Supabase

### **Pasul 12.1: Creează Cont Supabase**

1. Mergi pe [supabase.com](https://supabase.com)
2. Creează cont (Sign up cu GitHub)
3. Click "New Project"
4. Configurează:
   - **Organization**: alege sau creează una
   - **Name**: `vibe-caffe`
   - **Database Password**: alege o parolă puternică
   - **Region**: EU West (cel mai aproape de România)
5. Așteaptă 1-2 minute până se creează

### **Pasul 12.2: Creează Tabelul `rezervari`**

Din Supabase Dashboard → SQL Editor → New Query:

```sql
CREATE TABLE rezervari (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  guests INTEGER NOT NULL DEFAULT 2,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permite citire/scriere pentru utilizatori anonimi (site-ul nostru)
ALTER TABLE rezervari ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON rezervari
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous select" ON rezervari
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous update" ON rezervari
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous delete" ON rezervari
  FOR DELETE TO anon USING (true);
```

**Ce face fiecare parte:**
- `GENERATED ALWAYS AS IDENTITY` = auto-increment ID
- `DEFAULT 'pending'` = statusul inițial al fiecărei rezervări
- `TIMESTAMPTZ` = data+ora cu timezone
- `ROW LEVEL SECURITY` = protecție la nivel de rând
- `POLICY` = reguli care permit operațiile CRUD

### **Pasul 12.3: Obține Credentialele API**

Din Supabase Dashboard → Settings → API:
- **Project URL**: `https://xxxx.supabase.co`
- **Anon Key** (public): `eyJhbGciOi...`

### **Pasul 12.4: Instalează Supabase Client**

```bash
npm install @supabase/supabase-js
```

### **Pasul 12.5: Configurează `.env.local`**

Creează fișierul `.env.local` în rădăcina proiectului:

```bash
# Supabase - Baza de date pentru rezervări
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

**IMPORTANT:** `.env.local` e deja în `.gitignore` - NU se urcă pe GitHub. Fiecare dezvoltator are propriile credențiale.

### **Pasul 12.6: Creează Client Supabase**

Creează `lib/supabase.ts`:

```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Singleton pattern - o singură instanță în toată aplicația
let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  // Dacă deja avem o instanță, o returnăm (nu creăm alta)
  if (_supabase) return _supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Verificare că env vars sunt configurate
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your-supabase-url-here') {
    throw new Error(
      'Supabase nu este configurat. Adaugă NEXT_PUBLIC_SUPABASE_URL și NEXT_PUBLIC_SUPABASE_ANON_KEY în .env.local'
    );
  }

  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  return _supabase;
}
```

**Concepte:**
- **Singleton pattern** = creezi o singură instanță și o refolosești
- **Lazy initialization** = clientul se creează doar când e necesar (nu la build time)
- **Environment variables** = configurare separată de cod (chei API, URL-uri)
- `NEXT_PUBLIC_` prefix = variabila e disponibilă și pe frontend

---

## 🔌 Săptămâna 3, Zi 2: API Routes (CRUD)

### **Pasul 13.1: Creează API Route**

Creează `app/api/rezervari/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// POST = Crează o rezervare nouă
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, guests, date, time } = body;

    // Validare câmpuri obligatorii
    if (!name || !email || !phone || !guests || !date || !time) {
      return NextResponse.json(
        { error: 'Toate câmpurile sunt obligatorii.' },
        { status: 400 }
      );
    }

    // Salvare în Supabase
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rezervari')
      .insert([{ name, email, phone, guests: Number(guests), date, time }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Eroare la salvarea rezervării.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Rezervare salvată cu succes!', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Eroare de server.' },
      { status: 500 }
    );
  }
}

// GET = Citește toate rezervările (pentru panoul admin)
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rezervari')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Eroare la citirea rezervărilor.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Eroare de server.' },
      { status: 500 }
    );
  }
}

// PATCH = Actualizează statusul unei rezervări
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status: newStatus } = body;

    if (!id || !newStatus || !['confirmed', 'rejected', 'pending'].includes(newStatus)) {
      return NextResponse.json(
        { error: 'ID și status valid sunt obligatorii.' },
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
      return NextResponse.json(
        { error: 'Eroare la actualizarea rezervării.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Eroare de server.' },
      { status: 500 }
    );
  }
}

// DELETE = Șterge o rezervare
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID-ul rezervării este obligatoriu.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from('rezervari')
      .delete()
      .eq('id', Number(id));

    if (error) {
      return NextResponse.json(
        { error: 'Eroare la ștergerea rezervării.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Rezervare ștearsă.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Eroare de server.' },
      { status: 500 }
    );
  }
}
```

**Concepte CRUD:**

| Metoda HTTP | Operație | Ce face |
|-------------|----------|---------|
| `POST` | Create | Creează o rezervare nouă |
| `GET` | Read | Citește toate rezervările |
| `PATCH` | Update | Actualizează statusul |
| `DELETE` | Delete | Șterge o rezervare |

**Alte concepte:**
- `NextRequest` / `NextResponse` = tipuri Next.js pentru request/response
- `request.json()` = citește body-ul request-ului ca JSON
- `searchParams.get('id')` = citește parametri din URL (`?id=5`)
- `.from('rezervari')` = selectează tabelul din Supabase
- `.insert()`, `.select()`, `.update()`, `.delete()` = operații CRUD
- `.eq('id', id)` = filtru WHERE id = valoare
- `.order('created_at', { ascending: false })` = sortare descrescătoare

---

## 📝 Săptămâna 3, Zi 2-3: Conectare Formular la API

### **Pasul 14.1: Modifică `handleSubmit` în `app/rezervari/page.tsx`**

Înlocuiește `console.log` cu un `fetch` real:

```typescript
// ÎNAINTE (Săptămâna 2):
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Rezervare:', { date: selectedDate, time: selectedTime, ...formData });
  setSubmitted(true);
};

// DUPĂ (Săptămâna 3):
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const response = await fetch('/api/rezervari', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: selectedDate,
        time: selectedTime,
        ...formData,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Eroare la trimiterea rezervării.');
    }

    setSubmitted(true);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Eroare la trimitere.');
  } finally {
    setIsLoading(false);
  }
};
```

**Concepte noi:**
- `async/await` = gestionare cod asincron (promisiuni)
- `fetch()` = funcție nativă pentru HTTP requests
- `method: 'POST'` = tipul request-ului
- `headers: { 'Content-Type': 'application/json' }` = trimitem JSON
- `JSON.stringify()` = transformă obiect → string JSON
- `try/catch/finally` = gestionare erori:
  - `try` = încearcă codul
  - `catch` = dacă eșuează, prinde eroarea
  - `finally` = se execută mereu (reface loading state)

### **Pasul 14.2: Adaugă State-uri Noi**

Adaugă lângă celelalte state-uri existente:

```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string>('');
```

### **Pasul 14.3: Afișează Erori și Loading**

În formular, adaugă înainte de butonul Submit:

```tsx
{/* ERROR MESSAGE */}
{error && (
  <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-center">
    {error}
  </div>
)}
```

La butonul Submit, adaugă `disabled` și text dinamic:

```tsx
<button
  type="submit"
  disabled={isLoading}
  className="... disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isLoading ? 'Se trimite...' : 'Confirmă rezervarea'}
</button>
```

### **Pasul 14.4: Testează End-to-End**

1. Pornește dev server: `npm run dev`
2. Mergi pe `localhost:3000/rezervari`
3. Completează formularul și trimite
4. Verifică în Supabase Dashboard → Table Editor → rezervari
5. Rezervarea ar trebui să apară cu status `pending`

---

## 📊 Săptămâna 3, Zi 3-4: Panoul Admin

### **Pasul 15.1: Creează `app/admin/page.tsx`**

Aceasta e cea mai complexă componentă din proiect. O descompunem:

#### Structura fișierului:

```
app/admin/page.tsx
├── Interface TypeScript (Rezervare, FilterType)
├── STATUS_CONFIG (configurare badge-uri)
├── AdminPage component
│   ├── State management (5 state-uri)
│   ├── fetchRezervari() - încarcă date
│   ├── updateStatus() - confirmă/respinge
│   ├── deleteRezervare() - șterge
│   ├── useMemo: filtered - filtrare + căutare
│   ├── useMemo: counts - numărare per status
│   ├── Loading state
│   ├── Error state
│   ├── StatusBadge component
│   ├── ActionButtons component
│   └── Return JSX
│       ├── Header + back link
│       ├── Filters + Search bar + Refresh
│       ├── Results count badge
│       ├── Desktop: <table> view
│       └── Mobile: card view
```

#### Interface TypeScript:

```typescript
interface Rezervare {
  id: number;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'rejected';
  created_at: string;
}

type FilterType = 'all' | 'pending' | 'confirmed' | 'rejected';
```

**Concepte:**
- `interface` = definește structura unui obiect (ce câmpuri are și ce tip)
- `'pending' | 'confirmed' | 'rejected'` = Union Type - poate fi doar una din aceste valori
- `type` = alias pentru un tip (similar cu interface, dar mai simplu)

#### useMemo Hook (optimizare):

```typescript
const filtered = useMemo(() => {
  let result = rezervari;
  // Filtrare pe status
  if (filter !== 'all') {
    result = result.filter(r => r.status === filter);
  }
  // Căutare text
  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      r.email.toLowerCase().includes(q)
    );
  }
  return result;
}, [rezervari, filter, search]);
```

**Concepte:**
- `useMemo` = memoizare - recalculează DOAR când dependențele se schimbă
- `[rezervari, filter, search]` = dependențele (se recalculează când acestea se schimbă)
- Fără `useMemo`, filtrarea s-ar rula la fiecare render (chiar dacă datele nu s-au schimbat)

#### Optimistic UI Update:

```typescript
// La updateStatus, actualizăm local IMEDIAT (fără re-fetch):
setRezervari(prev => prev.map(r =>
  r.id === id ? { ...r, status: newStatus } : r
));
```

**Concepte:**
- **Optimistic Update** = actualizezi UI-ul imediat, fără a aștepta confirmarea serverului
- Avantaj: UI responsiv, utilizatorul vede schimbarea instant
- `prev.map()` = creează array nou cu elementul modificat

#### Responsive: Desktop vs Mobile:

```tsx
{/* Desktop: tabel - ascuns pe mobil */}
<div className="hidden md:block">
  <table>...</table>
</div>

{/* Mobil: card-uri - ascuns pe desktop */}
<div className="md:hidden">
  {filtered.map(r => <div className="card">...</div>)}
</div>
```

**Concepte:**
- `hidden md:block` = ascunde pe mobil, afișează pe desktop
- `md:hidden` = afișează pe mobil, ascunde pe desktop
- Tabelele nu funcționează bine pe mobil → folosim card-uri

### **Pasul 15.2: Testează Panoul Admin**

1. Mergi pe `localhost:3000/admin`
2. Verifică:
   - Se încarcă tabelul cu rezervările existente
   - Filtrele funcționează (Toate/In asteptare/Confirmate/Respinse)
   - Căutarea funcționează (după nume, telefon, email)
   - Butoanele de acțiune funcționează (confirmare, respingere, ștergere)
   - Pe mobil apar carduri, pe desktop tabel

---

## 🚀 Săptămâna 3, Zi 5: Deploy cu Variabile de Mediu

### **Pasul 16.1: Commit și Push pe GitHub**

```bash
git add .
git commit -m "Connect reservation form to Supabase + admin panel"
git push origin main
```

### **Pasul 16.2: Adaugă Environment Variables în Vercel**

1. Mergi pe Vercel Dashboard → Project → Settings → Environment Variables
2. Adaugă:
   - `NEXT_PUBLIC_SUPABASE_URL` = URL-ul tău Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Anon key-ul tău

3. Click "Save"
4. Vercel va re-deploya automat

### **Pasul 16.3: Testează pe Producție**

1. Accesează site-ul live
2. Fă o rezervare pe `/rezervari`
3. Verifică pe `/admin` că apare
4. Verifică în Supabase Dashboard că datele sunt salvate

---

## 🗺️ Structura Finală Săptămâna 3

```
vibe-website/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── locatie/page.tsx
│   ├── rezervari/page.tsx     ← MODIFICAT: fetch API în loc de console.log
│   ├── admin/page.tsx         ← NOU: panou admin complet
│   └── api/
│       └── rezervari/
│           └── route.ts       ← NOU: API CRUD (POST/GET/PATCH/DELETE)
├── components/
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Menu.tsx
│   ├── About.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── ThemeToggle.tsx
│   ├── ChatWidget.tsx
│   ├── Preloader.tsx
│   └── SmoothScroll.tsx
├── lib/
│   └── supabase.ts            ← NOU: client Supabase singleton
├── .env.local                 ← NOU: credențiale Supabase (nu pe GitHub!)
└── package.json               ← MODIFICAT: +@supabase/supabase-js
```

---

## 🎓 Recapitulare Săptămâna 3

### **Ce ai învățat:**

**Backend & Database:**
- ✅ Supabase setup (PostgreSQL în cloud)
- ✅ SQL: CREATE TABLE, RLS Policies
- ✅ Environment variables (`.env.local`)
- ✅ Singleton pattern (client Supabase)

**API Development:**
- ✅ Next.js API Routes (`app/api/.../route.ts`)
- ✅ HTTP Methods: POST, GET, PATCH, DELETE
- ✅ Request/Response handling
- ✅ Error handling & validation

**Frontend Advanced:**
- ✅ `fetch()` API - comunicare cu backend
- ✅ `async/await` - cod asincron
- ✅ `useMemo` - optimizare performanță
- ✅ Optimistic UI updates
- ✅ TypeScript interfaces & union types
- ✅ Responsive patterns (tabel vs carduri)

**Full Stack Flow:**
```
User completează formular
    ↓
Frontend trimite POST /api/rezervari
    ↓
API Route validează datele
    ↓
Supabase salvează în PostgreSQL
    ↓
Admin vizualizează pe /admin (GET)
    ↓
Admin confirmă/respinge (PATCH)
    ↓
Admin șterge dacă e nevoie (DELETE)
```
