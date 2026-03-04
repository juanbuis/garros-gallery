"use client"

export function SupportButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://www.buymeacoffee.com/juan"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-gray-800 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-amber-300"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {/* Text */}
        <span className="relative z-10 text-sm font-medium">Support this project</span>

        {/* Heart pulse */}
        <div className="relative z-10 text-red-500 animate-pulse">❤️</div>
      </a>
    </div>
  )
}
