import React, { useState } from "react";
import {
  Save,
  Upload,
  Image as ImageIcon,
  Check,
  Sparkles,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  FileEdit,
  RefreshCw,
} from "lucide-react";
import { usePortfolioData } from "~/context/PortfolioDataContext";

interface SectionFieldMeta {
  key: string;
  label: string;
  category: "hero" | "about" | "media" | "custom";
  type: "text" | "textarea" | "image";
  placeholder?: string;
  description?: string;
}

const SECTION_FIELDS_META: SectionFieldMeta[] = [
  // Hero Section
  {
    key: "hero_badge",
    label: "Hero Badge Tag",
    category: "hero",
    type: "text",
    description: "Pill tag shown above the main heading",
  },
  {
    key: "hero_title_line1",
    label: "Hero Title (Line 1)",
    category: "hero",
    type: "text",
    description: "First line of main heading",
  },
  {
    key: "hero_title_gradient",
    label: "Hero Title (Gradient Highlight)",
    category: "hero",
    type: "text",
    description: "Gradient colored glowing title text",
  },
  {
    key: "hero_intro",
    label: "Hero Subtitle & Bio",
    category: "hero",
    type: "textarea",
    description: "Introductory paragraph under hero heading",
  },
  {
    key: "hero_stat_projects",
    label: "Stat: Projects Delivered",
    category: "hero",
    type: "text",
  },
  {
    key: "hero_stat_adobe",
    label: "Stat: Adobe Master",
    category: "hero",
    type: "text",
  },
  {
    key: "hero_stat_languages",
    label: "Stat: Languages Spoken",
    category: "hero",
    type: "text",
  },

  // About Section
  {
    key: "about_tag",
    label: "About Tag",
    category: "about",
    type: "text",
  },
  {
    key: "about_title_line1",
    label: "About Title (Line 1)",
    category: "about",
    type: "text",
  },
  {
    key: "about_title_gradient",
    label: "About Title (Gradient)",
    category: "about",
    type: "text",
  },
  {
    key: "about_description",
    label: "About Main Description",
    category: "about",
    type: "textarea",
  },
  {
    key: "about_philosophy_p1",
    label: "Design Philosophy (Paragraph 1)",
    category: "about",
    type: "textarea",
  },
  {
    key: "about_philosophy_p2",
    label: "Design Philosophy (Paragraph 2)",
    category: "about",
    type: "textarea",
  },

  // Media & Profile Assets
  {
    key: "profile_image_url",
    label: "Profile / Avatar Image URL",
    category: "media",
    type: "image",
    description: "Direct URL or upload a file directly to Supabase Storage",
  },
];

export function ContentEditor() {
  const {
    sections,
    updateSection,
    updateSectionsBulk,
    uploadAsset,
    refreshData,
  } = usePortfolioData();

  // Local state for edits
  const [formData, setFormData] = useState<Record<string, string>>({ ...sections });
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedSuccessKey, setSavedSuccessKey] = useState<string | null>(null);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [uploadingImageKey, setUploadingImageKey] = useState<string | null>(null);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  // New Custom Key state
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyValue, setNewKeyValue] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "hero" | "about" | "media">("all");

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveField = async (key: string) => {
    setSavingKey(key);
    const value = formData[key] !== undefined ? formData[key] : sections[key] || "";
    await updateSection(key, value);
    setSavingKey(null);
    setSavedSuccessKey(key);
    setTimeout(() => setSavedSuccessKey(null), 2500);
  };

  const handleSaveAll = async () => {
    setIsSavingAll(true);
    const entries = Object.entries(formData).map(([key, value]) => ({ key, value }));
    await updateSectionsBulk(entries);
    setIsSavingAll(false);
  };

  const handleFileUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImageKey(key);
    setUploadNotice(null);

    const res = await uploadAsset(file, "profile");
    setUploadingImageKey(null);

    if (res.url) {
      handleChange(key, res.url);
      await updateSection(key, res.url);
      if (res.error) {
        setUploadNotice(res.error);
      }
    }
  };

  const handleAddCustomKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const sanitizedKey = newKeyName.trim().toLowerCase().replace(/\s+/g, "_");
    handleChange(sanitizedKey, newKeyValue);
    await updateSection(sanitizedKey, newKeyValue);
    setNewKeyName("");
    setNewKeyValue("");
  };

  // Merge predefined fields with any custom keys in sections
  const knownKeys = new Set(SECTION_FIELDS_META.map((m) => m.key));
  const customKeys = Object.keys(formData).filter((k) => !knownKeys.has(k));

  const filteredFields = SECTION_FIELDS_META.filter((field) =>
    activeCategory === "all" ? true : field.category === activeCategory
  );

  return (
    <div className="space-y-8">
      {/* Top Header & Save All Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 glass-card rounded-3xl border-[#8A60F1]/20">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-[#8A60F1]" />
            <span>Landing Page Content Blocks</span>
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-light mt-1">
            Edit text, headings, bios, and upload brand assets saved in Supabase.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSavingAll}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(138,96,241,0.4)] hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
        >
          {isSavingAll ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Saving All...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save All Changes</span>
            </>
          )}
        </button>
      </div>

      {uploadNotice && (
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs">
          {uploadNotice}
        </div>
      )}

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeCategory === "all"
              ? "bg-[#8A60F1] text-white shadow-sm"
              : "glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          All Fields
        </button>
        <button
          onClick={() => setActiveCategory("hero")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeCategory === "hero"
              ? "bg-[#8A60F1] text-white shadow-sm"
              : "glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          Hero Section
        </button>
        <button
          onClick={() => setActiveCategory("about")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeCategory === "about"
              ? "bg-[#8A60F1] text-white shadow-sm"
              : "glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          About & Bio
        </button>
        <button
          onClick={() => setActiveCategory("media")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeCategory === "media"
              ? "bg-[#8A60F1] text-white shadow-sm"
              : "glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          Media & Profile
        </button>
      </div>

      {/* Content Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFields.map((field) => {
          const value = formData[field.key] !== undefined ? formData[field.key] : sections[field.key] || "";
          const isSaving = savingKey === field.key;
          const isSaved = savedSuccessKey === field.key;
          const isUploading = uploadingImageKey === field.key;

          return (
            <div
              key={field.key}
              className={`p-6 glass-card rounded-3xl border transition-all duration-300 ${
                field.type === "textarea" ? "md:col-span-2" : ""
              } hover:border-[#8A60F1]/40`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1] block">
                    {field.label}
                  </label>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    Key: {field.key}
                  </span>
                </div>

                {/* Per-field Save Button */}
                <button
                  type="button"
                  onClick={() => handleSaveField(field.key)}
                  disabled={isSaving}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSaved
                      ? "bg-emerald-600 text-white"
                      : "glass-card hover:border-[#8A60F1] text-[var(--text-primary)] hover:text-[#8A60F1]"
                  }`}
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin text-[#8A60F1]" />
                      <span>Saving...</span>
                    </>
                  ) : isSaved ? (
                    <>
                      <Check className="w-3 h-3 text-white" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3 h-3 text-[#8A60F1]" />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>

              {/* Input Type Render */}
              {field.type === "image" ? (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1]"
                    />

                    {/* File Upload Button */}
                    <label className="relative inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--pill-bg)] hover:bg-[#8A60F1]/20 border border-[var(--pill-border)] hover:border-[#8A60F1]/40 text-xs font-bold text-[var(--text-primary)] hover:text-[#8A60F1] transition-all cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload File"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(field.key, e)}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                  </div>

                  {/* Image Preview Thumbnail */}
                  {value && (
                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-[var(--pill-bg)] border border-[var(--pill-border)]">
                      <img
                        src={value}
                        alt="Preview"
                        className="w-16 h-16 rounded-xl object-cover border border-[#8A60F1]/30 shadow-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-[var(--text-primary)] block">Asset Preview</span>
                        <a
                          href={value}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#8A60F1] hover:underline inline-flex items-center gap-1 text-[11px]"
                        >
                          <span>Open full asset</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ) : field.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={value}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder || "Enter content..."}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] resize-none transition-colors"
                />
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder || "Enter content..."}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] transition-colors"
                />
              )}
            </div>
          );
        })}

        {/* Custom Section Keys if any */}
        {customKeys.map((key) => {
          const value = formData[key] !== undefined ? formData[key] : sections[key] || "";
          const isSaving = savingKey === key;
          const isSaved = savedSuccessKey === key;

          return (
            <div key={key} className="p-6 glass-card rounded-3xl border border-[#8A60F1]/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Custom Key
                  </span>
                  <h4 className="font-bold text-sm text-[var(--text-primary)] font-mono">{key}</h4>
                </div>

                <button
                  type="button"
                  onClick={() => handleSaveField(key)}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold glass-card hover:border-[#8A60F1] cursor-pointer"
                >
                  {isSaved ? <Check className="w-3 h-3 text-emerald-400" /> : <Save className="w-3 h-3 text-[#8A60F1]" />}
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </button>
              </div>

              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1]"
              />
            </div>
          );
        })}
      </div>

      {/* Add Custom Key Block */}
      <div className="p-6 glass-card rounded-3xl border border-[var(--card-border)] space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#8A60F1]" />
          <span>Add Custom Content Key</span>
        </h4>
        <form onSubmit={handleAddCustomKey} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-5">
            <input
              type="text"
              required
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="e.g. hero_contact_label"
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1]"
            />
          </div>
          <div className="sm:col-span-5">
            <input
              type="text"
              required
              value={newKeyValue}
              onChange={(e) => setNewKeyValue(e.target.value)}
              placeholder="Content string value..."
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1]"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#8A60F1] hover:bg-[#7b51e0] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Add Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
