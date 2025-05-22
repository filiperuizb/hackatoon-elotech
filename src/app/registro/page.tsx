"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { User, Lock, Mail, FileText, Calendar, Check, ArrowRight, ArrowLeft, Stethoscope } from "lucide-react"

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
      icon: <User size={18} />,
      validation: (value) => (value.length < 3 ? "Nome deve ter pelo menos 3 caracteres" : null),
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Digite seu email",
      icon: <Mail size={18} />,
      validation: (value) => (!value.includes("@") ? "Email inválido" : null),
    },
    {
      name: "tipo_documento_id",
      label: "Tipo de documento",
      type: "select",
      placeholder: "Selecione o tipo de documento",
      icon: <FileText size={18} />,
      validation: (value) => (!value ? "Selecione um tipo de documento" : null),
    },
    {
      name: "documento_numero",
      label: "Número do documento",
      type: "text",
      placeholder: "Digite o número do seu documento",
      icon: <FileText size={18} />,
      validation: (value) => (!value ? "Número do documento é obrigatório" : null),
    },
    {
      name: "especialidade_id",
      label: "Especialidade",
      type: "select",
      placeholder: "Selecione sua especialidade",
      icon: <Stethoscope size={18} />,
      validation: (value) => (!value ? "Selecione uma especialidade" : null),
    },
    {
      name: "data_nascimento",
      label: "Data de nascimento",
      type: "date",
      placeholder: "Selecione sua data de nascimento",
      icon: <Calendar size={18} />,
    },
    {
      name: "senha",
      label: "Senha",
      type: "password",
      placeholder: "Digite sua senha",
      icon: <Lock size={18} />,
      validation: (value) => (value.length < 6 ? "Senha deve ter pelo menos 6 caracteres" : null),
    },
    {
      name: "confirmarSenha",
      label: "Confirmar senha",
      type: "password",
      placeholder: "Confirme sua senha",
      icon: <Lock size={18} />,
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 w-full max-w-sm">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4d9d74] mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dados do registro...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="text-center mb-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="SPA Logo"
                width={120}
                height={40}
                className="mx-auto object-contain"
                priority
              />
            </Link>
            <h2 className="code-bold mt-4 text-lg text-gray-700">Criar Nova Conta</h2>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-[#4d9d74] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Passo {currentStep + 1} de {formFields.length}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded text-sm"
            >
              {success}
            </motion.div>
          )}

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-2">
                  <label htmlFor={currentField.name} className="block text-sm font-medium text-gray-700 mb-1">
                    {currentField.label}
                  </label>

                  {currentField.type === "select" ? (
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-[#4d9d74]">
                        {currentField.icon}
                      </div>
                      <select
                        name={currentField.name}
                        id={currentField.name}
                        value={formData[currentField.name as keyof typeof formData]}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-0 focus:ring-2 focus:ring-[#4d9d74] text-gray-700 font-normal"
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
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-[#4d9d74]">
                        {currentField.icon}
                      </div>
                      <input
                        type={currentField.type}
                        name={currentField.name}
                        id={currentField.name}
                        value={formData[currentField.name as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={currentField.placeholder}
                        className="w-full pl-10 pr-4 py-2.5 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-0 focus:ring-2 focus:ring-[#4d9d74] text-gray-700 font-normal"
                        required
                      />
                    </div>
                  )}

                  {fieldError && <p className="mt-1 text-sm text-red-600">{fieldError}</p>}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`code-bold flex items-center px-4 py-2 rounded transition-colors ${
                  currentStep === 0 ? "text-gray-400 cursor-not-allowed" : "text-[#4d9d74] hover:bg-[#4d9d74]/10"
                }`}
              >
                <ArrowLeft size={16} className="mr-1" />
                Anterior
              </button>

              <button
                type="button"
                onClick={nextStep}
                disabled={loading}
                className="code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === formFields.length - 1 ? (
                  loading ? (
                    "Criando conta..."
                  ) : (
                    <>
                      Finalizar
                      <Check size={16} className="ml-1" />
                    </>
                  )
                ) : (
                  <>
                    Próximo
                    <ArrowRight size={16} className="ml-1" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center text-sm mt-6">
              <span className="text-gray-600">Já tem uma conta? </span>
              <Link href="/login" className="code-bold text-[#4d9d74] hover:text-[#3a8a64] transition-colors">
                Faça login
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">TECNOLOGIA</div>
            <div className="flex justify-center">
              <Image src="/gp.png" alt="GP Logo" width={80} height={30} className="object-contain" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
