import type { Metadata } from "next";
import { Bodoni_Moda, Literata, Fragment_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Literata({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.edition}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.edition}`,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className={`${body.className} min-h-screen bg-sand-50 text-ink antialiased`}>
        <SmoothScroll>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
