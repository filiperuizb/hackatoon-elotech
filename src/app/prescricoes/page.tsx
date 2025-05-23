"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import {
  Plus,
  Search,
  FileText,
  Edit,
  Trash2,
  Download,
  Calendar,
  Filter,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Pill,
  User,
  ClipboardList,
  BarChart2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
      cpf?: string
    }
    data: string
    status?: string
  }
  createdAt?: string
  updatedAt?: string
  status?: string
}

export default function Prescricoes() {
  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [sortField, setSortField] = useState<string>("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
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

      alert("Prescrição excluída com sucesso")
    } catch (error) {
      console.error("Erro ao excluir:", error)
      alert("Erro ao excluir prescrição")
    }
  }

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
    if (selectedItems.length === filteredPrescricoes.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredPrescricoes.map((p) => p.id))
    }
  }

  const handleBulkDelete = async () => {
    if (!selectedItems.length) return

    if (!confirm(`Tem certeza que deseja excluir ${selectedItems.length} prescrições?`)) return

    try {
      for (const id of selectedItems) {
        await fetch(`/api/prescricoes/${id}`, {
          method: "DELETE",
        })
      }

      setPrescricoes(prescricoes.filter((p) => !selectedItems.includes(p.id)))
      setSelectedItems([])
      alert("Prescrições excluídas com sucesso")
    } catch (error) {
      console.error("Erro ao excluir em massa:", error)
      alert("Erro ao excluir prescrições")
    }
  }

  const exportToCSV = () => {
    if (!filteredPrescricoes.length) return

    const headers = ["Medicamento", "Dosagem", "Frequência", "Duração", "Paciente", "Data"]

    const csvContent = [
      headers.join(","),
      ...filteredPrescricoes.map((p) =>
        [
          `"${p.medicamento}"`,
          `"${p.dosagem}"`,
          `"${p.frequencia}"`,
          `"${p.duracao}"`,
          `"${p.consulta?.paciente?.nome || ""}"`,
          `"${formatDate(p.consulta?.data || "")}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `prescricoes_${new Date().toISOString().split("T")[0]}.csv`)
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
      case "ativa":
        return "text-green-600 bg-green-50 border-green-200"
      case "finalizada":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "cancelada":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
    }
  }

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "ativa":
        return <CheckCircle size={14} className="mr-1" />
      case "finalizada":
        return <CheckCircle size={14} className="mr-1" />
      case "cancelada":
        return <XCircle size={14} className="mr-1" />
      default:
        return <Clock size={14} className="mr-1" />
    }
  }

  let filteredPrescricoes = [...prescricoes]

  if (searchTerm) {
    filteredPrescricoes = filteredPrescricoes.filter(
      (prescricao) =>
        prescricao.medicamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescricao.consulta?.paciente?.nome?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  if (dateFilter) {
    filteredPrescricoes = filteredPrescricoes.filter((prescricao) => prescricao.consulta?.data?.startsWith(dateFilter))
  }

  if (statusFilter !== "all") {
    filteredPrescricoes = filteredPrescricoes.filter(
      (prescricao) => prescricao.status?.toLowerCase() === statusFilter.toLowerCase(),
    )
  }

  filteredPrescricoes.sort((a, b) => {
    let aValue: any = a[sortField as keyof Prescricao]
    let bValue: any = b[sortField as keyof Prescricao]

    if (sortField === "paciente") {
      aValue = a.consulta?.paciente?.nome || ""
      bValue = b.consulta?.paciente?.nome || ""
    } else if (sortField === "data") {
      aValue = a.consulta?.data || ""
      bValue = b.consulta?.data || ""
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalPrescricoes = prescricoes.length
  const prescricoesAtivas = prescricoes.filter((p) => p.status?.toLowerCase() === "ativa").length
  const prescricoesFinalizadas = prescricoes.filter((p) => p.status?.toLowerCase() === "finalizada").length

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header title="Prescrições" />

      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-4">
              <FileText size={24} className="text-[#4d9d74]" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total de Prescrições</h3>
              <p className="text-2xl font-bold text-gray-900">{totalPrescricoes}</p>
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
              <h3 className="text-sm font-medium text-gray-500">Ativas</h3>
              <p className="text-2xl font-bold text-gray-900">{prescricoesAtivas}</p>
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
              <h3 className="text-sm font-medium text-gray-500">Finalizadas</h3>
              <p className="text-2xl font-bold text-gray-900">{prescricoesFinalizadas}</p>
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
                placeholder="Buscar por medicamento ou paciente..."
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
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
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
              onClick={() => router.push("/prescricoes/nova")}
              className="code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={18} className="mr-2" />
              Nova Prescrição
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
                        onClick={() => setStatusFilter("ativa")}
                        className={`px-4 py-2 rounded-lg border ${
                          statusFilter === "ativa"
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <CheckCircle size={14} className="inline mr-1" />
                        Ativa
                      </button>
                      <button
                        onClick={() => setStatusFilter("finalizada")}
                        className={`px-4 py-2 rounded-lg border ${
                          statusFilter === "finalizada"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <CheckCircle size={14} className="inline mr-1" />
                        Finalizada
                      </button>
                      <button
                        onClick={() => setStatusFilter("cancelada")}
                        className={`px-4 py-2 rounded-lg border ${
                          statusFilter === "cancelada"
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <XCircle size={14} className="inline mr-1" />
                        Cancelada
                      </button>
                    </div>
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
                <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : filteredPrescricoes.length === 0 ? (
            <div className="p-8 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4"
              >
                <FileText size={32} className="text-gray-400" />
              </motion.div>
              <h3 className="code-bold text-xl mb-2">Nenhuma prescrição encontrada</h3>
              <p className="text-gray-700 mb-6 max-w-md mx-auto">
                {searchTerm || dateFilter || statusFilter !== "all"
                  ? "Nenhum resultado para sua busca. Tente outros filtros."
                  : "Você ainda não criou nenhuma prescrição."}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/prescricoes/nova")}
                className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Criar Prescrição
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
                        checked={selectedItems.length === filteredPrescricoes.length && filteredPrescricoes.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#4d9d74] focus:ring-[#4d9d74]"
                      />
                    </th>
                    <th
                      className="px-4 py-3 text-xs code-bold text-black uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("medicamento")}
                    >
                      <div className="flex items-center">
                        Medicamento
                        {sortField === "medicamento" && (
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
                      onClick={() => handleSort("dosagem")}
                    >
                      <div className="flex items-center">
                        Dosagem
                        {sortField === "dosagem" && (
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
                      onClick={() => handleSort("frequencia")}
                    >
                      <div className="flex items-center">
                        Frequência
                        {sortField === "frequencia" && (
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
                      onClick={() => handleSort("duracao")}
                    >
                      <div className="flex items-center">
                        Duração
                        {sortField === "duracao" && (
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
                      onClick={() => handleSort("data")}
                    >
                      <div className="flex items-center">
                        Data
                        {sortField === "data" && (
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
                  {filteredPrescricoes.map((prescricao) => (
                    <motion.tr
                      key={prescricao.id}
                      className="hover:bg-gray-50 transition-colors"
                      whileHover={{ backgroundColor: "rgba(77, 157, 116, 0.05)" }}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(prescricao.id)}
                          onChange={() => handleSelectItem(prescricao.id)}
                          className="rounded border-gray-300 text-[#4d9d74] focus:ring-[#4d9d74]"
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                            <Pill size={16} className="text-[#4d9d74]" />
                          </div>
                          <div className="font-medium text-gray-900">{prescricao.medicamento}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-700">{prescricao.dosagem}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-700">{prescricao.frequencia}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-700">{prescricao.duracao}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {prescricao.consulta?.paciente ? (
                          <div>
                            <div className="font-medium text-gray-900">{prescricao.consulta.paciente.nome}</div>
                            {prescricao.consulta.paciente.cpf && (
                              <div className="text-sm text-gray-500">{prescricao.consulta.paciente.cpf}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500">Não informado</span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {prescricao.consulta?.data ? (
                          <div>
                            <div className="text-gray-900">{formatDate(prescricao.consulta.data)}</div>
                            <div className="text-sm text-gray-500">{formatTime(prescricao.consulta.data)}</div>
                          </div>
                        ) : (
                          <span className="text-gray-500">Não informado</span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            prescricao.status,
                          )}`}
                        >
                          {getStatusIcon(prescricao.status)}
                          {prescricao.status || "Pendente"}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => router.push(`/prescricoes/${prescricao.id}`)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64] transition-colors"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => handleDelete(prescricao.id)}
                            className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            aria-label="Excluir"
                          >
                            <Trash2 size={18} />
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
              {filteredPrescricoes.map((prescricao) => (
                <motion.div
                  key={prescricao.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                        <Pill size={18} className="text-[#4d9d74]" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{prescricao.medicamento}</div>
                        <div className="text-sm text-gray-500">{prescricao.dosagem}</div>
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        prescricao.status,
                      )}`}
                    >
                      {getStatusIcon(prescricao.status)}
                      {prescricao.status || "Pendente"}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-500 mb-1">Paciente</div>
                      <div className="flex items-center">
                        <User size={14} className="text-[#4d9d74] mr-1" />
                        <span className="text-gray-900">{prescricao.consulta?.paciente?.nome || "Não informado"}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-500 mb-1">Posologia</div>
                      <div className="text-gray-900">
                        {prescricao.frequencia} - {prescricao.duracao}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-500 mb-1">Data</div>
                      <div className="text-gray-900">
                        {prescricao.consulta?.data
                          ? `${formatDate(prescricao.consulta.data)} às ${formatTime(prescricao.consulta.data)}`
                          : "Não informado"}
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => router.push(`/prescricoes/${prescricao.id}`)}
                        className="p-2 text-[#4d9d74] hover:text-[#3a8a64] transition-colors"
                        aria-label="Editar"
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDelete(prescricao.id)}
                        className="p-2 text-red-600 hover:text-red-800 transition-colors"
                        aria-label="Excluir"
                      >
                        <Trash2 size={18} />
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

        {filteredPrescricoes.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Mostrando <span className="font-medium">{filteredPrescricoes.length}</span> de{" "}
              <span className="font-medium">{prescricoes.length}</span> prescrições
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
