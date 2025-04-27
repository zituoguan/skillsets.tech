import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "硬技能",
  description:
    "发现招聘者最需要的技能。浏览你职位所需的技能。",
  keywords: "硬技能, 技能, 工作, 职位, 招聘者, 最需要的技能",
  openGraph: {
    title: "硬技能",
    description:
      "发现招聘者最需要的技能。浏览你职位所需的技能。",
    url: "https://yingjineng.com",
    siteName: "硬技能",
    images: [
      {
        url: "https://yingjineng.com/assets/images/skillsets.jpg",
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
    <html lang="zh">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.svg" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-562CWBQ2');`,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HPGDHZTLKZ"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HPGDHZTLKZ');
            `,
          }}
        />
        <Script
          src="https://unpkg.com/@tailwindcss/browser@4"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-562CWBQ2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Navbar />
        {children}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          defer
          data-cf-beacon='{"token": "4dd047ecbe1c4e9891cde5fee9f8d1fb"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
