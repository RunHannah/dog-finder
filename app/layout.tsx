import type { Metadata } from "next";
import { Geist, Geist_Mono, Mystery_Quest } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mysteryQuest = Mystery_Quest({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mystery-quest",
});

export const metadata: Metadata = {
  title: "Dog Finder",
  description: "An app to find dogs available for adoption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mysteryQuest.variable} antialiased bg-purple-50 min-h-screen`}
      >
        <Header />
        <main>
          <FavoritesProvider>{children}</FavoritesProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
