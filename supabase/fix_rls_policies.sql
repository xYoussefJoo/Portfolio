-- ==============================================================================
-- RLS LOCKDOWN MIGRATION
-- Run this once in the Supabase SQL Editor against your EXISTING project.
-- It only touches policies (no table/data changes) and is safe to re-run.
--
-- Before: every table allowed public INSERT/UPDATE/DELETE via the anon key,
-- so anyone with the (public, client-bundled) anon key could write/delete
-- data directly through the Supabase REST API, bypassing the admin login.
--
-- After: reads stay public (needed for the live portfolio site), but writes
-- require an authenticated Supabase Auth session (i.e. the admin dashboard
-- login) — except feedback INSERT, which stays public so visitors can still
-- submit testimonials from the Contact/Testimonials section.
-- ==============================================================================

-- PROJECTS
DROP POLICY IF EXISTS "Public can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Public can update projects" ON public.projects;
DROP POLICY IF EXISTS "Public can delete projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated can update projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated can delete projects" ON public.projects;

CREATE POLICY "Authenticated can insert projects" ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update projects" ON public.projects FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete projects" ON public.projects FOR DELETE USING (auth.role() = 'authenticated');

-- SECTIONS
DROP POLICY IF EXISTS "Public can insert sections" ON public.sections;
DROP POLICY IF EXISTS "Public can update sections" ON public.sections;
DROP POLICY IF EXISTS "Public can delete sections" ON public.sections;
DROP POLICY IF EXISTS "Authenticated can insert sections" ON public.sections;
DROP POLICY IF EXISTS "Authenticated can update sections" ON public.sections;
DROP POLICY IF EXISTS "Authenticated can delete sections" ON public.sections;

CREATE POLICY "Authenticated can insert sections" ON public.sections FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update sections" ON public.sections FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete sections" ON public.sections FOR DELETE USING (auth.role() = 'authenticated');

-- FEEDBACK (INSERT stays public — visitors submit testimonials)
DROP POLICY IF EXISTS "Public can moderate feedback" ON public.feedback;
DROP POLICY IF EXISTS "Public can delete feedback" ON public.feedback;
DROP POLICY IF EXISTS "Authenticated can moderate feedback" ON public.feedback;
DROP POLICY IF EXISTS "Authenticated can delete feedback" ON public.feedback;

CREATE POLICY "Authenticated can moderate feedback" ON public.feedback FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete feedback" ON public.feedback FOR DELETE USING (auth.role() = 'authenticated');

-- SOCIAL LINKS
DROP POLICY IF EXISTS "Public can manage social_links" ON public.social_links;
DROP POLICY IF EXISTS "Authenticated can manage social_links" ON public.social_links;

CREATE POLICY "Authenticated can manage social_links" ON public.social_links FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- STORAGE: portfolio-assets bucket
DROP POLICY IF EXISTS "Public can upload portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Public can update portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete portfolio assets" ON storage.objects;

CREATE POLICY "Authenticated can upload portfolio assets" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update portfolio assets" ON storage.objects
FOR UPDATE USING (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete portfolio assets" ON storage.objects
FOR DELETE USING (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');

-- SELECT policies are left untouched — they were already scoped to `true`
-- (public read), which is correct and unchanged by this migration.
