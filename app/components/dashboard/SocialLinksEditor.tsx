import React, { useState } from "react";
import {
  Share2,
  Plus,
  Trash2,
  ExternalLink,
  Save,
  Check,
  Globe,
  RefreshCw,
} from "lucide-react";
import { usePortfolioData } from "~/context/PortfolioDataContext";

const POPULAR_PLATFORMS = [
  "behance",
  "instagram",
  "linkedin",
  "github",
  "dribbble",
  "twitter",
  "youtube",
  "facebook",
  "artstation",
];

export function SocialLinksEditor() {
  const {
    socialLinks,
    updateSocialLink,
    addSocialLink,
    deleteSocialLink,
  } = usePortfolioData();

  const [editMap, setEditMap] = useState<Record<string, { platform: string; url: string }>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  // New Link form
  const [newPlatform, setNewPlatform] = useState("behance");
  const [newCustomPlatform, setNewCustomPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleUrlChange = (id: string, platform: string, url: string) => {
    setEditMap((prev) => ({
      ...prev,
      [id]: { platform, url },
    }));
  };

  const handleSave = async (id: string, defaultPlatform: string, defaultUrl: string) => {
    const current = editMap[id] || { platform: defaultPlatform, url: defaultUrl };
    setSavingId(id);
    await updateSocialLink(id, current.platform, current.url);
    setSavingId(null);
    setSavedId(id);
    setTimeout(() => setSavedId(null), 2500);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const platformToSave =
      newPlatform === "other" ? newCustomPlatform.trim().toLowerCase() : newPlatform;

    if (!platformToSave) return;

    setIsAdding(true);
    await addSocialLink(platformToSave, newUrl.trim());
    setIsAdding(false);
    setNewUrl("");
    setNewCustomPlatform("");
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 glass-card rounded-3xl border-[#8A60F1]/20">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#8A60F1]" />
            <span>Social Channels & Links</span>
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-light mt-1">
            Configure the public social media icons and profile links shown across the portfolio and footer.
          </p>
        </div>

        <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--pill-bg)] px-3.5 py-1.5 rounded-full border border-[var(--pill-border)]">
          {socialLinks.length} Active Channels
        </span>
      </div>

      {/* Social Links List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialLinks.map((link) => {
          const currentData = editMap[link.id] || { platform: link.platform, url: link.url };
          const isSaving = savingId === link.id;
          const isSaved = savedId === link.id;

          return (
            <div
              key={link.id}
              className="p-5 glass-card rounded-2xl border border-[var(--card-border)] hover:border-[#8A60F1]/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#8A60F1]/15 text-[#8A60F1] flex items-center justify-center font-bold text-xs uppercase">
                    {link.platform.substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)] capitalize">
                      {link.platform}
                    </h4>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      ID: {link.id.substring(0, 8)}...
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={currentData.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl glass-card text-[var(--text-secondary)] hover:text-[#8A60F1] hover:border-[#8A60F1] transition-all"
                    title="Test Link in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => deleteSocialLink(link.id)}
                    className="p-2 rounded-xl glass-card text-[var(--text-muted)] hover:text-rose-400 hover:border-rose-500/40 transition-all cursor-pointer"
                    title="Delete Link"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* URL Input & Save */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="url"
                  value={currentData.url}
                  onChange={(e) => handleUrlChange(link.id, link.platform, e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1]"
                />

                <button
                  type="button"
                  onClick={() => handleSave(link.id, link.platform, link.url)}
                  disabled={isSaving}
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSaved
                      ? "bg-emerald-600 text-white"
                      : "bg-[#8A60F1] hover:bg-[#7b51e0] text-white shadow-sm"
                  }`}
                >
                  {isSaving ? (
                    <RefreshCw className="w-3 h-3 animate-spin" />
                  ) : isSaved ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Save className="w-3 h-3" />
                  )}
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Platform Link Card */}
      <div className="p-6 glass-card rounded-3xl border border-[var(--card-border)] space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#8A60F1]" />
          <span>Add New Social Link</span>
        </h4>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-4">
            <select
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1] capitalize cursor-pointer"
            >
              {POPULAR_PLATFORMS.map((p) => (
                <option key={p} value={p} className="bg-[#0a0b22] text-white">
                  {p}
                </option>
              ))}
              <option value="other" className="bg-[#0a0b22] text-white">
                Custom Platform...
              </option>
            </select>
          </div>

          {newPlatform === "other" && (
            <div className="sm:col-span-3">
              <input
                type="text"
                required
                value={newCustomPlatform}
                onChange={(e) => setNewCustomPlatform(e.target.value)}
                placeholder="Platform name (e.g. threads)"
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1]"
              />
            </div>
          )}

          <div className={newPlatform === "other" ? "sm:col-span-3" : "sm:col-span-6"}>
            <input
              type="url"
              required
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1]"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isAdding}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isAdding ? "Adding..." : "Add Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
