import { ScrollReveal } from "./ScrollReveal";
import { CheckCircle, Globe, Palette, Sparkles } from "lucide-react";
import { useLanguage } from "~/context/LanguageContext";
import { usePortfolioData } from "~/context/PortfolioDataContext";

export function About() {
  const { t } = useLanguage();
  const { getSection } = usePortfolioData();

  const stats = [
    t.about.stats.years,
    t.about.stats.projects,
    t.about.stats.countries,
    t.about.stats.satisfaction,
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-cyber transition-colors duration-350">
      {/* Decorative radial glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#8A60F1]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
            {getSection("about_tag", t.about.tag)}
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            {getSection("about_title_line1", t.about.titleLine1)} <br />
            <span className="bg-gradient-to-r from-[#8A60F1] to-fuchsia-500 bg-clip-text text-transparent">
              {getSection("about_title_gradient", t.about.titleGradient)}
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light">
            {getSection("about_description", t.about.description)}
          </p>
        </ScrollReveal>

        {/* Bio & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Detailed Bio (Left) */}
          <ScrollReveal variant="slide-in-left" className="lg:col-span-7 h-full flex">
            <div className="w-full glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between space-y-8 hover:border-[#8A60F1]/40 transition-all duration-500">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8A60F1]/10 border border-[#8A60F1]/20 flex items-center justify-center text-[#8A60F1]">
                    <Palette className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-xl font-bold text-[var(--text-primary)] tracking-wide">
                    {t.about.philosophyTitle}
                  </h4>
                </div>

                <p className="text-[var(--text-secondary)] leading-relaxed font-light">
                  {getSection("about_philosophy_p1", t.about.philosophyP1)}
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed font-light">
                  {getSection("about_philosophy_p2", t.about.philosophyP2)}
                </p>

                {/* Multilingual Badge */}
                <div className="p-4 rounded-2xl bg-[#8A60F1]/5 border border-[#8A60F1]/20 flex items-center gap-4">
                  <Globe className="w-6 h-6 text-[#8A60F1] flex-shrink-0" />
                  <div>
                    <h5 className="text-sm font-semibold text-[var(--text-primary)]">
                      {t.about.langTitle}
                    </h5>
                    <p className="text-xs text-[var(--text-secondary)] font-light mt-0.5">
                      {t.about.langDesc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--card-border)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.about.checkmarks.map((check, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-[#8A60F1] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[var(--text-secondary)] font-medium">
                      {check}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Box (Right) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-5">
            {stats.map((stat, idx) => (
              <ScrollReveal
                key={idx}
                variant="slide-in-right"
                delay={idx * 120}
                className="h-full flex"
              >
                <div className="w-full glass-card text-[var(--text-primary)] rounded-3xl p-6 md:p-7 flex items-center justify-between hover:border-[#8A60F1]/40 hover:bg-[var(--card-hover-bg)] transition-all duration-300 group">
                  <div className="space-y-1">
                    <span className="text-3xl md:text-4xl font-extrabold block text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[#8A60F1]">
                      {stat.value}
                    </span>
                    <span className="font-bold text-[var(--text-primary)] text-sm block tracking-wider uppercase">
                      {stat.label}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] block font-light">
                      {stat.description}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[var(--pill-bg)] border border-[var(--pill-border)] group-hover:scale-110 group-hover:bg-[#8A60F1]/10 group-hover:border-[#8A60F1]/20 transition-all duration-300">
                    <Sparkles className="w-5 h-5 text-[#8A60F1] transition-colors" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
