import { ScrollReveal } from "./ScrollReveal";
import { CheckCircle, Globe, Palette, Sparkles } from "lucide-react";

export function About() {
  const stats = [
    { value: "3+", label: "Years Experience", description: "In visual identity, branding & digital graphic design" },
    { value: "+200", label: "Projects Completed", description: "Delivered for global brands, agencies & startups" },
    { value: "4", label: "Countries Served", description: "Active client footprint in US, Germany, France & Egypt" },
    { value: "100%", label: "Satisfaction Rate", description: "Consistent 5-star delivery and client retention" },
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-cyber">
      {/* Decorative radial glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#8A60F1]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
            01 // BACKGROUND & REACH
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            Crafting visual identities that <br />
            <span className="bg-gradient-to-r from-[#8A60F1] to-fuchsia-500 bg-clip-text text-transparent">
              transcend global borders
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light">
            I am a Senior Graphic Designer & Visual Artist with <strong className="font-semibold text-[var(--text-primary)]">3+ years of international experience</strong> and <strong className="font-semibold text-[var(--text-primary)]">+200 completed projects</strong>. I specialize in creating iconic brand identities, premium packaging, high-impact marketing visuals, and motion graphics powered by master-level Adobe Creative Cloud tools.
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
                  <h4 className="text-xl font-bold text-[var(--text-primary)] tracking-wide">Creative Philosophy & Global Vision</h4>
                </div>

                <p className="text-[var(--text-secondary)] leading-relaxed font-light">
                  My design journey began with a relentless curiosity for visual balance and emotional storytelling. Over the past three years, I have collaborated with clients across the <strong className="font-semibold text-[var(--text-primary)]">United States</strong>, <strong className="font-semibold text-[var(--text-primary)]">Germany</strong>, <strong className="font-semibold text-[var(--text-primary)]">France</strong>, and <strong className="font-semibold text-[var(--text-primary)]">Egypt</strong>, developing versatile aesthetics that resonate across diverse markets.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed font-light">
                  Whether creating a comprehensive brand identity from scratch, designing luxury packaging, or producing animated promo assets in Adobe After Effects, I ensure every pixel speaks with intent, elegance, and purpose.
                </p>

                {/* Multilingual Badge */}
                <div className="p-4 rounded-2xl bg-[#8A60F1]/5 border border-[#8A60F1]/20 flex items-center gap-4">
                  <Globe className="w-6 h-6 text-[#8A60F1] flex-shrink-0" />
                  <div>
                    <h5 className="text-sm font-semibold text-[var(--text-primary)]">Multilingual Client Communication</h5>
                    <p className="text-xs text-[var(--text-secondary)] font-light mt-0.5">
                      Fluent in <span className="text-[#8A60F1] font-semibold">English</span> and <span className="text-[#8A60F1] font-semibold">German (Deutsch)</span> for seamless transatlantic and European project collaboration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--card-border)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#8A60F1] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[var(--text-secondary)] font-medium">Master-Level Adobe CC Craftsmanship</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#8A60F1] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[var(--text-secondary)] font-medium">Over 200+ Delivered Brand Assets</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#8A60F1] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[var(--text-secondary)] font-medium">Cross-cultural Visual Localization</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#8A60F1] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[var(--text-secondary)] font-medium">Fast Turnaround & Print-Ready Standards</span>
                </div>
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
