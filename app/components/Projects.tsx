import { useState, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { useLanguage } from "~/context/LanguageContext";

interface ProjectItem {
  id: number;
  category: string;
  image: string;
  tags: string[];
  clientLocation: string;
  viewUrl: string;
}

export function Projects() {
  const [filter, setFilter] = useState("all");
  const { t } = useLanguage();

  const categories = [
    { id: "all", name: t.projects.categories.all },
    { id: "branding", name: t.projects.categories.branding },
    { id: "packaging", name: t.projects.categories.packaging },
    { id: "advertising", name: t.projects.categories.advertising },
    { id: "editorial", name: t.projects.categories.editorial },
  ];

  const projectMeta: ProjectItem[] = [
    {
      id: 1,
      category: "branding",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
      tags: ["Adobe Illustrator", "Photoshop", "Brand System", "Typography"],
      clientLocation: "United States & France",
      viewUrl: "#",
    },
    {
      id: 2,
      category: "packaging",
      image: "https://images.unsplash.com/photo-1556742049-0a67c55c8cc0?auto=format&fit=crop&q=80&w=800",
      tags: ["Adobe Dimension", "Illustrator", "Packaging", "3D Render"],
      clientLocation: "Germany",
      viewUrl: "#",
    },
    {
      id: 3,
      category: "advertising",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
      tags: ["After Effects", "Photoshop", "Motion Graphics", "Billboards"],
      clientLocation: "United States",
      viewUrl: "#",
    },
    {
      id: 4,
      category: "editorial",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
      tags: ["Adobe InDesign", "Photoshop", "Editorial Design", "Pre-Press"],
      clientLocation: "Egypt & Germany",
      viewUrl: "#",
    },
    {
      id: 5,
      category: "advertising",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      tags: ["Photoshop", "Illustrator", "Art Direction", "Social Media"],
      clientLocation: "Germany",
      viewUrl: "#",
    },
    {
      id: 6,
      category: "packaging",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
      tags: ["Adobe Dimension", "Illustrator", "Packaging", "Luxury Branding"],
      clientLocation: "France",
      viewUrl: "#",
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projectMeta
      : projectMeta.filter((project) => project.category === filter);

  return (
    <section id="projects" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-cyber transition-colors duration-350">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-[#8A60F1]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-xl">
            <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
              {t.projects.tag}
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
              {t.projects.titleLine1} <span className="font-semibold italic bg-gradient-to-r from-[#8A60F1] to-fuchsia-500 bg-clip-text text-transparent">{t.projects.titleGradient}</span>
            </h2>
            <p className="text-[var(--text-secondary)] font-light leading-relaxed">
              {t.projects.description}
            </p>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal variant="fade-in-up" delay={150} className="self-start lg:self-auto">
            <div className="flex flex-wrap gap-2 bg-[var(--pill-bg)] backdrop-blur-md p-1.5 rounded-2xl border border-[var(--pill-border)] shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-4.5 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    filter === cat.id
                      ? "bg-[#8A60F1] text-white shadow-[0_0_15px_rgba(138,96,241,0.4)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-hover-bg)]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const projectText = t.projects.items.find((item) => item.id === project.id) || t.projects.items[0];
            return (
              <ScrollReveal
                key={`${filter}-${idx}`}
                variant="fade-in-up"
                delay={idx * 100}
                className="h-full flex"
              >
                <ProjectCard project={project} text={projectText} inquireLabel={t.projects.inquireBtn} />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  text,
  inquireLabel,
}: {
  project: ProjectItem;
  text: { title: string; description: string };
  inquireLabel: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="glass-card rounded-3xl overflow-hidden hover:border-[#8A60F1]/50 flex flex-col h-full group w-full transition-all duration-300"
    >
      {/* Image Frame */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-900 border-b border-[var(--card-border)]">
        <img
          src={project.image}
          alt={text.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        {/* Animated glowing overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 justify-between">
          <div className="flex gap-3 w-full">
            <a
              href="#contact"
              className="flex-1 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-[1.02]"
            >
              {inquireLabel} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 2).map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-0.5 rounded-md bg-[#8A60F1]/10 text-[#8A60F1] text-[9px] font-bold tracking-wider uppercase border border-[#8A60F1]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">
              📍 {project.clientLocation}
            </span>
          </div>

          <h4 className="text-lg font-bold text-[var(--text-primary)] tracking-wide group-hover:text-[#8A60F1] transition-colors">
            {text.title}
          </h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
            {text.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[var(--card-border)] flex flex-wrap gap-1.5">
          {project.tags.slice(2).map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-2 py-0.5 rounded bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[var(--text-muted)] text-[9px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
