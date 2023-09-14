import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { fontMono, fontSans } from "@/lib/fonts";
import { SiteHeader } from "@/components/layouts/site-header";
import { getAuthSession } from "@/lib/auth";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import Providers from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rate My Interview",
  description: "A Website where you can rate your interviews.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable,
              fontMono.variable
            )}
          >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            
            <Providers>{children}</Providers>
            <TailwindIndicator />
          </ThemeProvider>
      </body>
    </html>
  );
}
