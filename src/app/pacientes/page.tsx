"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Plus, Search, Edit, Trash2, User } from "lucide-react"
import { motion } from "framer-motion"

interface Paciente {
  id: string
  nome: string
  cpf: string
  data_nascimento: string
  telefone: string
  email: string
}

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState) {
      setSidebarCollapsed(savedState === "true")
    }

    const fetchPacientes = async () => {
      try {
        const res = await fetch("/api/pacientes")
        if (!res.ok) throw new Error("Falha ao buscar pacientes")
        const data = await res.json()
        setPacientes(data)
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPacientes()

    const handleStorageChange = () => {
      const state = localStorage.getItem("sidebarCollapsed")
      setSidebarCollapsed(state === "true")
    }
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/pacientes/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Falha ao excluir paciente")

      setPacientes(pacientes.filter((p) => p.id !== id))
      setDeleteConfirm(null)
    } catch (error) {
      console.error("Erro ao excluir:", error)
    }
  }

  const filteredPacientes = pacientes.filter(
    (paciente) =>
      paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.cpf.includes(searchTerm) ||
      paciente.telefone.includes(searchTerm),
  )

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const tableRow = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className={`min-h-screen bg-white ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Header title="Pacientes" />

      <main className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full sm:w-80 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
              placeholder="Buscar por nome, CPF ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/pacientes/novo")}
            className="code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors btn-animated"
          >
            <Plus size={18} className="mr-2" />
            Novo Paciente
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
        >
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 skeleton rounded"></div>
              ))}
            </div>
          ) : filteredPacientes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-8 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"
              >
                <User size={24} className="text-gray-400" />
              </motion.div>
              <h3 className="code-bold text-lg mb-2">Nenhum paciente encontrado</h3>
              <p className="text-gray-700 mb-6">
                {searchTerm
                  ? "Nenhum resultado para sua busca. Tente outros termos."
                  : "Você ainda não cadastrou nenhum paciente."}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/pacientes/novo")}
                className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors btn-animated"
              >
                <Plus size={18} className="mr-2" />
                Cadastrar Paciente
              </motion.button>
            </motion.div>
          ) : (
            <div className="overflow-x-auto">
              <motion.table variants={container} initial="hidden" animate="show" className="w-full">
                <thead className="bg-[#f8f9fa] text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">CPF</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">
                      Data de Nascimento
                    </th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Telefone</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPacientes.map((paciente) => (
                    <motion.tr
                      key={paciente.id}
                      variants={tableRow}
                      className="hover:bg-gray-50 transition-colors table-row-animated"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="code-bold text-black">{paciente.nome}</div>
                        <div className="text-sm text-gray-700">{paciente.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{paciente.cpf}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{formatDate(paciente.data_nascimento)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{paciente.telefone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => router.push(`/pacientes/${paciente.id}`)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64]"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </motion.button>

                          {deleteConfirm === paciente.id ? (
                            <div className="flex items-center space-x-1">
                              <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                className="p-1 bg-red-600 text-white rounded-md text-xs"
                                onClick={() => handleDelete(paciente.id)}
                              >
                                Confirmar
                              </motion.button>
                              <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                className="p-1 bg-gray-200 text-gray-700 rounded-md text-xs"
                                onClick={() => setDeleteConfirm(null)}
                              >
                                Cancelar
                              </motion.button>
                            </div>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              onClick={() => setDeleteConfirm(paciente.id)}
                              className="p-1 text-red-600 hover:text-red-800"
                              aria-label="Excluir"
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
