import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { LanguageProvider } from "./context/LanguageContext";
import { PortfolioDataProvider } from "./context/PortfolioDataContext";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "dns-prefetch", href: "https://images.unsplash.com" },
  { rel: "preconnect", href: "https://images.unsplash.com", crossOrigin: "anonymous" },
  {
    rel: "preload",
    as: "image",
    href: "/img/Keso3DLogo-640.jpeg", // the hero image actually shown above the fold
    fetchPriority: "high",
  } as { rel: string; as: string; href: string; fetchPriority: string },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050816" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#e7e9ee" media="(prefers-color-scheme: light)" />
        <meta name="color-scheme" content="dark light" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  if (storedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                  const storedLang = localStorage.getItem('language');
                  if (storedLang) {
                    document.documentElement.lang = storedLang;
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        <LanguageProvider>
          <PortfolioDataProvider>
            {children}
          </PortfolioDataProvider>
        </LanguageProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
