-- ==============================================================================
-- SUPABASE PORTFOLIO & DASHBOARD DATABASE SCHEMA
-- ==============================================================================

-- 1. SECTIONS TABLE (Dynamic content blocks for landing page)
CREATE TABLE IF NOT EXISTS public.sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. FEEDBACK TABLE (Client reviews and moderation)
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

-- 3. SOCIAL LINKS TABLE
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES - OPEN ACCESS AS REQUESTED
-- ==============================================================================

ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- SECTIONS POLICIES (Open select, insert, update, delete)
DROP POLICY IF EXISTS "Public can view sections" ON public.sections;
CREATE POLICY "Public can view sections" ON public.sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert sections" ON public.sections;
CREATE POLICY "Public can insert sections" ON public.sections FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update sections" ON public.sections;
CREATE POLICY "Public can update sections" ON public.sections FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public can delete sections" ON public.sections;
CREATE POLICY "Public can delete sections" ON public.sections FOR DELETE USING (true);

-- FEEDBACK POLICIES (Open select, insert for pending, update for moderation, delete)
DROP POLICY IF EXISTS "Public can view feedback" ON public.feedback;
CREATE POLICY "Public can view feedback" ON public.feedback FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can submit feedback" ON public.feedback;
CREATE POLICY "Public can submit feedback" ON public.feedback FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can moderate feedback" ON public.feedback;
CREATE POLICY "Public can moderate feedback" ON public.feedback FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public can delete feedback" ON public.feedback;
CREATE POLICY "Public can delete feedback" ON public.feedback FOR DELETE USING (true);

-- SOCIAL LINKS POLICIES (Open select, insert, update, delete)
DROP POLICY IF EXISTS "Public can view social_links" ON public.social_links;
CREATE POLICY "Public can view social_links" ON public.social_links FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can manage social_links" ON public.social_links;
CREATE POLICY "Public can manage social_links" ON public.social_links FOR ALL USING (true);

-- ==============================================================================
-- REALTIME SUBSCRIPTIONS
-- ==============================================================================
-- Enable Realtime for instant updates on feedback and sections
DO $$
BEGIN
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

-- Storage policies for public read and upload
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
-- SEED DATA (INITIAL DEFAULT SECTIONS & SAMPLE FEEDBACK)
-- ==============================================================================

-- Initial Content Sections
INSERT INTO public.sections (key, value) VALUES
('hero_badge', 'Senior Graphic Designer & Visual Artist'),
('hero_title_line1', 'Crafting Iconic'),
('hero_title_gradient', 'Visual Identities & 3D Experiences'),
('hero_intro', 'Over 3+ years turning complex brand visions into award-winning visual experiences across the US, Germany, France, and Egypt.'),
('hero_stat_projects', '200+ Delivered Projects'),
('hero_stat_adobe', 'Adobe Master'),
('hero_stat_languages', 'Multilingual EN / DE / FR / AR'),
('about_tag', 'Visual Storyteller & Creator'),
('about_title_line1', 'Transforming Ideas into'),
('about_title_gradient', 'Unforgettable Aesthetics'),
('about_description', 'With a deep mastery of graphic design, brand strategy, and visual arts, I help global brands stand out in saturated markets.'),
('about_philosophy_p1', 'Design is not just what it looks like and feels like. Design is how it communicates, resonates, and moves people to action.'),
('about_philosophy_p2', 'Specialized in high-impact brand identities, packaging, 3D visual art, and multilingual campaign executions across Europe, the Americas, and the Middle East.'),
('profile_image_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80')
ON CONFLICT (key) DO NOTHING;

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
