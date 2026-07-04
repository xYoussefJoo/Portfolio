import { Code2, Server, Wrench, Award, CheckCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function About() {
  const skillCategories = [
    {
      title: "Frontend Engineering",
      icon: <Code2 className="w-5 h-5 text-stone-900 dark:text-stone-100" />,
      skills: ["React / React Router", "TypeScript", "Next.js", "Tailwind CSS", "HTML5 & CSS3", "Responsive UI"],
    },
    {
      title: "Backend Engineering (.NET)",
      icon: <Server className="w-5 h-5 text-stone-900 dark:text-stone-100" />,
      skills: ["C#", ".NET / ASP.NET Core", "Entity Framework (EF Core)", "SQL Server", "Web APIs", "Clean Architecture"],
    },
    {
      title: "Workflow & Tools",
      icon: <Wrench className="w-5 h-5 text-stone-900 dark:text-stone-100" />,
      skills: ["Git & GitHub", "Vite Bundler", "CI/CD Pipelines", "Docker", "Vercel / IIS Deployment"],
    },
  ];

  const stats = [
    { value: "2+", label: "Years Experience", description: "In software engineering & full-stack development" },
    { value: "20+", label: "Systems Built", description: "ASP.NET Core, Next.js & Upwork projects" },
    { value: "100%", label: "Job Success", description: "Consistently delivering premium quality" },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-2xl">
          <span className="text-sm font-mono text-stone-900 dark:text-stone-100 bg-white/20 dark:bg-white/10 px-3 py-1 rounded-md inline-block border border-white/10">
            ABOUT ME
          </span>
          <h3 className="text-4xl md:text-5xl font-light tracking-tight font-serif text-stone-950 dark:text-white">
            Crafting systems with <span className="font-semibold italic">robust performance</span>
          </h3>
          <p className="text-lg text-stone-850 dark:text-stone-200 leading-relaxed font-normal">
            I am a full-stack engineer specializing in the **.NET ecosystem** and **modern frontend technologies**. I build responsive, clean applications with a strong emphasis on Clean Architecture, database optimization, and high-quality UI logic.
          </p>
        </ScrollReveal>

        {/* Bio & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Detailed Bio (Left) */}
          <ScrollReveal variant="slide-in-left" className="lg:col-span-7 h-full flex">
            <div className="w-full bg-white/20 dark:bg-white/5 border border-white/25 dark:border-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-stone-950 dark:text-white">My Engineering Focus</h4>
                <p className="text-stone-850 dark:text-stone-300 leading-relaxed font-normal">
                  I center my development around robust enterprise backend systems using **C#** and **ASP.NET Core** combined with fluid, clean client-side implementations. I prioritize writing maintainable, clean code structured around Domain-Driven Design principles.
                </p>
                <p className="text-stone-850 dark:text-stone-300 leading-relaxed font-normal">
                  By removing bloated stacks, I focus on maximum runtime performance, database indexes, clean migrations, and secure token authentication schemas. I ensure the application interface is fast, visual, and pixel-perfect.
                </p>
              </div>
              
              <div className="pt-6 border-t border-stone-800/10 dark:border-white/10 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-stone-900 dark:text-stone-200 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone-850 dark:text-stone-300">Clean Architecture standards</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-stone-900 dark:text-stone-200 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone-850 dark:text-stone-300">Fluid user experience integration</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Box (Right) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {stats.map((stat, idx) => (
              <ScrollReveal
                key={idx}
                variant="slide-in-right"
                delay={idx * 150}
                className="h-full flex"
              >
                <div className="w-full bg-stone-900 dark:bg-stone-950 text-white rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-xl shadow-stone-950/10 hover:translate-x-1.5 transition-transform duration-300 group">
                  <div className="space-y-1">
                    <span className="text-3xl md:text-4xl font-bold block text-stone-100">{stat.value}</span>
                    <span className="font-semibold text-stone-300 text-sm block">{stat.label}</span>
                    <span className="text-xs text-stone-400 block">{stat.description}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/10 text-white group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Core Toolkit Section */}
        <div className="space-y-8">
          <ScrollReveal variant="fade-in-up">
            <h4 className="text-xl font-semibold text-stone-950 dark:text-white border-b border-stone-800/15 dark:border-white/10 pb-3">
              Core Toolkit & Stack
            </h4>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((category, idx) => (
              <ScrollReveal
                key={idx}
                variant="scale-in"
                delay={idx * 100}
                className="h-full flex"
              >
                <div className="w-full bg-white/15 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:border-white/35 dark:hover:border-white/20 rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-stone-900/5 group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2.5 rounded-xl bg-white/30 dark:bg-white/10 border border-white/25 dark:border-white/10  dark:group-hover:bg-stone-100 dark:group-hover:text-stone-900 group-hover:text-white transition-colors duration-300">
                        {category.icon}
                      </div>
                      <h5 className="font-semibold text-stone-950 dark:text-white text-sm tracking-wide">
                        {category.title}
                      </h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1.5 rounded-xl bg-white/25 dark:bg-white/10 hover:bg-stone-900 dark:hover:bg-stone-100 hover:text-white dark:hover:text-stone-900 text-stone-900 dark:text-stone-200 text-xs font-medium cursor-default transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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
