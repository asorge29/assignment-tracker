import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Poppins, Inter, Kalam, Lora, Orelega_One, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import Header from "@/components/header";
import React from "react";

const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-poppins" });
const inter = Inter({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-inter" });
const kalam = Kalam({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-kalam" });
const lora = Lora({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-lora" });
const orelegaOne = Orelega_One({ weight: ["400"], subsets: ["latin"], variable: "--font-orelega" });
const bebasNeue = Bebas_Neue({ weight: ["400"], subsets: ["latin"], variable: "--font-bebas" });
const jetBrainsMono = JetBrains_Mono({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Assignment Tracker",
  description: "A simple web app designed to help students keep track of their assignments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} ${kalam.variable} ${lora.variable} ${orelegaOne.variable} ${bebasNeue.variable} ${jetBrainsMono.variable} flex flex-col h-screen dark:bg-background`}>
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
