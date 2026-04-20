import Providers from "@/shared/context/global/providers";
import { cn } from "@/shared/lib/utils/utils";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exam App",
  description: "Exam App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        geistMono.variable,
        geistMono.className,
        inter.variable,
      )}
    >
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
