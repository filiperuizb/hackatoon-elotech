"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Lock,
  Mail,
  FileText,
  Calendar,
  Check,
  ArrowRight,
  ArrowLeft,
  Stethoscope,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

type TipoDocumento = {
  id: string
  nome: string
  descricao?: string
}

type Especialidade = {
  id: string
  nome: string
  descricao?: string
}

type FormField = {
  name: string
  label: string
  type: string
  placeholder: string
  icon: React.ReactNode
  validation?: (value: string) => string | null
}

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -60, 100, 0],
          scale: [1, 1.3, 0.7, 1],
        }}
        transition={{
          duration: 24,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-16 right-20 w-28 h-28 bg-emerald-100 rounded-full opacity-50 blur-xl"
      />

      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 28,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-12 w-36 h-36 bg-teal-100 rounded-full opacity-40 blur-2xl"
      />

      <motion.div
        animate={{
          x: [0, 80, -120, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-24 right-1/4 w-24 h-24 bg-emerald-200 rounded-full opacity-60 blur-lg"
      />

      <motion.div
        animate={{
          x: [0, -70, 90, 0],
          y: [0, 70, -90, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 26,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-teal-200 rounded-full opacity-35 blur-xl"
      />

      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 40,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-1/4 left-8 w-44 h-44 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-full opacity-30 blur-3xl"
      />

      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 0.8, 1],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 35,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute bottom-1/5 right-12 w-40 h-40 bg-gradient-to-tr from-teal-50 to-emerald-100 rounded-full opacity-25 blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/3 w-4 h-4 bg-emerald-300 rounded-full opacity-40"
      />

      <motion.div
        animate={{
          y: [0, 15, 0],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/2 left-1/4 w-3 h-3 bg-teal-300 rounded-full opacity-50"
      />
    </div>
  )
}

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    documento_numero: "",
    tipo_documento_id: "",
    especialidade_id: "",
    data_nascimento: "",
  })
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([])
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState("")
  const [fieldError, setFieldError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true)
      try {
        const tiposRes = await fetch("/api/documentotipo")
        if (!tiposRes.ok) throw new Error("Falha ao buscar tipos de documento")
        const tiposData = await tiposRes.json()
        setTiposDocumento(tiposData)

        const espRes = await fetch("/api/especialidades")
        if (!espRes.ok) throw new Error("Falha ao buscar especialidades")
        const espData = await espRes.json()
        setEspecialidades(espData)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        setError("Não foi possível carregar os dados necessários para o registro.")
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [])

  const formFields: FormField[] = [
    {
      name: "nome",
      label: "Nome completo",
      type: "text",
      placeholder: "Digite seu nome completo",
      icon: <User size={20} />,
      validation: (value) => (value.length < 3 ? "Nome deve ter pelo menos 3 caracteres" : null),
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Digite seu email",
      icon: <Mail size={20} />,
      validation: (value) => (!value.includes("@") ? "Email inválido" : null),
    },
    {
      name: "tipo_documento_id",
      label: "Tipo de documento",
      type: "select",
      placeholder: "Selecione o tipo de documento",
      icon: <FileText size={20} />,
      validation: (value) => (!value ? "Selecione um tipo de documento" : null),
    },
    {
      name: "documento_numero",
      label: "Número do documento",
      type: "text",
      placeholder: "Digite o número do seu documento",
      icon: <FileText size={20} />,
      validation: (value) => (!value ? "Número do documento é obrigatório" : null),
    },
    {
      name: "especialidade_id",
      label: "Especialidade",
      type: "select",
      placeholder: "Selecione sua especialidade",
      icon: <Stethoscope size={20} />,
      validation: (value) => (!value ? "Selecione uma especialidade" : null),
    },
    {
      name: "data_nascimento",
      label: "Data de nascimento",
      type: "date",
      placeholder: "Selecione sua data de nascimento",
      icon: <Calendar size={20} />,
    },
    {
      name: "senha",
      label: "Senha",
      type: "password",
      placeholder: "Digite sua senha",
      icon: <Lock size={20} />,
      validation: (value) => (value.length < 6 ? "Senha deve ter pelo menos 6 caracteres" : null),
    },
    {
      name: "confirmarSenha",
      label: "Confirmar senha",
      type: "password",
      placeholder: "Confirme sua senha",
      icon: <Lock size={20} />,
      validation: (value) => (value !== formData.senha ? "As senhas não coincidem" : null),
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setFieldError("")
  }

  const validateCurrentField = (): boolean => {
    const currentField = formFields[currentStep]
    if (currentField.validation) {
      const errorMessage = currentField.validation(formData[currentField.name as keyof typeof formData])
      if (errorMessage) {
        setFieldError(errorMessage)
        return false
      }
    }
    return true
  }

  const nextStep = () => {
    if (!validateCurrentField()) return

    if (currentStep < formFields.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const formattedData = {
        ...formData,
        data_nascimento: formData.data_nascimento ? new Date(formData.data_nascimento).toISOString() : undefined,
      }

      const { confirmarSenha, ...dataToSend } = formattedData

      const response = await fetch("/api/profissionais", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Falha ao criar conta")
      }

      setSuccess("Conta criada com sucesso! Redirecionando...")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      console.error("Registration error:", err)
      setError(err instanceof Error ? err.message : "Erro ao criar conta. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const currentField = formFields[currentStep]
  const progress = ((currentStep + 1) / formFields.length) * 100

  if (loadingData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl p-8 w-full max-w-md">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Carregando dados do registro...</p>
          </div>
        </div>
      </div>
    )
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
          className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl p-8"
        >
          <div className="text-center mb-8">
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
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="code-bold mt-6 text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              Criar Nova Conta
            </motion.h2>

            <div className="mt-4 w-full bg-gray-200/50 rounded-full h-2 backdrop-blur-sm">
              <motion.div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-gray-600 font-medium">
              Passo {currentStep + 1} de {formFields.length}
            </p>
          </div>

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

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-2">
                  <label htmlFor={currentField.name} className="block text-sm font-medium code-bold text-gray-700 mb-3">
                    {currentField.label}
                  </label>

                  {currentField.type === "select" ? (
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-emerald-600 group-focus-within:text-emerald-700 transition-colors">
                        {currentField.icon}
                      </div>
                      <select
                        name={currentField.name}
                        id={currentField.name}
                        value={formData[currentField.name as keyof typeof formData]}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-gray-700 font-medium transition-all duration-300"
                        required
                      >
                        <option value="">{currentField.placeholder}</option>
                        {currentField.name === "tipo_documento_id" &&
                          tiposDocumento.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>
                              {tipo.nome}
                            </option>
                          ))}
                        {currentField.name === "especialidade_id" &&
                          especialidades.map((esp) => (
                            <option key={esp.id} value={esp.id}>
                              {esp.nome}
                            </option>
                          ))}
                      </select>
                    </div>
                  ) : (
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-emerald-600 group-focus-within:text-emerald-700 transition-colors">
                        {currentField.icon}
                      </div>
                      <input
                        type={
                          currentField.type === "password"
                            ? currentField.name === "senha"
                              ? showPassword
                                ? "text"
                                : "password"
                              : showConfirmPassword
                                ? "text"
                                : "password"
                            : currentField.type
                        }
                        name={currentField.name}
                        id={currentField.name}
                        value={formData[currentField.name as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={currentField.placeholder}
                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-gray-700 font-medium transition-all duration-300 placeholder:text-gray-400"
                        required
                      />
                      {currentField.type === "password" && (
                        <button
                          type="button"
                          onClick={() => {
                            if (currentField.name === "senha") {
                              setShowPassword(!showPassword)
                            } else {
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          }}
                          className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                          {(currentField.name === "senha" ? showPassword : showConfirmPassword) ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {fieldError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center"
                    >
                      <AlertCircle size={14} className="mr-1" />
                      {fieldError}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <motion.button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                whileHover={{ scale: currentStep === 0 ? 1 : 1.02 }}
                whileTap={{ scale: currentStep === 0 ? 1 : 0.98 }}
                className={`code-bold flex items-center px-6 py-3 rounded-2xl transition-all duration-300 ${
                  currentStep === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <ArrowLeft size={18} className="mr-2" />
                Anterior
              </motion.button>

              <motion.button
                type="button"
                onClick={nextStep}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="code-bold flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {currentStep === formFields.length - 1 ? (
                  loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Criando...
                    </div>
                  ) : (
                    <>
                      Finalizar
                      <Check size={18} className="ml-2" />
                    </>
                  )
                ) : (
                  <>
                    Próximo
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </motion.button>
            </div>

            <div className="text-center text-sm mt-8 pt-6 border-t border-gray-200/50">
              <span className="text-gray-600">Já tem uma conta? </span>
              <Link href="/login" className="code-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                Faça login
              </Link>
            </div>
          </div>

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
