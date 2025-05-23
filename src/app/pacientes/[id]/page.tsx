"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import { Save, ArrowLeft, Trash2, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { formatCPF, formatTelefone } from "@/lib/utils/formatters"

interface Paciente {
  id: string
  nome: string
  cpf: string
  data_nascimento: string
  idade: number
  telefone: string
  email: string
}

export default function EditarPaciente() {
  const [paciente, setPaciente] = useState<Paciente>({
    id: "",
    nome: "",
    cpf: "",
    data_nascimento: "",
    idade: 0,
    telefone: "",
    email: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/pacientes/${id}`)

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || "Falha ao buscar dados do paciente")
        }

        const data = await res.json()

        setPaciente({
          ...data,
          cpf: formatCPF(data.cpf || ""),
          telefone: formatTelefone(data.telefone || ""),
        })
      } catch (error: any) {
        console.error("Erro:", error)
        setError(error.message || "Não foi possível carregar os dados do paciente")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPaciente()
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "cpf") {
      const cpfClean = value.replace(/\D/g, "")

      const cpfLimited = cpfClean.slice(0, 11)

      const cpfFormatted =
        cpfLimited.length <= 3
          ? cpfLimited
          : cpfLimited.length <= 6
            ? `${cpfLimited.slice(0, 3)}.${cpfLimited.slice(3)}`
            : cpfLimited.length <= 9
              ? `${cpfLimited.slice(0, 3)}.${cpfLimited.slice(3, 6)}.${cpfLimited.slice(6)}`
              : `${cpfLimited.slice(0, 3)}.${cpfLimited.slice(3, 6)}.${cpfLimited.slice(6, 9)}-${cpfLimited.slice(9)}`

      setPaciente((prev) => ({ ...prev, cpf: cpfFormatted }))
      return
    }

    if (name === "telefone") {
      const telClean = value.replace(/\D/g, "")

      const telLimited = telClean.slice(0, 11)

      const telFormatted =
        telLimited.length <= 2
          ? telLimited
          : telLimited.length <= 6
            ? `(${telLimited.slice(0, 2)}) ${telLimited.slice(2)}`
            : telLimited.length <= 10
              ? `(${telLimited.slice(0, 2)}) ${telLimited.slice(2, 6)}-${telLimited.slice(6)}`
              : `(${telLimited.slice(0, 2)}) ${telLimited.slice(2, 3)}${telLimited.slice(3, 7)}-${telLimited.slice(7)}`

      setPaciente((prev) => ({ ...prev, telefone: telFormatted }))
      return
    }

    setPaciente((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    const pacienteToSubmit = {
      ...paciente,
      cpf: paciente.cpf.replace(/\D/g, ""),
      telefone: paciente.telefone.replace(/\D/g, ""),
    }

    try {
      const res = await fetch(`/api/pacientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pacienteToSubmit),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Falha ao atualizar paciente")
      }

      setSuccess("Paciente atualizado com sucesso!")
      setTimeout(() => {
        router.push("/pacientes")
      }, 2000)
    } catch (error: any) {
      console.error("Erro ao salvar:", error)
      setError(error.message || "Ocorreu um erro ao salvar as alterações")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este paciente? Esta ação não pode ser desfeita.")) return

    try {
      const res = await fetch(`/api/pacientes/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Falha ao excluir paciente")
      }

      router.push("/pacientes")
    } catch (error: any) {
      console.error("Erro ao excluir:", error)
      setError(error.message || "Ocorreu um erro ao excluir o paciente")
    }
  }

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toISOString().split("T")[0]
    } catch (error) {
      console.error("Erro ao formatar data:", error)
      return ""
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header title="Carregando..." />
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header title="Editar Paciente" />

      <main className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 flex items-start mb-6">
              <AlertCircle size={20} className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border-l-4 border-green-500 flex items-start mb-6">
              <CheckCircle size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={paciente.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                />
              </div>

              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={paciente.cpf}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                  placeholder="000.000.000-00"
                />
              </div>

              <div>
                <label htmlFor="data_nascimento" className="block text-sm font-medium text-gray-700 mb-1">
                  Data de nascimento
                </label>
                <input
                  type="date"
                  id="data_nascimento"
                  name="data_nascimento"
                  value={formatDateForInput(paciente.data_nascimento)}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={paciente.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={paciente.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/pacientes")}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Voltar
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center justify-center px-4 py-2 border border-red-300 rounded-lg text-red-700 bg-white hover:bg-red-50"
                >
                  <Trash2 size={18} className="mr-2" />
                  Excluir
                </button>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="code-bold flex items-center justify-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} className="mr-2" />
                {saving ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
