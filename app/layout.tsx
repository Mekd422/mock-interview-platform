import type { Metadata } from "next";
import { Mona_Sans, Mona_Sans } from "next/font/google";
import "./globals.css";

const Mona_Sans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prep",
  description: "An AI powered mock interview platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${Mona_Sans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
