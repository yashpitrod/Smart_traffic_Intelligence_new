import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import ClientLayout from "../components/ClientLayout";
import { DATA } from "@/components/constants";

// Font for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Font for body/code
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NEO // SYSTEM",
    template: "%s // NEO",
  },
  description: "Autonomous Agentic Infrastructure",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} font-display bg-neo-bg text-neo-text`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
