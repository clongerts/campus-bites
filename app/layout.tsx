import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAFAFA] text-gray-900 antialiased`}>
        {/* This ensures your 200+ lines of code in page.tsx actually render */}
        {children}
      </body>
    </html>
  );
}