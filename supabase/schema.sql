-- ==============================================================================
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

-- 2. SECTIONS TABLE (Dynamic content blocks for landing page)
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

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES - OPEN ACCESS AS REQUESTED
-- ==============================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- PROJECTS POLICIES (Open access for portfolio showcase and admin management)
DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert projects" ON public.projects;
CREATE POLICY "Public can insert projects" ON public.projects FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update projects" ON public.projects;
CREATE POLICY "Public can update projects" ON public.projects FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public can delete projects" ON public.projects;
CREATE POLICY "Public can delete projects" ON public.projects FOR DELETE USING (true);

-- SECTIONS POLICIES
DROP POLICY IF EXISTS "Public can view sections" ON public.sections;
CREATE POLICY "Public can view sections" ON public.sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert sections" ON public.sections;
CREATE POLICY "Public can insert sections" ON public.sections FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update sections" ON public.sections;
CREATE POLICY "Public can update sections" ON public.sections FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public can delete sections" ON public.sections;
CREATE POLICY "Public can delete sections" ON public.sections FOR DELETE USING (true);

-- FEEDBACK POLICIES
DROP POLICY IF EXISTS "Public can view feedback" ON public.feedback;
CREATE POLICY "Public can view feedback" ON public.feedback FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can submit feedback" ON public.feedback;
CREATE POLICY "Public can submit feedback" ON public.feedback FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can moderate feedback" ON public.feedback;
CREATE POLICY "Public can moderate feedback" ON public.feedback FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public can delete feedback" ON public.feedback;
CREATE POLICY "Public can delete feedback" ON public.feedback FOR DELETE USING (true);

-- SOCIAL LINKS POLICIES
DROP POLICY IF EXISTS "Public can view social_links" ON public.social_links;
CREATE POLICY "Public can view social_links" ON public.social_links FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can manage social_links" ON public.social_links;
CREATE POLICY "Public can manage social_links" ON public.social_links FOR ALL USING (true);

-- ==============================================================================
-- REALTIME SUBSCRIPTIONS
-- ==============================================================================
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.sections;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.social_links;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;
END $$;

-- ==============================================================================
-- STORAGE BUCKET FOR PORTFOLIO IMAGES
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public can view portfolio assets" ON storage.objects;
CREATE POLICY "Public can view portfolio assets" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Public can upload portfolio assets" ON storage.objects;
CREATE POLICY "Public can upload portfolio assets" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Public can update portfolio assets" ON storage.objects;
CREATE POLICY "Public can update portfolio assets" ON storage.objects
FOR UPDATE USING (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Public can delete portfolio assets" ON storage.objects;
CREATE POLICY "Public can delete portfolio assets" ON storage.objects
FOR DELETE USING (bucket_id = 'portfolio-assets');

-- ==============================================================================
-- SEED DATA (INITIAL DEFAULT PROJECTS, SECTIONS, FEEDBACK)
-- ==============================================================================

-- Initial Projects
INSERT INTO public.projects (title, title_de, description, description_de, category, image, tags, client_location, client_location_de, country_flag, year, accent_color, software, deliverables, deliverables_de, order_index) VALUES
('Aura Botanica - Luxury Organic Cosmetics', 'Aura Botanica - Luxus-Naturkosmetik', 'Comprehensive visual identity, botanical packaging design, and 3D product renders in Adobe Dimension & Photoshop.', 'Ganzheitliche Markenidentität, botanisches Verpackungsdesign und fotorealistische 3D-Renderings in Adobe Dimension & Photoshop.', 'branding', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200', ARRAY['Adobe Illustrator', 'Photoshop', 'Brand System'], 'United States & France', 'USA & Frankreich', '🇺🇸 🇫🇷', '2024', '#E0A96D', ARRAY['Adobe Illustrator', 'Adobe Photoshop', 'Dimension (3D)', 'InDesign'], ARRAY['Full Brand Book', 'Vector Logo Suite', '3D Packaging'], ARRAY['Vollständiges Brand Book', 'Vektor-Logo Suite', '3D-Verpackung'], 1),
('CyberPulse - Esports Energy Drink', 'CyberPulse - Esports Energy Drink', 'High-octane can packaging, dynamic vector illustrations in Adobe Illustrator, and 3D metallic foil finish mockup.', 'Dynamisches Dosendesign, Vektorillustrationen in Adobe Illustrator und 3D-Mockups mit metallischen Folieneffekten.', 'packaging', 'https://images.unsplash.com/photo-1556742049-0a67c55c8cc0?auto=format&fit=crop&q=80&w=1200', ARRAY['Adobe Dimension', 'Illustrator', 'Packaging', '3D Render'], 'Germany', 'Deutschland', '🇩🇪', '2024', '#00F0FF', ARRAY['Adobe Dimension (3D)', 'Adobe Illustrator', 'Photoshop'], ARRAY['Die-Line Label Engineering', '3D Renders', 'Foil Finish Maps'], ARRAY['Stanzkontur-Design', '3D-Renderings', 'Folieneffekt-Maps'], 2),
('Vortex Sound - Spatial Audio Identity', 'Vortex Sound - Spatial Audio Brand', 'Complete visual branding, custom typographic logotype, and advertising poster series for European audiophile brand.', 'Komplettes visuelles Branding, individuelles typografisches Logo und Werbeplakat-Serie für europäische Audiomarke.', 'advertising', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200', ARRAY['After Effects', 'Photoshop', 'Motion Graphics'], 'United States', 'USA', '🇺🇸', '2023', '#8A60F1', ARRAY['Adobe After Effects', 'Adobe Photoshop', 'Illustrator'], ARRAY['Animated Billboard Promos', 'Kinetic Posters'], ARRAY['Animierte Billboard-Promos', 'Kinetische Plakate'], 3),
('NeoHaus - Architectural Studio Book', 'NeoHaus - Architektur-Buchband', 'Editorial layout, grid architecture, typography, and premium print-ready book in Adobe InDesign for Berlin studio.', 'Redaktionelles Layout, typografisches Rastersystem und hochwertiges, druckfertiges Buch in Adobe InDesign für Berliner Studio.', 'editorial', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1200', ARRAY['Adobe InDesign', 'Photoshop', 'Editorial'], 'Egypt & Germany', 'Ägypten & Deutschland', '🇪🇬 🇩🇪', '2023', '#F43F5E', ARRAY['Adobe InDesign', 'Adobe Photoshop', 'Lightroom'], ARRAY['180-Page Art Book Layout', 'Embossed Hardcover'], ARRAY['180-Seiten Artbook-Layout', 'Geprägtes Hardcover'], 4),
('AeroGlide - Sustainable Footwear Campaign', 'AeroGlide - Nachhaltige Sneaker-Kampagne', 'High-impact social media campaign posters, typography lockups, and motion teaser storyboards for US launch.', 'Wirkungsstarke Plakate für Social-Media-Kampagnen, Typografie-Konzepte und Teaser-Storyboards für den US-Marktstart.', 'advertising', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200', ARRAY['Photoshop', 'Illustrator', 'Art Direction'], 'Germany', 'Deutschland', '🇩🇪', '2024', '#10B981', ARRAY['Adobe Photoshop', 'Adobe Illustrator', 'Dimension'], ARRAY['Multi-Channel Ad Suite', 'Key Visuals'], ARRAY['Multi-Channel-Werbesuite', 'Key Visuals'], 5),
('Solara Spirits - Premium Gin Packaging', 'Solara Spirits - Premium Gin Verpackung', 'Intricate vintage-modern label illustration, custom gold foil embossed mockup, and typography for Parisian distillery.', 'Detaillierte Vintage-Etiketten-Illustration, Heißfolienprägung-Mockups und Typografie für Pariser Premium-Destillerie.', 'packaging', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200', ARRAY['Adobe Dimension', 'Illustrator', 'Packaging'], 'France', 'Frankreich', '🇫🇷', '2024', '#EC4899', ARRAY['Adobe Dimension (3D)', 'Adobe Illustrator', 'Photoshop'], ARRAY['Luxury Bottle Embossing', 'Gold Foil Labels'], ARRAY['Luxusflaschen-Prägung', 'Goldfolien-Etiketten'], 6)
ON CONFLICT DO NOTHING;

-- Initial Social Links
INSERT INTO public.social_links (platform, url) VALUES
('behance', 'https://behance.net'),
('instagram', 'https://instagram.com'),
('linkedin', 'https://linkedin.com'),
('github', 'https://github.com')
ON CONFLICT DO NOTHING;

-- Initial Approved Client Feedback
INSERT INTO public.feedback (name, role, company, country, rating, message, status, avatar_url) VALUES
('Marcus Vance', 'Creative Director', 'Vance Studio NYC', 'United States', 5, 'Kero transformed our complete brand identity with unbelievable precision and creativity. The 3D assets and visual language took our agency launch to the next level.', 'approved', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'),
('Sophie Dubois', 'Brand Marketing Head', 'Lumière Paris', 'France', 5, 'Exceptional artistic sensitivity. Kero delivered complex visual campaigns in English and French ahead of deadline with impeccable attention to detail.', 'approved', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'),
('Alexander Meyer', 'Founder & CEO', 'Klang Audio Berlin', 'Germany', 5, 'Working with Kero was an absolute pleasure. His mastery of typography, 3D composition, and modern aesthetics is world-class.', 'approved', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80'),
('Elena Rostova', 'VP of Design', 'Aura Labs Zurich', 'Switzerland', 5, 'The speed, precision, and sheer creativity Kero brings to the table is unmatched. Highly recommended for any serious design project.', 'approved', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80')
ON CONFLICT DO NOTHING;
