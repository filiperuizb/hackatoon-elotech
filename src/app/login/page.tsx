"use client"

import type React from "react"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Lock, Mail, AlertCircle, CheckCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: email, senha }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Falha ao fazer login")
      }

      localStorage.setItem("token", data.token)
      setSuccess("Login realizado com sucesso! Redirecionando...")

      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "Erro ao fazer login. Verifique suas credenciais.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover-card">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-6"
          >
            <Link href="/" className="inline-block">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Image
                  src="/logo.png"
                  alt="SPA Logo"
                  width={120}
                  height={40}
                  className="mx-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-center"
              >
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm flex items-center"
              >
                <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-[#4d9d74]">
                <Mail size={18} />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ou Documento"
                className="w-full pl-10 pr-4 py-2.5 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-0 focus:ring-2 focus:ring-[#4d9d74] text-gray-700 font-normal input-animated"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-[#4d9d74]">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                className="w-full pl-10 pr-4 py-2.5 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-0 focus:ring-2 focus:ring-[#4d9d74] text-gray-700 font-normal input-animated"
                required
              />
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="code-bold w-full bg-[#4d9d74] hover:bg-[#3a8a64] text-white py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-animated"
            >
              {loading ? "Entrando..." : "Entrar"}
            </motion.button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex justify-between text-sm"
            >
              <Link href="/registro" className="code-bold text-[#4d9d74] hover:text-[#3a8a64] transition-colors">
                Crie sua conta
              </Link>
              <Link href="#" className="code-bold text-[#4d9d74] hover:text-[#3a8a64] transition-colors">
                Esqueceu sua senha?
              </Link>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="mt-6 text-center"
          >
            <div className="border-t border-gray-300 w-full my-4"></div>
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} Garotos de Programa</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="mt-8 text-center"
          >
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">TECNOLOGIA</div>
            <div className="flex justify-center">
              <Image src="/gp.png" alt="GP Logo" width={80} height={30} className="object-contain" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
