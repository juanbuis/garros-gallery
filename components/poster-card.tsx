"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Poster } from "@/types/index"
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface PosterCardProps {
  poster: Poster
  allPosters: Poster[]
  currentIndex: number
}

export function PosterCard({ poster, allPosters, currentIndex }: PosterCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const cardRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [expandedImageLoaded, setExpandedImageLoaded] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const activePoster = allPosters[activeIndex]

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
    }

    checkTouchDevice()
    window.addEventListener("resize", checkTouchDevice)

    return () => window.removeEventListener("resize", checkTouchDevice)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  // Reset expanded image loaded state when active poster changes
  useEffect(() => {
    setExpandedImageLoaded(false)
  }, [activeIndex])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isExpanded) return

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : allPosters.length - 1))
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        setActiveIndex((prev) => (prev < allPosters.length - 1 ? prev + 1 : 0))
      } else if (e.key === "Escape") {
        e.preventDefault()
        handleCloseModal()
      }
    },
    [isExpanded, allPosters.length],
  )

  // Prevent body scroll when modal is open and add keyboard listeners
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isExpanded, handleKeyDown])

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setActiveIndex(currentIndex)
    setIsExpanded(true)
  }

  const handleCloseModal = () => {
    setIsExpanded(false)
  }

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  const handlePurchaseClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : allPosters.length - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev < allPosters.length - 1 ? prev + 1 : 0))
  }

  return (
    <>
      <div
        ref={cardRef}
        onClick={handleCardClick}
        className={cn(
          "group relative block w-full overflow-hidden transition-all duration-700 ease-out cursor-pointer hover:scale-[1.02] hover:shadow-lg",
          isVisible && imageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
      >
        <div className="aspect-[3/4] w-full relative">
          <Image
            src={poster.thumbnailUrl || "/placeholder.svg"}
            alt={`Poster for ${poster.title} ${poster.year}`}
            fill
            className="object-cover transition-opacity duration-500"
            style={{ opacity: imageLoaded ? 1 : 0 }}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Hover overlay - hidden on touch devices */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-end p-6 text-center text-white bg-gradient-to-t from-black/70 from-0% via-black/30 via-40% to-transparent to-70% opacity-0 transition-opacity duration-300 ease-in-out",
            isTouchDevice ? "hidden" : "group-hover:opacity-100",
          )}
        >
          <div className="translate-y-4 transform transition-transform duration-300 ease-in-out group-hover:translate-y-0">
            <h3 className="text-xl font-semibold mb-1">{poster.title}</h3>
            <p className="mb-4 text-lg font-light">{poster.year}</p>
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="bg-white text-black hover:bg-gray-100"
              onClick={handlePurchaseClick}
            >
              <Link href={poster.purchaseUrl} target="_blank" rel="noopener noreferrer">
                Buy on eBay
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="text-xs text-white/70 mt-2">Your purchase helps support this site.</p>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-in fade-in-0 duration-300"
          onClick={handleModalClick}
        >
          {/* Close button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 flex items-center justify-center backdrop-blur-sm"
            aria-label="Close expanded view"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 flex items-center justify-center backdrop-blur-sm"
            aria-label="Previous poster"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 flex items-center justify-center backdrop-blur-sm"
            aria-label="Next poster"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Expanded poster container - responsive layout */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col lg:flex-row animate-in zoom-in-95 duration-500">
            {/* Image container - takes most of the space */}
            <div className="relative flex-1">
              <Image
                src={activePoster.imageUrl || "/placeholder.svg"}
                alt={`Poster for ${activePoster.title} ${activePoster.year}`}
                fill
                className="object-contain transition-opacity duration-500"
                style={{ opacity: expandedImageLoaded ? 1 : 0 }}
                sizes="(max-width: 1024px) 100vw, 80vw"
                quality={100}
                priority
                onLoad={() => setExpandedImageLoaded(true)}
              />
            </div>

            {/* Metadata panel - responsive positioning */}
            <div className="flex flex-col justify-end w-full max-w-sm mx-auto lg:w-80 lg:mx-0 p-4 lg:p-6">
              <div className="bg-black/90 backdrop-blur-sm rounded-lg p-4 lg:p-6 text-white shadow-lg border border-white/10">
                <h2 className="text-xl lg:text-2xl font-bold mb-1 lg:mb-2">{activePoster.title}</h2>
                <p className="text-lg lg:text-xl opacity-90 mb-4 lg:mb-6">{activePoster.year}</p>
                <Button
                  asChild
                  variant="secondary"
                  size="default"
                  className="bg-white text-black hover:bg-gray-100 w-full"
                  onClick={handlePurchaseClick}
                >
                  <Link href={activePoster.purchaseUrl} target="_blank" rel="noopener noreferrer">
                    Buy on eBay
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-xs text-white/60 mt-2 text-center">Your purchase helps support this site.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
