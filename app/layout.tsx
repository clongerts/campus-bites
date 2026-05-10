import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = localFont({
  src: [
    {
      path: "../public/fonts/Nunito-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Nunito-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nunito",
});

const manis = localFont({
  src: [
    {
      path: "../public/fonts/HeaderFont.ttf", // Added /fonts/ here
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-manis",
});

// 3. Metadata Configuration
export const metadata: Metadata = {
  title: "Campus Bites",
  description: "The best food guide for Ateneans",
  icons: {
    icon: "/images/logo_campusbites.png",
  },
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
};

// 4. Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}