import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Snake Arena", description: "A playful arcade Snake game by Emma Da Silva" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
