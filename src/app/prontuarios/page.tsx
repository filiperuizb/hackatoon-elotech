"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Plus, Search, FileText, Edit, Eye, Calendar, User } from "lucide-react"
import { motion } from "framer-motion"

interface Prontuario {
  id: string
  data_atendimento: string
  queixa_principal: string
  diagnostico_definitivo: string
  paciente: {
    id: string
    nome: string
    cpf: string
    data_nascimento: string
  }
  profissional_saude: {
    id: string
    nome: string
    especialidade: {
      nome: string
    }
  }
  consulta?: {
    id: string
    data: string
    status: string
  }
}

export default function Prontuarios() {
  const [prontuarios, setProntuarios] = useState<Prontuario[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchProntuarios = async () => {
      try {
        const res = await fetch("/api/prontuarios")
        if (res.ok) {
          const data = await res.json()
          setProntuarios(data)
        }
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProntuarios()
  }, [])

  const filteredProntuarios = prontuarios.filter((prontuario) => {
    const matchesSearch =
      prontuario.paciente?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prontuario.profissional_saude?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prontuario.queixa_principal?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = !filterDate || prontuario.data_atendimento.startsWith(filterDate)

    return matchesSearch && matchesDate
  })

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const formatTime = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Prontuários" />

      <main className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full sm:w-80 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                placeholder="Buscar por paciente, médico, queixa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="date"
                className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/prontuarios/novo")}
            className="code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors btn-animated"
          >
            <Plus size={18} className="mr-2" />
            Novo Prontuário
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
        >
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 skeleton rounded"></div>
              ))}
            </div>
          ) : filteredProntuarios.length === 0 ? (
            <div className="p-8 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"
              >
                <FileText size={24} className="text-gray-400" />
              </motion.div>
              <h3 className="code-bold text-lg mb-2">Nenhum prontuário encontrado</h3>
              <p className="text-gray-700 mb-6">
                {searchTerm || filterDate
                  ? "Nenhum resultado para sua busca. Tente outros filtros."
                  : "Você ainda não criou nenhum prontuário."}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/prontuarios/novo")}
                className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors btn-animated"
              >
                <Plus size={18} className="mr-2" />
                Criar Prontuário
              </motion.button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Paciente</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Data/Hora</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Profissional</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">
                      Queixa Principal
                    </th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Diagnóstico</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProntuarios.map((prontuario) => (
                    <motion.tr
                      key={prontuario.id}
                      className="hover:bg-gray-50 transition-colors table-row-animated"
                      whileHover={{ x: 2 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                            <User size={16} className="text-[#4d9d74]" />
                          </div>
                          <div>
                            <div className="code-bold text-black">{prontuario.paciente?.nome}</div>
                            <div className="text-sm text-gray-700">{prontuario.paciente?.cpf}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-black">{formatDate(prontuario.data_atendimento)}</div>
                        <div className="text-sm text-gray-700">{formatTime(prontuario.data_atendimento)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-black">{prontuario.profissional_saude?.nome}</div>
                        <div className="text-sm text-gray-700">
                          {prontuario.profissional_saude?.especialidade?.nome}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-black max-w-xs truncate">
                          {prontuario.queixa_principal || "Não informado"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-black max-w-xs truncate">
                          {prontuario.diagnostico_definitivo || "Não informado"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => router.push(`/prontuarios/${prontuario.id}`)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64]"
                            aria-label="Visualizar"
                          >
                            <Eye size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => router.push(`/prontuarios/${prontuario.id}/editar`)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
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
