import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import Header from "@/components/header";

const font = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assignment Tracker",
  description:
    "A simple web app designed to help students keep track of their assignments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className + " flex flex-col h-screen"}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Header />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
