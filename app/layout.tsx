import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import FaviconHandler from "@/components/FaviconHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blink Creative Studio | Digital Photo Portal",
  description:
    "A convenient digital photo portal by Blink Creative Studio, designed for clients to access their studio photos anytime, anywhere—with ease and security.",
  // icons: {
  //   icon: "/blinklogored.png",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/blinklogored.png?" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FaviconHandler />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
