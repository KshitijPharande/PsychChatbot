import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Haven | Compassionate Mental Health Chatbot",
  description: "A safe, private space to vent, talk through your feelings, and find support.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="h-[100dvh] flex flex-col bg-slate-950 text-slate-100 font-sans overflow-hidden">
        <Navbar />
        <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
