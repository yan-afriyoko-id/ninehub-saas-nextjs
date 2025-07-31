import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Analytics Pro - Transform Your Business With Smart Analytics",
  description: "Unlock the power of data-driven decisions with our advanced analytics platform. Get insights that drive growth and optimize your operations with AI-powered analytics.",
  keywords: "analytics, business intelligence, data analytics, AI analytics, dashboard, reporting, business insights, data visualization",
  authors: [{ name: "Analytics Pro" }],
  creator: "Analytics Pro",
  publisher: "Analytics Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://analyticspro.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Analytics Pro - Transform Your Business With Smart Analytics",
    description: "Unlock the power of data-driven decisions with our advanced analytics platform. Get insights that drive growth and optimize your operations with AI-powered analytics.",
    url: "https://analyticspro.com",
    siteName: "Analytics Pro",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Analytics Pro - Smart Analytics Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytics Pro - Transform Your Business With Smart Analytics",
    description: "Unlock the power of data-driven decisions with our advanced analytics platform. Get insights that drive growth and optimize your operations with AI-powered analytics.",
    images: ["/og-image.jpg"],
    creator: "@analyticspro",
    site: "@analyticspro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Analytics Pro" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
