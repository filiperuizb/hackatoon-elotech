"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
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
      className="absolute rounded-full bg-gradient-to-br from-purple-400/10 to-purple-600/20 backdrop-blur-sm"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        boxShadow: "0 0 10px rgba(139, 92, 246, 0.3)",
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

const FloatingBubble = ({ delay = 0, size, x, duration = 20, blur = 80 }: FloatingBubbleProps) => {
  return (
    <motion.div
      className={`absolute rounded-full bg-purple-500/10`}
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
        opacity: [0, 0.3, 0],
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
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-purple-900/5 via-purple-600/10 to-purple-900/5"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
        }}
        animate={{
          y: [0, -10, 0],
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

interface GridLineProps {
  vertical?: boolean
  position?: number
  delay?: number
  duration?: number
}

const GridLine = ({ vertical = false, position = 50, delay = 0, duration = 8 }: GridLineProps) => {
  return (
    <motion.div
      className={`absolute ${vertical ? "w-px h-full" : "h-px w-full"} bg-gradient-to-r from-transparent via-purple-500/10 to-transparent`}
      style={{
        [vertical ? "left" : "top"]: `${position}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.5, 0],
        [vertical ? "scaleY" : "scaleX"]: [0.5, 1, 0.5],
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

export default function Rodape() {
  const [animateIn, setAnimateIn] = useState(false)
  const currentYear = new Date().getFullYear()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    setAnimateIn(true)

    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 5,
    size: Math.random() * 6 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
  }))

  const bubbles = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 10,
    size: Math.random() * 150 + 50,
    x: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    blur: Math.random() * 50 + 50,
  }))

  const gridLines = [
    { id: 1, vertical: true, position: 25, delay: 1, duration: 12 },
    { id: 2, vertical: true, position: 75, delay: 3, duration: 15 },
    { id: 3, vertical: false, position: 30, delay: 2, duration: 10 },
    { id: 4, vertical: false, position: 70, delay: 4, duration: 14 },
  ]

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-l from-[#0e0015] to-[#0e0015] via-10% via-[#1a0b2e] border-t border-purple-900/20"
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

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {gridLines.map((line) => (
          <GridLine
            key={line.id}
            vertical={line.vertical}
            position={line.position}
            delay={line.delay}
            duration={line.duration}
          />
        ))}
      </div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-600/5 filter blur-3xl"
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

      <div className="container relative z-10 mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: animateIn ? 0 : 20, opacity: animateIn ? 1 : 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="flex flex-col md:flex-row items-center justify-center w-full gap-4"
          >
            <div className="flex items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-purple-500/20 filter blur-md"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <Image
                  className="w-20 sm:w-24 transition-all duration-300 hover:brightness-110 relative z-10"
                  src={"/images/svg/logo/workintech/logo.svg"}
                  width={1000}
                  height={1000}
                  alt="WorkinTech Logo"
                  priority
                />
              </motion.div>

              <motion.div
                animate={{
                  height: [20, 30, 20],
                  background: [
                    "linear-gradient(to bottom, rgba(139, 92, 246, 0.8), rgba(139, 92, 246, 0.3))",
                    "linear-gradient(to bottom, rgba(168, 85, 247, 0.8), rgba(168, 85, 247, 0.3))",
                    "linear-gradient(to bottom, rgba(139, 92, 246, 0.8), rgba(139, 92, 246, 0.3))",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="w-px h-8 bg-gradient-to-b from-purple-500/80 to-purple-700/30"
              />

              <motion.p
                className="text-center text-sm sm:text-base code-bold"
                animate={{
                  color: ["rgba(255, 255, 255, 0.8)", "rgba(216, 180, 254, 0.9)", "rgba(255, 255, 255, 0.8)"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                <span className="hidden md:inline">Copyright</span> © {currentYear} WorkinTech
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: animateIn ? 1 : 0, opacity: animateIn ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center"
          >
            <motion.div
              whileHover={{
                scale: 1.2,
                rotate: 5,
                boxShadow: "0 0 15px rgba(168, 85, 247, 0.7)",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative rounded-full p-2"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-purple-500/20 filter blur-md"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <Link
                href="https://www.instagram.com/latech.cesu/"
                target="_blank"
                className="text-gray-400 hover:text-purple-400 transition-all duration-300 relative z-10"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
