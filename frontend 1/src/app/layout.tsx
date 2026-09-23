import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "DentFlow — A better flow for your clinic",
  description: "A calmer day starts with DentFlow. A thoughtfully designed dental workspace for patients, appointments, chairs, and everything in between.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><a href="#main-content" className="skip-link">Skip to workspace</a>{children}</body></html>;
}
