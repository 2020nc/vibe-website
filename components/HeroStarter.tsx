/**
 * 🎯 HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea MINIMALISTĂ de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

export default function HeroStarter() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/2853793-uhd_3840_2160_24fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />

<div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        {/* TITLU PRINCIPAL */}
        <h1
          className="hero-anim text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight"
          style={{ textShadow: '0 4px 24px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)', animationDelay: '3.4s' }}
        >
          Cafeaua care te trezește
        </h1>

        {/* SUBTITLU */}
        <p
          className="hero-anim text-6xl md:text-7xl lg:text-8xl font-bold italic mb-8 text-white/80"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)', animationDelay: '3.7s' }}
        >
          Vino pentru aromă, rămâi pentru atmosferă
        </p>

        {/* BUTOANE CTA */}
        <div className="hero-anim flex flex-col sm:flex-row gap-6 justify-center" style={{ animationDelay: '4.0s' }}>
          <a
            href="#menu"
            className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Vezi Meniul
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/10"
          >
            Vizitează-ne
          </a>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: 0, animation: 'fadeInUp 0.7s ease-out 4.3s forwards' }}
      >
        <a
          href="#features"
          className="block text-white/75 hover:text-amber-500 transition-colors duration-300 animate-bounce"
          aria-label="Scroll în jos"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
