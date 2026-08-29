import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Sun, Moon, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "~/context/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { language, toggleLanguage, t } = useLanguage();

  // Initialize and sync theme
  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (nextTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    // Broadcast theme change event for Three.js 3D canvas and other reactive components
    window.dispatchEvent(new CustomEvent("themeChanged", { detail: nextTheme }));
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ["home", "about", "skills", "projects", "experience", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.journey, href: "#experience" },
    { name: t.nav.testimonials, href: "#testimonials" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 ${
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--nav-border)] shadow-lg py-3 shadow-[0_4px_30px_rgba(138,96,241,0.08)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#8A60F1]/40 shadow-[0_0_15px_rgba(138,96,241,0.4)] group-hover:scale-105 group-hover:border-[#8A60F1] transition-all duration-300 bg-[#050816] flex items-center justify-center">
            <img
              src="/img/KesoLogo.jpeg"
              alt="Kero Amir Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="font-bold text-sm text-white hidden group-has-[:only-child]:inline">KA</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-widest text-sm md:text-base opacity-95 group-hover:opacity-100 text-[var(--text-primary)] group-hover:text-[#8A60F1] transition-all">
              KERO AMIR
            </span>
            <span className="text-[10px] text-[var(--text-muted)] tracking-wider font-light uppercase hidden sm:block">
              {t.nav.role}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-[var(--pill-bg)] backdrop-blur-md p-1.5 rounded-full border border-[var(--pill-border)] shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ease-out ${
                activeSection === link.href.replace("#", "")
                  ? "bg-[#8A60F1] text-white shadow-[0_0_15px_rgba(138,96,241,0.4)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-hover-bg)]"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Actions, Language Switcher & Theme Toggle */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] hover:border-[#8A60F1]/50 text-[var(--text-primary)] hover:text-[#8A60F1] transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm text-xs font-bold tracking-wider font-mono"
            aria-label="Toggle language"
            title={language === "en" ? "Auf Deutsch umschalten" : "Switch to English"}
          >
            <Globe className="w-3.5 h-3.5 text-[#8A60F1]" />
            <span>{language === "en" ? "DE 🇩🇪" : "EN 🇬🇧"}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] hover:border-[#8A60F1]/50 text-[var(--text-primary)] hover:text-[#8A60F1] transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm"
            aria-label="Toggle dark and light theme"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4.5 h-4.5 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-[#8A60F1]" />
            )}
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(138,96,241,0.5)] group hover:scale-[1.03] active:scale-[0.98]"
          >
            {t.nav.hireMe}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu & Controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Language Button */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-xl bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[var(--text-primary)] text-xs font-bold font-mono transition-colors cursor-pointer flex items-center gap-1"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[#8A60F1]" />
            <span>{language === "en" ? "DE" : "EN"}</span>
          </button>

          {/* Mobile Theme Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-[#8A60F1]" />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-[var(--pill-bg)] hover:bg-[var(--pill-hover-bg)] border border-[var(--pill-border)] text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[var(--nav-bg)] backdrop-blur-lg border-b border-[var(--nav-border)] shadow-xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    activeSection === link.href.replace("#", "")
                      ? "bg-[#8A60F1] text-white"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-hover-bg)]"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="flex items-center justify-center gap-1 mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 text-white font-semibold text-center hover:scale-[1.01] transition-all"
              >
                {t.nav.hireMe}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
