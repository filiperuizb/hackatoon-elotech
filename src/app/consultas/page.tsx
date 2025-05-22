"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Plus, Search, Calendar, Edit, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

interface Consulta {
  id: string
  data: string
  hora: string
  status: string
  paciente: {
    id: string
    nome: string
  }
  profissional_saude: {
    id: string
    nome: string
    especialidade: string
  }
  unidade_saude: {
    id: string
    nome: string
  }
}

export default function Consultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const res = await fetch("/api/consultas")
        if (!res.ok) throw new Error("Falha ao buscar consultas")
        const data = await res.json()
        setConsultas(data)
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchConsultas()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta consulta?")) return

    try {
      const res = await fetch(`/api/consultas/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Falha ao excluir consulta")

      setConsultas(consultas.filter((c) => c.id !== id))
    } catch (error) {
      console.error("Erro ao excluir:", error)
    }
  }

  const filteredConsultas = consultas.filter((consulta) => {
    const matchesSearch =
      consulta.paciente?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.profissional_saude?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.unidade_saude?.nome.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = !filterDate || consulta.data === filterDate

    return matchesSearch && matchesDate
  })

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "agendada":
        return "bg-blue-100 text-blue-800"
      case "concluída":
        return "bg-green-100 text-green-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Consultas" />

      <main className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full sm:w-80 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                placeholder="Buscar por paciente, médico..."
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
                className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={() => router.push("/consultas/nova")}
            className="code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Nova Consulta
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
          ) : filteredConsultas.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={24} className="text-gray-400" />
              </div>
              <h3 className="code-bold text-lg mb-2">Nenhuma consulta encontrada</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterDate
                  ? "Nenhum resultado para sua busca. Tente outros filtros."
                  : "Você ainda não agendou nenhuma consulta."}
              </p>
              <button
                onClick={() => router.push("/consultas/nova")}
                className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Agendar Consulta
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Paciente</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Profissional</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Hora</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredConsultas.map((consulta) => (
                    <tr key={consulta.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-black">{consulta.paciente?.nome || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-black">{consulta.profissional_saude?.nome || "N/A"}</div>
                        <div className="text-sm text-gray-700">{consulta.profissional_saude?.especialidade}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{formatDate(consulta.data)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{consulta.hora || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(consulta.status)}`}>
                          {consulta.status || "Pendente"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => router.push(`/consultas/${consulta.id}`)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64]"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(consulta.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            aria-label="Excluir"
                          >
                            <Trash2 size={18} />
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
