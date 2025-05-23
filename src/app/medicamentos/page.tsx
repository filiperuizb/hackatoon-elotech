"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Pill,
  Filter,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  ChevronDown,
  ChevronUp,
  BarChart2,
  ClipboardList,
  Package,
  Beaker,
  Layers,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Medicamento {
  id: string
  nome: string
  principio_ativo: string
  concentracao: string
  forma_farmaceutica: string
  fabricante: string | null
  ativo: boolean
  createdAt: string
  updatedAt: string
}

export default function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    principio_ativo: "",
    concentracao: "",
    forma_farmaceutica: "",
    fabricante: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [formaFilter, setFormaFilter] = useState("")
  const [ativoFilter, setAtivoFilter] = useState("all")
  const [sortField, setSortField] = useState<string>("nome")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const router = useRouter()

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const res = await fetch("/api/medicamentos")
        if (res.ok) {
          const data = await res.json()
          setMedicamentos(data)
        }
      } catch (error) {
        console.error("Erro:", error)
        setErrorMessage("Falha ao carregar medicamentos")
      } finally {
        setLoading(false)
      }
    }

    fetchMedicamentos()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      principio_ativo: "",
      concentracao: "",
      forma_farmaceutica: "",
      fabricante: "",
    })
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!formData.nome || !formData.principio_ativo || !formData.concentracao || !formData.forma_farmaceutica) {
        setErrorMessage("Nome, princípio ativo, concentração e forma farmacêutica são obrigatórios")
        return
      }

      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/medicamentos/${editingId}` : "/api/medicamentos"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erro ao salvar medicamento")
      }

      setSuccessMessage(editingId ? "Medicamento atualizado com sucesso" : "Medicamento cadastrado com sucesso")
      setTimeout(() => setSuccessMessage(""), 3000)

      setIsModalOpen(false)
      resetForm()

      const res = await fetch("/api/medicamentos")
      if (res.ok) {
        const data = await res.json()
        setMedicamentos(data)
      }
    } catch (error) {
      console.error("Erro:", error)
      setErrorMessage("Não foi possível salvar o medicamento")
      setTimeout(() => setErrorMessage(""), 3000)
    }
  }

  const handleEdit = (medicamento: Medicamento) => {
    setFormData({
      nome: medicamento.nome,
      principio_ativo: medicamento.principio_ativo,
      concentracao: medicamento.concentracao,
      forma_farmaceutica: medicamento.forma_farmaceutica,
      fabricante: medicamento.fabricante || "",
    })
    setEditingId(medicamento.id)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este medicamento?")) {
      return
    }

    try {
      const response = await fetch(`/api/medicamentos/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao excluir medicamento")
      }

      setSuccessMessage("Medicamento excluído com sucesso")
      setTimeout(() => setSuccessMessage(""), 3000)

      const res = await fetch("/api/medicamentos")
      if (res.ok) {
        const data = await res.json()
        setMedicamentos(data)
      }
    } catch (error) {
      console.error("Erro:", error)
      setErrorMessage("Não foi possível excluir o medicamento")
      setTimeout(() => setErrorMessage(""), 3000)
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
    if (selectedItems.length === filteredMedicamentos.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredMedicamentos.map((m) => m.id))
    }
  }

  const handleBulkDelete = async () => {
    if (!selectedItems.length) return

    if (!confirm(`Tem certeza que deseja excluir ${selectedItems.length} medicamentos?`)) return

    try {
      for (const id of selectedItems) {
        await fetch(`/api/medicamentos/${id}`, {
          method: "DELETE",
        })
      }

      setMedicamentos(medicamentos.filter((m) => !selectedItems.includes(m.id)))
      setSelectedItems([])
      setSuccessMessage(`${selectedItems.length} medicamentos excluídos com sucesso`)
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Erro ao excluir em massa:", error)
      setErrorMessage("Erro ao excluir medicamentos")
      setTimeout(() => setErrorMessage(""), 3000)
    }
  }

  const exportToCSV = () => {
    if (!filteredMedicamentos.length) return

    const headers = ["Nome", "Princípio Ativo", "Concentração", "Forma Farmacêutica", "Fabricante", "Ativo"]

    const csvContent = [
      headers.join(","),
      ...filteredMedicamentos.map((m) =>
        [
          `"${m.nome}"`,
          `"${m.principio_ativo}"`,
          `"${m.concentracao}"`,
          `"${m.forma_farmaceutica}"`,
          `"${m.fabricante || ""}"`,
          `"${m.ativo ? "Sim" : "Não"}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `medicamentos_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  let filteredMedicamentos = [...medicamentos]

  if (searchTerm) {
    filteredMedicamentos = filteredMedicamentos.filter(
      (medicamento) =>
        medicamento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicamento.principio_ativo.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  if (formaFilter) {
    filteredMedicamentos = filteredMedicamentos.filter((medicamento) => medicamento.forma_farmaceutica === formaFilter)
  }

  if (ativoFilter !== "all") {
    filteredMedicamentos = filteredMedicamentos.filter((medicamento) => medicamento.ativo === (ativoFilter === "true"))
  }

  filteredMedicamentos.sort((a, b) => {
    const aValue: any = a[sortField as keyof Medicamento]
    const bValue: any = b[sortField as keyof Medicamento]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const formasFarmaceuticas = Array.from(new Set(medicamentos.map((m) => m.forma_farmaceutica))).sort()

  const totalMedicamentos = medicamentos.length
  const medicamentosAtivos = medicamentos.filter((m) => m.ativo).length
  const medicamentosInativos = medicamentos.filter((m) => !m.ativo).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header title="Medicamentos" />

      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-4">
              <Package size={24} className="text-[#4d9d74]" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total de Medicamentos</h3>
              <p className="text-2xl font-bold text-gray-900">{totalMedicamentos}</p>
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
              <h3 className="text-sm font-medium text-gray-500">Ativos</h3>
              <p className="text-2xl font-bold text-gray-900">{medicamentosAtivos}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
              <XCircle size={24} className="text-red-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Inativos</h3>
              <p className="text-2xl font-bold text-gray-900">{medicamentosInativos}</p>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 flex items-center rounded-r-lg"
            >
              <CheckCircle size={20} className="text-green-500 mr-3" />
              <p className="text-green-700">{successMessage}</p>
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 flex items-center rounded-r-lg"
            >
              <AlertCircle size={20} className="text-red-500 mr-3" />
              <p className="text-red-700">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] transition-all shadow-sm"
                placeholder="Buscar por nome ou princípio ativo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={() => {
                resetForm()
                setIsModalOpen(true)
              }}
              className="code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={18} className="mr-2" />
              Novo Medicamento
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Forma Farmacêutica</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setFormaFilter("")}
                        className={`px-4 py-2 rounded-lg border ${
                          formaFilter === ""
                            ? "bg-[#4d9d74] text-white border-[#4d9d74]"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        Todas
                      </button>
                      {formasFarmaceuticas.slice(0, 5).map((forma) => (
                        <button
                          key={forma}
                          onClick={() => setFormaFilter(forma)}
                          className={`px-4 py-2 rounded-lg border ${
                            formaFilter === forma
                              ? "bg-[#4d9d74] text-white border-[#4d9d74]"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {forma}
                        </button>
                      ))}
                      {formasFarmaceuticas.length > 5 && (
                        <select
                          value={formaFilter}
                          onChange={(e) => setFormaFilter(e.target.value)}
                          className="px-4 py-2 rounded-lg border border-gray-200 bg-white"
                        >
                          <option value="">Mais formas...</option>
                          {formasFarmaceuticas.slice(5).map((forma) => (
                            <option key={forma} value={forma}>
                              {forma}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAtivoFilter("all")}
                        className={`px-4 py-2 rounded-lg border ${
                          ativoFilter === "all"
                            ? "bg-[#4d9d74] text-white border-[#4d9d74]"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        Todos
                      </button>
                      <button
                        onClick={() => setAtivoFilter("true")}
                        className={`px-4 py-2 rounded-lg border ${
                          ativoFilter === "true"
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <CheckCircle size={14} className="inline mr-1" />
                        Ativo
                      </button>
                      <button
                        onClick={() => setAtivoFilter("false")}
                        className={`px-4 py-2 rounded-lg border ${
                          ativoFilter === "false"
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <XCircle size={14} className="inline mr-1" />
                        Inativo
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
                <div key={i} className="h-20 bg-gray-200 skeleton rounded-lg"></div>
              ))}
            </div>
          ) : filteredMedicamentos.length === 0 ? (
            <div className="p-8 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4"
              >
                <Pill size={32} className="text-gray-400" />
              </motion.div>
              <h3 className="code-bold text-xl mb-2">Nenhum medicamento encontrado</h3>
              <p className="text-gray-700 mb-6 max-w-md mx-auto">
                {searchTerm || formaFilter || ativoFilter !== "all"
                  ? "Nenhum resultado para sua busca. Tente outros filtros."
                  : "Você ainda não cadastrou nenhum medicamento."}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  resetForm()
                  setIsModalOpen(true)
                }}
                className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Cadastrar Medicamento
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
                        checked={
                          selectedItems.length === filteredMedicamentos.length && filteredMedicamentos.length > 0
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#4d9d74] focus:ring-[#4d9d74]"
                      />
                    </th>
                    <th
                      className="px-4 py-3 text-xs code-bold text-black uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("nome")}
                    >
                      <div className="flex items-center">
                        Nome
                        {sortField === "nome" && (
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
                      onClick={() => handleSort("principio_ativo")}
                    >
                      <div className="flex items-center">
                        Princípio Ativo
                        {sortField === "principio_ativo" && (
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
                      onClick={() => handleSort("concentracao")}
                    >
                      <div className="flex items-center">
                        Concentração
                        {sortField === "concentracao" && (
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
                      onClick={() => handleSort("forma_farmaceutica")}
                    >
                      <div className="flex items-center">
                        Forma
                        {sortField === "forma_farmaceutica" && (
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
                  {filteredMedicamentos.map((medicamento) => (
                    <motion.tr
                      key={medicamento.id}
                      className="hover:bg-gray-50 transition-colors"
                      whileHover={{ backgroundColor: "rgba(77, 157, 116, 0.05)" }}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(medicamento.id)}
                          onChange={() => handleSelectItem(medicamento.id)}
                          className="rounded border-gray-300 text-[#4d9d74] focus:ring-[#4d9d74]"
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                            <Pill size={16} className="text-[#4d9d74]" />
                          </div>
                          <div className="font-medium text-gray-900">{medicamento.nome}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-700">{medicamento.principio_ativo}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-700">{medicamento.concentracao}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-700">{medicamento.forma_farmaceutica}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            medicamento.ativo
                              ? "text-green-600 bg-green-50 border border-green-200"
                              : "text-red-600 bg-red-50 border border-red-200"
                          }`}
                        >
                          {medicamento.ativo ? (
                            <CheckCircle size={14} className="mr-1" />
                          ) : (
                            <XCircle size={14} className="mr-1" />
                          )}
                          {medicamento.ativo ? "Ativo" : "Inativo"}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => handleEdit(medicamento)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64] transition-colors"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => handleDelete(medicamento.id)}
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
              {filteredMedicamentos.map((medicamento) => (
                <motion.div
                  key={medicamento.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                        <Pill size={18} className="text-[#4d9d74]" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{medicamento.nome}</div>
                        <div className="text-sm text-gray-500">{medicamento.concentracao}</div>
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        medicamento.ativo
                          ? "text-green-600 bg-green-50 border border-green-200"
                          : "text-red-600 bg-red-50 border border-red-200"
                      }`}
                    >
                      {medicamento.ativo ? (
                        <CheckCircle size={14} className="mr-1" />
                      ) : (
                        <XCircle size={14} className="mr-1" />
                      )}
                      {medicamento.ativo ? "Ativo" : "Inativo"}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-500 mb-1">Princípio Ativo</div>
                      <div className="flex items-center">
                        <Beaker size={14} className="text-[#4d9d74] mr-1" />
                        <span className="text-gray-900">{medicamento.principio_ativo}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-500 mb-1">Forma Farmacêutica</div>
                      <div className="flex items-center">
                        <Layers size={14} className="text-[#4d9d74] mr-1" />
                        <span className="text-gray-900">{medicamento.forma_farmaceutica}</span>
                      </div>
                    </div>
                    {medicamento.fabricante && (
                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-500 mb-1">Fabricante</div>
                        <div className="text-gray-900">{medicamento.fabricante}</div>
                      </div>
                    )}
                    <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleEdit(medicamento)}
                        className="p-2 text-[#4d9d74] hover:text-[#3a8a64] transition-colors"
                        aria-label="Editar"
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDelete(medicamento.id)}
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

        {filteredMedicamentos.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Mostrando <span className="font-medium">{filteredMedicamentos.length}</span> de{" "}
              <span className="font-medium">{medicamentos.length}</span> medicamentos
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

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{editingId ? "Editar Medicamento" : "Novo Medicamento"}</h2>
                  <button
                    onClick={() => {
                      resetForm()
                      setIsModalOpen(false)
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XCircle size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Medicamento *</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Princípio Ativo *</label>
                    <input
                      type="text"
                      name="principio_ativo"
                      value={formData.principio_ativo}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Concentração *</label>
                    <input
                      type="text"
                      name="concentracao"
                      value={formData.concentracao}
                      onChange={handleInputChange}
                      required
                      placeholder="Ex: 500mg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Forma Farmacêutica *</label>
                    <select
                      name="forma_farmaceutica"
                      value={formData.forma_farmaceutica}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent transition-all"
                    >
                      <option value="">Selecione uma forma</option>
                      <option value="Comprimido">Comprimido</option>
                      <option value="Cápsula">Cápsula</option>
                      <option value="Solução">Solução</option>
                      <option value="Suspensão">Suspensão</option>
                      <option value="Injetável">Injetável</option>
                      <option value="Pomada">Pomada</option>
                      <option value="Creme">Creme</option>
                      <option value="Gel">Gel</option>
                      <option value="Spray">Spray</option>
                      <option value="Gotas">Gotas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fabricante</label>
                    <input
                      type="text"
                      name="fabricante"
                      value={formData.fabricante}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => {
                        resetForm()
                        setIsModalOpen(false)
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="flex-1 px-4 py-2 bg-[#4d9d74] text-white rounded-md hover:bg-[#3a7d59] transition-colors"
                    >
                      {editingId ? "Atualizar" : "Cadastrar"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
