import { useState } from "react";
import type { Route } from "./+types/dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardHeader } from "~/components/dashboard/DashboardHeader";
import { FeedbackModeration } from "~/components/dashboard/FeedbackModeration";
import { ContentEditor } from "~/components/dashboard/ContentEditor";
import { SocialLinksEditor } from "~/components/dashboard/SocialLinksEditor";
import { SqlSetupGuide, SQL_SCHEMA_CONTENT } from "~/components/dashboard/SqlSetupGuide";
import { X, Check, Copy } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio Admin Dashboard | Kero Amir" },
    {
      name: "description",
      content: "Open access management dashboard for live portfolio content, client feedback moderation, and social channels.",
    },
  ];
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"feedback" | "content" | "social" | "sql">("feedback");
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_CONTENT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#8A60F1]/30 selection:text-[#8A60F1] antialiased transition-colors duration-350 py-8 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-grid-cyber">
      {/* Background Decorative Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#8A60F1]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Main Dashboard Header */}
        <DashboardHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openSqlModal={() => setIsSqlModalOpen(true)}
        />

        {/* Tab Panels */}
        <main className="min-h-[500px]">
          {activeTab === "feedback" && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FeedbackModeration />
            </motion.div>
          )}

          {activeTab === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContentEditor />
            </motion.div>
          )}

          {activeTab === "social" && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SocialLinksEditor />
            </motion.div>
          )}

          {activeTab === "sql" && (
            <motion.div
              key="sql"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SqlSetupGuide />
            </motion.div>
          )}
        </main>
      </div>

      {/* Quick SQL Helper Modal */}
      <AnimatePresence>
        {isSqlModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card rounded-3xl p-6 md:p-8 max-w-3xl w-full shadow-2xl relative text-[var(--text-primary)] border-[#8A60F1]/40 max-h-[85vh] flex flex-col"
            >
              <button
                onClick={() => setIsSqlModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-[var(--pill-hover-bg)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 mb-4">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  Supabase Database Schema
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Copy and paste this script into your Supabase Dashboard SQL Editor.
                </p>
              </div>

              <div className="flex-1 overflow-y-auto rounded-2xl bg-black/40 border border-[var(--card-border)] p-4 my-2 text-xs font-mono text-[var(--text-secondary)] leading-relaxed">
                <pre>
                  <code>{SQL_SCHEMA_CONTENT}</code>
                </pre>
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Tables: sections, feedback, social_links
                </span>

                <button
                  onClick={handleCopySql}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(138,96,241,0.3)] cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied to Clipboard!" : "Copy SQL Script"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
