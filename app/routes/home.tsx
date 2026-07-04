import type { Route } from "./+types/home";
import { Navbar } from "~/components/Navbar";
import { Hero } from "~/components/Hero";
import { About } from "~/components/About";
import { Projects } from "~/components/Projects";
import { Experience } from "~/components/Experience";
import { Contact } from "~/components/Contact";
import { Footer } from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Youssef Gamal | Full-Stack .NET & Frontend Developer" },
    {
      name: "description",
      content: "Personal portfolio of Youssef Gamal, featuring premium full-stack ASP.NET Core backend systems and Next.js frontend projects.",
    },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-stone-900 selection:text-white dark:selection:bg-stone-100 dark:selection:text-stone-900 antialiased">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Banner */}
        <Hero />

        {/* Separator lines or page breaks for modern design */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-px bg-stone-850/10 w-full" />
        </div>

        {/* About Section */}
        <About />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-px bg-stone-850/10 w-full" />
        </div>

        {/* Selected Work Projects Showcase */}
        <Projects />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-px bg-stone-850/10 w-full" />
        </div>

        {/* Timeline & Professional Experience */}
        <Experience />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-px bg-stone-850/10 w-full" />
        </div>

        {/* Interactive Contact Forms */}
        <Contact />
      </main>

      {/* Page Footer */}
      <Footer />
    </div>
  );
}
