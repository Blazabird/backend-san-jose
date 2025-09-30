// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google"; // <-- agregamos Poppins
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

// Importación de Poppins con pesos 400 y 700
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}>
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
