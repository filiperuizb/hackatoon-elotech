"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import { Save, ArrowLeft, Trash2, AlertCircle, CheckCircle, Download } from "lucide-react"
import { motion } from "framer-motion"

interface Prescricao {
  id: string
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

export default function EditarPrescricao() {
  const [prescricao, setPrescricao] = useState<Prescricao>({
    id: "",
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
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prescricaoRes = await fetch(`/api/prescricoes/${id}`)
        if (!prescricaoRes.ok) throw new Error("Falha ao buscar dados da prescrição")
        const prescricaoData = await prescricaoRes.json()
        setPrescricao(prescricaoData)

        const consultasRes = await fetch("/api/consultas")
        if (!consultasRes.ok) throw new Error("Falha ao buscar consultas")
        const consultasData = await consultasRes.json()
        setConsultas(consultasData)
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar os dados necessários")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

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
      const res = await fetch(`/api/prescricoes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescricao),
      })

      if (!res.ok) throw new Error("Falha ao atualizar prescrição")

      setSuccess("Prescrição atualizada com sucesso!")
      setTimeout(() => {
        router.push("/prescricoes")
      }, 2000)
    } catch (error) {
      console.error("Erro ao salvar:", error)
      setError("Ocorreu um erro ao salvar as alterações")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta prescrição? Esta ação não pode ser desfeita.")) return

    try {
      const res = await fetch(`/api/prescricoes/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Falha ao excluir prescrição")

      router.push("/prescricoes")
    } catch (error) {
      console.error("Erro ao excluir:", error)
      setError("Ocorreu um erro ao excluir a prescrição")
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Carregando..." />
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
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
    <div className="min-h-screen bg-gray-50">
      <Header title="Editar Prescrição" />

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
              <div>
                <label htmlFor="consulta_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Consulta
                </label>
                <select
                  id="consulta_id"
                  name="consulta_id"
                  value={prescricao.consulta_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                >
                  <option value="">Selecione uma consulta</option>
                  {consultas.map((consulta) => (
                    <option key={consulta.id} value={consulta.id}>
                      {consulta.paciente?.nome} - {formatDate(consulta.data)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="medicamento" className="block text-sm font-medium text-gray-700 mb-1">
                  Medicamento
                </label>
                <input
                  type="text"
                  id="medicamento"
                  name="medicamento"
                  value={prescricao.medicamento}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                />
              </div>

              <div>
                <label htmlFor="dosagem" className="block text-sm font-medium text-gray-700 mb-1">
                  Dosagem
                </label>
                <input
                  type="text"
                  id="dosagem"
                  name="dosagem"
                  value={prescricao.dosagem}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                />
              </div>

              <div>
                <label htmlFor="frequencia" className="block text-sm font-medium text-gray-700 mb-1">
                  Frequência
                </label>
                <input
                  type="text"
                  id="frequencia"
                  name="frequencia"
                  value={prescricao.frequencia}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                />
              </div>

              <div>
                <label htmlFor="duracao" className="block text-sm font-medium text-gray-700 mb-1">
                  Duração
                </label>
                <input
                  type="text"
                  id="duracao"
                  name="duracao"
                  value={prescricao.duracao}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={prescricao.observacoes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                ></textarea>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/prescricoes")}
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

                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 border border-[#4d9d74] rounded-lg text-[#4d9d74] bg-white hover:bg-[#4d9d74]/10"
                >
                  <Download size={18} className="mr-2" />
                  Baixar PDF
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
