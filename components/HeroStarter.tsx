/**
 * 🎯 HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea MINIMALISTĂ de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

export default function HeroStarter() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 to-amber-700">
      <div className="max-w-4xl mx-auto px-6 text-center text-white">
        {/* TITLU PRINCIPAL */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Vibe Caffè
        </h1>

        {/* SUBTITLU */}
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          Cafeaua ta preferată, perfect preparată
        </p>

        {/* BUTON CTA */}
        <a
          href="#contact"
          className="inline-block px-8 py-4 bg-white text-amber-900 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
        >
          Începe acum
        </a>
      </div>
    </section>
  );
}
