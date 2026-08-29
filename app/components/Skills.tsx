import { ScrollReveal } from "./ScrollReveal";
import { Palette, PenTool, Sparkles, Layers, Video, Award } from "lucide-react";
import { useLanguage } from "~/context/LanguageContext";

export function Skills() {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t.skills.categories.adobe,
      badge: t.skills.badges.adobe,
      icon: <Palette className="w-5 h-5 text-[#8A60F1]" />,
      skills: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Adobe InDesign",
        "Adobe After Effects",
        "Adobe Premiere Pro",
        "Adobe XD",
        "Adobe Lightroom",
        "Adobe Dimension (3D)",
      ],
    },
    {
      title: t.skills.categories.brand,
      badge: t.skills.badges.brand,
      icon: <PenTool className="w-5 h-5 text-[#8A60F1]" />,
      skills: [
        "Brand Identity Systems",
        "Vector Logo Design",
        "Typography & Lettering",
        "Color Theory & Palettes",
        "Packaging & Label Design",
        "Print Pre-Press (CMYK/Pantone)",
        "Brand Style Guides",
        "Billboard & Large Format",
      ],
    },
    {
      title: t.skills.categories.motion,
      badge: t.skills.badges.motion,
      icon: <Layers className="w-5 h-5 text-[#8A60F1]" />,
      skills: [
        "Motion Graphics & Intro",
        "Kinetic Typography",
        "Social Media Ad Campaigns",
        "Photorealistic 3D Mockups",
        "Photo Manipulation & Retouch",
        "Vector Illustration",
        "Magazine & Editorial Layouts",
        "Digital Marketing Visuals",
      ],
    },
  ];

  return (
    <section id="skills" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-curved transition-colors duration-350">
      {/* Decorative radial glows */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-[#8A60F1]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
            {t.skills.tag}
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            {t.skills.titleLine1} <br />
            <span className="bg-gradient-to-r from-[#8A60F1] to-fuchsia-500 bg-clip-text text-transparent">
              {t.skills.titleGradient}
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light">
            {t.skills.description}
          </p>
        </ScrollReveal>

        {/* Skills Cards Grid - Pills Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <ScrollReveal
              key={idx}
              variant="scale-in"
              delay={idx * 100}
              className="h-full flex"
            >
              <div className="w-full glass-card rounded-3xl p-8 hover:border-[#8A60F1]/40 transition-all duration-500 group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3.5 mb-8">
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 rounded-2xl bg-[var(--pill-bg)] border border-[var(--pill-border)] group-hover:bg-[#8A60F1]/10 group-hover:border-[#8A60F1]/20 group-hover:scale-105 transition-all duration-300">
                        {category.icon}
                      </div>
                      <h3 className="font-bold text-[var(--text-primary)] text-base md:text-lg tracking-wide">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Pills List layout matching legacy format with futuristic styles */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3.5 py-2 rounded-xl bg-[var(--pill-bg)] border border-[var(--pill-border)] hover:border-[#8A60F1]/50 text-[var(--text-secondary)] text-xs font-semibold cursor-default transition-all duration-300 hover:scale-[1.02] hover:bg-[#8A60F1]/15 hover:text-[#8A60F1]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--card-border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5 text-[#8A60F1] font-semibold">
                    <Award className="w-3.5 h-3.5" /> {t.skills.expertLevel}
                  </span>
                  <span>{t.skills.productionReady}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
