import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import {
  supabase,
  type FeedbackItem,
  type SectionItem,
  type SocialLinkItem,
  type ProjectItem,
} from "~/utils/supabase";

// Default fallback data if Supabase tables are not yet created or empty
const DEFAULT_SECTIONS: Record<string, string> = {
  profile_image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
};

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "1",
    title: "Aura Botanica - Luxury Organic Cosmetics",
    title_de: "Aura Botanica - Luxus-Naturkosmetik",
    description: "Comprehensive visual identity, botanical packaging design, and 3D product renders in Adobe Dimension & Photoshop.",
    description_de: "Ganzheitliche Markenidentität, botanisches Verpackungsdesign und fotorealistische 3D-Renderings in Adobe Dimension & Photoshop.",
    category: "branding",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200",
    tags: ["Adobe Illustrator", "Photoshop", "Brand System", "Typography"],
    clientLocation: "United States & France",
    clientLocation_de: "USA & Frankreich",
    countryFlag: "🇺🇸 🇫🇷",
    year: "2024",
    accentColor: "#E0A96D", // Warm Gold
    software: ["Adobe Illustrator", "Adobe Photoshop", "Dimension (3D)", "InDesign"],
    deliverables: ["Full Brand Book", "Vector Logo Suite", "Stationery Kit", "3D Packaging"],
    deliverables_de: ["Vollständiges Brand Book", "Vektor-Logo Suite", "Geschäftsausstattung", "3D-Verpackung"],
    order_index: 1,
  },
  {
    id: "2",
    title: "CyberPulse - Esports Energy Drink",
    title_de: "CyberPulse - Esports Energy Drink",
    description: "High-octane can packaging, dynamic vector illustrations in Adobe Illustrator, and 3D metallic foil finish mockup.",
    description_de: "Dynamisches Dosendesign, Vektorillustrationen in Adobe Illustrator und 3D-Mockups mit metallischen Folieneffekten.",
    category: "packaging",
    image: "https://images.unsplash.com/photo-1556742049-0a67c55c8cc0?auto=format&fit=crop&q=80&w=1200",
    tags: ["Adobe Dimension", "Illustrator", "Packaging", "3D Render"],
    clientLocation: "Germany",
    clientLocation_de: "Deutschland",
    countryFlag: "🇩🇪",
    year: "2024",
    accentColor: "#00F0FF", // Electric Cyan
    software: ["Adobe Dimension (3D)", "Adobe Illustrator", "Photoshop", "Cinema 4D"],
    deliverables: ["Die-Line Label Engineering", "Photorealistic 3D Renders", "Foil Finish Maps"],
    deliverables_de: ["Stanzkontur-Etikettendesign", "Fotorealistische 3D-Renderings", "Folieneffekt-Maps"],
    order_index: 2,
  },
  {
    id: "3",
    title: "Vortex Sound - Spatial Audio Identity",
    title_de: "Vortex Sound - Spatial Audio Brand",
    description: "Complete visual branding, custom typographic logotype, and advertising poster series for European audiophile brand.",
    description_de: "Komplettes visuelles Branding, individuelles typografisches Logo und Werbeplakat-Serie für europäische Audiomarke.",
    category: "advertising",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200",
    tags: ["After Effects", "Photoshop", "Motion Graphics", "Billboards"],
    clientLocation: "United States",
    clientLocation_de: "USA",
    countryFlag: "🇺🇸",
    year: "2023",
    accentColor: "#8A60F1", // Cyber Purple
    software: ["Adobe After Effects", "Adobe Photoshop", "Illustrator", "Premiere Pro"],
    deliverables: ["Animated Billboard Promos", "Kinetic Posters", "Social Video Teasers"],
    deliverables_de: ["Animierte Billboard-Promos", "Kinetische Plakate", "Social-Video-Teaser"],
    order_index: 3,
  },
  {
    id: "4",
    title: "NeoHaus - Architectural Studio Book",
    title_de: "NeoHaus - Architektur-Buchband",
    description: "Editorial layout, grid architecture, typography, and premium print-ready book in Adobe InDesign for Berlin studio.",
    description_de: "Redaktionelles Layout, typografisches Rastersystem und hochwertiges, druckfertiges Buch in Adobe InDesign für Berliner Studio.",
    category: "editorial",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1200",
    tags: ["Adobe InDesign", "Photoshop", "Editorial Design", "Pre-Press"],
    clientLocation: "Egypt & Germany",
    clientLocation_de: "Ägypten & Deutschland",
    countryFlag: "🇪🇬 🇩🇪",
    year: "2023",
    accentColor: "#F43F5E", // Crimson Rose
    software: ["Adobe InDesign", "Adobe Photoshop", "Adobe Lightroom", "Illustrator"],
    deliverables: ["180-Page Art Book Layout", "Embossed Hardcover", "Pre-Press Separation"],
    deliverables_de: ["180-Seiten Artbook-Layout", "Geprägtes Hardcover", "Druckvorstufen-Separation"],
    order_index: 4,
  },
  {
    id: "5",
    title: "AeroGlide - Sustainable Footwear Campaign",
    title_de: "AeroGlide - Nachhaltige Sneaker-Kampagne",
    description: "High-impact social media campaign posters, typography lockups, and motion teaser storyboards for US launch.",
    description_de: "Wirkungsstarke Plakate für Social-Media-Kampagnen, Typografie-Konzepte und Teaser-Storyboards für den US-Marktstart.",
    category: "advertising",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    tags: ["Photoshop", "Illustrator", "Art Direction", "Social Media"],
    clientLocation: "Germany",
    clientLocation_de: "Deutschland",
    countryFlag: "🇩🇪",
    year: "2024",
    accentColor: "#10B981", // Emerald Mint
    software: ["Adobe Photoshop", "Adobe Illustrator", "Dimension", "After Effects"],
    deliverables: ["Multi-Channel Ad Suite", "High-Res Key Visuals", "Instagram Story Ads"],
    deliverables_de: ["Multi-Channel-Werbesuite", "High-Res Key Visuals", "Instagram Story Ads"],
    order_index: 5,
  },
  {
    id: "6",
    title: "Solara Spirits - Premium Gin Packaging",
    title_de: "Solara Spirits - Premium Gin Verpackung",
    description: "Intricate vintage-modern label illustration, custom gold foil embossed mockup, and typography for Parisian distillery.",
    description_de: "Detaillierte Vintage-Etiketten-Illustration, Heißfolienprägung-Mockups und Typografie für Pariser Premium-Destillerie.",
    category: "packaging",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200",
    tags: ["Adobe Dimension", "Illustrator", "Packaging", "Luxury Branding"],
    clientLocation: "France",
    clientLocation_de: "Frankreich",
    countryFlag: "🇫🇷",
    year: "2024",
    accentColor: "#EC4899", // Fuchsia Magenta
    software: ["Adobe Dimension (3D)", "Adobe Illustrator", "Photoshop", "Lightroom"],
    deliverables: ["Luxury Bottle Embossing", "Gold Foil Labels", "3D Glass Caustics Render"],
    deliverables_de: ["Luxusflaschen-Prägung", "Goldfolien-Etiketten", "3D-Glas-Caustics-Rendering"],
    order_index: 6,
  },
];

const DEFAULT_FEEDBACK: FeedbackItem[] = [
  {
    id: "default-1",
    name: "Marcus Vance",
    role: "Creative Director",
    company: "Vance Studio NYC",
    country: "United States",
    rating: 5,
    message: "Kero transformed our complete brand identity with unbelievable precision and creativity. The 3D assets and visual language took our agency launch to the next level.",
    status: "approved",
    avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: "default-2",
    name: "Sophie Dubois",
    role: "Brand Marketing Head",
    company: "Lumière Paris",
    country: "France",
    rating: 5,
    message: "Exceptional artistic sensitivity. Kero delivered complex visual campaigns in English and French ahead of deadline with impeccable attention to detail.",
    status: "approved",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    created_at: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
  },
  {
    id: "default-3",
    name: "Alexander Meyer",
    role: "Founder & CEO",
    company: "Klang Audio Berlin",
    country: "Germany",
    rating: 5,
    message: "Working with Kero was an absolute pleasure. His mastery of typography, 3D composition, and modern aesthetics is world-class.",
    status: "approved",
    avatar_url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    created_at: new Date(Date.now() - 3600000 * 24 * 10).toISOString(),
  },
  {
    id: "default-4",
    name: "Elena Rostova",
    role: "VP of Design",
    company: "Aura Labs Zurich",
    country: "Switzerland",
    rating: 5,
    message: "The speed, precision, and sheer creativity Kero brings to the table is unmatched. Highly recommended for any serious design project.",
    status: "approved",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    created_at: new Date(Date.now() - 3600000 * 24 * 14).toISOString(),
  },
];

const DEFAULT_SOCIAL_LINKS: SocialLinkItem[] = [
  { id: "s-1", platform: "behance", url: "https://behance.net" },
  { id: "s-2", platform: "instagram", url: "https://instagram.com" },
  { id: "s-3", platform: "linkedin", url: "https://linkedin.com" },
  { id: "s-4", platform: "github", url: "https://github.com" },
];

interface PortfolioDataContextType {
  // Data
  sections: Record<string, string>;
  getSection: (key: string, fallback?: string) => string;
  feedback: FeedbackItem[];
  approvedFeedback: FeedbackItem[];
  pendingFeedback: FeedbackItem[];
  socialLinks: SocialLinkItem[];
  projects: ProjectItem[];
  isLoading: boolean;
  isRealtimeConnected: boolean;
  dbError: string | null;

  // Auth state & methods
  user: User | null;
  isAuthLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;

  // Data Mutations
  submitFeedback: (data: {
    name: string;
    message: string;
    rating?: number;
    role?: string;
    company?: string;
    country?: string;
    avatar_url?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  updateFeedbackStatus: (id: string, status: "pending" | "approved") => Promise<{ success: boolean; error?: string }>;
  deleteFeedback: (id: string) => Promise<{ success: boolean; error?: string }>;
  updateSection: (key: string, value: string) => Promise<{ success: boolean; error?: string }>;
  updateSectionsBulk: (entries: { key: string; value: string }[]) => Promise<{ success: boolean; error?: string }>;
  uploadAsset: (file: File, folder?: string) => Promise<{ success: boolean; url?: string; error?: string }>;
  updateSocialLink: (id: string, platform: string, url: string) => Promise<{ success: boolean; error?: string }>;
  addSocialLink: (platform: string, url: string) => Promise<{ success: boolean; error?: string }>;
  deleteSocialLink: (id: string) => Promise<{ success: boolean; error?: string }>;

  // Projects CRUD
  addProject: (project: Omit<ProjectItem, "id">) => Promise<{ success: boolean; error?: string }>;
  updateProject: (id: string | number, project: Partial<ProjectItem>) => Promise<{ success: boolean; error?: string }>;
  deleteProject: (id: string | number) => Promise<{ success: boolean; error?: string }>;
  reorderProjects: (projects: ProjectItem[]) => Promise<{ success: boolean; error?: string }>;

  refreshData: () => Promise<void>;
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

export function PortfolioDataProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<FeedbackItem[]>(DEFAULT_FEEDBACK);
  const [socialLinks, setSocialLinks] = useState<SocialLinkItem[]>(DEFAULT_SOCIAL_LINKS);
  const [projects, setProjects] = useState<ProjectItem[]>(DEFAULT_PROJECTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState<boolean>(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Sync Auth session on mount and changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to sign in" };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Fetch all initial data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    let hasAnyError = false;

    try {
      // 1. Fetch sections
      const { data: sectionsData, error: sectionsError } = await supabase
        .from("sections")
        .select("*");

      if (sectionsError) {
        hasAnyError = true;
      } else if (sectionsData && sectionsData.length > 0) {
        const sectionsMap: Record<string, string> = {};
        sectionsData.forEach((row: SectionItem) => {
          if (row.key) sectionsMap[row.key] = row.value;
        });
        setSections(sectionsMap);
      }

      // 2. Fetch feedback
      const { data: feedbackData, error: feedbackError } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (feedbackError) {
        hasAnyError = true;
      } else if (feedbackData && feedbackData.length > 0) {
        setFeedback(feedbackData as FeedbackItem[]);
      }

      // 3. Fetch social links
      const { data: socialData, error: socialError } = await supabase
        .from("social_links")
        .select("*")
        .order("created_at", { ascending: true });

      if (socialError) {
        hasAnyError = true;
      } else if (socialData && socialData.length > 0) {
        setSocialLinks(socialData as SocialLinkItem[]);
      }

      // 4. Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });

      if (projectsError) {
        // Table might not exist yet, fallback to default projects
      } else if (projectsData && projectsData.length > 0) {
        setProjects(projectsData as ProjectItem[]);
      }

      if (hasAnyError) {
        setDbError("Supabase tables not found or pending SQL setup. Using defaults.");
      } else {
        setDbError(null);
      }
    } catch (err: any) {
      setDbError(err?.message || "Failed to query Supabase");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Setup Realtime Subscriptions
  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("portfolio-realtime-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feedback" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setFeedback((prev) => [
              payload.new as FeedbackItem,
              ...prev.filter((f) => f.id !== (payload.new as FeedbackItem).id),
            ]);
          } else if (payload.eventType === "UPDATE") {
            setFeedback((prev) =>
              prev.map((f) => (f.id === (payload.new as FeedbackItem).id ? (payload.new as FeedbackItem) : f))
            );
          } else if (payload.eventType === "DELETE") {
            setFeedback((prev) => prev.filter((f) => f.id !== payload.old.id));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sections" },
        (payload) => {
          if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
            const updated = payload.new as SectionItem;
            setSections((prev) => ({
              ...prev,
              [updated.key]: updated.value,
            }));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "social_links" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setSocialLinks((prev) => [
              ...prev.filter((s) => s.id !== payload.new.id),
              payload.new as SocialLinkItem,
            ]);
          } else if (payload.eventType === "UPDATE") {
            setSocialLinks((prev) =>
              prev.map((s) => (s.id === payload.new.id ? (payload.new as SocialLinkItem) : s))
            );
          } else if (payload.eventType === "DELETE") {
            setSocialLinks((prev) => prev.filter((s) => s.id !== payload.old.id));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setProjects((prev) => [
              ...prev.filter((p) => String(p.id) !== String(payload.new.id)),
              payload.new as ProjectItem,
            ]);
          } else if (payload.eventType === "UPDATE") {
            setProjects((prev) =>
              prev.map((p) =>
                String(p.id) === String(payload.new.id) ? (payload.new as ProjectItem) : p
              )
            );
          } else if (payload.eventType === "DELETE") {
            setProjects((prev) => prev.filter((p) => String(p.id) !== String(payload.old.id)));
          }
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setIsRealtimeConnected(true);
        } else if (status === "CLOSED" || status === "CHANNEL_ERROR") {
          setIsRealtimeConnected(false);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  // Section retrieval with multi-language fallback support
  const getSection = useCallback(
    (key: string, fallback?: string) => {
      if (sections[key] !== undefined && sections[key] !== "") {
        return sections[key];
      }
      if (fallback !== undefined) {
        return fallback;
      }
      return DEFAULT_SECTIONS[key] || "";
    },
    [sections]
  );

  const submitFeedback = async (data: {
    name: string;
    message: string;
    rating?: number;
    role?: string;
    company?: string;
    country?: string;
    avatar_url?: string;
  }) => {
    try {
      const newFeedback = {
        name: data.name,
        message: data.message,
        rating: data.rating || 5,
        role: data.role || "Client / Collaborator",
        company: data.company || "Project Partner",
        country: data.country || "Global",
        avatar_url:
          data.avatar_url ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`,
        status: "pending" as const,
      };

      const { data: inserted, error } = await supabase
        .from("feedback")
        .insert([newFeedback])
        .select()
        .single();

      if (error) {
        const localItem: FeedbackItem = {
          id: `local-${Date.now()}`,
          ...newFeedback,
          created_at: new Date().toISOString(),
        };
        setFeedback((prev) => [localItem, ...prev]);
        return { success: true };
      }

      if (inserted) {
        setFeedback((prev) => [inserted as FeedbackItem, ...prev]);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to submit feedback" };
    }
  };

  const updateFeedbackStatus = async (id: string, status: "pending" | "approved") => {
    try {
      setFeedback((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status } : f))
      );

      const { error } = await supabase
        .from("feedback")
        .update({ status })
        .eq("id", id);

      if (error) {
        console.warn("Feedback update reported:", error.message);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to update feedback status" };
    }
  };

  const deleteFeedback = async (id: string) => {
    try {
      setFeedback((prev) => prev.filter((f) => f.id !== id));

      const { error } = await supabase.from("feedback").delete().eq("id", id);
      if (error) {
        console.warn("Feedback delete reported:", error.message);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to delete feedback" };
    }
  };

  const updateSection = async (key: string, value: string) => {
    try {
      setSections((prev) => ({ ...prev, [key]: value }));

      const { error } = await supabase
        .from("sections")
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

      if (error) {
        console.warn("Section upsert reported:", error.message);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to save section" };
    }
  };

  const updateSectionsBulk = async (entries: { key: string; value: string }[]) => {
    try {
      const newMap = { ...sections };
      entries.forEach((e) => {
        newMap[e.key] = e.value;
      });
      setSections(newMap);

      const records = entries.map((e) => ({
        key: e.key,
        value: e.value,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from("sections")
        .upsert(records, { onConflict: "key" });

      if (error) {
        console.warn("Bulk section upsert reported:", error.message);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to save sections in bulk" };
    }
  };

  const uploadAsset = async (file: File, folder = "uploads") => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-assets")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: urlData } = supabase.storage
        .from("portfolio-assets")
        .getPublicUrl(fileName);

      return { success: true, url: urlData.publicUrl };
    } catch (err: any) {
      const fallbackUrl = URL.createObjectURL(file);
      return {
        success: true,
        url: fallbackUrl,
        error: `Storage note: Using preview URL (${err?.message || "Ensure 'portfolio-assets' bucket is public in Supabase"})`,
      };
    }
  };

  const updateSocialLink = async (id: string, platform: string, url: string) => {
    try {
      setSocialLinks((prev) =>
        prev.map((s) => (s.id === id ? { ...s, platform, url } : s))
      );

      const { error } = await supabase
        .from("social_links")
        .update({ platform, url })
        .eq("id", id);

      if (error) {
        console.warn("Social link update reported:", error.message);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to update social link" };
    }
  };

  const addSocialLink = async (platform: string, url: string) => {
    try {
      const newObj = { platform, url };
      const { data, error } = await supabase
        .from("social_links")
        .insert([newObj])
        .select()
        .single();

      if (error || !data) {
        const localObj: SocialLinkItem = {
          id: `local-social-${Date.now()}`,
          platform,
          url,
        };
        setSocialLinks((prev) => [...prev, localObj]);
        return { success: true };
      }

      setSocialLinks((prev) => [...prev, data as SocialLinkItem]);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to add social link" };
    }
  };

  const deleteSocialLink = async (id: string) => {
    try {
      setSocialLinks((prev) => prev.filter((s) => s.id !== id));
      const { error } = await supabase.from("social_links").delete().eq("id", id);
      if (error) {
        console.warn("Delete social link reported:", error.message);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to delete social link" };
    }
  };

  // Projects CRUD
  const addProject = async (projectData: Omit<ProjectItem, "id">) => {
    try {
      const order_index = projects.length + 1;
      const payload = {
        ...projectData,
        order_index: projectData.order_index ?? order_index,
      };

      const { data, error } = await supabase
        .from("projects")
        .insert([payload])
        .select()
        .single();

      if (error || !data) {
        const localProject: ProjectItem = {
          id: `local-proj-${Date.now()}`,
          ...payload,
        };
        setProjects((prev) => [...prev, localProject]);
        return { success: true };
      }

      setProjects((prev) => [...prev, data as ProjectItem]);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to add project" };
    }
  };

  const updateProject = async (id: string | number, projectData: Partial<ProjectItem>) => {
    try {
      setProjects((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? { ...p, ...projectData } : p))
      );

      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", id);

      if (error) {
        console.warn("Project update warning:", error.message);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to update project" };
    }
  };

  const deleteProject = async (id: string | number) => {
    try {
      setProjects((prev) => prev.filter((p) => String(p.id) !== String(id)));
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) {
        console.warn("Project delete warning:", error.message);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to delete project" };
    }
  };

  const reorderProjects = async (newProjects: ProjectItem[]) => {
    try {
      setProjects(newProjects);

      const updates = newProjects.map((p, idx) => ({
        id: p.id,
        order_index: idx + 1,
      }));

      for (const u of updates) {
        await supabase.from("projects").update({ order_index: u.order_index }).eq("id", u.id);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to reorder projects" };
    }
  };

  const approvedFeedback = feedback.filter((f) => f.status === "approved");
  const pendingFeedback = feedback.filter((f) => f.status === "pending");

  return (
    <PortfolioDataContext.Provider
      value={{
        sections,
        getSection,
        feedback,
        approvedFeedback,
        pendingFeedback,
        socialLinks,
        projects,
        isLoading,
        isRealtimeConnected,
        dbError,
        user,
        isAuthLoading,
        signIn,
        signOut,
        submitFeedback,
        updateFeedbackStatus,
        deleteFeedback,
        updateSection,
        updateSectionsBulk,
        uploadAsset,
        updateSocialLink,
        addSocialLink,
        deleteSocialLink,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        refreshData: fetchData,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error("usePortfolioData must be used within a PortfolioDataProvider");
  }
  return context;
}
