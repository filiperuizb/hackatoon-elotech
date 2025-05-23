"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import {
  Plus,
  Search,
  Building2,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Filter,
  Download,
  RefreshCw,
  Mail,
  Clock,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface TipoUnidade {
  id: string
  codigo: string
  nome: string
  descricao?: string
}

interface Unidade {
  id: string
  nome: string
  endereco?: string
  telefone?: string
  email?: string
  tipo_id?: string
  tipo?: TipoUnidade
  cnes?: string
  horario_funcionamento?: string
  cidade?: string
  estado?: string
}

export default function Unidades() {
  const [unidades, setUnidades] = useState<Unidade[]>([])
  const [tiposUnidade, setTiposUnidade] = useState<TipoUnidade[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTipoId, setFilterTipoId] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<string>("nome")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposRes = await fetch("/api/tipo-unidades")
        if (tiposRes.ok) {
          const tiposData = await tiposRes.json()
          setTiposUnidade(tiposData)
        }

        const unidadesRes = await fetch("/api/unidades")
        if (unidadesRes.ok) {
          const unidadesData = await unidadesRes.json()
          setUnidades(unidadesData)
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const sortedUnidades = [...unidades].sort((a, b) => {
    if (sortBy === "nome") {
      return sortOrder === "asc" ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome)
    } else if (sortBy === "tipo") {
      const tipoA = a.tipo?.nome || ""
      const tipoB = b.tipo?.nome || ""
      return sortOrder === "asc" ? tipoA.localeCompare(tipoB) : tipoB.localeCompare(tipoA)
    }
    return 0
  })

  const filteredUnidades = sortedUnidades.filter((unidade) => {
    const matchesSearch =
      unidade.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unidade.endereco?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      unidade.tipo?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false

    const matchesTipo = !filterTipoId || unidade.tipo_id === filterTipoId

    return matchesSearch && matchesTipo
  })

  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      try {
        const res = await fetch(`/api/unidades/${id}`, {
          method: "DELETE",
        })

        if (res.ok) {
          setUnidades(unidades.filter((unidade) => unidade.id !== id))
        } else {
          alert("Erro ao excluir unidade")
        }
      } catch (error) {
        console.error("Erro:", error)
        alert("Erro ao excluir unidade")
      }
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(id)
      setTimeout(() => setDeleteConfirm(null), 3000)
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
    const headers = ["Nome", "Tipo", "CNES", "Endereço", "Telefone", "Email"]
    const data = filteredUnidades.map((u) => [
      u.nome,
      u.tipo?.nome || "N/A",
      u.cnes || "N/A",
      u.endereco || "N/A",
      u.telefone || "N/A",
      u.email || "N/A",
    ])

    const csvContent = [headers.join(","), ...data.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `unidades_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const totalUnidades = unidades.length
  const tipoStats = unidades.reduce(
    (acc, unidade) => {
      const tipoNome = unidade.tipo?.nome || "Não categorizado"
      acc[tipoNome] = (acc[tipoNome] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const tipoMaisComum = Object.entries(tipoStats).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header title="Unidades de Saúde" />

      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-200"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Building2 size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total de Unidades</p>
                <h3 className="text-2xl font-bold">{totalUnidades}</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-200"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <MapPin size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tipo Mais Comum</p>
                <h3 className="text-2xl font-bold">{tipoMaisComum}</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-200"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <Clock size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Última Atualização</p>
                <h3 className="text-lg font-bold">{new Date().toLocaleDateString()}</h3>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full sm:w-80 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                placeholder="Buscar por nome, endereço, tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-3 py-2 border rounded-lg transition-colors ${
                  showFilters
                    ? "bg-[#4d9d74] text-white border-[#4d9d74]"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Filter size={18} className="mr-2" />
                <span>Filtros</span>
              </button>

              <button
                onClick={exportToCSV}
                className="flex items-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <Download size={18} className="mr-2" />
                <span>Exportar</span>
              </button>

              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 ${
                    viewMode === "table" ? "bg-[#4d9d74] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="3" y1="15" x2="21" y2="15"></line>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                    <line x1="15" y1="3" x2="15" y2="21"></line>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-2 ${
                    viewMode === "cards" ? "bg-[#4d9d74] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/unidades/nova")}
            className="code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors btn-animated"
          >
            <Plus size={18} className="mr-2" />
            Nova Unidade
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Unidade</label>
                  <select
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                    value={filterTipoId}
                    onChange={(e) => setFilterTipoId(e.target.value)}
                  >
                    <option value="">Todos</option>
                    {tiposUnidade.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleSort("nome")}
                      className={`px-3 py-1.5 rounded-md text-sm ${
                        sortBy === "nome" ? "bg-[#4d9d74] text-white" : "bg-white border border-gray-200 text-gray-700"
                      }`}
                    >
                      Nome {sortBy === "nome" && (sortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => toggleSort("tipo")}
                      className={`px-3 py-1.5 rounded-md text-sm ${
                        sortBy === "tipo" ? "bg-[#4d9d74] text-white" : "bg-white border border-gray-200 text-gray-700"
                      }`}
                    >
                      Tipo {sortBy === "tipo" && (sortOrder === "asc" ? "↑" : "↓")}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSearchTerm("")
                    setFilterTipoId("")
                    setSortBy("nome")
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

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 skeleton rounded"></div>
            ))}
          </div>
        ) : filteredUnidades.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-8 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
              className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"
            >
              <Building2 size={24} className="text-gray-400" />
            </motion.div>
            <h3 className="code-bold text-lg mb-2">Nenhuma unidade encontrada</h3>
            <p className="text-gray-700 mb-6">
              {searchTerm || filterTipoId
                ? "Nenhum resultado para sua busca. Tente outros termos."
                : "Você ainda não cadastrou nenhuma unidade de saúde."}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/unidades/nova")}
              className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors btn-animated"
            >
              <Plus size={18} className="mr-2" />
              Cadastrar Unidade
            </motion.button>
          </div>
        ) : viewMode === "table" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">CNES</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Endereço</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Telefone</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUnidades.map((unidade) => (
                    <motion.tr
                      key={unidade.id}
                      className="hover:bg-gray-50 transition-colors table-row-animated"
                      whileHover={{ x: 2 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                            <Building2 size={16} className="text-[#4d9d74]" />
                          </div>
                          <div>
                            <div className="code-bold text-black">{unidade.nome}</div>
                            <div className="text-sm text-gray-700">{unidade.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {unidade.tipo?.nome || "Não categorizado"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{unidade.cnes || "Não informado"}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <MapPin size={16} className="text-gray-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-900 line-clamp-2">
                            {unidade.endereco || "Endereço não informado"}
                            {unidade.cidade && `, ${unidade.cidade}`}
                            {unidade.estado && ` - ${unidade.estado}`}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Phone size={16} className="text-gray-500 mr-2" />
                          <span className="text-gray-900">{unidade.telefone || "Não informado"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => router.push(`/unidades/${unidade.id}`)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64]"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </motion.button>

                          {deleteConfirm === unidade.id ? (
                            <div className="flex items-center space-x-1">
                              <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                className="p-1 bg-red-600 text-white rounded-md text-xs"
                                onClick={() => handleDelete(unidade.id)}
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
                              onClick={() => setDeleteConfirm(unidade.id)}
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
              </table>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUnidades.map((unidade) => (
              <motion.div
                key={unidade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-[#4d9d74] transition-all"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                        <Building2 size={20} className="text-[#4d9d74]" />
                      </div>
                      <div>
                        <h3 className="code-bold text-lg text-gray-900">{unidade.nome}</h3>
                        <span className="inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {unidade.tipo?.nome || "Não categorizado"}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => router.push(`/unidades/${unidade.id}`)}
                        className="p-1 text-[#4d9d74] hover:text-[#3a8a64] bg-[#4d9d74]/10 rounded-full"
                        aria-label="Editar"
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setDeleteConfirm(unidade.id)}
                        className="p-1 text-red-600 hover:text-red-800 bg-red-50 rounded-full"
                        aria-label="Excluir"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>

                  {deleteConfirm === unidade.id && (
                    <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg text-center">
                      <p className="text-sm text-red-700 mb-2">Confirmar exclusão?</p>
                      <div className="flex justify-center space-x-2">
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded-md text-xs"
                          onClick={() => handleDelete(unidade.id)}
                        >
                          Sim, excluir
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-xs"
                          onClick={() => setDeleteConfirm(null)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 text-sm">
                    {unidade.cnes && (
                      <div className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs font-bold text-gray-600">#</span>
                        </div>
                        <div>
                          <p className="text-gray-500">CNES</p>
                          <p className="text-gray-900">{unidade.cnes}</p>
                        </div>
                      </div>
                    )}

                    {unidade.endereco && (
                      <div className="flex items-start">
                        <MapPin size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-500">Endereço</p>
                          <p className="text-gray-900">
                            {unidade.endereco}
                            {unidade.cidade && `, ${unidade.cidade}`}
                            {unidade.estado && ` - ${unidade.estado}`}
                          </p>
                        </div>
                      </div>
                    )}

                    {unidade.telefone && (
                      <div className="flex items-start">
                        <Phone size={16} className="text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-gray-500">Telefone</p>
                          <p className="text-gray-900">{unidade.telefone}</p>
                        </div>
                      </div>
                    )}

                    {unidade.email && (
                      <div className="flex items-start">
                        <Mail size={16} className="text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="text-gray-900">{unidade.email}</p>
                        </div>
                      </div>
                    )}

                    {unidade.horario_funcionamento && (
                      <div className="flex items-start">
                        <Clock size={16} className="text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-gray-500">Horário</p>
                          <p className="text-gray-900">{unidade.horario_funcionamento}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
