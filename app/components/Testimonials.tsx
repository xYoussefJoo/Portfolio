import { ScrollReveal } from "./ScrollReveal";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Jenkins",
      role: "Chief Technology Officer",
      company: "Aether Dynamics",
      text: "Youssef completely revamped our legacy database architecture and co-authored our new .NET Web API. His clean architecture approach and custom caching layer speed up our API requests by nearly 300%. He's exceptional.",
      rating: 5,
    },
    {
      name: "Marcus Vance",
      role: "Product Owner",
      company: "DevFlow Systems",
      text: "Working with Youssef on our full-stack e-commerce project was a pleasure. His mastery of ASP.NET Core and Entity Framework, combined with modern React state management, resulted in a flawless product release ahead of schedule.",
      rating: 5,
    },
    {
      name: "Elena Rostova",
      role: "Founder",
      company: "Vivid Interactive",
      text: "We hired Youssef on Upwork to build a real-time tracking dashboard. His implementation using WebSockets and Next.js was extremely performant. He communicates perfectly and has absolute command over frontend design patterns.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-cyber">
      {/* Decorative radial glow */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#8A60F1]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
            05 // VOICES
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Client success & <br />
            <span className="bg-gradient-to-r from-[#8A60F1] to-fuchsia-400 bg-clip-text text-transparent">testimonials</span>
          </h2>
          <p className="text-lg text-stone-300 leading-relaxed font-light">
            Here is what global clients and team leads say about collaborating on complex backend services and interactive web interfaces.
          </p>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <ScrollReveal
              key={idx}
              variant="scale-in"
              delay={idx * 150}
              className="h-full flex"
            >
              <div className="w-full glass-card rounded-3xl p-8 hover:border-[#8A60F1]/30 transition-all duration-500 shadow-[0_0_20px_rgba(138,96,241,0.02)] group flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Rating Stars and Quote Icon */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#8A60F1] fill-current" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-[#8A60F1]/20 group-hover:text-[#8A60F1]/40 transition-colors" />
                  </div>

                  <p className="text-stone-300 text-sm md:text-base leading-relaxed font-light italic">
                    "{test.text}"
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 mt-8 flex items-center gap-4">
                  {/* Placeholder Avatar with Gradient */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8A60F1] to-fuchsia-500 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(138,96,241,0.3)]">
                    {test.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="font-bold text-white tracking-wide text-sm">{test.name}</h4>
                    <span className="text-xs text-stone-400 block font-light mt-0.5">
                      {test.role} at <span className="text-[#8A60F1] font-medium">{test.company}</span>
                    </span>
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
