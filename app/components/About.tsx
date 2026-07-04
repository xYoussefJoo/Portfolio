import { ScrollReveal } from "./ScrollReveal";
import { CheckCircle } from "lucide-react";

export function About() {
  const stats = [
    { value: "2+", label: "Years Experience", description: "In full-stack engineering & custom software design" },
    { value: "20+", label: "Systems Delivered", description: "ASP.NET Core Web APIs, SQL Server, & client frontends" },
    { value: "100%", label: "Client Satisfaction", description: "Consistently delivering premium quality contracts" },
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-cyber">
      {/* Decorative radial glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#8A60F1]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
            01 // BACKGROUND
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Crafting scalable systems with <br />
            <span className="bg-gradient-to-r from-[#8A60F1] to-fuchsia-400 bg-clip-text text-transparent">
              uncompromising quality
            </span>
          </h2>
          <p className="text-lg text-stone-300 leading-relaxed font-light">
            I am a full-stack engineer specializing in the **.NET ecosystem** and **modern interactive frontends**. I design systems centered on Clean Architecture, database optimization, and high-performance user experiences.
          </p>
        </ScrollReveal>

        {/* Bio & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Detailed Bio (Left) */}
          <ScrollReveal variant="slide-in-left" className="lg:col-span-7 h-full flex">
            <div className="w-full glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between space-y-8 hover:border-[#8A60F1]/30 transition-all duration-500 shadow-[0_0_30px_rgba(138,96,241,0.02)]">
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white tracking-wide">My Engineering Focus</h4>
                <p className="text-stone-300 leading-relaxed font-light">
                  I center my development around robust enterprise backend systems using **C#** and **ASP.NET Core**, combined with fluid client-side implementations. I write maintainable, clean code structured around Domain-Driven Design and CQRS design patterns.
                </p>
                <p className="text-stone-300 leading-relaxed font-light">
                  By building optimized database indexes, clean migrations, and secure JWT authentication systems, I ensure your application can handle load and secure operations seamlessly.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#8A60F1] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone-300">Clean Architecture standards</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#8A60F1] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone-300">3D and interactive client integrations</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Box (Right) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            {stats.map((stat, idx) => (
              <ScrollReveal
                key={idx}
                variant="slide-in-right"
                delay={idx * 150}
                className="h-full flex"
              >
                <div className="w-full glass-card text-white rounded-3xl p-6 md:p-8 flex items-center justify-between hover:border-[#8A60F1]/40 hover:bg-[#8A60F1]/5 hover:shadow-[0_0_20px_rgba(138,96,241,0.2)] transition-all duration-300 group">
                  <div className="space-y-1">
                    <span className="text-4xl md:text-5xl font-extrabold block text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8A60F1]">
                      {stat.value}
                    </span>
                    <span className="font-bold text-stone-200 text-sm block tracking-wider uppercase">
                      {stat.label}
                    </span>
                    <span className="text-xs text-stone-400 block font-light">
                      {stat.description}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-[#8A60F1]/10 group-hover:border-[#8A60F1]/20 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#8A60F1] group-hover:text-white"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
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
