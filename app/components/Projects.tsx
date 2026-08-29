import React, { useState, useRef, useEffect } from "react";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Layers,
  Heart,
  Compass,
  LayoutGrid,
  Layers3,
  ArrowRight,
  ArrowLeft,
  MoveHorizontal,
  Flame,
  MousePointer2,
  Eye,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
  type PanInfo,
} from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { useLanguage } from "~/context/LanguageContext";
import { usePortfolioData } from "~/context/PortfolioDataContext";
import type { ProjectItem } from "~/utils/supabase";

export function Projects() {
  const [filter, setFilter] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"stack" | "grid">("stack");
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(null);

  const { t, language } = useLanguage();
  const { projects } = usePortfolioData();

  const categories = [
    { id: "all", name: t.projects.categories.all },
    { id: "branding", name: t.projects.categories.branding },
    { id: "packaging", name: t.projects.categories.packaging },
    { id: "advertising", name: t.projects.categories.advertising },
    { id: "editorial", name: t.projects.categories.editorial },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  // Reset current index if category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  // Handle Swipe / Next / Prev
  const handleNext = () => {
    if (filteredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    if (filteredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredProjects.length]);

  return (
    <section
      id="projects"
      className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-cyber transition-colors duration-350 select-none"
    >
      {/* Background Radial Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#8A60F1]/10 blur-[150px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/8 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-xl">
            <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
              {t.projects.tag}
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
              {t.projects.titleLine1}{" "}
              <span className="font-semibold italic bg-gradient-to-r from-[#8A60F1] via-fuchsia-400 to-[#00f0ff] bg-clip-text text-transparent">
                {t.projects.titleGradient}
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] font-light leading-relaxed">
              {t.projects.description}
            </p>
          </ScrollReveal>

          {/* Top Controls: Categories & View Mode Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start lg:self-auto">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-1.5 bg-[var(--pill-bg)] backdrop-blur-md p-1.5 rounded-2xl border border-[var(--pill-border)] shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    filter === cat.id
                      ? "bg-[#8A60F1] text-white shadow-[0_0_15px_rgba(138,96,241,0.4)] scale-[1.02]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-hover-bg)]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* View Mode Toggle (3D Stack vs Grid) */}
            <div className="flex items-center gap-1 bg-[var(--card-bg)] backdrop-blur-md p-1.5 rounded-2xl border border-[var(--card-border)] shadow-sm">
              <button
                onClick={() => setViewMode("stack")}
                className={`p-2 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                  viewMode === "stack"
                    ? "bg-[#8A60F1] text-white shadow-[0_0_12px_rgba(138,96,241,0.4)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-hover-bg)]"
                }`}
                title="Swipeable 3D Stack Carousel"
              >
                <Layers3 className="w-4 h-4" />
                <span className="hidden sm:inline">{t.projects.viewStack}</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                  viewMode === "grid"
                    ? "bg-[#8A60F1] text-white shadow-[0_0_12px_rgba(138,96,241,0.4)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-hover-bg)]"
                }`}
                title="Grid Layout View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">{t.projects.viewGrid}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* VIEW 1: 3D Swipeable Stacked Card Deck (Enhanced Tilt Physics)     */}
        {/* ------------------------------------------------------------------ */}
        {viewMode === "stack" ? (
          <div className="flex flex-col items-center justify-center space-y-10 py-6">
            {/* Gesture Helper Banner */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] text-xs text-[var(--text-secondary)] font-mono shadow-sm">
              <MousePointer2 className="w-3.5 h-3.5 text-[#8A60F1] animate-bounce" />
              <span>{t.projects.swipeHint}</span>
            </div>

            {/* 3D Stack Container Frame */}
            <div className="relative w-full max-w-xl md:max-w-2xl h-[580px] md:h-[620px] flex items-center justify-center perspective-[1400px]">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-20 text-[var(--text-muted)]">
                  {t.projects.noProjects}
                </div>
              ) : (
                /* Render cards in reverse order so the top card is last in DOM */
                Array.from({ length: Math.min(3, filteredProjects.length) })
                  .map((_, i) => {
                    const stackIndex = i;
                    const projectIndex = (currentIndex + stackIndex) % filteredProjects.length;
                    const project = filteredProjects[projectIndex];
                    const offset = stackIndex;
                    const isTop = stackIndex === 0;

                    // Resolve bilingual fields
                    const isDe = language === "de";
                    const resolvedTitle = (isDe ? project.title_de : project.title) || project.title;
                    const resolvedDesc =
                      (isDe ? project.description_de : project.description) || project.description;
                    const resolvedLocation =
                      (isDe ? project.clientLocation_de : project.clientLocation) ||
                      project.clientLocation;
                    const resolvedDeliverables =
                      (isDe && project.deliverables_de && project.deliverables_de.length > 0
                        ? project.deliverables_de
                        : project.deliverables) || [];

                    return {
                      project,
                      resolvedTitle,
                      resolvedDesc,
                      resolvedLocation,
                      resolvedDeliverables,
                      offset,
                      isTop,
                    };
                  })
                  .reverse()
                  .map(
                    ({
                      project,
                      resolvedTitle,
                      resolvedDesc,
                      resolvedLocation,
                      resolvedDeliverables,
                      offset,
                      isTop,
                    }) => (
                      <SwipeableCard
                        key={`${project.id}-${offset}-${currentIndex}`}
                        project={project}
                        resolvedTitle={resolvedTitle}
                        resolvedDesc={resolvedDesc}
                        resolvedLocation={resolvedLocation}
                        resolvedDeliverables={resolvedDeliverables}
                        offset={offset}
                        isTop={isTop}
                        totalCards={filteredProjects.length}
                        currentIndex={currentIndex}
                        inquireBtnText={t.projects.inquireBtn}
                        viewDetailsText={t.projects.viewDetails}
                        nextLabel={t.projects.nextBtn}
                        prevLabel={t.projects.prevBtn}
                        onSwipeLeft={handleNext}
                        onSwipeRight={handlePrev}
                        onOpenPreview={() => setPreviewProject(project)}
                      />
                    )
                  )
              )}
            </div>

            {/* Action Control Bar */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 pt-4">
              {/* Rewind / Reset Button */}
              <button
                onClick={handleReset}
                disabled={filteredProjects.length <= 1}
                className={`w-12 h-12 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] flex items-center justify-center shadow-md transition-all ${
                  filteredProjects.length <= 1
                    ? "opacity-40 cursor-not-allowed text-[var(--text-muted)]"
                    : "text-[var(--text-secondary)] hover:text-[#8A60F1] hover:border-[#8A60F1]/50 hover:bg-[var(--pill-hover-bg)] hover:scale-110 active:scale-95 cursor-pointer"
                }`}
                title={t.projects.resetTitle}
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {/* Previous Button */}
              <button
                onClick={handlePrev}
                disabled={filteredProjects.length <= 1}
                className={`w-14 h-14 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] flex items-center justify-center shadow-lg transition-all group ${
                  filteredProjects.length <= 1
                    ? "opacity-40 cursor-not-allowed text-cyan-400/50"
                    : "text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:scale-110 active:scale-95 cursor-pointer"
                }`}
                title={t.projects.prevBtn}
              >
                <ChevronLeft className="w-7 h-7 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Card Indicator Badge */}
              <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8A60F1]/20 to-fuchsia-500/20 border border-[#8A60F1]/30 backdrop-blur-md shadow-inner">
                <span className="text-xs font-mono font-bold tracking-widest text-[var(--text-primary)]">
                  {t.projects.cardCount}{" "}
                  <span className="text-[#8A60F1]">
                    {filteredProjects.length > 0 ? (currentIndex % filteredProjects.length) + 1 : 0}
                  </span>{" "}
                  {t.projects.of} {filteredProjects.length}
                </span>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={filteredProjects.length <= 1}
                className={`w-14 h-14 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] flex items-center justify-center shadow-lg transition-all group ${
                  filteredProjects.length <= 1
                    ? "opacity-40 cursor-not-allowed text-fuchsia-400/50"
                    : "text-fuchsia-400 hover:border-fuchsia-400/50 hover:bg-fuchsia-500/10 hover:scale-110 active:scale-95 cursor-pointer"
                }`}
                title={t.projects.nextBtn}
              >
                <ChevronRight className="w-7 h-7 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Direct Inquire Super Button */}
              <a
                href="#contact"
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(138,96,241,0.5)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title={t.projects.inquireTooltip}
              >
                <Flame className="w-5 h-5 text-amber-300" />
              </a>
            </div>

            {/* Bottom Interactive Thumbnail / Dots Strip */}
            <div className="flex items-center gap-2 pt-2">
              {filteredProjects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 bg-[#8A60F1] shadow-[0_0_10px_rgba(138,96,241,0.6)]"
                      : "w-2 bg-[var(--pill-border)] hover:bg-[var(--text-muted)]"
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ---------------------------------------------------------------- */
          /* VIEW 2: Clean 3D Interactive Grid Overview                       */
          /* ---------------------------------------------------------------- */
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => {
              const isDe = language === "de";
              const resolvedTitle = (isDe ? project.title_de : project.title) || project.title;
              const resolvedDesc =
                (isDe ? project.description_de : project.description) || project.description;
              const resolvedLocation =
                (isDe ? project.clientLocation_de : project.clientLocation) ||
                project.clientLocation;

              return (
                <GridProjectCard
                  key={project.id}
                  project={project}
                  title={resolvedTitle}
                  description={resolvedDesc}
                  location={resolvedLocation}
                  inquireBtnText={t.projects.inquireBtn}
                  onOpenPreview={() => setPreviewProject(project)}
                />
              );
            })}
          </motion.div>
        )}
      </div>

      {/* PROJECT PREVIEW MODAL */}
      <AnimatePresence>
        {previewProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative text-[var(--text-primary)] border-[#8A60F1]/40 max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setPreviewProject(null)}
                className="absolute top-5 right-5 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer border border-white/20"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/9] w-full bg-slate-950">
                <img
                  src={previewProject.image}
                  alt={previewProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 rounded-xl bg-[#8A60F1]/30 border border-[#8A60F1]/50 text-[#8A60F1] text-xs font-bold uppercase tracking-wider">
                    {previewProject.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
                    {language === "de" && previewProject.title_de
                      ? previewProject.title_de
                      : previewProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--card-border)] pb-4">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#8A60F1]" />
                    {language === "de" && previewProject.clientLocation_de
                      ? previewProject.clientLocation_de
                      : previewProject.clientLocation}{" "}
                    {previewProject.countryFlag}
                  </span>
                  <span>Year: {previewProject.year}</span>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                  {language === "de" && previewProject.description_de
                    ? previewProject.description_de
                    : previewProject.description}
                </p>

                {/* Deliverables */}
                {previewProject.deliverables && previewProject.deliverables.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                      {t.projects.deliverablesLabel}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {(language === "de" &&
                      previewProject.deliverables_de &&
                      previewProject.deliverables_de.length > 0
                        ? previewProject.deliverables_de
                        : previewProject.deliverables
                      ).map((del, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-xl bg-[#8A60F1]/15 text-[#8A60F1] border border-[#8A60F1]/30 text-xs font-medium flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Software Stack */}
                {previewProject.software && previewProject.software.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      {t.projects.toolsUsed}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {previewProject.software.map((sw, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-xl bg-[var(--pill-bg)] text-[var(--text-primary)] border border-[var(--pill-border)] text-xs font-medium flex items-center gap-1.5"
                        >
                          <Layers className="w-3.5 h-3.5 text-cyan-400" />
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center justify-end gap-4 border-t border-[var(--card-border)]">
                  <a
                    href="#contact"
                    onClick={() => setPreviewProject(null)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(138,96,241,0.4)] transition-all cursor-pointer"
                  >
                    <span>{t.projects.inquireBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ----------------------------------------------------------------------------
// Swipeable 3D Deck Card (Interactive 3D Gyroscopic Tilt & Holographic Sheen)
// ----------------------------------------------------------------------------
function SwipeableCard({
  project,
  resolvedTitle,
  resolvedDesc,
  resolvedLocation,
  resolvedDeliverables,
  offset,
  isTop,
  totalCards,
  currentIndex,
  inquireBtnText,
  viewDetailsText,
  nextLabel,
  prevLabel,
  onSwipeLeft,
  onSwipeRight,
  onOpenPreview,
}: {
  project: ProjectItem;
  resolvedTitle: string;
  resolvedDesc: string;
  resolvedLocation: string;
  resolvedDeliverables: string[];
  offset: number;
  isTop: boolean;
  totalCards: number;
  currentIndex: number;
  inquireBtnText: string;
  viewDetailsText: string;
  nextLabel: string;
  prevLabel: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onOpenPreview: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isSwipingOut, setIsSwipingOut] = useState(false);

  // Mouse tilt tracking relative to card center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 300,
    damping: 30,
  });

  // Dynamic holographic shine position
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  // Reset motion values on card change
  useEffect(() => {
    x.set(0);
    mouseX.set(0);
    mouseY.set(0);
    setIsSwipingOut(false);
  }, [offset, isTop, project.id, currentIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Drag physics
  const dragRotate = useTransform(x, [-300, 0, 300], [-16, 0, 16]);
  const opacity = useTransform(x, [-400, -200, 0, 200, 400], [0.3, 0.95, 1, 0.95, 0.3]);
  const dragScale = useTransform(x, [-300, 0, 300], [0.96, 1, 0.96]);

  const nextBadgeOpacity = useTransform(x, [-120, -25], [1, 0]);
  const nextBadgeScale = useTransform(x, [-120, -25], [1, 0.85]);

  const prevBadgeOpacity = useTransform(x, [25, 120], [0, 1]);
  const prevBadgeScale = useTransform(x, [25, 120], [0.85, 1]);

  // 3D Stacking parameters
  const stackScale = 1 - offset * 0.055;
  const translateY = offset * 22;
  const translateZ = -offset * 60;
  const zIndex = 30 - offset * 5;
  const rotateZ = offset === 0 ? 0 : offset === 1 ? -2 : 2.5;
  const baseOpacity = 1 - offset * 0.18;

  const handleDragEnd = async (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (isSwipingOut) return;

    if (totalCards <= 1) {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 25 });
      return;
    }

    const distanceThreshold = 55;
    const velocityThreshold = 250;

    const isLeftSwipe = info.offset.x < -distanceThreshold || info.velocity.x < -velocityThreshold;
    const isRightSwipe = info.offset.x > distanceThreshold || info.velocity.x > velocityThreshold;

    if (isLeftSwipe) {
      setIsSwipingOut(true);
      await animate(x, -650, { duration: 0.2, ease: "easeOut" });
      x.set(0);
      setIsSwipingOut(false);
      onSwipeLeft();
    } else if (isRightSwipe) {
      setIsSwipingOut(true);
      await animate(x, 650, { duration: 0.2, ease: "easeOut" });
      x.set(0);
      setIsSwipingOut(false);
      onSwipeRight();
    } else {
      animate(x, 0, { type: "spring", stiffness: 350, damping: 25 });
    }
  };

  const accent = project.accentColor || "#8A60F1";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? dragRotate : rotateZ,
        rotateX: isTop ? rotateX : 0,
        rotateY: isTop ? rotateY : 0,
        opacity: isTop ? opacity : baseOpacity,
        scale: isTop ? dragScale : stackScale,
        y: translateY,
        z: translateZ,
        zIndex,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        touchAction: "pan-y",
        transformStyle: "preserve-3d",
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.95}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      initial={isTop ? { scale: 0.95, y: 15, opacity: 0.9 } : false}
      animate={{
        scale: isTop ? 1 : stackScale,
        y: translateY,
        opacity: isTop ? 1 : baseOpacity,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 28,
      }}
      className={`glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-[#8A60F1]/30 bg-[var(--card-bg)] select-none ${
        isTop
          ? "cursor-grab active:cursor-grabbing hover:border-[#8A60F1]/60"
          : "pointer-events-none"
      }`}
    >
      {/* Dynamic Colored Glow Dropshadow */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-30 blur-2xl pointer-events-none -z-10 transition-opacity duration-300"
        style={{ backgroundColor: accent }}
      />

      {/* Dynamic Holographic Specular Sheen on Cursor Hover */}
      {isTop && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 opacity-40 mix-blend-overlay transition-opacity"
          style={{
            background: `radial-gradient(circle 320px at ${shineX} ${shineY}, rgba(255, 255, 255, 0.45), transparent 70%)`,
          }}
        />
      )}

      {/* Swipe Badges */}
      {isTop && totalCards > 1 && (
        <>
          <motion.div
            style={{ opacity: nextBadgeOpacity, scale: nextBadgeScale }}
            className="absolute top-8 right-8 z-40 px-4 py-2 rounded-2xl border-2 border-fuchsia-400 bg-fuchsia-500/25 text-fuchsia-200 font-extrabold text-xs md:text-sm uppercase tracking-widest backdrop-blur-md shadow-[0_0_25px_rgba(217,70,239,0.5)] rotate-6 pointer-events-none flex items-center gap-2"
          >
            <span>{nextLabel || "NEXT"}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>

          <motion.div
            style={{ opacity: prevBadgeOpacity, scale: prevBadgeScale }}
            className="absolute top-8 left-8 z-40 px-4 py-2 rounded-2xl border-2 border-cyan-400 bg-cyan-500/25 text-cyan-200 font-extrabold text-xs md:text-sm uppercase tracking-widest backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.5)] -rotate-6 pointer-events-none flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{prevLabel || "PREV"}</span>
          </motion.div>
        </>
      )}

      {/* Top Artwork Image Container */}
      <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden border-b border-[var(--card-border)] pointer-events-none">
        <img
          src={project.image}
          alt={resolvedTitle}
          draggable={false}
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
          <span className="px-3.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-[#8A60F1] font-extrabold text-[10px] uppercase tracking-widest border border-[#8A60F1]/30 shadow-md">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white font-mono text-[11px] font-bold border border-white/15 shadow-md">
            {project.countryFlag} {project.year}
          </span>
        </div>

        {/* Floating Accent Color Dot */}
        <div
          className="absolute bottom-4 right-4 w-3.5 h-3.5 rounded-full shadow-[0_0_12px_currentColor] pointer-events-none"
          style={{ backgroundColor: accent }}
        />
      </div>

      {/* Card Info Body */}
      <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-6">
        <div className="space-y-3 pointer-events-none">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#8A60F1]" />
              {resolvedLocation}
            </span>
            {resolvedDeliverables[0] && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A60F1] px-2.5 py-0.5 rounded-md bg-[#8A60F1]/10 border border-[#8A60F1]/20">
                {resolvedDeliverables[0]}
              </span>
            )}
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] tracking-wide leading-tight line-clamp-1">
            {resolvedTitle}
          </h3>

          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-light line-clamp-3">
            {resolvedDesc}
          </p>
        </div>

        {/* Software Stack & CTA Action */}
        <div className="pt-4 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5 items-center pointer-events-none">
            {project.software.slice(0, 3).map((sw, sIdx) => (
              <span
                key={sIdx}
                className="px-2.5 py-1 rounded-lg bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[10px] font-medium text-[var(--text-primary)] shadow-sm flex items-center gap-1"
              >
                <Layers className="w-3 h-3 text-[#8A60F1]" />
                {sw}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenPreview();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="px-4 py-2.5 rounded-xl glass-card hover:border-[#8A60F1] text-xs font-bold text-[var(--text-primary)] hover:text-[#8A60F1] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{viewDetailsText}</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(138,96,241,0.4)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{inquireBtnText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------------
// Grid View Project Card with 3D Spotlight Tilt
// ----------------------------------------------------------------------------
function GridProjectCard({
  project,
  title,
  description,
  location,
  inquireBtnText,
  onOpenPreview,
}: {
  project: ProjectItem;
  title: string;
  description: string;
  location: string;
  inquireBtnText: string;
  onOpenPreview: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const accent = project.accentColor || "#8A60F1";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-[#8A60F1]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-lg relative"
    >
      {/* Artwork */}
      <div
        onClick={onOpenPreview}
        className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer"
      >
        <img
          src={project.image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-[#8A60F1] border border-[#8A60F1]/30 text-[10px] font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-mono font-bold">
            {project.countryFlag} {project.year}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h4
          onClick={onOpenPreview}
          className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[#8A60F1] transition-colors cursor-pointer line-clamp-1"
        >
          {title}
        </h4>
        <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="pt-3 border-t border-[var(--card-border)] flex items-center justify-between">
          <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[#8A60F1]" />
            {location}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPreview}
              className="p-1.5 rounded-lg glass-card hover:text-[#8A60F1] text-xs transition-colors cursor-pointer"
              title="Quick Preview"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <a
              href="#contact"
              className="text-xs font-bold text-[#8A60F1] hover:text-fuchsia-400 flex items-center gap-1"
            >
              {inquireBtnText} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
