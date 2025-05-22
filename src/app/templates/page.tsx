"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Plus, Search, FileSpreadsheet, Edit, Trash2, Copy, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface Template {
  id: string
  titulo: string
  sintomas_padrao: string
  sazonalidade: string
  medicamentos_recomendados: string
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("/api/templates")
        if (!res.ok) throw new Error("Falha ao buscar templates")
        const data = await res.json()
        setTemplates(data)
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este template?")) return

    try {
      const res = await fetch(`/api/templates/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Falha ao excluir template")

      setTemplates(templates.filter((t) => t.id !== id))
    } catch (error) {
      console.error("Erro ao excluir:", error)
    }
  }

  const filteredTemplates = templates.filter(
    (template) =>
      template.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.sintomas_padrao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.sazonalidade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Templates" />

      <main className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full sm:w-80 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
              placeholder="Buscar por título, sintomas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => router.push("/templates/novo")}
            className="code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Novo Template
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileSpreadsheet size={24} className="text-gray-400" />
            </div>
            <h3 className="code-bold text-lg mb-2">Nenhum template encontrado</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "Nenhum resultado para sua busca. Tente outros termos."
                : "Você ainda não criou nenhum template."}
            </p>
            <button
              onClick={() => router.push("/templates/novo")}
              className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={18} className="mr-2" />
              Criar Template
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="code-bold text-lg text-black">{template.titulo}</h3>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => router.push(`/templates/${template.id}`)}
                      className="p-1 text-[#4d9d74] hover:text-[#3a8a64] rounded-full hover:bg-gray-50"
                      aria-label="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(template.id)}
                      className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                      aria-label="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      className="p-1 text-[#4d9d74] hover:text-[#3a8a64] rounded-full hover:bg-gray-50"
                      aria-label="Copiar para prescrição"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm code-bold text-black">Sintomas</h4>
                    <p className="text-sm text-black line-clamp-2">{template.sintomas_padrao}</p>
                  </div>

                  <div>
                    <h4 className="text-sm code-bold text-black">Sazonalidade</h4>
                    <p className="text-sm text-black">{template.sazonalidade}</p>
                  </div>

                  <div>
                    <h4 className="text-sm code-bold text-black">Medicamentos</h4>
                    <p className="text-sm text-black line-clamp-2">{template.medicamentos_recomendados}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => router.push(`/templates/${template.id}`)}
                    className="w-full flex items-center justify-center text-sm text-[#4d9d74] hover:text-[#3a8a64] py-1"
                  >
                    Ver detalhes <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  )
}
