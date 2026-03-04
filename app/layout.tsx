import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { SupportButton } from "@/components/support-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Art of Roland-Garros",
  description:
    "Explore the complete collection of iconic Roland-Garros tournament posters from 1980 to 2025. Discover decades of artistic expression from renowned artists commissioned for the French Open tennis championship.",
  keywords: [
    "Roland-Garros",
    "French Open",
    "tennis posters",
    "tournament art",
    "tennis artwork",
    "Roland Garros posters",
    "French Open art",
    "tennis history",
    "sports art",
    "poster collection",
  ],
  authors: [{ name: "Juan Buis", url: "https://juanbuis.com" }],
  creator: "Juan Buis",
  openGraph: {
    title: "The Art of Roland-Garros",
    description:
      "Explore the complete collection of iconic Roland-Garros tournament posters from 1980 to 2025. Discover decades of artistic expression from renowned artists.",
    type: "website",
    locale: "en_US",
    siteName: "The Art of Roland-Garros",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Art of Roland-Garros",
    description: "Explore the complete collection of iconic Roland-Garros tournament posters from 1980 to 2025.",
    creator: "@juanbuis",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-actual-google-verification-code-here",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
          <SupportButton />
        </Suspense>
      </body>
    </html>
  )
}
