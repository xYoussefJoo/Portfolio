import { Globe, Award, Calendar, Compass, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function Experience() {
  const experiences = [
    {
      period: "Year 3 — Present",
      role: "Senior Graphic Designer & Brand Consultant",
      company: "Global Remote Clients (US, Germany, France, Egypt)",
      location: "United States • Germany • France • Egypt",
      badge: "+200 Milestone",
      description: "Surpassed +200 completed projects worldwide. Directing high-end visual brand architectures, luxury 3D product packaging mockups in Adobe Dimension, and dynamic motion graphics with After Effects for international agencies, technology startups, and consumer brands.",
    },
    {
      period: "Year 2",
      role: "European & Transatlantic Brand Designer",
      company: "Contract Design & Boutique Brands",
      location: "Germany • France • United States",
      badge: "European Expansion",
      description: "Expanded design operations into European markets including Germany and France while scaling transatlantic projects in the US. Spearheaded minimalist editorial layouts, luxury packaging for French perfumeries, and German technical brand guidelines, utilizing fluent German and English client communications.",
    },
    {
      period: "Year 1 — Foundation",
      role: "Graphic Designer & Visual Identity Specialist",
      company: "Agency & Freelance Collaborations",
      location: "United States • Egypt",
      badge: "Inception & Growth",
      description: "Launched professional career delivering high-impact brand identities, vector logo design systems, and digital advertising campaigns for clients across Egypt and the United States. Completed 60+ projects with exceptional 5-star ratings.",
    },
  ];

  return (
    <section id="experience" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-curved transition-colors duration-350">
      {/* Glow blobs */}
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#8A60F1]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
            04 // GLOBAL JOURNEY
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            3 Years & <br />
            <span className="bg-gradient-to-r from-[#8A60F1] to-fuchsia-500 bg-clip-text text-transparent">international reach</span>
          </h2>
          <p className="text-[var(--text-secondary)] font-light leading-relaxed">
            From the United States & Egypt to Germany & France — a track record of +200 successful design deliveries across the globe.
          </p>
        </ScrollReveal>

        {/* Timeline Path */}
        <div className="relative border-l border-[#8A60F1]/25 ml-4 md:ml-8 space-y-12 max-w-4xl">
          {experiences.map((exp, idx) => (
            <ScrollReveal
              key={idx}
              variant="fade-in-up"
              delay={idx * 150}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-4.5 top-1.5 w-9 h-9 rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center border border-[#8A60F1]/40 group-hover:border-[#8A60F1] group-hover:shadow-[0_0_15px_rgba(138,96,241,0.5)] group-hover:scale-105 transition-all duration-300 shadow-md">
                {idx === 0 ? (
                  <Sparkles className="w-4 h-4 text-[#8A60F1]" />
                ) : (
                  <Globe className="w-4 h-4 text-[#8A60F1]" />
                )}
              </div>

              {/* Card Container */}
              <div className="glass-card rounded-3xl p-6 md:p-8 hover:border-[#8A60F1]/40 transition-all duration-500 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xl font-bold text-[var(--text-primary)] tracking-wide">{exp.role}</h4>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#8A60F1]/10 text-[#8A60F1] font-bold border border-[#8A60F1]/20 uppercase">
                        {exp.badge}
                      </span>
                    </div>
                    <span className="text-[#8A60F1] font-semibold text-sm block mt-1">
                      {exp.company}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A60F1]/10 text-[#8A60F1] text-xs font-semibold self-start sm:self-auto border border-[#8A60F1]/20">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                </div>

                <div className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 font-medium">
                  <Compass className="w-3.5 h-3.5 text-[#8A60F1]" />
                  <span>{exp.location}</span>
                </div>

                <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-light">
                  {exp.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
