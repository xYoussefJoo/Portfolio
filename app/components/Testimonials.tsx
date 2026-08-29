import { ScrollReveal } from "./ScrollReveal";
import { useLanguage } from "~/context/LanguageContext";
import { FeedbackCardDeck } from "./FeedbackCardDeck";

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-cyber transition-colors duration-350">
      {/* Decorative radial glow */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#8A60F1]/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-rose-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-2xl text-center md:text-left">
          <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
            {t.testimonials.tag}
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            {t.testimonials.titleLine1} <br />
            <span className="bg-gradient-to-r from-[#8A60F1] via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
              {t.testimonials.titleGradient}
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light">
            {t.testimonials.description}
          </p>
        </ScrollReveal>

        {/* Live Stacked Card Deck */}
        <ScrollReveal variant="scale-in" delay={150}>
          <FeedbackCardDeck />
        </ScrollReveal>
      </div>
    </section>
  );
}
