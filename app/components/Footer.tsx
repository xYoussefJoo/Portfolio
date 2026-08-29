import { ArrowUp } from "lucide-react";

export function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-12 border-t border-[var(--nav-border)] px-6 md:px-12 bg-transparent text-[var(--text-primary)] transition-colors duration-350">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left copyright info */}
        <div className="text-sm font-light text-[var(--text-secondary)] text-center md:text-left">
          &copy; {new Date().getFullYear()} Kero Amir. All rights reserved.
          <span className="md:inline-block hidden mx-2 text-[var(--text-muted)]">|</span>
          <span className="md:inline block mt-1 md:mt-0 text-xs text-[var(--text-muted)]">
            Senior Graphic Designer & Visual Artist
          </span>
        </div>

        {/* Right back to top button */}
        <button
          onClick={handleScrollToTop}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] hover:border-[#8A60F1] hover:bg-[#8A60F1]/10 text-sm font-semibold text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_0_15px_rgba(138,96,241,0.2)] group cursor-pointer"
          title="Scroll to top"
        >
          Back to Top
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 text-[#8A60F1]" />
        </button>
      </div>
    </footer>
  );
}
