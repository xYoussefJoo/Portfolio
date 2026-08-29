import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Star,
  Clock,
  Check,
  Search,
  Globe,
  Filter,
  MessageSquare,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { usePortfolioData } from "~/context/PortfolioDataContext";
import type { FeedbackItem } from "~/utils/supabase";

export function FeedbackModeration() {
  const {
    feedback,
    updateFeedbackStatus,
    deleteFeedback,
    pendingFeedback,
    approvedFeedback,
  } = usePortfolioData();

  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter and search
  const filteredItems = feedback.filter((item) => {
    const matchesStatus =
      statusFilter === "all" ? true : item.status === statusFilter;
    const matchesSearch =
      searchQuery.trim() === ""
        ? true
        : item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.company && item.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.country && item.country.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleApprove = async (id: string) => {
    setActionLoadingId(id);
    await updateFeedbackStatus(id, "approved");
    setActionLoadingId(null);
  };

  const handleUnapprove = async (id: string) => {
    setActionLoadingId(id);
    await updateFeedbackStatus(id, "pending");
    setActionLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    setActionLoadingId(id);
    await deleteFeedback(id);
    setActionLoadingId(null);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar: Search & Status Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 glass-card rounded-2xl">
        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              statusFilter === "all"
                ? "bg-[#8A60F1] text-white shadow-sm"
                : "bg-[var(--pill-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            All ({feedback.length})
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              statusFilter === "pending"
                ? "bg-amber-500 text-black font-extrabold shadow-sm"
                : "bg-[var(--pill-bg)] text-amber-400 hover:bg-amber-500/10"
            }`}
          >
            <span>Pending ({pendingFeedback.length})</span>
            {pendingFeedback.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>
          <button
            onClick={() => setStatusFilter("approved")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              statusFilter === "approved"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-[var(--pill-bg)] text-emerald-400 hover:bg-emerald-500/10"
            }`}
          >
            Approved ({approvedFeedback.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reviews by name, keyword..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1]"
          />
        </div>
      </div>

      {/* Reviews List */}
      {filteredItems.length === 0 ? (
        <div className="py-20 glass-card rounded-3xl text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#8A60F1]/10 flex items-center justify-center text-[#8A60F1]">
            <MessageSquare className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">No Feedback Found</h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
            {statusFilter === "pending"
              ? "All submitted feedback has been reviewed. Great job!"
              : "No feedback matching your current filters."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map((item) => {
            const isPending = item.status === "pending";
            const isLoading = actionLoadingId === item.id;
            const isConfirmingDelete = deleteConfirmId === item.id;

            return (
              <div
                key={item.id}
                className={`p-6 glass-card rounded-3xl border transition-all duration-300 ${
                  isPending
                    ? "border-amber-500/40 bg-amber-500/[0.03]"
                    : "border-[var(--card-border)] hover:border-[#8A60F1]/40"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Author Details & Avatar */}
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full p-0.5 bg-white shadow-md flex-shrink-0">
                      {item.avatar_url ? (
                        <img
                          src={item.avatar_url}
                          alt={item.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#8A60F1] to-fuchsia-600 flex items-center justify-center text-white font-bold text-xs uppercase">
                          {item.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-base text-[var(--text-primary)]">
                          {item.name}
                        </h4>
                        {/* Status Badge */}
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                            isPending
                              ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                              : "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                          }`}
                        >
                          {isPending ? "Pending Review" : "Approved & Live"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted)] font-light">
                        {item.role && <span>{item.role}</span>}
                        {item.company && <span>• {item.company}</span>}
                        {item.country && (
                          <span className="inline-flex items-center gap-1 font-mono">
                            <Globe className="w-3 h-3 text-[#8A60F1]" />
                            {item.country}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 font-mono text-[10px]">
                          <Clock className="w-3 h-3 text-[var(--text-muted)]" />
                          {new Date(item.created_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 bg-[var(--pill-bg)] px-3 py-1.5 rounded-xl border border-[var(--pill-border)] self-start lg:self-auto">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (item.rating || 5)
                            ? "text-amber-400 fill-amber-400"
                            : "text-[var(--text-muted)]/30"
                        }`}
                      />
                    ))}
                    <span className="text-xs font-mono font-bold text-[var(--text-primary)] ml-1">
                      {(item.rating || 5).toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Feedback Message */}
                <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
                    "{item.message}"
                  </p>
                </div>

                {/* Actions Row */}
                <div className="mt-5 pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--card-border)]/50">
                  <div className="text-xs text-[var(--text-muted)] font-mono">
                    ID: <span className="opacity-70">{item.id.substring(0, 8)}...</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Approve Button */}
                    {isPending ? (
                      <button
                        onClick={() => handleApprove(item.id)}
                        disabled={isLoading}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Publish</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnapprove(item.id)}
                        disabled={isLoading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Move to Pending</span>
                      </button>
                    )}

                    {/* Delete with Confirmation */}
                    {isConfirmingDelete ? (
                      <div className="flex items-center gap-1.5 bg-rose-500/10 p-1 rounded-xl border border-rose-500/30">
                        <span className="text-[11px] text-rose-300 font-bold px-2">
                          Confirm Delete?
                        </span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isLoading}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2.5 py-1 rounded-lg bg-[var(--pill-bg)] text-[var(--text-secondary)] text-xs cursor-pointer"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        disabled={isLoading}
                        className="p-2 rounded-xl glass-card hover:bg-rose-500/20 hover:border-rose-500/40 text-[var(--text-muted)] hover:text-rose-400 transition-all cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
