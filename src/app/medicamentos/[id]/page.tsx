"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import { Save, ArrowLeft, Trash2, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

interface Medicamento {
  id: string
  nome: string
  principio_ativo: string
  concentracao: string
  forma_farmaceutica: string
  fabricante: string | null
  ativo: boolean
}

export default function EditarMedicamento() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [medicamento, setMedicamento] = useState<Medicamento>({
    id: "",
    nome: "",
    principio_ativo: "",
    concentracao: "",
    forma_farmaceutica: "",
    fabricante: "",
    ativo: true,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const fetchMedicamento = async () => {
      try {
        const response = await fetch(`/api/medicamentos/${id}`)

        if (!response.ok) {
          throw new Error("Erro ao buscar medicamento")
        }

        const data = await response.json()
        setMedicamento({
          id: data.id,
          nome: data.nome,
          principio_ativo: data.principio_ativo || "",
          concentracao: data.concentracao || "",
          forma_farmaceutica: data.forma_farmaceutica || "",
          fabricante: data.fabricante || "",
          ativo: data.ativo !== false, 
        })
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar os dados do medicamento")
      } finally {
        setLoading(false)
      }
    }

    fetchMedicamento()
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setMedicamento((prev) => ({
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
      if (!medicamento.nome || !medicamento.principio_ativo || !medicamento.concentracao || !medicamento.forma_farmaceutica) {
        setError("Nome, princípio ativo, concentração e forma farmacêutica são obrigatórios")
        setSaving(false)
        return
      }

      const response = await fetch(`/api/medicamentos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicamento),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar medicamento")
      }

      setSuccess("Medicamento atualizado com sucesso!")
      setTimeout(() => {
        router.push("/medicamentos")
      }, 2000)
    } catch (error) {
      console.error("Erro:", error)
      setError("Não foi possível atualizar o medicamento")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este medicamento? Esta ação não pode ser desfeita.")) return

    try {
      const response = await fetch(`/api/medicamentos/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Falha ao excluir medicamento")

      router.push("/medicamentos")
    } catch (error) {
      console.error("Erro ao excluir:", error)
      setError("Ocorreu um erro ao excluir o medicamento")
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
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header title="Editar Medicamento" />

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
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Medicamento *</label>
                <input
                  type="text"
                  name="nome"
                  value={medicamento.nome}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Princípio Ativo *</label>
                <input
                  type="text"
                  name="principio_ativo"
                  value={medicamento.principio_ativo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Concentração *</label>
                <input
                  type="text"
                  name="concentracao"
                  value={medicamento.concentracao}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: 500mg"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Forma Farmacêutica *</label>
                <select
                  name="forma_farmaceutica"
                  value={medicamento.forma_farmaceutica}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                >
                  <option value="">Selecione uma forma</option>
                  <option value="Comprimido">Comprimido</option>
                  <option value="Cápsula">Cápsula</option>
                  <option value="Solução">Solução</option>
                  <option value="Suspensão">Suspensão</option>
                  <option value="Injetável">Injetável</option>
                  <option value="Pomada">Pomada</option>
                  <option value="Creme">Creme</option>
                  <option value="Gel">Gel</option>
                  <option value="Spray">Spray</option>
                  <option value="Gotas">Gotas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fabricante</label>
                <input
                  type="text"
                  name="fabricante"
                  value={medicamento.fabricante || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="ativo"
                  value={medicamento.ativo ? "true" : "false"}
                  onChange={(e) =>
                    setMedicamento({
                      ...medicamento,
                      ativo: e.target.value === "true",
                    })
                  }
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/medicamentos")}
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
                className="flex items-center justify-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
