import { ArrowRight, Mail } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function Hero() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const githubIcon = (
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
      className="w-5 h-5"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );

  const linkedinIcon = (
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
      className="w-5 h-5"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  const mailIcon = <Mail className="w-5 h-5" />;

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative subtle background blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-white/10 dark:bg-white/5 blur-3xl pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] rounded-full bg-stone-900/5 dark:bg-stone-100/5 blur-3xl pointer-events-none transition-colors duration-500" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Text Content */}
        <ScrollReveal variant="fade-in-up" className="lg:col-span-7 space-y-8 text-stone-950 dark:text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 dark:bg-white/5 border border-white/25 dark:border-white/10 text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200 shadow-sm transition-colors">
            <span className="w-2 h-2 rounded-full bg-stone-900 dark:bg-stone-100 animate-pulse" />
            Available for Freelance & Upwork
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] font-serif">
              Creating digital systems with <span className="font-semibold italic block md:inline">architectural flow</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-850 dark:text-stone-300 font-normal max-w-xl leading-relaxed">
              I am <span className="font-semibold text-stone-950 dark:text-white">Youssef Gamal</span>, a full-stack engineer focused on building robust, high-performance backends in .NET coupled with responsive Next.js/React frontends.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, "projects")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-900 dark:bg-stone-100 hover:bg-stone-850 dark:hover:bg-stone-200 text-white dark:text-stone-900 font-medium shadow-lg shadow-stone-900/10 dark:shadow-stone-100/5 hover:shadow-stone-900/25 hover:scale-[1.02] active:scale-[0.98] transition-all group"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "contact")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/25 dark:bg-white/5 hover:bg-white/40 dark:hover:bg-white/10 border border-white/30 dark:border-white/10 text-stone-900 dark:text-stone-200 font-medium hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get in Touch
            </a>
          </div>

          {/* Socials & Summary */}
          <div className="flex items-center gap-5 pt-8 border-t border-stone-800/10 dark:border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-300">
              Connect:
            </span>
            <div className="flex gap-4">
              {[
                { icon: githubIcon, href: "https://github.com", label: "GitHub" },
                { icon: linkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: mailIcon, href: "mailto:xyousefjoo@gmail.com", label: "Email" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/10 dark:bg-white/5 hover:bg-stone-900 dark:hover:bg-stone-100 hover:text-white dark:hover:text-stone-900 border border-white/15 dark:border-white/10 text-stone-900 dark:text-stone-200 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right Graphic/Visual Element */}
        <ScrollReveal variant="scale-in" delay={200} className="lg:col-span-5 flex justify-center lg:justify-end w-full">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] flex items-center justify-center animate-float w-full">
            {/* Background rotating abstract ornament */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/30 dark:border-white/10 bg-gradient-to-tr from-white/10 to-white/30 dark:from-white/5 dark:to-white/10 rotate-6 scale-95 shadow-xl shadow-stone-900/5 pointer-events-none transition-all duration-500" />
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/20 dark:border-white/5 bg-gradient-to-bl from-white/5 to-white/15 dark:from-white/0 dark:to-white/5 -rotate-3 scale-100 shadow-xl shadow-stone-900/5 pointer-events-none transition-all duration-500" />

            {/* Core Card with Glassmorphic design and clean visual */}
            <div className="relative z-10 w-full h-full rounded-[2.5rem] bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 backdrop-blur-md shadow-2xl shadow-stone-900/10 dark:shadow-stone-950/20 p-8 flex flex-col justify-between overflow-hidden group hover:border-white/40 dark:hover:border-white/20 transition-all duration-500">
              {/* Header card indicator */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-stone-900 dark:text-stone-200 bg-white/20 dark:bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                  STACK // C# & .NET
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              </div>

              {/* Graphic code/design visual */}
              <div className="my-auto space-y-4 py-6 font-mono text-xs sm:text-sm text-stone-900/80 dark:text-stone-300">
                <div className="space-y-1.5">
                  <p className="text-stone-900 dark:text-white font-semibold">&lt;Developer /&gt;</p>
                  <p className="pl-4 text-stone-850 dark:text-stone-350">const skills = [</p>
                  <p className="pl-8 text-stone-900 dark:text-stone-100 font-medium">"React", "TypeScript", "Next.js",</p>
                  <p className="pl-8 text-stone-900 dark:text-stone-100 font-medium">".NET Core", "C#", "EF Core"</p>
                  <p className="pl-4 text-stone-850 dark:text-stone-350">];</p>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-white/15 dark:border-white/10">
                  <p className="text-stone-900 dark:text-white font-semibold">&lt;Architecture /&gt;</p>
                  <p className="pl-4 text-stone-850 dark:text-stone-350">const design = &#123;</p>
                  <p className="pl-8 text-stone-900 dark:text-stone-100">cleanArch: true,</p>
                  <p className="pl-8 text-stone-900 dark:text-stone-100">cqrsPattern: true,</p>
                  <p className="pl-8 text-stone-900 dark:text-stone-100">database: "SQL Server"</p>
                  <p className="pl-4 text-stone-850 dark:text-stone-350">&#125;;</p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-end border-t border-white/15 dark:border-white/10 pt-4">
                <div>
                  <h3 className="font-serif font-semibold text-lg text-stone-950 dark:text-white">
                    Youssef Gamal
                  </h3>
                  <p className="text-xs text-stone-800 dark:text-stone-400">
                    Al Minya, Egypt
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-md group-hover:rotate-12 transition-transform duration-500">
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
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
