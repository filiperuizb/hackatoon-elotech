"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = "Carregando..." }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-live="polite">
      <div className="flex flex-col items-center">
        <div className="relative">
          <motion.div
            className="h-16 w-16 rounded-full border-4 border-purple-500/30 border-t-purple-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <motion.div
              className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600"
              animate={{
                boxShadow: [
                  "0 0 5px 2px rgba(168, 85, 247, 0.3)",
                  "0 0 20px 5px rgba(168, 85, 247, 0.5)",
                  "0 0 5px 2px rgba(168, 85, 247, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </div>
        <motion.p
          className="mt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          {message}
        </motion.p>
      </div>
    </div>
  )
}
