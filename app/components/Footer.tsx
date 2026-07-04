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
    <footer className="py-12 border-t border-[#8A60F1]/20 px-6 md:px-12 bg-transparent text-stone-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left copyright info */}
        <div className="text-sm font-light text-stone-300 text-center md:text-left">
          &copy; {new Date().getFullYear()} Youssef Gamal. All rights reserved.
          <span className="md:inline-block hidden mx-2 text-stone-600">|</span>
          <span className="md:inline block mt-1 md:mt-0 text-xs text-stone-400">
            Handcrafted with{" "}
            <Heart className="w-3.5 h-3.5 inline text-[#8A60F1] fill-current animate-pulse mx-0.5" />{" "}
            using React Router v8, Three.js, & Tailwind
          </span>
        </div>

        {/* Right back to top button */}
        <button
          onClick={handleScrollToTop}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#8A60F1] hover:bg-[#8A60F1]/10 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_0_15px_rgba(138,96,241,0.2)] group cursor-pointer"
          title="Scroll to top"
        >
          Back to Top
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 text-[#8A60F1] group-hover:text-white" />
        </button>
      </div>
    </footer>
  );
}
