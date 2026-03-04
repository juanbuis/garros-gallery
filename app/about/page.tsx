import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - The Art of Roland-Garros",
  description:
    "Learn about the artistic legacy of Roland-Garros and the story behind this comprehensive poster gallery showcasing decades of French Open tournament art.",
}

export default function AboutPage() {
  return (
    <div className="bg-[#F8F7F4] min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-gray-800 mb-8">About</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Roland-Garros, the French Open, has a long and storied relationship with art. Each year, the tournament
              commissions an artist to create a poster that captures its spirit.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Last year, my{" "}
              <a
                href="https://x.com/juanbuis/status/1802707976182022441"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 underline"
              >
                tweet
              </a>{" "}
              went viral, and I loved seeing how excited everyone was about them.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Because there still wasn't one place to enjoy the posters in high quality, I built this gallery. It brings
              the full artistic legacy of Roland-Garros together, letting tennis fans and art lovers browse decades of
              creative history in one spot.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              This website was created by{" "}
              <a
                href="https://juanbuis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 underline"
              >
                Juan Buis
              </a>
              . For inquiries, please{" "}
              <a href="mailto:yo@juanbuis.com" className="text-gray-700 hover:text-gray-900 underline">
                send a message
              </a>
              .
            </p>
            <p className="text-sm text-gray-500 mt-8">
              All posters are the copyright of their respective artists and the Fédération Française de Tennis. This
              site is an independent fan gallery and is not affiliated with Roland-Garros or the Fédération Française de
              Tennis.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
