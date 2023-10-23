import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/header/Navbar";

import { getServerSession } from "next-auth";
import SessionProvider from "@/components/auth/SessionProvider";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import DevTools from "@/providers/DevTools";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Writz",
  description: "Blog website for software developers",
  icons: {
    icon: ["/writz.ico?v=4"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}`}>
        <QueryProvider>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              {children}
            </ThemeProvider>
          </SessionProvider>
          <DevTools />
        </QueryProvider>
      </body>
    </html>
  );
}
