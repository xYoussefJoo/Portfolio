import { ScrollReveal } from "./ScrollReveal";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "~/context/LanguageContext";

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-cyber transition-colors duration-350">
      {/* Decorative radial glow */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#8A60F1]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
            {t.testimonials.tag}
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            {t.testimonials.titleLine1} <br />
            <span className="bg-gradient-to-r from-[#8A60F1] to-fuchsia-500 bg-clip-text text-transparent">{t.testimonials.titleGradient}</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light">
            {t.testimonials.description}
          </p>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.testimonials.items.map((test, idx) => (
            <ScrollReveal
              key={idx}
              variant="scale-in"
              delay={idx * 150}
              className="h-full flex"
            >
              <div className="w-full glass-card rounded-3xl p-8 hover:border-[#8A60F1]/40 transition-all duration-500 group flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Rating Stars and Quote Icon */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#8A60F1] fill-current" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-[#8A60F1]/25 group-hover:text-[#8A60F1]/50 transition-colors" />
                  </div>

                  <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-light italic">
                    "{test.text}"
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--card-border)] mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    {/* Placeholder Avatar with Gradient */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#8A60F1] to-fuchsia-500 flex items-center justify-center font-bold text-white text-xs shadow-[0_0_15px_rgba(138,96,241,0.3)]">
                      {test.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] tracking-wide text-sm">{test.name}</h4>
                      <span className="text-xs text-[var(--text-muted)] block font-light mt-0.5">
                        {test.role} • <span className="text-[#8A60F1] font-medium">{test.company}</span>
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] font-mono hidden sm:inline-block">
                    {test.country}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
