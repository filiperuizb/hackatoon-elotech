"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Plus, Search, FileText, Edit, Trash2, Download } from "lucide-react"
import { motion } from "framer-motion"

interface Prescricao {
  id: string
  medicamento: string
  dosagem: string
  frequencia: string
  duracao: string
  observacoes: string
  consulta_id: string
  consulta?: {
    paciente: {
      nome: string
    }
    data: string
  }
}

export default function Prescricoes() {
  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchPrescricoes = async () => {
      try {
        const res = await fetch("/api/prescricoes")
        if (!res.ok) throw new Error("Falha ao buscar prescrições")
        const data = await res.json()
        setPrescricoes(data)
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrescricoes()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta prescrição?")) return

    try {
      const res = await fetch(`/api/prescricoes/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Falha ao excluir prescrição")

      setPrescricoes(prescricoes.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Erro ao excluir:", error)
    }
  }

  const filteredPrescricoes = prescricoes.filter((prescricao) =>
    prescricao.medicamento.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Prescrições" />

      <main className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full sm:w-80 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
              placeholder="Buscar por medicamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => router.push("/prescricoes/nova")}
            className="code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Nova Prescrição
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : filteredPrescricoes.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText size={24} className="text-gray-400" />
              </div>
              <h3 className="code-bold text-lg mb-2">Nenhuma prescrição encontrada</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? "Nenhum resultado para sua busca. Tente outros termos."
                  : "Você ainda não criou nenhuma prescrição."}
              </p>
              <button
                onClick={() => router.push("/prescricoes/nova")}
                className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Criar Prescrição
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Medicamento</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Dosagem</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Frequência</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Duração</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPrescricoes.map((prescricao) => (
                    <tr key={prescricao.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-black">{prescricao.medicamento}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{prescricao.dosagem}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{prescricao.frequencia}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{prescricao.duracao}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => router.push(`/prescricoes/${prescricao.id}`)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64]"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(prescricao.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            aria-label="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button className="p-1 text-[#4d9d74] hover:text-[#3a8a64]" aria-label="Download">
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
