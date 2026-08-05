import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={title:"RELICBOUND — Awakening of the Guardian",description:"Awaken an ancient guardian. Recover the four relics. Restore a fractured world."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
