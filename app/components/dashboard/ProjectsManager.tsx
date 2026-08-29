import React, { useState } from "react";
import {
  FolderGit2,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Check,
  X,
  Search,
  Layers,
  Sparkles,
  RefreshCw,
  Palette,
  Flag,
  Calendar,
  Compass,
  ArrowUp,
  ArrowDown,
  Copy,
} from "lucide-react";
import { usePortfolioData } from "~/context/PortfolioDataContext";
import type { ProjectItem } from "~/utils/supabase";

const PRESET_ACCENTS = [
  { name: "Warm Gold", color: "#E0A96D" },
  { name: "Electric Cyan", color: "#00F0FF" },
  { name: "Cyber Purple", color: "#8A60F1" },
  { name: "Crimson Rose", color: "#F43F5E" },
  { name: "Emerald Mint", color: "#10B981" },
  { name: "Fuchsia Magenta", color: "#EC4899" },
  { name: "Amber Neon", color: "#F59E0B" },
  { name: "Electric Blue", color: "#3B82F6" },
];

const PRESET_SOFTWARE = [
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Adobe InDesign",
  "Adobe After Effects",
  "Adobe Dimension (3D)",
  "Adobe Premiere Pro",
  "Adobe Lightroom",
  "Cinema 4D",
  "Blender",
  "Figma",
];

const CATEGORIES = [
  { id: "branding", name: "Branding & Identity" },
  { id: "packaging", name: "Packaging & 3D" },
  { id: "advertising", name: "Advertising & Promo" },
  { id: "editorial", name: "Editorial & Print" },
];

export function ProjectsManager() {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    uploadAsset,
  } = usePortfolioData();

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);
  const [isUploadingImg, setIsUploadingImg] = useState(false);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formTitleDe, setFormTitleDe] = useState("");
  const [formCategory, setFormCategory] = useState("branding");
  const [formImage, setFormImage] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDescriptionDe, setFormDescriptionDe] = useState("");
  const [formClientLocation, setFormClientLocation] = useState("");
  const [formClientLocationDe, setFormClientLocationDe] = useState("");
  const [formCountryFlag, setFormCountryFlag] = useState("🇺🇸");
  const [formYear, setFormYear] = useState(new Date().getFullYear().toString());
  const [formAccentColor, setFormAccentColor] = useState("#8A60F1");
  const [formSoftware, setFormSoftware] = useState<string[]>(["Adobe Illustrator", "Photoshop"]);
  const [formDeliverables, setFormDeliverables] = useState<string[]>(["Brand Book", "Logo Suite"]);
  const [formDeliverablesDe, setFormDeliverablesDe] = useState<string[]>(["Brand Book", "Logo-Suite"]);

  // Tag input temporary helpers
  const [softwareInput, setSoftwareInput] = useState("");
  const [deliverableInput, setDeliverableInput] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesCat = categoryFilter === "all" ? true : p.category === categoryFilter;
    const matchesSearch =
      searchQuery.trim() === ""
        ? true
        : p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.clientLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.software.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const openAddModal = () => {
    setEditingProject(null);
    setFormTitle("");
    setFormTitleDe("");
    setFormCategory("branding");
    setFormImage(
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200"
    );
    setFormDescription("");
    setFormDescriptionDe("");
    setFormClientLocation("Germany");
    setFormClientLocationDe("Deutschland");
    setFormCountryFlag("🇩🇪");
    setFormYear(new Date().getFullYear().toString());
    setFormAccentColor("#8A60F1");
    setFormSoftware(["Adobe Illustrator", "Adobe Photoshop"]);
    setFormDeliverables(["Vector Logo Suite", "3D Mockup"]);
    setFormDeliverablesDe(["Vektor-Logo Suite", "3D-Mockup"]);
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProjectItem) => {
    setEditingProject(p);
    setFormTitle(p.title);
    setFormTitleDe(p.title_de || "");
    setFormCategory(p.category);
    setFormImage(p.image);
    setFormDescription(p.description);
    setFormDescriptionDe(p.description_de || "");
    setFormClientLocation(p.clientLocation);
    setFormClientLocationDe(p.clientLocation_de || "");
    setFormCountryFlag(p.countryFlag || "🇺🇸");
    setFormYear(p.year);
    setFormAccentColor(p.accentColor || "#8A60F1");
    setFormSoftware(p.software || []);
    setFormDeliverables(p.deliverables || []);
    setFormDeliverablesDe(p.deliverables_de || []);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImg(true);
    const res = await uploadAsset(file, "projects");
    setIsUploadingImg(false);

    if (res.url) {
      setFormImage(res.url);
    }
  };

  const handleAddSoftwareChip = (sw: string) => {
    if (!sw.trim() || formSoftware.includes(sw.trim())) return;
    setFormSoftware([...formSoftware, sw.trim()]);
    setSoftwareInput("");
  };

  const handleRemoveSoftwareChip = (sw: string) => {
    setFormSoftware(formSoftware.filter((s) => s !== sw));
  };

  const handleAddDeliverableChip = (del: string) => {
    if (!del.trim() || formDeliverables.includes(del.trim())) return;
    setFormDeliverables([...formDeliverables, del.trim()]);
    setDeliverableInput("");
  };

  const handleRemoveDeliverableChip = (del: string) => {
    setFormDeliverables(formDeliverables.filter((d) => d !== del));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formImage.trim()) return;

    setIsSaving(true);

    const payload: Omit<ProjectItem, "id"> = {
      title: formTitle.trim(),
      title_de: formTitleDe.trim() || formTitle.trim(),
      description: formDescription.trim(),
      description_de: formDescriptionDe.trim() || formDescription.trim(),
      category: formCategory,
      image: formImage.trim(),
      clientLocation: formClientLocation.trim(),
      clientLocation_de: formClientLocationDe.trim() || formClientLocation.trim(),
      countryFlag: formCountryFlag.trim(),
      year: formYear.trim(),
      accentColor: formAccentColor,
      software: formSoftware.length > 0 ? formSoftware : ["Adobe CC"],
      deliverables: formDeliverables.length > 0 ? formDeliverables : ["Design Deliverable"],
      deliverables_de:
        formDeliverablesDe.length > 0 ? formDeliverablesDe : formDeliverables,
      tags: formSoftware,
    };

    if (editingProject) {
      await updateProject(editingProject.id, payload);
    } else {
      await addProject(payload);
    }

    setIsSaving(false);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string | number) => {
    await deleteProject(id);
    setDeleteConfirmId(null);
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;

    const newArr = [...projects];
    const temp = newArr[index];
    newArr[index] = newArr[targetIdx];
    newArr[targetIdx] = temp;

    await reorderProjects(newArr);
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 glass-card rounded-3xl border-[#8A60F1]/20">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-[#8A60F1]" />
              <span>Projects & Portfolio Showcase</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#8A60F1]/15 text-[#8A60F1] border border-[#8A60F1]/30">
              {projects.length} Total
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-light mt-1">
            Create, customize, reorder, and translate portfolio showcase projects displayed across the live 3D deck and grid.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(138,96,241,0.4)] hover:scale-105 active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 glass-card rounded-2xl">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              categoryFilter === "all"
                ? "bg-[#8A60F1] text-white shadow-sm"
                : "bg-[var(--pill-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            All ({projects.length})
          </button>
          {CATEGORIES.map((c) => {
            const count = projects.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setCategoryFilter(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  categoryFilter === c.id
                    ? "bg-[#8A60F1] text-white shadow-sm"
                    : "bg-[var(--pill-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {c.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, tool..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1]"
          />
        </div>
      </div>

      {/* Projects List Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 glass-card rounded-3xl text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#8A60F1]/10 flex items-center justify-center text-[#8A60F1]">
            <FolderGit2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">No Projects Found</h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
            Try adjusting your search query or add your first project.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const isConfirmingDelete = deleteConfirmId === project.id;

            return (
              <div
                key={project.id}
                className="glass-card rounded-3xl overflow-hidden border border-[var(--card-border)] hover:border-[#8A60F1]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  {/* Artwork Image Preview */}
                  <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-[#8A60F1] font-bold text-[10px] uppercase tracking-wider border border-[#8A60F1]/30">
                        {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md text-white font-mono text-[11px] font-bold border border-white/10">
                        {project.countryFlag} {project.year}
                      </span>
                    </div>

                    {/* Accent Color Dot */}
                    <div
                      className="absolute bottom-3 right-3 w-4 h-4 rounded-full shadow-[0_0_12px_currentColor]"
                      style={{ backgroundColor: project.accentColor || "#8A60F1" }}
                      title={`Accent Glow: ${project.accentColor}`}
                    />
                  </div>

                  {/* Card Info */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1 font-mono">
                        <Compass className="w-3.5 h-3.5 text-[#8A60F1]" />
                        {project.clientLocation}
                      </span>
                      {project.deliverables && project.deliverables[0] && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#8A60F1]/10 text-[#8A60F1] font-semibold border border-[#8A60F1]/20">
                          {project.deliverables[0]}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-base text-[var(--text-primary)] leading-snug line-clamp-1">
                      {project.title}
                    </h4>

                    <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Software tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.software.slice(0, 3).map((sw, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[10px] text-[var(--text-secondary)] font-medium"
                        >
                          {sw}
                        </span>
                      ))}
                      {project.software.length > 3 && (
                        <span className="text-[10px] text-[var(--text-muted)] font-mono self-center">
                          +{project.software.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions Toolbar */}
                <div className="p-4 border-t border-[var(--card-border)] bg-black/20 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMove(idx, "up")}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg glass-card hover:border-[#8A60F1] text-[var(--text-muted)] hover:text-[#8A60F1] disabled:opacity-30 cursor-pointer"
                      title="Move Up in order"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, "down")}
                      disabled={idx === projects.length - 1}
                      className="p-1.5 rounded-lg glass-card hover:border-[#8A60F1] text-[var(--text-muted)] hover:text-[#8A60F1] disabled:opacity-30 cursor-pointer"
                      title="Move Down in order"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(project)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#8A60F1]/20 hover:bg-[#8A60F1]/30 text-[#8A60F1] hover:text-white border border-[#8A60F1]/30 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {isConfirmingDelete ? (
                      <div className="flex items-center gap-1 bg-rose-500/20 p-1 rounded-xl border border-rose-500/40">
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="px-2 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1 rounded-lg glass-card text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(project.id)}
                        className="p-2 rounded-xl glass-card hover:bg-rose-500/20 hover:border-rose-500/40 text-[var(--text-muted)] hover:text-rose-400 transition-all cursor-pointer"
                        title="Delete Project"
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

      {/* ADD / EDIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="glass-card rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative text-[var(--text-primary)] border-[#8A60F1]/40 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-light">
                  Provide bilingual details and assets for the live portfolio.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--pill-hover-bg)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Titles Row (EN & DE) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                    Project Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Aura Botanica - Organic Cosmetics"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Project Title (Deutsch / German)
                  </label>
                  <input
                    type="text"
                    value={formTitleDe}
                    onChange={(e) => setFormTitleDe(e.target.value)}
                    placeholder="z. B. Aura Botanica - Luxus-Naturkosmetik"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Category & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1] cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#0a0b22] text-white">
                        {c.name} ({c.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    placeholder="2024"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1]"
                  />
                </div>
              </div>

              {/* Artwork Image & Uploader */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                  Cover Artwork Image URL *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1]"
                  />

                  <label className="relative inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--pill-bg)] hover:bg-[#8A60F1]/20 border border-[var(--pill-border)] hover:border-[#8A60F1]/40 text-xs font-bold text-[var(--text-primary)] hover:text-[#8A60F1] transition-all cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingImg ? "Uploading..." : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUploadingImg}
                    />
                  </label>
                </div>

                {/* Preview Thumbnail */}
                {formImage && (
                  <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-[#8A60F1]/30 mt-2">
                    <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Descriptions (EN & DE) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                    Description (English)
                  </label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Describe the design concept, aesthetics, tools used..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1] resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Description (Deutsch / German)
                  </label>
                  <textarea
                    rows={3}
                    value={formDescriptionDe}
                    onChange={(e) => setFormDescriptionDe(e.target.value)}
                    placeholder="Projektbeschreibung auf Deutsch..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>
              </div>

              {/* Client Location & Flag */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                    Location (EN)
                  </label>
                  <input
                    type="text"
                    value={formClientLocation}
                    onChange={(e) => setFormClientLocation(e.target.value)}
                    placeholder="e.g. Germany"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Location (DE)
                  </label>
                  <input
                    type="text"
                    value={formClientLocationDe}
                    onChange={(e) => setFormClientLocationDe(e.target.value)}
                    placeholder="z. B. Deutschland"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                    Country Flags
                  </label>
                  <input
                    type="text"
                    value={formCountryFlag}
                    onChange={(e) => setFormCountryFlag(e.target.value)}
                    placeholder="🇩🇪 or 🇺🇸 🇫🇷"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1]"
                  />
                </div>
              </div>

              {/* Accent Glow Color */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                  Accent Glow Color
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {PRESET_ACCENTS.map((acc) => (
                    <button
                      key={acc.color}
                      type="button"
                      onClick={() => setFormAccentColor(acc.color)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer ${
                        formAccentColor.toLowerCase() === acc.color.toLowerCase()
                          ? "border-white scale-105 shadow-md"
                          : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: `${acc.color}25`, color: acc.color }}
                    >
                      <span
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: acc.color }}
                      />
                      <span>{acc.name}</span>
                    </button>
                  ))}
                  <input
                    type="color"
                    value={formAccentColor}
                    onChange={(e) => setFormAccentColor(e.target.value)}
                    className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Software Stack Editor */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                  Software Stack (Adobe CC & 3D)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formSoftware.map((sw) => (
                    <span
                      key={sw}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#8A60F1]/20 text-[#8A60F1] border border-[#8A60F1]/40 text-xs font-medium"
                    >
                      <span>{sw}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSoftwareChip(sw)}
                        className="hover:text-rose-400 cursor-pointer ml-1"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={softwareInput}
                    onChange={(e) => setSoftwareInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSoftwareChip(softwareInput);
                      }
                    }}
                    placeholder="Type software and press Enter or pick from presets below..."
                    className="flex-1 px-4 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1]"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSoftwareChip(softwareInput)}
                    className="px-3 py-2 rounded-xl bg-[#8A60F1] text-white text-xs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PRESET_SOFTWARE.map((sw) => (
                    <button
                      key={sw}
                      type="button"
                      onClick={() => handleAddSoftwareChip(sw)}
                      className="px-2.5 py-1 rounded-md bg-[var(--pill-bg)] hover:bg-[#8A60F1]/10 text-[10px] text-[var(--text-secondary)] border border-[var(--pill-border)] transition-colors cursor-pointer"
                    >
                      + {sw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deliverables Editor */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                  Deliverables Scope (e.g. Brand Book, 3D Renders, Vector Logo)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formDeliverables.map((del) => (
                    <span
                      key={del}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 text-xs font-medium"
                    >
                      <span>{del}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverableChip(del)}
                        className="hover:text-rose-400 cursor-pointer ml-1"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={deliverableInput}
                    onChange={(e) => setDeliverableInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddDeliverableChip(deliverableInput);
                      }
                    }}
                    placeholder="Add deliverable and press Enter..."
                    className="flex-1 px-4 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#8A60F1]"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddDeliverableChip(deliverableInput)}
                    className="px-3 py-2 rounded-xl bg-fuchsia-600 text-white text-xs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[var(--card-border)] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl glass-card text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? "Saving Project..." : editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
