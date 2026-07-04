import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function Experience() {
  const experiences = [
    {
      type: "work",
      role: "Full-Stack Developer",
      company: "Freelancer (Upwork Portfolio)",
      period: "2024 - Present",
      description: "Building responsive web applications and robust backend solutions for global clients. Specializing in ASP.NET Core Web APIs, SQL Server database optimizations, CQRS patterns, and clean React/Next.js interfaces. Successfully delivered 15+ projects with 5-star feedback.",
    },
    {
      type: "work",
      role: "Backend & Systems Integration Specialist",
      company: "Contract / Remote Projects",
      period: "2023 - 2024",
      description: "Co-authored clean architecture backend systems. Migrated database structures, optimized LINQ queries, and integrated third-party API gateways (Stripe, secure email delivery systems, Auth0) for small to mid-sized teams.",
    },
    {
      type: "education",
      role: "B.Sc. in Computer Science & Technology",
      company: "Assiut International Technological University - AITU",
      period: "2024 - 2028 (Expected)",
      description: "Acquiring core knowledge in Software Engineering, Relational Database Management Systems (RDBMS), Operating Systems, and Advanced Algorithms. Bridging standard theoretical computer science with practical freelancer client projects.",
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-xl">
          <span className="text-sm font-mono text-stone-900 dark:text-stone-100 bg-white/20 dark:bg-white/10 px-3 py-1 rounded-md inline-block border border-white/10">
            TIMELINE
          </span>
          <h3 className="text-4xl md:text-5xl font-light tracking-tight font-serif text-stone-950 dark:text-white">
            Journey & <span className="font-semibold italic">experience</span>
          </h3>
          <p className="text-stone-850 dark:text-stone-300">
            My professional path combining formal computer science education at AITU with real-world Upwork contract engineering.
          </p>
        </ScrollReveal>

        {/* Timeline Path */}
        <div className="relative border-l border-stone-800/15 dark:border-white/10 ml-4 md:ml-8 space-y-12 max-w-4xl">
          {experiences.map((exp, idx) => (
            <ScrollReveal
              key={idx}
              variant="fade-in-up"
              delay={idx * 150}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-4 top-1.5 w-8 h-8 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center border-4 border-[#B2A2A1] dark:border-[#1E1B1A] group-hover:scale-110 group-hover:bg-stone-800 dark:group-hover:bg-white transition-all shadow-md">
                {exp.type === "work" ? (
                  <Briefcase className="w-3.5 h-3.5" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Card Container */}
              <div className="bg-white/15 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:border-white/35 dark:hover:border-white/20 rounded-3xl p-6 md:p-8 transition-all duration-350 hover:shadow-lg hover:shadow-stone-900/5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xl font-bold text-stone-950 dark:text-white">{exp.role}</h4>
                    <span className="text-stone-900 dark:text-stone-300 font-semibold text-sm">
                      {exp.company}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 dark:bg-white/10 text-stone-900 dark:text-stone-200 text-xs font-semibold self-start sm:self-auto shadow-sm border border-white/5">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                </div>
                <p className="text-stone-850 dark:text-stone-300 text-sm md:text-base leading-relaxed font-normal">
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
