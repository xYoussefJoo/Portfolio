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

export const SQL_SCHEMA_CONTENT = `-- 1. SECTIONS TABLE (Dynamic content blocks)
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

-- 4. ROW LEVEL SECURITY (RLS) POLICIES - OPEN ACCESS
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view sections" ON public.sections FOR SELECT USING (true);
CREATE POLICY "Public can insert sections" ON public.sections FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update sections" ON public.sections FOR UPDATE USING (true);
CREATE POLICY "Public can delete sections" ON public.sections FOR DELETE USING (true);

CREATE POLICY "Public can view feedback" ON public.feedback FOR SELECT USING (true);
CREATE POLICY "Public can submit feedback" ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can moderate feedback" ON public.feedback FOR UPDATE USING (true);
CREATE POLICY "Public can delete feedback" ON public.feedback FOR DELETE USING (true);

CREATE POLICY "Public can manage social_links" ON public.social_links FOR ALL USING (true);

-- 5. REALTIME PUBLICATIONS
DO $$
BEGIN
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.sections; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.social_links; EXCEPTION WHEN duplicate_object THEN NULL; END;
END $$;

-- 6. STORAGE BUCKET FOR IMAGES
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public view assets" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Public upload assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-assets');
CREATE POLICY "Public update assets" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-assets');

-- 7. INITIAL SEED DATA
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
('about_description', 'With a deep mastery of graphic design, brand strategy, and visual arts, I help global brands stand out.'),
('about_philosophy_p1', 'Design is not just what it looks like and feels like. Design is how it communicates, resonates, and moves people to action.'),
('about_philosophy_p2', 'Specialized in high-impact brand identities, packaging, 3D visual art, and multilingual campaign executions.'),
('profile_image_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.social_links (platform, url) VALUES
('behance', 'https://behance.net'),
('instagram', 'https://instagram.com'),
('linkedin', 'https://linkedin.com'),
('github', 'https://github.com')
ON CONFLICT DO NOTHING;

INSERT INTO public.feedback (name, role, company, country, rating, message, status, avatar_url) VALUES
('Marcus Vance', 'Creative Director', 'Vance Studio NYC', 'United States', 5, 'Kero transformed our complete brand identity with unbelievable precision and creativity.', 'approved', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'),
('Sophie Dubois', 'Brand Marketing Head', 'Lumière Paris', 'France', 5, 'Exceptional artistic sensitivity. Kero delivered complex visual campaigns ahead of deadline.', 'approved', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'),
('Alexander Meyer', 'Founder & CEO', 'Klang Audio Berlin', 'Germany', 5, 'Working with Kero was an absolute pleasure. His mastery of typography and 3D composition is world-class.', 'approved', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80')
ON CONFLICT DO NOTHING;`;

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
            Run this SQL query once in your Supabase project to create all tables, policies, realtime subscriptions, and initial seed data.
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
            All tables (<code className="text-[#8A60F1]">sections</code>, <code className="text-[#8A60F1]">feedback</code>, <code className="text-[#8A60F1]">social_links</code>), storage buckets, and realtime will be instantly ready.
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
