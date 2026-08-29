import React from "react";
import {
  LayoutDashboard,
  ExternalLink,
  Radio,
  Sparkles,
  Database,
  RefreshCw,
  Sun,
  Moon,
  MessageSquare,
  FileText,
  Share2,
  LogOut,
  UserCheck,
  FolderGit2,
} from "lucide-react";
import { usePortfolioData } from "~/context/PortfolioDataContext";

interface DashboardHeaderProps {
  activeTab: "projects" | "feedback" | "content" | "social" | "sql";
  setActiveTab: (tab: "projects" | "feedback" | "content" | "social" | "sql") => void;
  openSqlModal: () => void;
}

export function DashboardHeader({ activeTab, setActiveTab, openSqlModal }: DashboardHeaderProps) {
  const {
    feedback,
    pendingFeedback,
    approvedFeedback,
    sections,
    socialLinks,
    projects,
    isRealtimeConnected,
    isLoading,
    refreshData,
    dbError,
    user,
    signOut,
  } = usePortfolioData();

  return (
    <header className="space-y-6">
      {/* Top Banner / Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-card rounded-3xl border-[#8A60F1]/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8A60F1] to-fuchsia-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(138,96,241,0.4)]">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Portfolio Admin
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#8A60F1]/15 text-[#8A60F1] border border-[#8A60F1]/30">
                Protected Session
              </span>
              {user?.email && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <UserCheck className="w-3 h-3" />
                  <span>{user.email}</span>
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-light mt-0.5">
              Manage showcase projects, landing page content, client reviews, and social channels.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Realtime Status Indicator */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium border ${
              isRealtimeConnected
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isRealtimeConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span>{isRealtimeConnected ? "Realtime Active" : "Supabase Connected"}</span>
          </div>

          {/* Refresh Data */}
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="p-2 rounded-xl glass-card hover:border-[#8A60F1] text-[var(--text-secondary)] hover:text-[#8A60F1] transition-all cursor-pointer"
            title="Refresh Data from Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#8A60F1]" : ""}`} />
          </button>

          {/* SQL Setup Helper Button */}
          <button
            onClick={openSqlModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-card hover:border-[#8A60F1] text-xs font-semibold text-[var(--text-primary)] hover:text-[#8A60F1] transition-all cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-[#8A60F1]" />
            <span>SQL Schema</span>
          </button>

          {/* View Live Site */}
          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-card hover:border-[#8A60F1] text-xs font-semibold text-[var(--text-primary)] hover:text-[#8A60F1] transition-all cursor-pointer"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Log Out Button */}
          <button
            onClick={signOut}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            title="Sign Out of Admin Dashboard"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Database Warning if tables are not yet initialized */}
      {dbError && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Supabase Setup Note:</strong> Default preview data is loaded. Run the updated SQL schema to enable persistent database storage for projects, sections, feedback, and social links.
            </span>
          </div>
          <button
            onClick={openSqlModal}
            className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold text-xs border border-amber-500/40 cursor-pointer self-start sm:self-auto"
          >
            View SQL Setup
          </button>
        </div>
      )}

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Projects Card */}
        <div
          onClick={() => setActiveTab("projects")}
          className="p-5 glass-card rounded-2xl hover:border-[#8A60F1]/50 cursor-pointer transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Projects
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#8A60F1]/20 text-[#8A60F1] flex items-center justify-center text-xs font-bold border border-[#8A60F1]/30">
              {projects.length}
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#8A60F1]">
              {projects.length}
            </span>
            <span className="text-xs text-[var(--text-muted)]">showcase items</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab("feedback")}
          className="p-5 glass-card rounded-2xl hover:border-[#8A60F1]/50 cursor-pointer transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Pending Reviews
            </span>
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                pendingFeedback.length > 0
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse"
                  : "bg-[var(--pill-bg)] text-[var(--text-muted)]"
              }`}
            >
              {pendingFeedback.length}
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[var(--text-primary)]">
              {pendingFeedback.length}
            </span>
            <span className="text-xs text-[var(--text-muted)]">to moderate</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab("feedback")}
          className="p-5 glass-card rounded-2xl hover:border-[#8A60F1]/50 cursor-pointer transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Approved Live
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/30">
              {approvedFeedback.length}
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400">
              {approvedFeedback.length}
            </span>
            <span className="text-xs text-[var(--text-muted)]">on landing page</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab("content")}
          className="p-5 glass-card rounded-2xl hover:border-[#8A60F1]/50 cursor-pointer transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Content Blocks
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#8A60F1]/20 text-[#8A60F1] flex items-center justify-center text-xs font-bold border border-[#8A60F1]/30">
              {Object.keys(sections).length}
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[var(--text-primary)]">
              {Object.keys(sections).length}
            </span>
            <span className="text-xs text-[var(--text-muted)]">editable keys</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab("social")}
          className="p-5 glass-card rounded-2xl hover:border-[#8A60F1]/50 cursor-pointer transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Social Links
            </span>
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold border border-cyan-500/30">
              {socialLinks.length}
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[var(--text-primary)]">
              {socialLinks.length}
            </span>
            <span className="text-xs text-[var(--text-muted)]">channels active</span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation Buttons */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 glass-card rounded-2xl border-[var(--card-border)]">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "projects"
              ? "bg-[#8A60F1] text-white shadow-[0_0_20px_rgba(138,96,241,0.4)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-hover-bg)]"
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Projects Manager</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-black/40 text-white font-mono">
            {projects.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("feedback")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "feedback"
              ? "bg-[#8A60F1] text-white shadow-[0_0_20px_rgba(138,96,241,0.4)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-hover-bg)]"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Feedback Moderation</span>
          {pendingFeedback.length > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-black animate-pulse">
              {pendingFeedback.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("content")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "content"
              ? "bg-[#8A60F1] text-white shadow-[0_0_20px_rgba(138,96,241,0.4)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-hover-bg)]"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Content & Media Editor</span>
        </button>

        <button
          onClick={() => setActiveTab("social")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "social"
              ? "bg-[#8A60F1] text-white shadow-[0_0_20px_rgba(138,96,241,0.4)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-hover-bg)]"
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Social Links</span>
        </button>

        <button
          onClick={() => setActiveTab("sql")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "sql"
              ? "bg-[#8A60F1] text-white shadow-[0_0_20px_rgba(138,96,241,0.4)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-hover-bg)]"
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Database & Setup</span>
        </button>
      </div>
    </header>
  );
}
