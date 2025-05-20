"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import type { StackProps } from "@/types/stacks"

export default function CardStack({ name, type, description, url }: StackProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [randomDelay, setRandomDelay] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [iconLoaded, setIconLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setRandomDelay(Math.random() * 0.5)

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const currentElement = document.getElementById(`stack-card-${name?.replace(/\s+/g, "-").toLowerCase()}`)
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [name])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const getIconName = () => {
    const iconMap: Record<string, string> = {
      "Next.js": "logos:nextjs-icon",
      React: "logos:react",
      TypeScript: "logos:typescript-icon",
      "Node.js": "logos:nodejs-icon",
      PostgreSQL: "logos:postgresql",
      Python: "logos:python",
    }

    return iconMap[name] || "carbon:application"
  }

  return (
    <div
      id={`stack-card-${name?.replace(/\s+/g, "-").toLowerCase()}`}
      ref={cardRef}
      className={`group relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${randomDelay}s` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <Link href={url} target="_blank" className="block">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-green-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-300 animate-pulse-slow"></div>

        {isHovering && (
          <div
            className="absolute inset-0 opacity-30 rounded-xl overflow-hidden pointer-events-none z-10"
            aria-hidden="true"
          >
            <div
              className="absolute w-40 h-40 bg-white/30 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2 mix-blend-overlay"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
                transition: "opacity 0.2s",
              }}
            ></div>
          </div>
        )}

        <div
          className="relative flex flex-col h-full bg-gradient-to-b from-[#1a0b2e]/90 to-black/90 rounded-xl border border-purple-500/20 group-hover:border-green-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 backdrop-blur-md overflow-hidden transform transition-transform group-hover:scale-[1.02]"
          style={{
            transform: isHovering
              ? `perspective(1000px) rotateX(${(mousePosition.y / 300 - 0.5) * 5}deg) rotateY(${(mousePosition.x / 300 - 0.5) * -5}deg)`
              : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                  animation: `floatParticle ${Math.random() * 6 + 4}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-900/80 to-purple-800/60 px-4 py-3 border-b border-purple-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-purple-700/40 p-1.5 rounded-full mr-2 shadow-inner shadow-purple-500/20 group-hover:bg-purple-600/50 transition-all duration-300">
                  <Icon
                    icon="carbon:code"
                    className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors duration-300"
                  />
                </div>
                <h2 className="text-lg font-bold text-white code-bold truncate max-w-[180px] sm:max-w-none group-hover:text-purple-200 transition-colors duration-300">
                  {type}
                </h2>
              </div>
              <div className="bg-purple-800/60 p-1.5 rounded-full border border-purple-600/30 shadow-md group-hover:bg-purple-700/70 group-hover:border-green-500/30 transition-all duration-300">
                <Icon
                  icon="carbon:launch"
                  className="text-purple-300 w-4 h-4 group-hover:text-purple-200 transition-colors duration-300"
                />
              </div>
            </div>
          </div>

          <div className="p-5 flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-xl border border-purple-700/30 mr-3 group-hover:scale-110 transition-all duration-300 relative overflow-hidden group-hover:border-green-500/30 group-hover:from-purple-800/60 group-hover:to-purple-700/40">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon icon={getIconName()} className="w-8 h-8" onLoad={() => setIconLoaded(true)} />
                </div>
                {!iconLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-purple-900/50">
                    <div className="w-5 h-5 border-2 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-300 code-bold group-hover:text-purple-200 transition-colors duration-300">
                  {name}
                </h3>
              </div>
            </div>

            <div className="mt-1 flex-grow">
              <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-purple-700/30 flex justify-between items-center">
              <div className="text-xs text-purple-400 font-medium group-hover:text-green-400 transition-colors duration-300">
                Saiba mais
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-700 to-purple-500 flex items-center justify-center shadow-md shadow-purple-900/30 group-hover:shadow-purple-700/50 group-hover:from-purple-600 group-hover:to-green-500 transition-all duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-white transform transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
