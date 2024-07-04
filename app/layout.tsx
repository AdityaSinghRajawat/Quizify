import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/Providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizler",
  description: "Quizler simplifies the process of creating, managing, and sharing quizzes. Our user-friendly interface and customizable templates make quiz creation effortless. Ideal for educators, trainers, and quiz enthusiasts, Quizify offers a seamless experience to craft engaging and interactive quizzes. Join us and transform the way you create quizzes today!",
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </head>
      <Provider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </Provider>
    </html>
  );
}
