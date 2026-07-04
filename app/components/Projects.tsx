import { useState, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface ProjectItem {
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export function Projects() {
  const [filter, setFilter] = useState("all");

  const githubIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );

  const categories = [
    { id: "all", name: "All Work" },
    { id: "frontend", name: "Frontend / Next.js" },
    { id: "backend", name: "Backend / API" },
    { id: "fullstack", name: "Full Stack" },
  ];

  const projectList: ProjectItem[] = [
    {
      title: "Landing Page Showcase",
      description: "A pure Next.js and frontend responsive website designed with fluid animations, high-fidelity layouts, and modern typography.",
      category: "frontend",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
      tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "CraftIQ Systems",
      description: "A pure backend system structured around Clean Architecture principles. Features ASP.NET Core Web API, Entity Framework Core, SQL Server, and CQRS design patterns.",
      category: "backend",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      tags: [".NET Web API", "Clean Arch", "EF Core", "SQL Server"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Fullstack E-commerce Platform",
      description: "A premium fullstack e-commerce project combining ASP.NET Core Backend API and React Frontend client. Includes basket transactions, product catalogs, and Stripe secure checkouts.",
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
      tags: ["ASP.NET Core", "React", "SQL Server", "Stripe API"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "FMS (Fuel Management System)",
      description: "A comprehensive fullstack Fuel Management System designed to monitor fuel telemetry, dispenser volumes, pump sales, and inventory logs in real-time.",
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      tags: [".NET Core", "Next.js", "WebSockets", "EF Core"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "MES (Manufacturing Execution System)",
      description: "An enterprise-grade fullstack Manufacturing Execution System mapping factory operations, assembly station statuses, operator logs, and scheduling dashboards.",
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      tags: ["C# .NET", "React", "SQL Server", "SignalR"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projectList
      : projectList.filter((project) => project.category === filter);

  return (
    <section id="projects" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-cyber">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-[#8A60F1]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-xl">
            <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
              03 // CREATIONS
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Selected <span className="font-semibold italic bg-gradient-to-r from-[#8A60F1] to-fuchsia-400 bg-clip-text text-transparent">creations</span>
            </h2>
            <p className="text-stone-300 font-light leading-relaxed">
              Explore custom systems, full-stack frameworks, Web APIs, and engaging frontend experiences.
            </p>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal variant="fade-in-up" delay={150} className="self-start lg:self-auto">
            <div className="flex flex-wrap gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-4.5 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                    filter === cat.id
                      ? "bg-[#8A60F1] text-white shadow-[0_0_15px_rgba(138,96,241,0.4)]"
                      : "text-stone-300 hover:text-white hover:bg-white/5"
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
          {filteredProjects.map((project, idx) => (
            <ScrollReveal
              key={`${filter}-${idx}`}
              variant="fade-in-up"
              delay={idx * 100}
              className="h-full flex"
            >
              <ProjectCard project={project} githubIcon={githubIcon} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, githubIcon }: { project: ProjectItem; githubIcon: React.ReactNode }) {
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

    // Calculate rotation angle (max 10 degrees)
    const rX = -(mouseY / (height / 2)) * 10;
    const rY = (mouseX / (width / 2)) * 10;
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
        transition: "transform 0.1s ease-out",
      }}
      className="glass-card rounded-3xl overflow-hidden hover:border-[#8A60F1]/40 flex flex-col h-full group w-full shadow-[0_0_20px_rgba(138,96,241,0.02)] transition-all duration-300"
    >
      {/* Image Frame */}
      <div className="relative overflow-hidden aspect-[4/3] bg-stone-900 border-b border-white/5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        {/* Animated glowing overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 justify-between">
          <div className="flex gap-3 w-full">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-white text-stone-950 hover:bg-stone-100 text-xs font-bold text-center flex items-center justify-center gap-1 shadow-md transition-all hover:scale-[1.02]"
            >
              Demo <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold text-center flex items-center justify-center gap-1 shadow-md transition-all hover:scale-[1.02]"
              title="View Source"
            >
              {githubIcon}
            </a>
          </div>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-0.5 rounded-md bg-[#8A60F1]/10 text-[#8A60F1] text-[9px] font-bold tracking-wider uppercase border border-[#8A60F1]/20 shadow-[0_0_10px_rgba(138,96,241,0.05)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h4 className="text-xl font-bold text-white tracking-wide">
            {project.title}
          </h4>
          <p className="text-xs text-stone-300 leading-relaxed font-light">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
