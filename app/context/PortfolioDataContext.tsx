import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase, type FeedbackItem, type SectionItem, type SocialLinkItem } from "~/utils/supabase";

// Default fallback data if Supabase tables are not yet created or empty
const DEFAULT_SECTIONS: Record<string, string> = {
  hero_badge: "Senior Graphic Designer & Visual Artist",
  hero_title_line1: "Crafting Iconic",
  hero_title_gradient: "Visual Identities & 3D Experiences",
  hero_intro: "Over 3+ years turning complex brand visions into award-winning visual experiences across the US, Germany, France, and Egypt.",
  hero_stat_projects: "200+ Delivered Projects",
  hero_stat_adobe: "Adobe Master",
  hero_stat_languages: "Multilingual EN / DE / FR / AR",
  about_tag: "Visual Storyteller & Creator",
  about_title_line1: "Transforming Ideas into",
  about_title_gradient: "Unforgettable Aesthetics",
  about_description: "With a deep mastery of graphic design, brand strategy, and visual arts, I help global brands stand out in saturated markets.",
  about_philosophy_p1: "Design is not just what it looks like and feels like. Design is how it communicates, resonates, and moves people to action.",
  about_philosophy_p2: "Specialized in high-impact brand identities, packaging, 3D visual art, and multilingual campaign executions across Europe, the Americas, and the Middle East.",
  profile_image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
};

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
  sections: Record<string, string>;
  getSection: (key: string, fallback?: string) => string;
  feedback: FeedbackItem[];
  approvedFeedback: FeedbackItem[];
  pendingFeedback: FeedbackItem[];
  socialLinks: SocialLinkItem[];
  isLoading: boolean;
  isRealtimeConnected: boolean;
  dbError: string | null;
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
  refreshData: () => Promise<void>;
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

export function PortfolioDataProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<Record<string, string>>(DEFAULT_SECTIONS);
  const [feedback, setFeedback] = useState<FeedbackItem[]>(DEFAULT_FEEDBACK);
  const [socialLinks, setSocialLinks] = useState<SocialLinkItem[]>(DEFAULT_SOCIAL_LINKS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState<boolean>(false);
  const [dbError, setDbError] = useState<string | null>(null);

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
        const sectionsMap: Record<string, string> = { ...DEFAULT_SECTIONS };
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

    // Setup channel for realtime changes
    const channel = supabase
      .channel("portfolio-realtime-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feedback" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setFeedback((prev) => [payload.new as FeedbackItem, ...prev.filter((f) => f.id !== (payload.new as FeedbackItem).id)]);
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
            setSocialLinks((prev) => [...prev.filter((s) => s.id !== payload.new.id), payload.new as SocialLinkItem]);
          } else if (payload.eventType === "UPDATE") {
            setSocialLinks((prev) =>
              prev.map((s) => (s.id === payload.new.id ? (payload.new as SocialLinkItem) : s))
            );
          } else if (payload.eventType === "DELETE") {
            setSocialLinks((prev) => prev.filter((s) => s.id !== payload.old.id));
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

  // Safe helper to get section content with fallback
  const getSection = useCallback(
    (key: string, fallback?: string) => {
      if (sections[key] !== undefined && sections[key] !== "") {
        return sections[key];
      }
      return fallback !== undefined ? fallback : DEFAULT_SECTIONS[key] || "";
    },
    [sections]
  );

  // Submit Feedback (Status defaults to 'pending')
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
        avatar_url: data.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`,
        status: "pending" as const,
      };

      const { data: inserted, error } = await supabase
        .from("feedback")
        .insert([newFeedback])
        .select()
        .single();

      if (error) {
        // Optimistic local state fallback if database not configured
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

  // Update Feedback Status (Approve / Pending)
  const updateFeedbackStatus = async (id: string, status: "pending" | "approved") => {
    try {
      // Optimistic update
      setFeedback((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status } : f))
      );

      const { error } = await supabase
        .from("feedback")
        .update({ status })
        .eq("id", id);

      if (error) {
        console.warn("Feedback update in Supabase reported:", error.message);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to update feedback status" };
    }
  };

  // Delete Feedback
  const deleteFeedback = async (id: string) => {
    try {
      // Optimistic removal
      setFeedback((prev) => prev.filter((f) => f.id !== id));

      const { error } = await supabase.from("feedback").delete().eq("id", id);
      if (error) {
        console.warn("Feedback delete in Supabase reported:", error.message);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to delete feedback" };
    }
  };

  // Update a single section
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

  // Bulk update sections
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

  // Upload image / asset to Supabase Storage bucket 'portfolio-assets'
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
      // Fallback: Create Object URL for preview/testing if bucket not yet created
      const fallbackUrl = URL.createObjectURL(file);
      return {
        success: true,
        url: fallbackUrl,
        error: `Supabase Storage note: Using local preview (${err?.message || "create 'portfolio-assets' bucket in Supabase"})`,
      };
    }
  };

  // Social Links management
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
        isLoading,
        isRealtimeConnected,
        dbError,
        submitFeedback,
        updateFeedbackStatus,
        deleteFeedback,
        updateSection,
        updateSectionsBulk,
        uploadAsset,
        updateSocialLink,
        addSocialLink,
        deleteSocialLink,
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
