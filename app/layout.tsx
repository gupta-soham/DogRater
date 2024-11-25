import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://dog-rater.vercel.app"),
  title: {
    default: "Rate My Dog",
    template: `%s | Rate My Dog`,
  },
  description: "Rate dogs and chat with others like cynophilists",
  openGraph: {
    title: "Rate My Dog",
    description: "Rate dogs and chat with others like cynophilists",
    images: ["/og.png"],
    url: "https://dog-rater.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rate My Dog",
    description: "Rate dogs and chat with others like cynophilists",
    creator: "@sohamgpt",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Toaster richColors />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
