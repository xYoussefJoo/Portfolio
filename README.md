# ✦ Youssef Gamal Portfolio | Full-Stack .NET & Frontend Developer ✦

A premium, highly interactive personal portfolio built using **React Router v8 (Remix framework core)**, **Vite**, **TypeScript**, and **Tailwind CSS v4**. This project showcases high-fidelity interactive sections, smooth scroll entry reveals, custom stats, client-focused project listings, and clean responsive interfaces.

---

## 🛠️ Tech Stack & Key Technologies

| Category | Technologies / Libraries |
| :--- | :--- |
| **Framework & Engine** | React 19, React Router v8 (Single Page App / Server-Render ready), Vite v8 |
| **Styling & Layout** | Tailwind CSS v4 (with `@tailwindcss/vite` configuration), Lucide React Icons |
| **Languages** | TypeScript, C#, HTML5, CSS3, ESNext JavaScript |
| **Architecture Focus** | Clean Architecture backend models (ASP.NET Core references), client-side state, modern React hooks |
| **Hosting & Deploy** | Docker, Vercel, IIS, AWS/Azure |

---

## ✨ Features

- 🚀 **Modern Unified Router**: Powered by React Router v8 for server-side loading speed and HMR development flexibility.
- 🎨 **Tailwind CSS v4 Styling**: Built using the latest Tailwind CSS v4 featuring native CSS variables, modular layout structures, and high-fidelity animations.
- 🪄 **ScrollReveal System**: Customized component wrapper using React hooks and the Intersection Observer API for fluid fade-ins, slide-ins, and scales.
- 💼 **Curated Projects Showcase**: Interactive category filters allowing visitors to sort between Frontend/Next.js, Backend/Web APIs, and Full Stack applications (e.g. CraftIQ Systems, Fuel Management System, Manufacturing Execution System).
- 📅 **Interactive Timeline**: Highlights professional full-stack development, remote integrations, and education milestones at Assiut International Technological University (AITU).
- ✉️ **Interactive Contact Form**: A styled client contact form equipped with user validation and dynamic states.
- 🐳 **Docker Integration**: Includes a production-ready `Dockerfile` and `.dockerignore` for immediate container deployments.

---

## 📁 Repository Structure

```
D:/New_Desktop/portfillo/
├── app/                      # Main application source
│   ├── components/           # Modular React components
│   │   ├── About.tsx         # Detailed Bio & Core Skills grid
│   │   ├── Contact.tsx       # Contact form logic & details
│   │   ├── Experience.tsx    # Experience and Education timeline
│   │   ├── Footer.tsx        # Footer block with social links
│   │   ├── Hero.tsx          # Eye-catching splash header with animations
│   │   ├── Navbar.tsx        # Floating glassmorphic navigation menu
│   │   ├── Projects.tsx      # Curated creations with tag-based filtering
│   │   └── ScrollReveal.tsx  # Custom animation reveal helper
│   ├── routes/               # Route components directory
│   │   └── home.tsx          # Main entry route importing components
│   ├── app.css               # Global custom CSS rules
│   ├── root.tsx              # Main layout template, metadata, and fonts
│   └── routes.ts             # React Router routing configuration
├── public/                   # Static assets (images, logos, icons)
├── package.json              # Project manifests & script listings
├── tsconfig.json             # TypeScript rules configuration
├── vite.config.ts            # Vite server & bundler configuration
└── react-router.config.ts    # React Router runtime setup
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (version 20 or higher) and npm installed.

### Installation
Clone the repository and install all dependencies:
```bash
git clone <your-repo-url>
cd portfillo
npm install
```

### Run Locally
To run the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Build for Production
To build a highly optimized bundle for client-side assets and server-side files:
```bash
npm run build
```
The output will compile to the `build/` directory:
- `build/client/` contains static CSS, JavaScript, images, and public assets.
- `build/server/` contains Node.js server scripts for server rendering.

### Production Execution
To start the production server:
```bash
npm run start
```

---

## 🐳 Docker Deployment

To package the portfolio within a container:

1. **Build the Docker image**:
   ```bash
   docker build -t youssef-portfolio .
   ```

2. **Start the container on port 3000**:
   ```bash
   docker run -p 3000:3000 youssef-portfolio
   ```

---

## 💅 Styling and Extensions

This portfolio is styled using **Tailwind CSS v4**. 
The configuration is integrated directly with the Vite compiler using `@tailwindcss/vite` in [vite.config.ts](file:///D:/New_Desktop/portfillo/vite.config.ts):

```typescript
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
```

To modify global colors, font weights, or custom animations, edit [app/app.css](file:///D:/New_Desktop/portfillo/app/app.css).

---

## 👨‍💻 Developer Bio

**Youssef Gamal** is a dedicated full-stack engineer and a Computer Science undergraduate at Assiut International Technological University (AITU). With 2+ years of freelancing experience, delivering premium products with high client satisfaction. He specializes in designing ASP.NET Core web services, relational database schemas, and smooth client-facing SPAs.

For inquiries, collaborations, or custom projects, navigate to the **Contact Section** on the web interface or email directly.
