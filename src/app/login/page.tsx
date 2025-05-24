"use client"

import type React from "react"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Lock, Mail, AlertCircle, CheckCircle, Eye, EyeOff, ArrowLeft } from "lucide-react"

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-32 h-32 bg-emerald-100 rounded-full opacity-60 blur-xl"
      />

      <motion.div
        animate={{
          x: [0, -80, 120, 0],
          y: [0, 80, -60, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-16 w-24 h-24 bg-teal-100 rounded-full opacity-50 blur-lg"
      />

      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -40, 80, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-32 left-1/4 w-20 h-20 bg-emerald-200 rounded-full opacity-40 blur-lg"
      />

      <motion.div
        animate={{
          x: [0, -90, 70, 0],
          y: [0, 60, -80, 0],
          scale: [1, 0.7, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-1/3 w-28 h-28 bg-teal-200 rounded-full opacity-30 blur-xl"
      />
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-1/2 left-10 w-40 h-40 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-20 blur-2xl"
      />

      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 35,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute bottom-1/4 right-8 w-36 h-36 bg-gradient-to-tr from-teal-100 to-emerald-100 rounded-full opacity-25 blur-2xl"
      />
    </div>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl p-8 hover:shadow-3xl transition-all duration-300"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-8"
          >
            <Link href="/" className="inline-block group">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Image
                  src="/logo.png"
                  alt="SPA Logo"
                  width={140}
                  height={50}
                  className="mx-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-2xl font-bold code-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              Bem-vindo de volta
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-gray-600"
            >
              Acesse sua conta do SPA
            </motion.p>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 rounded-2xl text-sm flex items-center shadow-lg"
              >
                <AlertCircle size={18} className="mr-3 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mb-6 p-4 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/50 text-emerald-700 rounded-2xl text-sm flex items-center shadow-lg"
              >
                <CheckCircle size={18} className="mr-3 flex-shrink-0" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative group"
            >
              <label className="block text-sm font-medium code-bold text-gray-700 mb-2">Email ou Documento</label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-emerald-600 group-focus-within:text-emerald-700 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email ou documento"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-gray-700 font-medium transition-all duration-300 placeholder:text-gray-400"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="relative group"
            >
              <label className="block text-sm font-medium code-bold text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-emerald-600 group-focus-within:text-emerald-700 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-gray-700 font-medium transition-all duration-300 placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3.5 px-6 rounded-2xl font-semibold code-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Entrando...
                </div>
              ) : (
                "Entrar no Sistema"
              )}
            </motion.button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm"
            >
              <Link
                href="/registro"
                className="code-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center group"
              >
                <span>Criar nova conta</span>
                <motion.div className="ml-1 group-hover:translate-x-1 transition-transform" whileHover={{ x: 2 }}>
                  →
                </motion.div>
              </Link>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-8 pt-6 border-t border-gray-200/50"
          >
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 transition-colors group"
            >
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Voltar ao início
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mt-8 text-center"
          >
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Desenvolvido por</div>
            <div className="flex justify-center">
              <Image
                src="/gp.png"
                alt="Garotos de Programa"
                width={100}
                height={35}
                className="object-contain opacity-60"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
