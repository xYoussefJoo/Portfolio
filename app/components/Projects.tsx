import { useState } from "react";
import { ExternalLink, Layers } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

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
      className="text-stone-900 dark:text-stone-100"
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

  const projectList = [
    {
      title: "Landing Page Showcase",
      description: "A pure Next.js and frontend responsive website designed with fluid animations, high-fidelity layouts, and modern typography.",
      category: "frontend",
      image: "/images/agency_portfolio.jpg",
      tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "CraftIQ Systems",
      description: "A pure backend system structured around Clean Architecture principles. Features ASP.NET Core Web API, Entity Framework Core, SQL Server, and CQRS design patterns.",
      category: "backend",
      image: "/images/saas_dashboard.jpg",
      tags: [".NET Web API", "Clean Arch", "EF Core", "SQL Server"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Fullstack E-commerce Platform",
      description: "A premium fullstack e-commerce project combining ASP.NET Core Backend API and React Frontend client. Includes basket transactions, product catalogs, and Stripe secure checkouts.",
      category: "fullstack",
      image: "/images/luxury_ecommerce.jpg",
      tags: ["ASP.NET Core", "React", "SQL Server", "Stripe API"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "FMS (Fuel Management System)",
      description: "A comprehensive fullstack Fuel Management System designed to monitor fuel telemetry, dispenser volumes, pump sales, and inventory logs in real-time.",
      category: "fullstack",
      image: "/images/fms_dashboard.jpg",
      tags: [".NET Core", "Next.js", "WebSockets", "EF Core"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "MES (Manufacturing Execution System)",
      description: "An enterprise-grade fullstack Manufacturing Execution System mapping factory operations, assembly station statuses, operator logs, and scheduling dashboards.",
      category: "fullstack",
      image: "/images/mes_interface.jpg",
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
    <section id="projects" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-xl">
            <span className="text-sm font-mono text-stone-900 dark:text-stone-100 bg-white/20 dark:bg-white/10 px-3 py-1 rounded-md inline-block border border-white/10">
              PROJECTS
            </span>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight font-serif text-stone-950 dark:text-white">
              Selected <span className="font-semibold italic">creations</span>
            </h3>
            <p className="text-stone-850 dark:text-stone-300">
              A curated collection of web applications and backend systems showcasing custom architectures, API endpoints, and clean frontend logic.
            </p>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal variant="fade-in-up" delay={150} className="self-start md:self-auto">
            <div className="flex flex-wrap gap-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm p-1.5 rounded-2xl border border-white/25 dark:border-white/10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-350 ${
                    filter === cat.id
                      ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm"
                      : "text-stone-800 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/5"
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
              <div className="bg-white/15 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:border-white/35 dark:hover:border-white/20 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-stone-900/10 hover:-translate-y-1.5 flex flex-col h-full group w-full">
                {/* Image Frame */}
                <div className="relative overflow-hidden aspect-[4/3] bg-stone-300 dark:bg-stone-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/90 hover:bg-white text-stone-950 hover:scale-110 shadow-md transition-all"
                      title="Live Preview"
                    >
                      <ExternalLink className="w-5 h-5 text-stone-950" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-stone-900/90 hover:bg-stone-900 text-white hover:scale-110 shadow-md transition-all border border-white/10"
                      title="View Source"
                    >
                      {githubIcon}
                    </a>
                  </div>
                </div>

                {/* Text Info */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-white/25 dark:bg-white/10 text-stone-900 dark:text-stone-200 text-[10px] font-semibold tracking-wider uppercase border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-xl font-semibold text-stone-950 dark:text-white group-hover:text-stone-900 dark:group-hover:text-stone-300 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-sm text-stone-850 dark:text-stone-300 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:underline"
                    >
                      Launch Demo
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:underline"
                    >
                      Repository
                      {githubIcon}
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
