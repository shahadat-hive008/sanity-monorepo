import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Sanity Monorepo",
  description: "Next.js frontend for the Simple Sanity monorepo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased bg-white h-screen text-black w-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
