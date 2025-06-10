// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ResponsiveAppBar from "../../components/Layout/navbar/navbar";
import Footer from "../../components/Layout/footer/footer";
import "./globals.css";
import TransitionLayout from "../../components/Layout/transition/transitionLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Colegio San Jose",
  description: "Sitio web Colegio San Jose",
  icons: {
    icon: "/logo.png", 
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-100">
        <ResponsiveAppBar />
        <main>
          <TransitionLayout>
          {children}
          </TransitionLayout>
          </main>
        <Footer />
      </body>
    </html>
  );
}
