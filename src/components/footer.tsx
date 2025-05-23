"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"

interface ParticleProps {
  delay?: number
  size?: number
  x: number
  y: number
  duration?: number
}

const Particle = ({ delay = 0, size = 8, x, y, duration = 15 }: ParticleProps) => {
  const randomX = Math.random() * 100 - 50
  const randomY = Math.random() * -100 - 50

  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-[#4d9d74]/20 to-[#3a8a64]/30 backdrop-blur-sm"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        boxShadow: "0 0 10px rgba(77, 157, 116, 0.3)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        y: [0, randomY],
        x: [0, randomX],
        scale: [0, 1, 0.8, 0],
        opacity: [0, 0.7, 0.5, 0],
        rotate: [0, Math.random() * 360],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  )
}

interface FloatingBubbleProps {
  delay?: number
  size: number
  x: number
  duration?: number
  blur?: number
}

const FloatingBubble = ({ delay = 0, size, x, duration = 20, blur = 40 }: FloatingBubbleProps) => {
  return (
    <motion.div
      className="absolute rounded-full bg-[#4d9d74]/20"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "-20%",
        filter: `blur(${blur}px)`,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -150],
        opacity: [0, 0.4, 0],
        scale: [1, 1.2, 0.8],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  )
}

const WaveEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-[#4d9d74]/10 via-[#3a8a64]/20 to-[#4d9d74]/10"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
        }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export default function Footer() {
  const [animateIn, setAnimateIn] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    setAnimateIn(true)

    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const bubbles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 10,
    size: Math.random() * 150 + 50,
    x: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    blur: Math.random() * 40 + 20,
  }))

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 5,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
  }))

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-l from-[#0a1a0f] to-[#0a1a0f] via-10% via-[#0f2e1a] border-t border-[#4d9d74]/20 h-20" // Reduzida a altura para h-20 (80px)
    >
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>

      <WaveEffect />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => (
          <FloatingBubble
            key={bubble.id}
            delay={bubble.delay}
            size={bubble.size}
            x={bubble.x}
            duration={bubble.duration}
            blur={bubble.blur}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            delay={particle.delay}
            size={particle.size}
            x={particle.x}
            y={particle.y}
            duration={particle.duration}
          />
        ))}
      </div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#4d9d74]/10 filter blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <div className="container relative z-10 mx-auto h-full flex items-center justify-center">
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: animateIn ? 0 : 5, opacity: animateIn ? 1 : 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="flex items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-[#4d9d74]/30 filter blur-md"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <Image
              className="w-16 transition-all duration-300 hover:brightness-110 relative z-10"
              src="/logo.png"
              width={64}
              height={64}
              alt="SPA Logo"
              priority
            />
          </motion.div>

          <motion.div
            animate={{
              height: [20, 30, 20],
              background: [
                "linear-gradient(to bottom, rgba(77, 157, 116, 0.8), rgba(77, 157, 116, 0.3))",
                "linear-gradient(to bottom, rgba(58, 138, 100, 0.8), rgba(58, 138, 100, 0.3))",
                "linear-gradient(to bottom, rgba(77, 157, 116, 0.8), rgba(77, 157, 116, 0.3))",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="w-px h-10 bg-gradient-to-b from-[#4d9d74]/80 to-[#3a8a64]/30"
          />

          <motion.p
            className="text-center text-sm sm:text-base code-bold" // Reduzi o tamanho da fonte
            animate={{
              color: ["rgba(255, 255, 255, 0.8)", "rgba(180, 254, 210, 0.9)", "rgba(255, 255, 255, 0.8)"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            Sistema de Prontuário Ágil
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
