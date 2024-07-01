import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/Providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizler",
  description: "Quizler simplifies the process of creating, managing, and sharing quizzes. Our user-friendly interface and customizable templates make quiz creation effortless. Ideal for educators, trainers, and quiz enthusiasts, Quizify offers a seamless experience to craft engaging and interactive quizzes. Join us and transform the way you create quizzes today!",
  icons: '/fav.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fav.png" />
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
