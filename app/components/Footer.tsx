import { ArrowUp, LayoutDashboard, Globe } from "lucide-react";
import { useLanguage } from "~/context/LanguageContext";
import { usePortfolioData } from "~/context/PortfolioDataContext";

export function Footer() {
  const { t } = useLanguage();
  const { socialLinks } = usePortfolioData();

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
        {/* Left copyright info & Dashboard quick access */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-sm font-light text-[var(--text-secondary)] text-center md:text-left">
          <div>
            &copy; {new Date().getFullYear()} Kero Amir. {t.footer.copyright}
            <span className="md:inline-block hidden mx-2 text-[var(--text-muted)]">|</span>
            <span className="md:inline block mt-1 md:mt-0 text-xs text-[var(--text-muted)]">
              {t.footer.role}
            </span>
          </div>

          <a
            href="/dashboard"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--pill-bg)] hover:bg-[#8A60F1]/15 border border-[var(--pill-border)] hover:border-[#8A60F1]/40 text-xs font-mono text-[var(--text-muted)] hover:text-[#8A60F1] transition-all"
            title="Open Admin Dashboard"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>{t.footer.adminDashboard}</span>
          </a>
        </div>

        {/* Center / Right dynamic social links + back to top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-lg bg-[var(--pill-bg)] hover:bg-[#8A60F1]/15 border border-[var(--pill-border)] hover:border-[#8A60F1]/40 text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] hover:text-[#8A60F1] transition-all"
              >
                {link.platform}
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] hover:border-[#8A60F1] hover:bg-[#8A60F1]/10 text-sm font-semibold text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_0_15px_rgba(138,96,241,0.2)] group cursor-pointer"
            title="Scroll to top"
          >
            {t.footer.backToTop}
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 text-[#8A60F1]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
