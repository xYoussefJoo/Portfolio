import { lazy, Suspense } from "react";
import type { Route } from "./+types/home";
import { Navbar } from "~/components/Navbar";
import { Hero } from "~/components/Hero";

// Below-the-fold sections are code-split so the initial bundle is
// Navbar + Hero only (~40% smaller JS for LCP).
const About = lazy(() => import("~/components/About").then((m) => ({ default: m.About })));
const Skills = lazy(() => import("~/components/Skills").then((m) => ({ default: m.Skills })));
const Projects = lazy(() => import("~/components/Projects").then((m) => ({ default: m.Projects })));
const Experience = lazy(() =>
  import("~/components/Experience").then((m) => ({ default: m.Experience }))
);
const Testimonials = lazy(() =>
  import("~/components/Testimonials").then((m) => ({ default: m.Testimonials }))
);
const Contact = lazy(() => import("~/components/Contact").then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import("~/components/Footer").then((m) => ({ default: m.Footer })));

function SectionFallback({ label }: { label: string }) {
  return (
    <div
      aria-label={label}
      className="mx-auto my-8 h-64 max-w-7xl rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] animate-pulse"
    />
  );
}

export function meta({}: Route.MetaArgs) {
  const title = "Kero Amir | Senior Graphic Designer & Visual Artist";
  const description =
    "Portfolio of Kero Amir — Senior Graphic Designer & Visual Artist with 3+ years of experience, 200+ completed projects across the US, Germany, France, and Egypt, and master-level expertise in Adobe Creative Cloud.";
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "robots", content: "index, follow" },
  ];
}

export function HydrateFallback() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-6 pt-28">
        <div className="h-12 w-48 rounded-full bg-[var(--pill-bg)] animate-pulse" />
        <div className="mt-6 h-20 w-3/4 rounded-2xl bg-[var(--card-bg)] animate-pulse" />
        <div className="mt-4 h-64 rounded-3xl bg-[var(--card-bg)] animate-pulse" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#8A60F1]/30 selection:text-[#8A60F1] antialiased transition-colors duration-350">
      {/* Interactive Sticky Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section with Interactive 3D Canvas (eager for LCP) */}
        <Hero />

        {/* Biography Section */}
        <Suspense fallback={<SectionFallback label="Loading about" />}>
          <About />
        </Suspense>

        {/* Detailed Skills Section */}
        <Suspense fallback={<SectionFallback label="Loading skills" />}>
          <Skills />
        </Suspense>

        {/* Projects Grid Section with 3D hover effects */}
        <Suspense fallback={<SectionFallback label="Loading projects" />}>
          <Projects />
        </Suspense>

        {/* Journey Timeline */}
        <Suspense fallback={<SectionFallback label="Loading experience" />}>
          <Experience />
        </Suspense>

        {/* Client Success Stories */}
        <Suspense fallback={<SectionFallback label="Loading testimonials" />}>
          <Testimonials />
        </Suspense>

        {/* Dynamic Contact Forms */}
        <Suspense fallback={<SectionFallback label="Loading contact" />}>
          <Contact />
        </Suspense>
      </main>

      {/* Glowing Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
