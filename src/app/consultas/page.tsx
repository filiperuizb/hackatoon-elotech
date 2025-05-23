"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import {
  Plus,
  Search,
  Calendar,
  Edit,
  Trash2,
  Filter,
  Download,
  RefreshCw,
  Clock,
  User,
  MapPin,
  LayoutGrid,
  LayoutList,
  CalendarCheck,
  CalendarClock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  CalendarDays,
  UserCheck,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  const [filterStatus, setFilterStatus] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<string>("data")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
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
    try {
      const res = await fetch(`/api/consultas/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Falha ao excluir consulta")

      setConsultas(consultas.filter((c) => c.id !== id))
      setDeleteConfirm(null)
    } catch (error) {
      console.error("Erro ao excluir:", error)
    }
  }

  const sortedConsultas = [...consultas].sort((a, b) => {
    if (sortBy === "data") {
      const dateA = new Date(`${a.data}T${a.hora}`).getTime()
      const dateB = new Date(`${b.data}T${b.hora}`).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    } else if (sortBy === "paciente") {
      return sortOrder === "asc"
        ? a.paciente?.nome.localeCompare(b.paciente?.nome)
        : b.paciente?.nome.localeCompare(a.paciente?.nome)
    }
    return 0
  })

  const filteredConsultas = sortedConsultas.filter((consulta) => {
    const matchesSearch =
      consulta.paciente?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.profissional_saude?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.unidade_saude?.nome.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = !filterDate || consulta.data === filterDate
    const matchesStatus = !filterStatus || consulta.status === filterStatus

    return matchesSearch && matchesDate && matchesStatus
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

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "agendada":
        return <CalendarClock className="h-4 w-4" />
      case "concluída":
        return <CheckCircle className="h-4 w-4" />
      case "cancelada":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const exportToCSV = () => {
    const headers = ["Paciente", "Profissional", "Unidade", "Data", "Hora", "Status"]
    const data = filteredConsultas.map((c) => [
      c.paciente?.nome || "N/A",
      c.profissional_saude?.nome || "N/A",
      c.unidade_saude?.nome || "N/A",
      formatDate(c.data),
      c.hora || "N/A",
      c.status || "Pendente",
    ])

    const csvContent = [headers.join(","), ...data.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `consultas_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

  // Estatísticas para o dashboard
  const totalConsultas = consultas.length
  const consultasAgendadas = consultas.filter((c) => c.status?.toLowerCase() === "agendada").length
  const consultasConcluidas = consultas.filter((c) => c.status?.toLowerCase() === "concluída").length

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header title="Consultas" />

      <main className="p-6">
        {/* Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="rounded-full bg-purple-50 p-4 mr-4">
              <CalendarDays className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Consultas</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalConsultas}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="rounded-full bg-blue-50 p-4 mr-4">
              <CalendarCheck className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Consultas Agendadas</p>
              <h3 className="text-2xl font-bold text-gray-800">{consultasAgendadas}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="rounded-full bg-green-50 p-4 mr-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Consultas Concluídas</p>
              <h3 className="text-2xl font-bold text-gray-800">{consultasConcluidas}</h3>
            </div>
          </div>
        </motion.div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full sm:w-80 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated shadow-sm"
                placeholder="Buscar por paciente, médico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Filter size={18} className="mr-2 text-gray-500" />
                <span>Filtros</span>
              </button>

              <button
                onClick={exportToCSV}
                className="flex items-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Download size={18} className="mr-2 text-gray-500" />
                <span>Exportar</span>
              </button>

              <div className="flex rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => setViewMode("table")}
                  className={`flex items-center px-3 py-2 ${viewMode === "table" ? "bg-gray-100" : "bg-white hover:bg-gray-50"} transition-colors`}
                >
                  <LayoutList size={18} className={viewMode === "table" ? "text-[#4d9d74]" : "text-gray-500"} />
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`flex items-center px-3 py-2 ${viewMode === "cards" ? "bg-gray-100" : "bg-white hover:bg-gray-50"} transition-colors`}
                >
                  <LayoutGrid size={18} className={viewMode === "cards" ? "text-[#4d9d74]" : "text-gray-500"} />
                </button>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/consultas/nova")}
            className="code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors btn-animated shadow-md"
          >
            <Plus size={18} className="mr-2" />
            Nova Consulta
          </motion.button>
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
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilterStatus(filterStatus === "Agendada" ? "" : "Agendada")}
                      className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
                        filterStatus === "Agendada"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-white border border-gray-200 text-gray-700"
                      }`}
                    >
                      <CalendarClock size={14} className="mr-1" />
                      Agendada
                    </button>
                    <button
                      onClick={() => setFilterStatus(filterStatus === "Concluída" ? "" : "Concluída")}
                      className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
                        filterStatus === "Concluída"
                          ? "bg-green-100 text-green-800"
                          : "bg-white border border-gray-200 text-gray-700"
                      }`}
                    >
                      <CheckCircle size={14} className="mr-1" />
                      Concluída
                    </button>
                    <button
                      onClick={() => setFilterStatus(filterStatus === "Cancelada" ? "" : "Cancelada")}
                      className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
                        filterStatus === "Cancelada"
                          ? "bg-red-100 text-red-800"
                          : "bg-white border border-gray-200 text-gray-700"
                      }`}
                    >
                      <XCircle size={14} className="mr-1" />
                      Cancelada
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleSort("data")}
                      className={`px-3 py-1.5 rounded-md text-sm ${
                        sortBy === "data" ? "bg-[#4d9d74] text-white" : "bg-white border border-gray-200 text-gray-700"
                      }`}
                    >
                      Data {sortBy === "data" && (sortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => toggleSort("paciente")}
                      className={`px-3 py-1.5 rounded-md text-sm ${
                        sortBy === "paciente"
                          ? "bg-[#4d9d74] text-white"
                          : "bg-white border border-gray-200 text-gray-700"
                      }`}
                    >
                      Paciente {sortBy === "paciente" && (sortOrder === "asc" ? "↑" : "↓")}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSearchTerm("")
                    setFilterDate("")
                    setFilterStatus("")
                    setSortBy("data")
                    setSortOrder("asc")
                  }}
                  className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  <RefreshCw size={14} className="mr-1" />
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
          ) : filteredConsultas.length === 0 ? (
            <div className="p-8 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"
              >
                <Calendar size={24} className="text-gray-400" />
              </motion.div>
              <h3 className="code-bold text-lg mb-2">Nenhuma consulta encontrada</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterDate || filterStatus
                  ? "Nenhum resultado para sua busca. Tente outros filtros."
                  : "Você ainda não agendou nenhuma consulta."}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/consultas/nova")}
                className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors btn-animated shadow-md"
              >
                <Plus size={18} className="mr-2" />
                Agendar Consulta
              </motion.button>
            </div>
          ) : viewMode === "table" ? (
            <div className="overflow-x-auto">
              <motion.table variants={container} initial="hidden" animate="show" className="w-full">
                <thead className="bg-[#f8f9fa] text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Paciente</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Profissional</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Unidade</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Hora</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredConsultas.map((consulta) => (
                    <motion.tr key={consulta.id} variants={tableRow} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                            <User size={16} className="text-[#4d9d74]" />
                          </div>
                          <div className="text-black">{consulta.paciente?.nome || "N/A"}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-black">{consulta.profissional_saude?.nome || "N/A"}</div>
                        <div className="text-sm text-gray-700">{consulta.profissional_saude?.especialidade}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin size={16} className="text-gray-500 mr-2" />
                          <span className="text-black">{consulta.unidade_saude?.nome || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{formatDate(consulta.data)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock size={16} className="text-gray-500 mr-2" />
                          <span className="text-black">{consulta.hora || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full flex items-center w-fit gap-1 ${getStatusColor(consulta.status)}`}
                        >
                          {getStatusIcon(consulta.status)}
                          {consulta.status || "Pendente"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => router.push(`/consultas/${consulta.id}`)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64]"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </motion.button>

                          {deleteConfirm === consulta.id ? (
                            <div className="flex items-center space-x-1">
                              <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                className="p-1 bg-red-600 text-white rounded-md text-xs"
                                onClick={() => handleDelete(consulta.id)}
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
                              onClick={() => setDeleteConfirm(consulta.id)}
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
          ) : (
            <div className="p-6">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredConsultas.map((consulta) => (
                  <motion.div
                    key={consulta.id}
                    variants={cardItem}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full flex items-center w-fit gap-1 mb-2 ${getStatusColor(consulta.status)}`}
                          >
                            {getStatusIcon(consulta.status)}
                            {consulta.status || "Pendente"}
                          </span>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm font-medium">{formatDate(consulta.data)}</span>
                            <span className="mx-2 text-gray-300">|</span>
                            <Clock className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm font-medium">{consulta.hora}</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => router.push(`/consultas/${consulta.id}`)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64]"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </motion.button>
                          {deleteConfirm !== consulta.id && (
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              onClick={() => setDeleteConfirm(consulta.id)}
                              className="p-1 text-red-600 hover:text-red-800"
                              aria-label="Excluir"
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          )}
                        </div>
                      </div>

                      {deleteConfirm === consulta.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="bg-red-50 p-3 rounded-lg mb-4 text-center"
                        >
                          <p className="text-sm text-red-800 mb-2">Confirmar exclusão?</p>
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleDelete(consulta.id)}
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
                        </motion.div>
                      )}

                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                            <User size={18} className="text-[#4d9d74]" />
                          </div>
                          <div>
                            <h3 className="code-bold text-gray-900">{consulta.paciente?.nome || "N/A"}</h3>
                            <p className="text-xs text-gray-500">Paciente</p>
                          </div>
                        </div>

                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                            <UserCheck size={18} className="text-blue-500" />
                          </div>
                          <div>
                            <h3 className="code-bold text-gray-900">{consulta.profissional_saude?.nome || "N/A"}</h3>
                            <p className="text-xs text-gray-500">{consulta.profissional_saude?.especialidade}</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mr-3">
                            <MapPin size={18} className="text-purple-500" />
                          </div>
                          <div>
                            <h3 className="code-bold text-gray-900">{consulta.unidade_saude?.nome || "N/A"}</h3>
                            <p className="text-xs text-gray-500">Unidade</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => router.push(`/consultas/${consulta.id}`)}
                        className="w-full flex justify-center items-center py-2 mt-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors text-sm"
                      >
                        Ver detalhes
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
