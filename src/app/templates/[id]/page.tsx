"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import { Save, ArrowLeft, Trash2, AlertCircle, CheckCircle, Copy } from "lucide-react"
import { motion } from "framer-motion"

interface Template {
  id: string
  titulo: string
  sintomas_padrao: string
  sazonalidade: string
  medicamentos_recomendados: string
}

export default function EditarTemplate() {
  const [template, setTemplate] = useState<Template>({
    id: "",
    titulo: "",
    sintomas_padrao: "",
    sazonalidade: "",
    medicamentos_recomendados: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await fetch(`/api/templates/${id}`)
        if (!res.ok) throw new Error("Falha ao buscar dados do template")
        const data = await res.json()
        setTemplate(data)
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar os dados do template")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTemplate()
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTemplate((prev) => ({
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
      const res = await fetch(`/api/templates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(template),
      })

      if (!res.ok) throw new Error("Falha ao atualizar template")

      setSuccess("Template atualizado com sucesso!")
      setTimeout(() => {
        router.push("/templates")
      }, 2000)
    } catch (error) {
      console.error("Erro ao salvar:", error)
      setError("Ocorreu um erro ao salvar as alterações")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este template? Esta ação não pode ser desfeita.")) return

    try {
      const res = await fetch(`/api/templates/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Falha ao excluir template")

      router.push("/templates")
    } catch (error) {
      console.error("Erro ao excluir:", error)
      setError("Ocorreu um erro ao excluir o template")
    }
  }

  const handleCopyToPrescription = () => {
    // Implementação futura: copiar para prescrição
    alert("Funcionalidade em desenvolvimento: Copiar para prescrição")
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
      <Header title="Editar Template" />

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
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={template.titulo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                />
              </div>

              <div>
                <label htmlFor="sintomas_padrao" className="block text-sm font-medium text-gray-700 mb-1">
                  Sintomas Padrão
                </label>
                <textarea
                  id="sintomas_padrao"
                  name="sintomas_padrao"
                  value={template.sintomas_padrao}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="sazonalidade" className="block text-sm font-medium text-gray-700 mb-1">
                  Sazonalidade
                </label>
                <input
                  type="text"
                  id="sazonalidade"
                  name="sazonalidade"
                  value={template.sazonalidade}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                />
              </div>

              <div>
                <label htmlFor="medicamentos_recomendados" className="block text-sm font-medium text-gray-700 mb-1">
                  Medicamentos Recomendados
                </label>
                <textarea
                  id="medicamentos_recomendados"
                  name="medicamentos_recomendados"
                  value={template.medicamentos_recomendados}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                ></textarea>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/templates")}
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
                  onClick={handleCopyToPrescription}
                  className="flex items-center justify-center px-4 py-2 border border-[#4d9d74] rounded-lg text-[#4d9d74] bg-white hover:bg-[#4d9d74]/10"
                >
                  <Copy size={18} className="mr-2" />
                  Copiar para prescrição
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
