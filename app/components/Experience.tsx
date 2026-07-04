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
    <section id="experience" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-curved">
      {/* Glow blobs */}
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#8A60F1]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
            04 // JOURNEY
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Journey & <br />
            <span className="bg-gradient-to-r from-[#8A60F1] to-fuchsia-400 bg-clip-text text-transparent">experience</span>
          </h2>
          <p className="text-stone-300 font-light leading-relaxed">
            A history of client deliveries, professional integration services, and academic learning.
          </p>
        </ScrollReveal>

        {/* Timeline Path */}
        <div className="relative border-l border-[#8A60F1]/20 ml-4 md:ml-8 space-y-12 max-w-4xl">
          {experiences.map((exp, idx) => (
            <ScrollReveal
              key={idx}
              variant="fade-in-up"
              delay={idx * 150}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-4.5 top-1.5 w-9 h-9 rounded-full bg-[#050816] text-white flex items-center justify-center border border-[#8A60F1]/30 group-hover:border-[#8A60F1] group-hover:shadow-[0_0_15px_rgba(138,96,241,0.5)] group-hover:scale-105 transition-all duration-300 shadow-md">
                {exp.type === "work" ? (
                  <Briefcase className="w-4 h-4 text-[#8A60F1]" />
                ) : (
                  <GraduationCap className="w-4 h-4 text-[#8A60F1]" />
                )}
              </div>

              {/* Card Container */}
              <div className="glass-card rounded-3xl p-6 md:p-8 hover:border-[#8A60F1]/40 hover:shadow-[0_0_25px_rgba(138,96,241,0.05)] transition-all duration-500 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xl font-bold text-white tracking-wide">{exp.role}</h4>
                    <span className="text-[#8A60F1] font-semibold text-sm">
                      {exp.company}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A60F1]/10 text-[#8A60F1] text-xs font-semibold self-start sm:self-auto border border-[#8A60F1]/20 shadow-[0_0_10px_rgba(138,96,241,0.05)]">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                </div>
                <p className="text-stone-300 text-sm md:text-base leading-relaxed font-light">
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
