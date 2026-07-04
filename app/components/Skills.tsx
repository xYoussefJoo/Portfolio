import { ScrollReveal } from "./ScrollReveal";
import { Code2, Server, Wrench } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend Engineering",
      icon: <Code2 className="w-5 h-5 text-[#8A60F1]" />,
      skills: [
        "React / React Router v8",
        "TypeScript",
        "Next.js",
        "Three.js / WebGL",
        "Tailwind CSS v4",
        "Framer Motion",
        "Responsive UI Layouts",
        "Client State Logic",
      ],
    },
    {
      title: "Backend Engineering (.NET)",
      icon: <Server className="w-5 h-5 text-[#8A60F1]" />,
      skills: [
        "C# / .NET Core",
        "ASP.NET Core Web APIs",
        "Clean Architecture",
        "CQRS Pattern / MediatR",
        "Entity Framework (EF Core)",
        "LINQ & Async Programming",
        "JWT & Token Security",
        "API Gateway Integration",
      ],
    },
    {
      title: "Databases & Workflows",
      icon: <Wrench className="w-5 h-5 text-[#8A60F1]" />,
      skills: [
        "SQL Server / T-SQL",
        "PostgreSQL",
        "Docker Containers",
        "Git & GitHub Actions",
        "CI/CD Pipelines",
        "IIS / Vercel Hosting",
        "xUnit Testing",
        "SignalR WebSockets",
      ],
    },
  ];

  return (
    <section id="skills" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-curved">
      {/* Decorative radial glows */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-[#8A60F1]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
            02 // TOOLKIT
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Advanced skill set & <br />
            <span className="bg-gradient-to-r from-[#8A60F1] to-fuchsia-400 bg-clip-text text-transparent">
              technical mastery
            </span>
          </h2>
          <p className="text-lg text-stone-300 leading-relaxed font-light">
            I leverage modern software design paradigms to build responsive frontends and scalable enterprise backend APIs.
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
              <div className="w-full glass-card rounded-3xl p-8 hover:border-[#8A60F1]/30 transition-all duration-500 shadow-[0_0_20px_rgba(138,96,241,0.02)] group flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-8">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#8A60F1]/10 group-hover:border-[#8A60F1]/20 group-hover:scale-105 transition-all duration-300">
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-white text-lg tracking-wide">
                      {category.title}
                    </h3>
                  </div>

                  {/* Pills List layout matching legacy format with futuristic styles */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#8A60F1]/40 text-stone-200 text-xs font-semibold cursor-default transition-all duration-300 shadow-[0_0_10px_rgba(138,96,241,0.02)] hover:shadow-[0_0_15px_rgba(138,96,241,0.15)] hover:scale-[1.02] hover:bg-[#8A60F1]/10 hover:text-white"
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
    </section>
  );
}
