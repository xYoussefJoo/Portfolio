import React, { useState } from "react";
import {
  Database,
  Copy,
  Check,
  ExternalLink,
  Code,
  ShieldCheck,
  Radio,
  HardDrive,
  FolderOpen,
} from "lucide-react";

export const SQL_SCHEMA_CONTENT = `-- ==============================================================================
-- SUPABASE PORTFOLIO & DASHBOARD DATABASE SCHEMA
-- ==============================================================================

-- 1. PROJECTS TABLE (Portfolio Showcase)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    title_de TEXT,
    description TEXT NOT NULL DEFAULT '',
    description_de TEXT,
    category TEXT NOT NULL DEFAULT 'branding',
    image TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    client_location TEXT DEFAULT 'Global',
    client_location_de TEXT,
    country_flag TEXT DEFAULT '🇩🇪',
    year TEXT DEFAULT '2024',
    accent_color TEXT DEFAULT '#8A60F1',
    software TEXT[] DEFAULT '{}',
    deliverables TEXT[] DEFAULT '{}',
    deliverables_de TEXT[] DEFAULT '{}',
    order_index INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SECTIONS TABLE (Dynamic content blocks)
CREATE TABLE IF NOT EXISTS public.sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. FEEDBACK TABLE (Client reviews and moderation)
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved')),
    avatar_url TEXT,
    role TEXT,
    company TEXT,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. SOCIAL LINKS TABLE
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES - OPEN ACCESS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can manage projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Public can manage sections" ON public.sections FOR ALL USING (true);
CREATE POLICY "Public can manage feedback" ON public.feedback FOR ALL USING (true);
CREATE POLICY "Public can manage social_links" ON public.social_links FOR ALL USING (true);

-- 6. REALTIME PUBLICATIONS
DO $$
BEGIN
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.projects; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.sections; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.social_links; EXCEPTION WHEN duplicate_object THEN NULL; END;
END $$;

-- 7. STORAGE BUCKET FOR IMAGES
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public view assets" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Public upload assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-assets');
CREATE POLICY "Public update assets" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Public delete assets" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio-assets');

-- 8. INITIAL SEED DATA (PROJECTS)
INSERT INTO public.projects (title, title_de, description, description_de, category, image, tags, client_location, client_location_de, country_flag, year, accent_color, software, deliverables, deliverables_de, order_index) VALUES
('Aura Botanica - Luxury Organic Cosmetics', 'Aura Botanica - Luxus-Naturkosmetik', 'Comprehensive visual identity, botanical packaging design, and 3D product renders in Adobe Dimension & Photoshop.', 'Ganzheitliche Markenidentität, botanisches Verpackungsdesign und fotorealistische 3D-Renderings in Adobe Dimension & Photoshop.', 'branding', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200', ARRAY['Adobe Illustrator', 'Photoshop'], 'United States & France', 'USA & Frankreich', '🇺🇸 🇫🇷', '2024', '#E0A96D', ARRAY['Adobe Illustrator', 'Adobe Photoshop', 'Dimension (3D)', 'InDesign'], ARRAY['Full Brand Book', 'Vector Logo Suite', '3D Packaging'], ARRAY['Vollständiges Brand Book', 'Vektor-Logo Suite', '3D-Verpackung'], 1),
('CyberPulse - Esports Energy Drink', 'CyberPulse - Esports Energy Drink', 'High-octane can packaging, dynamic vector illustrations in Adobe Illustrator, and 3D metallic foil finish mockup.', 'Dynamisches Dosendesign, Vektorillustrationen in Adobe Illustrator und 3D-Mockups mit metallischen Folieneffekten.', 'packaging', 'https://images.unsplash.com/photo-1556742049-0a67c55c8cc0?auto=format&fit=crop&q=80&w=1200', ARRAY['Adobe Dimension', 'Illustrator'], 'Germany', 'Deutschland', '🇩🇪', '2024', '#00F0FF', ARRAY['Adobe Dimension (3D)', 'Adobe Illustrator', 'Photoshop'], ARRAY['Die-Line Label Engineering', '3D Renders'], ARRAY['Stanzkontur-Design', '3D-Renderings'], 2),
('Vortex Sound - Spatial Audio Identity', 'Vortex Sound - Spatial Audio Brand', 'Complete visual branding, custom typographic logotype, and advertising poster series for European audiophile brand.', 'Komplettes visuelles Branding, individuelles typografisches Logo und Werbeplakat-Serie für europäische Audiomarke.', 'advertising', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200', ARRAY['After Effects', 'Photoshop'], 'United States', 'USA', '🇺🇸', '2023', '#8A60F1', ARRAY['Adobe After Effects', 'Adobe Photoshop', 'Illustrator'], ARRAY['Animated Billboard Promos', 'Kinetic Posters'], ARRAY['Animierte Billboard-Promos', 'Kinetische Plakate'], 3),
('NeoHaus - Architectural Studio Book', 'NeoHaus - Architektur-Buchband', 'Editorial layout, grid architecture, typography, and premium print-ready book in Adobe InDesign for Berlin studio.', 'Redaktionelles Layout, typografisches Rastersystem und hochwertiges, druckfertiges Buch in Adobe InDesign für Berliner Studio.', 'editorial', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1200', ARRAY['Adobe InDesign', 'Photoshop'], 'Egypt & Germany', 'Ägypten & Deutschland', '🇪🇬 🇩🇪', '2023', '#F43F5E', ARRAY['Adobe InDesign', 'Adobe Photoshop', 'Lightroom'], ARRAY['180-Page Art Book Layout', 'Embossed Hardcover'], ARRAY['180-Seiten Artbook-Layout', 'Geprägtes Hardcover'], 4),
('AeroGlide - Sustainable Footwear Campaign', 'AeroGlide - Nachhaltige Sneaker-Kampagne', 'High-impact social media campaign posters, typography lockups, and motion teaser storyboards for US launch.', 'Wirkungsstarke Plakate für Social-Media-Kampagnen, Typografie-Konzepte und Teaser-Storyboards für den US-Marktstart.', 'advertising', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200', ARRAY['Photoshop', 'Illustrator'], 'Germany', 'Deutschland', '🇩🇪', '2024', '#10B981', ARRAY['Adobe Photoshop', 'Adobe Illustrator', 'Dimension'], ARRAY['Multi-Channel Ad Suite', 'Key Visuals'], ARRAY['Multi-Channel-Werbesuite', 'Key Visuals'], 5),
('Solara Spirits - Premium Gin Packaging', 'Solara Spirits - Premium Gin Verpackung', 'Intricate vintage-modern label illustration, custom gold foil embossed mockup, and typography for Parisian distillery.', 'Detaillierte Vintage-Etiketten-Illustration, Heißfolienprägung-Mockups und Typografie für Pariser Premium-Destillerie.', 'packaging', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200', ARRAY['Adobe Dimension', 'Illustrator'], 'France', 'Frankreich', '🇫🇷', '2024', '#EC4899', ARRAY['Adobe Dimension (3D)', 'Adobe Illustrator', 'Photoshop'], ARRAY['Luxury Bottle Embossing', 'Gold Foil Labels'], ARRAY['Luxusflaschen-Prägung', 'Goldfolien-Etiketten'], 6)
ON CONFLICT DO NOTHING;
`;

export function SqlSetupGuide() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_CONTENT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 glass-card rounded-3xl border-[#8A60F1]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Database className="w-5 h-5 text-[#8A60F1]" />
            <span>Supabase Database Setup</span>
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-light mt-1">
            Run this updated SQL query once in your Supabase project to create all tables (projects, sections, feedback, social_links), policies, realtime subscriptions, and initial seed data.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(138,96,241,0.3)] hover:scale-105 active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "SQL Copied!" : "Copy SQL Script"}</span>
        </button>
      </div>

      {/* Setup Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 glass-card rounded-2xl border-[var(--card-border)] space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#8A60F1]/15 text-[#8A60F1] flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h4 className="font-bold text-sm text-[var(--text-primary)]">Open Supabase SQL Editor</h4>
          <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
            Go to your Supabase Dashboard (<code className="text-[#8A60F1]">gunjvczafsqdxoonbxfz</code>), navigate to <strong>SQL Editor</strong> on the left sidebar.
          </p>
        </div>

        <div className="p-5 glass-card rounded-2xl border-[var(--card-border)] space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#8A60F1]/15 text-[#8A60F1] flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h4 className="font-bold text-sm text-[var(--text-primary)]">Paste & Run Query</h4>
          <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
            Click <strong>New Query</strong>, paste the copied SQL script, and click the green <strong>Run</strong> button.
          </p>
        </div>

        <div className="p-5 glass-card rounded-2xl border-[var(--card-border)] space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#8A60F1]/15 text-[#8A60F1] flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h4 className="font-bold text-sm text-[var(--text-primary)]">Done! Live Sync Enabled</h4>
          <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
            All tables (<code className="text-[#8A60F1]">projects</code>, <code className="text-[#8A60F1]">sections</code>, <code className="text-[#8A60F1]">feedback</code>, <code className="text-[#8A60F1]">social_links</code>), storage buckets, and realtime will be instantly ready.
          </p>
        </div>
      </div>

      {/* SQL Code Block */}
      <div className="relative glass-card rounded-3xl border border-[var(--card-border)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-3 bg-black/40 border-b border-[var(--card-border)]">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-[#8A60F1]" />
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
              supabase/schema.sql
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-bold text-[#8A60F1] hover:text-fuchsia-400 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        <pre className="p-6 text-xs font-mono text-[var(--text-secondary)] overflow-x-auto leading-relaxed max-h-[450px] bg-black/20">
          <code>{SQL_SCHEMA_CONTENT}</code>
        </pre>
      </div>
    </div>
  );
}
