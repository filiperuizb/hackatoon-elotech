"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import {
  Plus,
  Search,
  FileText,
  Edit,
  Eye,
  Calendar,
  User,
  Filter,
  FileSpreadsheet,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Trash2,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  ClipboardList,
  BarChart2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  status?: string
}

export default function Prontuarios() {
  const [prontuarios, setProntuarios] = useState<Prontuario[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [especialidadeFilter, setEspecialidadeFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortField, setSortField] = useState<string>("data_atendimento")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
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

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredProntuarios.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredProntuarios.map((p) => p.id))
    }
  }

  const handleBulkDelete = async () => {
    if (!selectedItems.length) return

    if (!confirm(`Tem certeza que deseja excluir ${selectedItems.length} prontuários?`)) return

    try {
      for (const id of selectedItems) {
        await fetch(`/api/prontuarios/${id}`, {
          method: "DELETE",
        })
      }

      setProntuarios(prontuarios.filter((p) => !selectedItems.includes(p.id)))
      setSelectedItems([])
      alert("Prontuários excluídos com sucesso")
    } catch (error) {
      console.error("Erro ao excluir em massa:", error)
      alert("Erro ao excluir prontuários")
    }
  }

  const exportToCSV = () => {
    if (!filteredProntuarios.length) return

    const headers = ["Paciente", "CPF", "Data", "Profissional", "Especialidade", "Queixa", "Diagnóstico"]

    const csvContent = [
      headers.join(","),
      ...filteredProntuarios.map((p) =>
        [
          `"${p.paciente?.nome || ""}"`,
          `"${p.paciente?.cpf || ""}"`,
          `"${formatDate(p.data_atendimento)}"`,
          `"${p.profissional_saude?.nome || ""}"`,
          `"${p.profissional_saude?.especialidade?.nome || ""}"`,
          `"${p.queixa_principal || ""}"`,
          `"${p.diagnostico_definitivo || ""}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `prontuarios_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "finalizado":
        return "text-green-600 bg-green-50 border-green-200"
      case "em andamento":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "cancelado":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
    }
  }

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "finalizado":
        return <CheckCircle size={14} className="mr-1" />
      case "em andamento":
        return <Clock size={14} className="mr-1" />
      case "cancelado":
        return <XCircle size={14} className="mr-1" />
      default:
        return <AlertCircle size={14} className="mr-1" />
    }
  }

  const especialidades = Array.from(
    new Set(prontuarios.map((p) => p.profissional_saude?.especialidade?.nome).filter(Boolean)),
  ).sort()

  let filteredProntuarios = [...prontuarios]

  if (searchTerm) {
    filteredProntuarios = filteredProntuarios.filter(
      (prontuario) =>
        prontuario.paciente?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prontuario.profissional_saude?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prontuario.queixa_principal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prontuario.diagnostico_definitivo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prontuario.paciente?.cpf.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  if (filterDate) {
    filteredProntuarios = filteredProntuarios.filter((prontuario) => prontuario.data_atendimento.startsWith(filterDate))
  }

  if (statusFilter !== "all") {
    filteredProntuarios = filteredProntuarios.filter(
      (prontuario) => prontuario.status?.toLowerCase() === statusFilter.toLowerCase(),
    )
  }

  if (especialidadeFilter) {
    filteredProntuarios = filteredProntuarios.filter(
      (prontuario) => prontuario.profissional_saude?.especialidade?.nome === especialidadeFilter,
    )
  }

  filteredProntuarios.sort((a, b) => {
    let aValue: any = a[sortField as keyof Prontuario]
    let bValue: any = b[sortField as keyof Prontuario]

    if (sortField === "paciente") {
      aValue = a.paciente?.nome || ""
      bValue = b.paciente?.nome || ""
    } else if (sortField === "profissional") {
      aValue = a.profissional_saude?.nome || ""
      bValue = b.profissional_saude?.nome || ""
    } else if (sortField === "especialidade") {
      aValue = a.profissional_saude?.especialidade?.nome || ""
      bValue = b.profissional_saude?.especialidade?.nome || ""
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalProntuarios = prontuarios.length
  const prontuariosFinalizados = prontuarios.filter((p) => p.status?.toLowerCase() === "finalizado").length
  const prontuariosEmAndamento = prontuarios.filter((p) => p.status?.toLowerCase() === "em andamento").length

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header title="Prontuários" />

      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-4">
              <ClipboardList size={24} className="text-[#4d9d74]" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total de Prontuários</h3>
              <p className="text-2xl font-bold text-gray-900">{totalProntuarios}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Finalizados</h3>
              <p className="text-2xl font-bold text-gray-900">{prontuariosFinalizados}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <Clock size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Em Andamento</h3>
              <p className="text-2xl font-bold text-gray-900">{prontuariosEmAndamento}</p>
            </div>
          </motion.div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] transition-all shadow-sm"
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
                className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] transition-all shadow-sm"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Filter size={18} className="mr-2 text-gray-500" />
              Filtros
              {showFilters ? (
                <ChevronUp size={16} className="ml-2 text-gray-500" />
              ) : (
                <ChevronDown size={16} className="ml-2 text-gray-500" />
              )}
            </button>

            <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-2 ${
                  viewMode === "table" ? "bg-[#4d9d74] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <BarChart2 size={18} />
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`px-3 py-2 ${
                  viewMode === "cards" ? "bg-[#4d9d74] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ClipboardList size={18} />
              </button>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {selectedItems.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                <Trash2 size={18} className="mr-2" />
                Excluir ({selectedItems.length})
              </button>
            )}

            <button
              onClick={exportToCSV}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FileSpreadsheet size={18} className="mr-2 text-gray-500" />
              Exportar
            </button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/prontuarios/novo")}
              className="code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={18} className="mr-2" />
              Novo Prontuário
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-700 mb-4">Filtros avançados</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setStatusFilter("all")}
                        className={`px-4 py-2 rounded-lg border ${
                          statusFilter === "all"
                            ? "bg-[#4d9d74] text-white border-[#4d9d74]"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        Todos
                      </button>
                      <button
                        onClick={() => setStatusFilter("finalizado")}
                        className={`px-4 py-2 rounded-lg border ${
                          statusFilter === "finalizado"
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <CheckCircle size={14} className="inline mr-1" />
                        Finalizado
                      </button>
                      <button
                        onClick={() => setStatusFilter("em andamento")}
                        className={`px-4 py-2 rounded-lg border ${
                          statusFilter === "em andamento"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <Clock size={14} className="inline mr-1" />
                        Em andamento
                      </button>
                      <button
                        onClick={() => setStatusFilter("cancelado")}
                        className={`px-4 py-2 rounded-lg border ${
                          statusFilter === "cancelado"
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <XCircle size={14} className="inline mr-1" />
                        Cancelado
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Especialidade</label>
                    <select
                      value={especialidadeFilter}
                      onChange={(e) => setEspecialidadeFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                    >
                      <option value="">Todas</option>
                      {especialidades.map((esp) => (
                        <option key={esp} value={esp}>
                          {esp}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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
                <div key={i} className="h-20 bg-gray-200 skeleton rounded-lg"></div>
              ))}
            </div>
          ) : filteredProntuarios.length === 0 ? (
            <div className="p-8 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4"
              >
                <FileText size={32} className="text-gray-400" />
              </motion.div>
              <h3 className="code-bold text-xl mb-2">Nenhum prontuário encontrado</h3>
              <p className="text-gray-700 mb-6 max-w-md mx-auto">
                {searchTerm || filterDate || statusFilter !== "all" || especialidadeFilter
                  ? "Nenhum resultado para sua busca. Tente outros filtros."
                  : "Você ainda não criou nenhum prontuário."}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/prontuarios/novo")}
                className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Criar Prontuário
              </motion.button>
            </div>
          ) : viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] text-left">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === filteredProntuarios.length && filteredProntuarios.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#4d9d74] focus:ring-[#4d9d74]"
                      />
                    </th>
                    <th
                      className="px-4 py-3 text-xs code-bold text-black uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("paciente")}
                    >
                      <div className="flex items-center">
                        Paciente
                        {sortField === "paciente" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? (
                              <ChevronUp size={14} className="text-gray-500" />
                            ) : (
                              <ChevronDown size={14} className="text-gray-500" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-xs code-bold text-black uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("data_atendimento")}
                    >
                      <div className="flex items-center">
                        Data/Hora
                        {sortField === "data_atendimento" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? (
                              <ChevronUp size={14} className="text-gray-500" />
                            ) : (
                              <ChevronDown size={14} className="text-gray-500" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-xs code-bold text-black uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("profissional")}
                    >
                      <div className="flex items-center">
                        Profissional
                        {sortField === "profissional" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? (
                              <ChevronUp size={14} className="text-gray-500" />
                            ) : (
                              <ChevronDown size={14} className="text-gray-500" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-xs code-bold text-black uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("queixa_principal")}
                    >
                      <div className="flex items-center">
                        Queixa Principal
                        {sortField === "queixa_principal" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? (
                              <ChevronUp size={14} className="text-gray-500" />
                            ) : (
                              <ChevronDown size={14} className="text-gray-500" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-xs code-bold text-black uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("diagnostico_definitivo")}
                    >
                      <div className="flex items-center">
                        Diagnóstico
                        {sortField === "diagnostico_definitivo" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? (
                              <ChevronUp size={14} className="text-gray-500" />
                            ) : (
                              <ChevronDown size={14} className="text-gray-500" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-xs code-bold text-black uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-xs code-bold text-black uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProntuarios.map((prontuario) => (
                    <motion.tr
                      key={prontuario.id}
                      className="hover:bg-gray-50 transition-colors"
                      whileHover={{ backgroundColor: "rgba(77, 157, 116, 0.05)" }}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(prontuario.id)}
                          onChange={() => handleSelectItem(prontuario.id)}
                          className="rounded border-gray-300 text-[#4d9d74] focus:ring-[#4d9d74]"
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                            <User size={16} className="text-[#4d9d74]" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{prontuario.paciente?.nome}</div>
                            <div className="text-sm text-gray-500">{prontuario.paciente?.cpf}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{formatDate(prontuario.data_atendimento)}</div>
                        <div className="text-sm text-gray-500">{formatTime(prontuario.data_atendimento)}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{prontuario.profissional_saude?.nome}</div>
                        <div className="text-sm text-gray-500">
                          {prontuario.profissional_saude?.especialidade?.nome}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-gray-900 max-w-xs truncate">
                          {prontuario.queixa_principal || "Não informado"}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-gray-900 max-w-xs truncate">
                          {prontuario.diagnostico_definitivo || "Não informado"}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            prontuario.status,
                          )}`}
                        >
                          {getStatusIcon(prontuario.status)}
                          {prontuario.status || "Pendente"}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => router.push(`/prontuarios/${prontuario.id}`)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64] transition-colors"
                            aria-label="Visualizar"
                          >
                            <Eye size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => router.push(`/prontuarios/${prontuario.id}`)}
                            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => alert("Funcionalidade de download será implementada em breve!")}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64] transition-colors"
                            aria-label="Download"
                          >
                            <Download size={18} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProntuarios.map((prontuario) => (
                <motion.div
                  key={prontuario.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                        <User size={18} className="text-[#4d9d74]" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{prontuario.paciente?.nome}</div>
                        <div className="text-sm text-gray-500">{prontuario.paciente?.cpf}</div>
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        prontuario.status,
                      )}`}
                    >
                      {getStatusIcon(prontuario.status)}
                      {prontuario.status || "Pendente"}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-500 mb-1">Data/Hora</div>
                      <div className="text-gray-900">
                        {formatDate(prontuario.data_atendimento)} às {formatTime(prontuario.data_atendimento)}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-500 mb-1">Profissional</div>
                      <div className="flex items-center">
                        <Stethoscope size={14} className="text-[#4d9d74] mr-1" />
                        <span className="text-gray-900">{prontuario.profissional_saude?.nome}</span>
                        <span className="mx-1 text-gray-400">•</span>
                        <span className="text-gray-700 text-sm">
                          {prontuario.profissional_saude?.especialidade?.nome}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-500 mb-1">Queixa Principal</div>
                      <div className="text-gray-900 line-clamp-2">{prontuario.queixa_principal || "Não informado"}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-500 mb-1">Diagnóstico</div>
                      <div className="text-gray-900 line-clamp-2">
                        {prontuario.diagnostico_definitivo || "Não informado"}
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => router.push(`/prontuarios/${prontuario.id}`)}
                        className="p-2 text-[#4d9d74] hover:text-[#3a8a64] transition-colors"
                        aria-label="Visualizar"
                      >
                        <Eye size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => router.push(`/prontuarios/${prontuario.id}`)}
                        className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                        aria-label="Editar"
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => alert("Funcionalidade de download será implementada em breve!")}
                        className="p-2 text-[#4d9d74] hover:text-[#3a8a64] transition-colors"
                        aria-label="Download"
                      >
                        <Download size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {filteredProntuarios.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Mostrando <span className="font-medium">{filteredProntuarios.length}</span> de{" "}
              <span className="font-medium">{prontuarios.length}</span> prontuários
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Anterior
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Próxima
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
