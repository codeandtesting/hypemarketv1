import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HYPEMARKET",
  description: "Graphic Brutalist Trader Betting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white selection:bg-[#D4FF00] selection:text-black`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
