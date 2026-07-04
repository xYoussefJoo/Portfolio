import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ["home", "about", "projects", "experience", "testimonials", "contact"];
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
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
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
          ? "bg-[#050816]/75 backdrop-blur-md border-b border-[#8A60F1]/20 shadow-lg py-3 shadow-[0_4px_30px_rgba(138,96,241,0.05)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center gap-2.5 group"
        >
          <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8A60F1] to-fuchsia-500 text-white flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(138,96,241,0.4)] group-hover:scale-105 transition-transform duration-300">
            YG
          </span>
          <span className="font-semibold text-white tracking-widest text-sm md:text-base opacity-90 group-hover:opacity-100 transition-opacity">
            YOUSSEF GAMAL
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`px-4.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ease-out ${
                activeSection === link.href.replace("#", "")
                  ? "bg-[#8A60F1] text-white shadow-[0_0_15px_rgba(138,96,241,0.4)]"
                  : "text-stone-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(138,96,241,0.5)] group hover:scale-[1.03] active:scale-[0.98]"
          >
            Hire Me
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
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
            className="md:hidden absolute top-full left-0 right-0 bg-[#050816]/95 backdrop-blur-lg border-b border-[#8A60F1]/20 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    activeSection === link.href.replace("#", "")
                      ? "bg-[#8A60F1] text-white"
                      : "text-stone-300 hover:text-white hover:bg-white/5"
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
                Hire Me
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
