import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "./providers";
import "./globals.css";
import { cn } from "@/lib/utils"
 
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "flex justify-center min-h-screen bg-background font-sans antialiased",
          fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
