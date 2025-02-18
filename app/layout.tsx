import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SkillSets",
  description:
    "Discover the most wanted skills by recruiters. Browse skills required for your job position.",
  keywords: "skillsets, skills, job, position, recruiters, most wanted skills",
  openGraph: {
    title: "SkillSets",
    description:
      "Discover the most wanted skills by recruiters. Browse skills required for your job position.",
    url: "https://skillsets.tech",
    siteName: "SkillSets",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.svg" sizes="any" />
        <Script
          src="https://unpkg.com/@tailwindcss/browser@4"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
