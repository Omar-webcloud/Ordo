import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ordo — Task Management API",
  description:
    "A production-style REST API for team task management, inspired by Trello and Linear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}