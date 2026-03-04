import { PosterCard } from "./poster-card"
import type { Poster } from "@/types/index"

interface PosterGalleryProps {
  posters: Poster[]
}

export function PosterGallery({ posters }: PosterGalleryProps) {
  if (!posters || posters.length === 0) {
    return <p className="text-center text-gray-500">No posters to display.</p>
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
      {posters.map((poster, index) => (
        <PosterCard key={poster.id} poster={poster} allPosters={posters} currentIndex={index} />
      ))}
    </div>
  )
}
