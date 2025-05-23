"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Plus, Search, Building2, Edit, Trash2, MapPin, Phone, Filter, Download, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Unidade {
  id: string
  nome: string
  endereco: string
  telefone: string
  email: string
  tipo: string
  cnes?: string
  horario_funcionamento?: string
}

export default function Unidades() {
  const [unidades, setUnidades] = useState<Unidade[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTipo, setFilterTipo] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<string>("nome")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const res = await fetch("/api/unidades")
        if (res.ok) {
          const data = await res.json()
          setUnidades(data)
        }
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUnidades()
  }, [])

  const sortedUnidades = [...unidades].sort((a, b) => {
    if (sortBy === "nome") {
      return sortOrder === "asc" ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome)
    } else if (sortBy === "tipo") {
      return sortOrder === "asc" ? a.tipo.localeCompare(b.tipo) : b.tipo.localeCompare(a.tipo)
    }
    return 0
  })

  const filteredUnidades = sortedUnidades.filter((unidade) => {
    const matchesSearch =
      unidade.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unidade.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unidade.tipo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTipo = !filterTipo || unidade.tipo === filterTipo

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
    const data = filteredUnidades.map((u) => [u.nome, u.tipo, u.cnes || "N/A", u.endereco, u.telefone, u.email])

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

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "UBS":
        return "Unidade Básica de Saúde"
      case "ESF":
        return "Estratégia Saúde da Família"
      case "UPA":
        return "Unidade de Pronto Atendimento"
      case "CAPS":
        return "Centro de Atenção Psicossocial"
      case "HOSPITAL":
        return "Hospital"
      case "POLICLINICA":
        return "Policlínica"
      default:
        return tipo
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Unidades de Saúde" />

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
                placeholder="Buscar por nome, endereço, tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={18} className="mr-2 text-gray-500" />
                <span>Filtros</span>
              </button>

              <button
                onClick={exportToCSV}
                className="flex items-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download size={18} className="mr-2 text-gray-500" />
                <span>Exportar</span>
              </button>
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
              className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Unidade</label>
                  <select
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                    value={filterTipo}
                    onChange={(e) => setFilterTipo(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="UBS">Unidade Básica de Saúde (UBS)</option>
                    <option value="ESF">Estratégia Saúde da Família (ESF)</option>
                    <option value="UPA">Unidade de Pronto Atendimento (UPA)</option>
                    <option value="CAPS">Centro de Atenção Psicossocial (CAPS)</option>
                    <option value="HOSPITAL">Hospital</option>
                    <option value="POLICLINICA">Policlínica</option>
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
                    setFilterTipo("")
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
          ) : filteredUnidades.length === 0 ? (
            <div className="p-8 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"
              >
                <Building2 size={24} className="text-gray-400" />
              </motion.div>
              <h3 className="code-bold text-lg mb-2">Nenhuma unidade encontrada</h3>
              <p className="text-gray-700 mb-6">
                {searchTerm || filterTipo
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
          ) : (
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
                          {getTipoLabel(unidade.tipo)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{unidade.cnes || "Não informado"}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <MapPin size={16} className="text-gray-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-900 line-clamp-2">{unidade.endereco}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Phone size={16} className="text-gray-500 mr-2" />
                          <span className="text-gray-900">{unidade.telefone}</span>
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
          )}
        </motion.div>
      </main>
    </div>
  )
}
