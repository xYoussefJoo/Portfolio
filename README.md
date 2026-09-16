# ✦ Kero Amir Portfolio | Senior Graphic Designer & Visual Artist ✦

A premium, highly interactive portfolio for **Kero Amir**, a Senior Graphic Designer & Visual Artist with 3+ years of experience and 200+ completed projects across the US, Germany, France, and Egypt. Built with **React Router v8**, **Vite**, **TypeScript**, **Tailwind CSS v4**, and a **Supabase**-backed admin dashboard for managing projects, feedback, and content live.

---

## 🛠️ Tech Stack & Key Technologies

| Category | Technologies / Libraries |
| :--- | :--- |
| **Framework & Engine** | React 19, React Router v8, Vite v8 |
| **Styling & Layout** | Tailwind CSS v4 (via `@tailwindcss/vite`), Lucide React Icons, Framer Motion |
| **Backend & Data** | Supabase (Postgres, Auth, Storage, Realtime) |
| **Languages** | TypeScript, ESNext JavaScript |
| **Hosting & Deploy** | Docker, Vercel, IIS, AWS/Azure |

---

## ✨ Features

- 🚀 **Modern Unified Router**: React Router v8 with server rendering and code-split, lazy-loaded sections for fast initial load.
- 🎨 **Tailwind CSS v4 Styling**: Native CSS variables, glassmorphic UI, and high-fidelity scroll animations.
- 🌐 **Bilingual (EN/DE)**: Full English/German content switching via `LanguageContext`.
- 🖼️ **Curated Projects Showcase**: Branding, packaging, advertising, and editorial work with category filters and 3D hover effects.
- ✉️ **Client Testimonials**: Visitors can submit feedback directly from the site; approved reviews appear in the Testimonials section.
- 🔐 **Admin Dashboard**: Supabase Auth–protected panel (`/dashboard`) to manage projects, moderate feedback, edit page content, and update social links — with live Realtime sync across sessions.
- 🐳 **Docker Integration**: Production-ready `Dockerfile` and `.dockerignore` for immediate container deployments.

---

## 📁 Repository Structure

```
Portfolio/
├── app/                          # Main application source
│   ├── components/               # Public-facing React components
│   │   ├── dashboard/            # Admin dashboard components
│   │   ├── About.tsx / Hero.tsx / Projects.tsx / Testimonials.tsx / Contact.tsx / ...
│   ├── context/                  # LanguageContext & PortfolioDataContext (Supabase data + auth)
│   ├── i18n/                     # EN/DE translation strings
│   ├── routes/                   # home.tsx (public site), dashboard.tsx (admin)
│   ├── utils/                    # Supabase client (browser + server)
│   ├── app.css                   # Global custom CSS rules
│   ├── root.tsx                  # Main layout template, metadata, and fonts
│   └── routes.ts                 # React Router routing configuration
├── supabase/
│   ├── schema.sql                # Full DB schema, RLS policies, seed data
│   └── fix_rls_policies.sql      # Standalone RLS-lockdown migration
├── public/                       # Static assets (images, icons)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── react-router.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
Node.js 20+ and npm, plus a [Supabase](https://supabase.com) project.

### Installation
```bash
git clone https://github.com/xYoussefJoo/Portfolio.git
cd Portfolio
npm install
```

### Environment Variables
Copy `.env.example` to `.env` and fill in your Supabase project values:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
```

### Database Setup
Run `supabase/schema.sql` once in your Supabase project's **SQL Editor** to create all tables, RLS policies, realtime publications, storage bucket, and seed data. (Already have an older setup? Run `supabase/fix_rls_policies.sql` instead to lock down write access to admin-only without touching your data.)

### Run Locally
```bash
npm run dev
```
Open `http://localhost:5173`. The admin dashboard is at `/dashboard` — sign in with a user created in your Supabase project's Auth panel.

### Build for Production
```bash
npm run build
```
- `build/client/` — static assets for the client
- `build/server/` — Node.js server for SSR

### Production Execution
```bash
npm run start
```

---

## 🐳 Docker Deployment

```bash
docker build -t kero-amir-portfolio .
docker run -p 3000:3000 kero-amir-portfolio
```

---

## 💅 Styling

Styled with **Tailwind CSS v4**, integrated directly with Vite via `@tailwindcss/vite` in [vite.config.ts](vite.config.ts). To modify global colors, font weights, or custom animations, edit [app/app.css](app/app.css).

---

## 👨‍🎨 About

**Kero Amir** is a Senior Graphic Designer & Visual Artist specializing in brand identity, packaging, advertising, and editorial design, with master-level expertise across the Adobe Creative Cloud suite. For inquiries or collaborations, use the Contact section on the live site or email `keroamir.design@gmail.com`.
