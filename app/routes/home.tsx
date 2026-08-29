import type { Route } from "./+types/home";
import { Navbar } from "~/components/Navbar";
import { Hero } from "~/components/Hero";
import { About } from "~/components/About";
import { Skills } from "~/components/Skills";
import { Projects } from "~/components/Projects";
import { Experience } from "~/components/Experience";
import { Testimonials } from "~/components/Testimonials";
import { Contact } from "~/components/Contact";
import { Footer } from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kero Amir | Senior Graphic Designer & Visual Artist" },
    {
      name: "description",
      content: "Portfolio of Kero Amir — Senior Graphic Designer & Visual Artist with 3+ years of experience, 200+ completed projects across the US, Germany, France, and Egypt, and master-level expertise in Adobe Creative Cloud.",
    },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#8A60F1]/30 selection:text-[#8A60F1] antialiased transition-colors duration-350">
      {/* Interactive Sticky Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section with Interactive 3D Canvas */}
        <Hero />

        {/* Biography Section */}
        <About />

        {/* Detailed Skills Section */}
        <Skills />

        {/* Projects Grid Section with 3D hover effects */}
        <Projects />

        {/* Journey Timeline */}
        <Experience />

        {/* Client Success Stories */}
        <Testimonials />

        {/* Dynamic Contact Forms */}
        <Contact />
      </main>

      {/* Glowing Footer */}
      <Footer />
    </div>
  );
}
