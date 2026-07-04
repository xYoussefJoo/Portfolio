import { ArrowUp, Heart } from "lucide-react";

export function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-12 border-t border-stone-850/10 dark:border-white/10 px-6 md:px-12 bg-transparent text-stone-900 dark:text-stone-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in">
        {/* Left copyright info */}
        <div className="text-sm font-normal text-stone-850 dark:text-stone-300 text-center md:text-left">
          &copy; {new Date().getFullYear()} Youssef Gamal. All rights reserved.
          <span className="md:inline-block hidden mx-2 text-stone-450 dark:text-stone-600">|</span>
          <span className="md:inline block mt-1 md:mt-0 text-xs text-stone-750 dark:text-stone-400">
            Handcrafted with <Heart className="w-3 h-3 inline text-red-700 dark:text-red-500 fill-current animate-pulse mx-0.5" /> using React Router & Tailwind
          </span>
        </div>

        {/* Right back to top button */}
        <button
          onClick={handleScrollToTop}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/20 dark:bg-white/5 hover:bg-stone-900 dark:hover:bg-stone-100 hover:text-white dark:hover:text-stone-900 border border-white/20 dark:border-white/10 hover:border-stone-900 dark:hover:border-stone-100 text-sm font-semibold transition-all duration-350 hover:-translate-y-1 shadow-sm group"
          title="Scroll to top"
        >
          Back to Top
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
