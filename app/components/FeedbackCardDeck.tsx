import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  X,
  CheckCircle2,
  Sparkles,
  Send,
  Globe,
  Share2,
  Radio,
} from "lucide-react";
import { usePortfolioData } from "~/context/PortfolioDataContext";
import { useLanguage } from "~/context/LanguageContext";

export function FeedbackCardDeck() {
  const { approvedFeedback, submitFeedback, isRealtimeConnected } = usePortfolioData();
  const { t } = useLanguage();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Form State
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const items = approvedFeedback.length > 0 ? approvedFeedback : [];

  const handleNext = () => {
    if (items.length <= 1) return;
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    if (items.length <= 1) return;
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const res = await submitFeedback({
      name: formName.trim(),
      message: formMessage.trim(),
      rating: formRating,
      role: formRole.trim() || "Client / Collaborator",
      company: formCompany.trim() || "Independent",
      country: formCountry.trim() || "Global",
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitSuccess(true);
      setFormName("");
      setFormRole("");
      setFormCompany("");
      setFormCountry("");
      setFormMessage("");
      setFormRating(5);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsModalOpen(false);
      }, 2400);
    } else {
      setSubmitError(res.error || "Failed to submit. Please try again.");
    }
  };

  const currentItem = items[currentIndex] || {
    name: "Client Partner",
    role: "Director",
    company: "Studio",
    country: "Global",
    rating: 5,
    message: "No reviews yet. Be the first to share your feedback!",
    avatar_url: null,
  };

  return (
    <div className="w-full relative">
      {/* Realtime Live Status & Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isRealtimeConnected ? "Live Supabase Realtime" : "Realtime Sync Ready"}</span>
          </div>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            {items.length} {items.length === 1 ? "Story" : "Stories"}
          </span>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(138,96,241,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Leave Feedback</span>
        </button>
      </div>

      {/* STACKED CARD DECK CONTAINER */}
      <div className="relative w-full max-w-2xl mx-auto min-h-[460px] flex items-center justify-center perspective-[1200px]">
        {/* Background Stack Illusion Layers */}
        <div className="absolute w-[90%] h-[380px] rounded-3xl bg-gradient-to-br from-rose-950/40 to-red-900/30 border border-rose-500/20 translate-y-6 scale-[0.92] blur-[1px] pointer-events-none shadow-2xl transition-all duration-500" />
        <div className="absolute w-[95%] h-[400px] rounded-3xl bg-gradient-to-br from-rose-900/60 to-red-800/40 border border-rose-500/30 translate-y-3 scale-[0.96] pointer-events-none shadow-2xl transition-all duration-500" />

        {/* Top Active Card (Red / Vibrant Crimson Theme) */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex + (currentItem.id || "card")}
            initial={{
              opacity: 0,
              x: direction === "right" ? 100 : -100,
              rotate: direction === "right" ? 4 : -4,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: direction === "right" ? -100 : 100,
              rotate: direction === "right" ? -4 : 4,
              scale: 0.95,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) handleNext();
              if (info.offset.x > 60) handlePrev();
            }}
            className="w-full relative z-10 rounded-3xl p-8 md:p-10 bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#881337] text-white shadow-[0_20px_50px_rgba(225,29,72,0.35)] border border-rose-400/30 overflow-hidden cursor-grab active:cursor-grabbing select-none"
          >
            {/* Glossy Overlay & Radial Highlight */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-white/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-black/20 rounded-full blur-2xl pointer-events-none" />

            {/* Top Card Bar: Rating + Quote */}
            <div className="flex items-center justify-between relative z-10 mb-8">
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < (currentItem.rating || 5)
                        ? "text-amber-300 fill-amber-300 drop-shadow-[0_0_6px_rgba(252,211,77,0.6)]"
                        : "text-white/30"
                    }`}
                  />
                ))}
                <span className="text-xs font-bold text-white ml-1 font-mono">
                  {(currentItem.rating || 5).toFixed(1)}
                </span>
              </div>

              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                <Quote className="w-5 h-5 text-white/90" />
              </div>
            </div>

            {/* Card Body: Quote Text */}
            <div className="relative z-10 min-h-[120px] flex items-center my-4">
              <p className="text-base md:text-lg lg:text-xl font-normal leading-relaxed text-white/95 italic drop-shadow-sm font-sans">
                "{currentItem.message}"
              </p>
            </div>

            {/* Card Footer: White Circular Profile Photo + Name + Social Icons */}
            <div className="pt-6 mt-6 border-t border-white/20 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* White Circular Profile Photo */}
                <div className="relative w-14 h-14 rounded-full p-1 bg-white shadow-xl flex-shrink-0">
                  {currentItem.avatar_url ? (
                    <img
                      src={currentItem.avatar_url}
                      alt={currentItem.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-black text-sm uppercase">
                      {currentItem.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .substring(0, 2)}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
                </div>

                {/* Name & Role */}
                <div>
                  <h4 className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                    {currentItem.name}
                  </h4>
                  <p className="text-xs text-rose-100 font-light mt-0.5">
                    {currentItem.role || "Client"}{" "}
                    {currentItem.company ? `• ${currentItem.company}` : ""}
                  </p>
                  {currentItem.country && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-rose-200/80 font-mono mt-0.5">
                      <Globe className="w-2.5 h-2.5" />
                      {currentItem.country}
                    </span>
                  )}
                </div>
              </div>

              {/* Social Icons Row */}
              <div className="flex items-center gap-2 self-end sm:self-center bg-black/25 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15">
                <a
                  href="#testimonials"
                  className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  title="Social Share"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </a>
                <span className="text-[10px] font-mono text-white/70 font-bold px-1">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8 relative z-20">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full glass-card hover:border-[#8A60F1] flex items-center justify-center text-[var(--text-primary)] hover:text-[#8A60F1] transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? "right" : "left");
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? "w-7 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full glass-card hover:border-[#8A60F1] flex items-center justify-center text-[var(--text-primary)] hover:text-[#8A60F1] transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* FEEDBACK SUBMISSION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative text-[var(--text-primary)] border-[#8A60F1]/30 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-[var(--pill-hover-bg)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1 rounded-md border border-[#8A60F1]/20 inline-block">
                  Share Your Experience
                </span>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                  Leave a Review
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
                  Your feedback will be moderated and featured on our live card deck once approved.
                </p>
              </div>

              {submitSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-400">Feedback Submitted!</h4>
                  <p className="text-sm text-[var(--text-secondary)] max-w-xs">
                    Thank you! Your feedback has been sent for admin review and will appear soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                      {submitError}
                    </div>
                  )}

                  {/* Rating Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                      Your Rating (1 to 5 Stars)
                    </label>
                    <div className="flex items-center gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormRating(star)}
                          className="p-1.5 rounded-lg hover:bg-amber-400/10 transition-colors cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 transition-all ${
                              star <= formRating
                                ? "text-amber-400 fill-amber-400 scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                                : "text-[var(--text-muted)]"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-mono text-[var(--text-muted)] ml-2">
                        {formRating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                        Role / Title
                      </label>
                      <input
                        type="text"
                        value={formRole}
                        onChange={(e) => setFormRole(e.target.value)}
                        placeholder="e.g. Marketing Lead"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        placeholder="e.g. Acme Media"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                        Country / City
                      </label>
                      <input
                        type="text"
                        value={formCountry}
                        onChange={(e) => setFormCountry(e.target.value)}
                        placeholder="e.g. United States"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                      Your Feedback / Review *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Share your experience working on projects together..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white shadow-[0_0_20px_rgba(138,96,241,0.3)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit for Moderation</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
