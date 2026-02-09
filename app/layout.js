import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Will you be my Valentine? 💕",
  description: "A special interactive Valentine's Day website for my amazing girlfriend",
  keywords: ["Valentine", "love", "romantic", "surprise", "prank", "girlfriend"],
  authors: [{ name: "Salah Eddine Berredjem" }],
  openGraph: {
    title: "Will You Be My Valentine? 💘",
    description: "A special Valentine's Day surprise with a playful twist",
    type: "website",
    images: [
      {
        url: "/valentine-og.jpg",
        width: 1200,
        height: 630,
        alt: "Valentine's Day Surprise",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
