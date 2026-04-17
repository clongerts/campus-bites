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
  title: "Campus Bites",
  description: "The best food guide for Ateneans",
  openGraph: {
    title: "Campus Bites",
    description: "The best food guide for Ateneans",
    url: "https://campus-bites-admu.vercel.app",
    siteName: "Campus Bites",
    images: [
      {
        url: "/images/banner.png", 
        width: 1200,
        height: 630,
        alt: "Campus Bites Banner",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus Bites",
    description: "The best food guide for Ateneans",
    images: ["/images/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}