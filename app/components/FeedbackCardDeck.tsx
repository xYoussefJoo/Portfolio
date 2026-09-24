import React, { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquarePlus, X, CheckCircle2, Send, Globe, Radio } from "lucide-react";
import { usePortfolioData } from "~/context/PortfolioDataContext";
import { useLanguage } from "~/context/LanguageContext";
import type { FeedbackItem } from "~/utils/supabase";

// Placeholder reviews shown only until real approved feedback exists. They are
// visibly labeled "Example" on the site so visitors never mistake them for real clients.
const EXAMPLE_FEEDBACK: FeedbackItem[] = [
  {
    id: "example-1",
    name: "Example Client",
    role: "Marketing Manager",
    company: "Sample Brand Co.",
    country: "Example",
    rating: 5,
    message:
      "Clear communication, fast turnaround, and a brand identity that finally matches our vision. Would work together again.",
    status: "approved",
    avatar_url: null,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "example-2",
    name: "Example Founder",
    role: "Founder",
    company: "Sample Startup",
    country: "Example",
    rating: 5,
    message:
      "The packaging design and 3D mockups helped us pitch our product before the first print run. Great attention to detail.",
    status: "approved",
    avatar_url: null,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "example-3",
    name: "Example Art Director",
    role: "Art Director",
    company: "Sample Agency",
    country: "Example",
    rating: 5,
    message:
      "Delivered print-ready files on time with a well-organized layer structure. Easy to hand off to our production team.",
    status: "approved",
    avatar_url: null,
    created_at: "2026-01-01T00:00:00.000Z",
  },
];

const isExample = (fb: FeedbackItem) => String(fb.id).startsWith("example-");

export function FeedbackCardDeck() {
  const { approvedFeedback, submitFeedback, isRealtimeConnected } = usePortfolioData();
  const { t } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const hasRealFeedback = approvedFeedback.length > 0;
  const items = hasRealFeedback ? approvedFeedback : EXAMPLE_FEEDBACK;

  // Real average from real reviews (was a hard-coded "5.0 Rating • 100% Satisfaction")
  const avgRating = useMemo(() => {
    if (!hasRealFeedback) return null;
    const sum = approvedFeedback.reduce((acc, f) => acc + (f.rating || 5), 0);
    return sum / approvedFeedback.length;
  }, [approvedFeedback, hasRealFeedback]);

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

  // Memoized marquee lanes — was recomputed + array-doubled on every render
  const { lane1Items, lane2Items } = useMemo(() => {
    const build = (offset: number) => {
      if (items.length === 0) return [];
      let lane = items.filter((_, idx) => idx % 2 === offset);
      if (lane.length === 0) lane = items;
      while (lane.length < 6) {
        lane = [...lane, ...items];
      }
      return [...lane, ...lane];
    };
    return { lane1Items: build(0), lane2Items: build(1) };
  }, [items]);

  return (
    <div className="w-full relative space-y-8">
      {/* Realtime Live Status, Aggregate Ratings & View Mode Switcher Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 glass-card rounded-3xl border-[#8A60F1]/20 shadow-md">
        {/* Left Status badges */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Live indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isRealtimeConnected ? t.testimonials.liveRealtime : t.testimonials.realtimeSync}</span>
          </div>

          {/* Average Rating Pill — computed from real reviews, hidden while showing examples */}
          {avgRating !== null && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>{avgRating.toFixed(1)} / 5</span>
            </div>
          )}

          <span className="text-xs text-[var(--text-muted)] font-mono hidden sm:inline">
            {hasRealFeedback
              ? `${items.length} ${t.testimonials.storiesCount}`
              : t.testimonials.examplesNotice}
          </span>
        </div>

        {/* Right: Ticker label & Leave Feedback Button */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#8A60F1] text-white shadow-[0_0_12px_rgba(138,96,241,0.4)]">
            <Radio className="w-3.5 h-3.5" />
            <span>{t.testimonials.viewBanner}</span>
          </div>

          {/* Leave Feedback Modal Trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(138,96,241,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{t.testimonials.leaveFeedbackBtn}</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* LIVE BANNER TICKER (infinite marquee)                              */}
      {/* =================================================================== */}
      {/* Full-bleed: breaks out of the max-w-7xl container to span the whole viewport
          (the section's overflow-hidden clips the scrollbar-width overhang of 100vw) */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-4 space-y-6">
        {/* Left & Right Ambient Fade Overlays for seamless edge blending */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-20 pointer-events-none" />

        {/* Lane 1: Sliding Left */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left pause-on-hover gap-6 items-stretch">
            {lane1Items.map((fb, idx) => (
              <BannerCommentCard key={`lane1-${fb.id || idx}-${idx}`} feedback={fb} exampleLabel={isExample(fb) ? t.testimonials.exampleBadge : undefined} />
            ))}
          </div>
        </div>

        {/* Lane 2: Sliding Right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right pause-on-hover gap-6 items-stretch">
            {lane2Items.map((fb, idx) => (
              <BannerCommentCard key={`lane2-${fb.id || idx}-${idx}`} feedback={fb} exampleLabel={isExample(fb) ? t.testimonials.exampleBadge : undefined} />
            ))}
          </div>
        </div>

        {/* Banner bottom hint */}
        <div className="text-center pt-2">
          <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--pill-bg)] px-3 py-1 rounded-full border border-[var(--pill-border)]">
            ✨ {t.testimonials.pauseHint}
          </span>
        </div>
      </div>

      {/* =================================================================== */}
      {/* FEEDBACK SUBMISSION MODAL                                           */}
      {/* =================================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
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
                  {t.testimonials.modal.badge}
                </span>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                  {t.testimonials.modal.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
                  {t.testimonials.modal.description}
                </p>
              </div>

              {submitSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-400">{t.testimonials.modal.successTitle}</h4>
                  <p className="text-sm text-[var(--text-secondary)] max-w-xs">
                    {t.testimonials.modal.successDesc}
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
                      {t.testimonials.modal.ratingLabel}
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
                        {formRating} / 5 {t.testimonials.modal.starsCount}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                        {t.testimonials.modal.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder={t.testimonials.modal.namePlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                        {t.testimonials.modal.roleLabel}
                      </label>
                      <input
                        type="text"
                        value={formRole}
                        onChange={(e) => setFormRole(e.target.value)}
                        placeholder={t.testimonials.modal.rolePlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                        {t.testimonials.modal.companyLabel}
                      </label>
                      <input
                        type="text"
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        placeholder={t.testimonials.modal.companyPlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                        {t.testimonials.modal.countryLabel}
                      </label>
                      <input
                        type="text"
                        value={formCountry}
                        onChange={(e) => setFormCountry(e.target.value)}
                        placeholder={t.testimonials.modal.countryPlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                      {t.testimonials.modal.messageLabel}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder={t.testimonials.modal.messagePlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white shadow-[0_0_20px_rgba(138,96,241,0.3)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{t.testimonials.modal.submitting}</span>
                    ) : (
                      <>
                        <span>{t.testimonials.modal.submitBtn}</span>
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

// ----------------------------------------------------------------------------
// BANNER COMMENT CARD (For Continuous Infinite Scrolling Ribbon)
// ----------------------------------------------------------------------------
const BannerCommentCard = memo(function BannerCommentCard({
  feedback,
  exampleLabel,
}: {
  feedback: FeedbackItem;
  /** Set for placeholder reviews: replaces the "Verified Client" badge */
  exampleLabel?: string;
}) {
  return (
    // Solid background instead of .glass-card: a backdrop-filter blur on cards that move
    // every frame (infinite marquee) is re-computed continuously on the GPU
    <div className="w-[340px] md:w-[400px] flex-shrink-0 bg-[var(--card-solid-bg)] shadow-[0_8px_32px_0_var(--shadow-color)] rounded-3xl p-6 border border-[#8A60F1]/20 hover:border-[#8A60F1]/60 hover:shadow-[0_10px_30px_rgba(138,96,241,0.25)] transition-[border-color,box-shadow,scale] duration-300 hover:scale-[1.02] flex flex-col justify-between space-y-4 group">
      {/* Top Card Header: Avatar, Author, Star Rating */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8A60F1] to-fuchsia-600 p-0.5 overflow-hidden flex-shrink-0 shadow-md">
              {feedback.avatar_url ? (
                <img
                  src={feedback.avatar_url}
                  alt={feedback.name}
                  loading="lazy"
                  decoding="async"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover rounded-[14px]"
                />
              ) : (
                <div className="w-full h-full bg-[#0a0b22] flex items-center justify-center text-white font-bold text-sm rounded-[14px]">
                  {feedback.name ? feedback.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>
            {/* Online Pulse Indicator */}
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[var(--card-bg)]" />
          </div>

          <div>
            <h4 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[#8A60F1] transition-colors leading-tight">
              {feedback.name}
            </h4>
            <p className="text-[11px] text-[var(--text-secondary)] font-light mt-0.5 line-clamp-1">
              {feedback.role}
              {feedback.company && ` • ${feedback.company}`}
            </p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-0.5 text-amber-400">
          {Array.from({ length: feedback.rating || 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>
      </div>

      {/* Quote Message */}
      <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed italic line-clamp-3">
        "{feedback.message}"
      </p>

      {/* Bottom Info Footprint */}
      <div className="pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
        <span className="flex items-center gap-1">
          <Globe className="w-3 h-3 text-[#8A60F1]" />
          {exampleLabel ? "—" : feedback.country || "Global"}
        </span>
        {exampleLabel ? (
          <span className="px-2 py-0.5 rounded-md bg-amber-400/15 text-amber-400 font-bold uppercase">
            {exampleLabel}
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-md bg-[#8A60F1]/10 text-[#8A60F1] font-bold">
            Verified Client
          </span>
        )}
      </div>
    </div>
  );
});
