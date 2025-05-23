"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  User,
  Filter,
  Download,
  RefreshCw,
  LayoutGrid,
  LayoutList,
  Users,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  Heart,
  Activity,
  X,
  ArrowUp,
  ArrowDown,
  Home,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { formatCPF, formatTelefone, formatDate } from "@/lib/utils/formatters"
import Link from "next/link"

interface Paciente {
  id: string
  nome: string
  cpf: string
  data_nascimento: string
  idade: number
  telefone: string
  email: string
}

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<string>("nome")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const router = useRouter()

  const fetchPacientes = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch("/api/pacientes")

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Falha ao buscar pacientes")
      }

      const data = await res.json()
      setPacientes(data)
    } catch (error: any) {
      console.error("Erro:", error)
      setError(error.message || "Não foi possível carregar os pacientes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState) {
      setSidebarCollapsed(savedState === "true")
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

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Falha ao excluir paciente")
      }

      setPacientes(pacientes.filter((p) => p.id !== id))
      setDeleteConfirm(null)
    } catch (error: any) {
      console.error("Erro ao excluir:", error)
      setError(error.message || "Ocorreu um erro ao excluir o paciente")
    }
  }

  const sortedPacientes = [...pacientes].sort((a, b) => {
    if (sortBy === "nome") {
      return sortOrder === "asc" ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome)
    } else if (sortBy === "idade") {
      return sortOrder === "asc" ? a.idade - b.idade : b.idade - a.idade
    }
    return 0
  })

  const filteredPacientes = sortedPacientes.filter(
    (paciente) =>
      paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.cpf.replace(/\D/g, "").includes(searchTerm.replace(/\D/g, "")) ||
      paciente.telefone.replace(/\D/g, "").includes(searchTerm.replace(/\D/g, "")) ||
      (paciente.email && paciente.email.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const exportToCSV = () => {
    const headers = ["Nome", "CPF", "Data de Nascimento", "Idade", "Telefone", "Email"]
    const data = filteredPacientes.map((p) => [
      p.nome,
      formatCPF(p.cpf),
      formatDate(p.data_nascimento),
      p.idade + " anos",
      formatTelefone(p.telefone),
      p.email,
    ])

    const csvContent = [headers.join(","), ...data.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `pacientes_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSortBy("nome")
    setSortOrder("asc")
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

  const cardItem = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  const totalPacientes = pacientes.length
  const pacientesNovos = pacientes.filter(
    (p) => new Date(p.data_nascimento).getFullYear() > new Date().getFullYear() - 1,
  ).length
  const idadeMedia =
    pacientes.length > 0
      ? Math.round(
          pacientes.reduce((sum, p) => {
            return sum + (p.idade || 0)
          }, 0) / pacientes.length,
        )
      : 0

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-white to-gray-50 ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}
    >
      <div className="p-6 pb-0">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Link href="/dashboard" className="hover:text-[#4d9d74] transition-colors">
            <Home size={14} className="inline mr-1" />
            Home
          </Link>
          <span className="mx-2">›</span>
          <span>Pacientes</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 uppercase mb-6">PACIENTES</h1>
      </div>

      <main className="p-6 pt-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="rounded-full bg-blue-50 p-4 mr-4">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Pacientes</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalPacientes}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="rounded-full bg-green-50 p-4 mr-4">
              <UserPlus className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pacientes Novos</p>
              <h3 className="text-2xl font-bold text-gray-800">{pacientesNovos}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="rounded-full bg-purple-50 p-4 mr-4">
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Idade Média</p>
              <h3 className="text-2xl font-bold text-gray-800">{idadeMedia} anos</h3>
            </div>
          </div>
        </motion.div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start">
            <div className="flex-1">
              <p className="text-red-700">{error}</p>
              <button onClick={fetchPacientes} className="mt-2 text-sm text-red-700 underline hover:text-red-800">
                Tentar novamente
              </button>
            </div>
            <button onClick={() => setError(null)} className="text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] shadow-sm"
                placeholder="Buscar por nome, CPF ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="h-10 flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Filter size={18} className="mr-2 text-gray-500" />
                <span>Filtros</span>
              </button>

              <button
                onClick={exportToCSV}
                className="h-10 flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Download size={18} className="mr-2 text-gray-500" />
                <span>Exportar</span>
              </button>

              <div className="flex h-10 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => setViewMode("table")}
                  className={`flex items-center justify-center w-10 ${viewMode === "table" ? "bg-gray-100" : "bg-white hover:bg-gray-50"} transition-colors`}
                >
                  <LayoutList size={18} className={viewMode === "table" ? "text-[#4d9d74]" : "text-gray-500"} />
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`flex items-center justify-center w-10 ${viewMode === "cards" ? "bg-gray-100" : "bg-white hover:bg-gray-50"} transition-colors`}
                >
                  <LayoutGrid size={18} className={viewMode === "cards" ? "text-[#4d9d74]" : "text-gray-500"} />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/pacientes/novo")}
            className="h-10 code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors shadow-md"
          >
            <Plus size={18} className="mr-2" />
            NOVO PACIENTE
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Ordenar por</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleSort("nome")}
                      className={`h-10 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center ${
                        sortBy === "nome"
                          ? "bg-[#4d9d74] text-white"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Nome
                      {sortBy === "nome" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => toggleSort("idade")}
                      className={`h-10 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center ${
                        sortBy === "idade"
                          ? "bg-[#4d9d74] text-white"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Idade
                      {sortBy === "idade" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={resetFilters}
                  className="h-10 flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 w-fit"
                >
                  <RefreshCw size={14} className="mr-2" />
                  Limpar filtros
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors shadow-md"
              >
                <Plus size={18} className="mr-2" />
                Cadastrar Paciente
              </motion.button>
            </motion.div>
          ) : viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">CPF</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">
                      Data de Nascimento
                    </th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Idade</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Telefone</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPacientes.map((paciente) => (
                    <tr key={paciente.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                            <User size={16} className="text-[#4d9d74]" />
                          </div>
                          <div>
                            <div className="code-bold text-black">{paciente.nome}</div>
                            <div className="text-sm text-gray-700">{paciente.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{formatCPF(paciente.cpf)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{formatDate(paciente.data_nascimento)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{paciente.idade} anos</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{formatTelefone(paciente.telefone)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => router.push(`/pacientes/${paciente.id}`)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64]"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </button>

                          {deleteConfirm === paciente.id ? (
                            <div className="flex items-center space-x-1">
                              <button
                                className="p-1 bg-red-600 text-white rounded-md text-xs"
                                onClick={() => handleDelete(paciente.id)}
                              >
                                Confirmar
                              </button>
                              <button
                                className="p-1 bg-gray-200 text-gray-700 rounded-md text-xs"
                                onClick={() => setDeleteConfirm(null)}
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(paciente.id)}
                              className="p-1 text-red-600 hover:text-red-800"
                              aria-label="Excluir"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPacientes.map((paciente) => (
                  <div
                    key={paciente.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-4">
                            <User size={24} className="text-[#4d9d74]" />
                          </div>
                          <div>
                            <h3 className="code-bold text-lg text-gray-900">{paciente.nome}</h3>
                            <p className="text-sm text-gray-500">{formatCPF(paciente.cpf)}</p>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => router.push(`/pacientes/${paciente.id}`)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64]"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          {deleteConfirm !== paciente.id && (
                            <button
                              onClick={() => setDeleteConfirm(paciente.id)}
                              className="p-1 text-red-600 hover:text-red-800"
                              aria-label="Excluir"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </div>

                      {deleteConfirm === paciente.id && (
                        <div className="bg-red-50 p-3 rounded-lg mb-4 text-center">
                          <p className="text-sm text-red-800 mb-2">Confirmar exclusão?</p>
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleDelete(paciente.id)}
                              className="px-3 py-1 bg-red-600 text-white rounded-md text-sm"
                            >
                              Confirmar
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">{formatDate(paciente.data_nascimento)}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">{paciente.idade} anos</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">{formatTelefone(paciente.telefone)}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600 truncate">{paciente.email}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => router.push(`/pacientes/${paciente.id}`)}
                        className="w-full flex justify-center items-center py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors text-sm"
                      >
                        Ver detalhes
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
