import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RouteChangeHandler } from "@/components/route-change-handler";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import "@/styles/globals.css";

export const metadata: Metadata = generateSiteMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div
          id="focus-reset-target"
          tabIndex={-1}
          style={{ outline: "none" }}
        />
        <RouteChangeHandler />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
