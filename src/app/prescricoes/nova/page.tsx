"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Save, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

interface NovaPrescricao {
  medicamento: string
  dosagem: string
  frequencia: string
  duracao: string
  observacoes: string
  consulta_id: string
}

interface Consulta {
  id: string
  paciente: {
    nome: string
  }
  data: string
}

export default function NovaPrescricao() {
  const [prescricao, setPrescricao] = useState<NovaPrescricao>({
    medicamento: "",
    dosagem: "",
    frequencia: "",
    duracao: "",
    observacoes: "",
    consulta_id: "",
  })
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const res = await fetch("/api/consultas")
        if (res.ok) {
          const data = await res.json()
          setConsultas(data)
        }
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar as consultas")
      } finally {
        setLoading(false)
      }
    }

    fetchConsultas()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPrescricao((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch("/api/prescricoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescricao),
      })

      if (!res.ok) throw new Error("Falha ao criar prescrição")

      setSuccess("Prescrição criada com sucesso!")
      setTimeout(() => {
        router.push("/prescricoes")
      }, 2000)
    } catch (error) {
      console.error("Erro ao salvar:", error)
      setError("Ocorreu um erro ao criar a prescrição")
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header title="Nova Prescrição" />
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 skeleton rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Nova Prescrição" />

      <main className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover-card"
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
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="consulta_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Consulta
                </label>
                <select
                  id="consulta_id"
                  name="consulta_id"
                  value={prescricao.consulta_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                  required
                >
                  <option value="">Selecione uma consulta</option>
                  {consultas.map((consulta) => (
                    <option key={consulta.id} value={consulta.id}>
                      {consulta.paciente?.nome} - {formatDate(consulta.data)}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label htmlFor="medicamento" className="block text-sm font-medium text-gray-700 mb-1">
                  Medicamento
                </label>
                <input
                  type="text"
                  id="medicamento"
                  name="medicamento"
                  value={prescricao.medicamento}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <label htmlFor="dosagem" className="block text-sm font-medium text-gray-700 mb-1">
                  Dosagem
                </label>
                <input
                  type="text"
                  id="dosagem"
                  name="dosagem"
                  value={prescricao.dosagem}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label htmlFor="frequencia" className="block text-sm font-medium text-gray-700 mb-1">
                  Frequência
                </label>
                <input
                  type="text"
                  id="frequencia"
                  name="frequencia"
                  value={prescricao.frequencia}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <label htmlFor="duracao" className="block text-sm font-medium text-gray-700 mb-1">
                  Duração
                </label>
                <input
                  type="text"
                  id="duracao"
                  name="duracao"
                  value={prescricao.duracao}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="col-span-2"
              >
                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={prescricao.observacoes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                ></textarea>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => router.push("/prescricoes")}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft size={18} className="mr-2" />
                Voltar
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={saving}
                className="code-bold flex items-center justify-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-animated"
              >
                <Save size={18} className="mr-2" />
                {saving ? "Criando..." : "Criar prescrição"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
