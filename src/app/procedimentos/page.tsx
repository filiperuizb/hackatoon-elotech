"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Plus, Search, Edit, Trash2, FileText, Calendar } from "lucide-react"
import { motion } from "framer-motion"

interface TipoProcedimento {
  id: string
  nome: string
}

interface Procedimento {
  id: string
  nome: string
  codigo: string
  descricao: string | null
  valor: number | null
  tipo_procedimento: TipoProcedimento
  tipo_procedimento_id: string
  ativo: boolean
  createdAt: string
  updatedAt: string
}

export default function Procedimentos() {
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([])
  const [tiposProcedimento, setTiposProcedimento] = useState<TipoProcedimento[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTipo, setSelectedTipo] = useState<string>("Todos os tipos")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    descricao: "",
    valor: "",
    tipo_procedimento_id: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [procedimentosRes, tiposRes] = await Promise.all([
          fetch("/api/procedimentos"),
          fetch("/api/tipos-procedimento"),
        ])

        if (procedimentosRes.ok) {
          const procedimentosData = await procedimentosRes.json()
          setProcedimentos(procedimentosData)
        }

        if (tiposRes.ok) {
          const tiposData = await tiposRes.json()
          setTiposProcedimento(tiposData)
        }
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProcedimentos = procedimentos.filter((procedimento) => {
    const matchesSearch =
      procedimento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedimento.codigo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTipo = selectedTipo === "Todos os tipos" || procedimento.tipo_procedimento.nome === selectedTipo

    return matchesSearch && matchesTipo
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      codigo: "",
      descricao: "",
      valor: "",
      tipo_procedimento_id: "",
    })
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!formData.nome || !formData.codigo || !formData.tipo_procedimento_id) {
        alert("Nome, código e tipo de procedimento são obrigatórios")
        return
      }

      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/procedimentos/${editingId}` : "/api/procedimentos"

      const valorNumerico = formData.valor ? Number.parseFloat(formData.valor) : null

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          valor: valorNumerico,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao salvar procedimento")
      }

      alert(editingId ? "Procedimento atualizado com sucesso" : "Procedimento cadastrado com sucesso")

      setIsModalOpen(false)
      resetForm()

      // Recarregar a lista
      const res = await fetch("/api/procedimentos")
      if (res.ok) {
        const data = await res.json()
        setProcedimentos(data)
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Não foi possível salvar o procedimento")
    }
  }

  const handleEdit = (procedimento: Procedimento) => {
    setFormData({
      nome: procedimento.nome,
      codigo: procedimento.codigo,
      descricao: procedimento.descricao || "",
      valor: procedimento.valor ? procedimento.valor.toString() : "",
      tipo_procedimento_id: procedimento.tipo_procedimento_id,
    })
    setEditingId(procedimento.id)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este procedimento?")) {
      return
    }

    try {
      const response = await fetch(`/api/procedimentos/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao excluir procedimento")
      }

      alert("Procedimento excluído com sucesso")

      // Recarregar a lista
      const res = await fetch("/api/procedimentos")
      if (res.ok) {
        const data = await res.json()
        setProcedimentos(data)
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Não foi possível excluir o procedimento")
    }
  }

  const formatCurrency = (value: number | null) => {
    if (value === null) return "-"
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Procedimentos" />

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
                placeholder="Buscar por nome ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                value={selectedTipo}
                onChange={(e) => setSelectedTipo(e.target.value)}
              >
                <option value="Todos os tipos">Todos os tipos</option>
                {tiposProcedimento.map((tipo) => (
                  <option key={tipo.id} value={tipo.nome}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              resetForm()
              setIsModalOpen(true)
            }}
            className="code-bold flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors btn-animated"
          >
            <Plus size={18} className="mr-2" />
            Novo Procedimento
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
          ) : filteredProcedimentos.length === 0 ? (
            <div className="p-8 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"
              >
                <FileText size={24} className="text-gray-400" />
              </motion.div>
              <h3 className="code-bold text-lg mb-2">Nenhum procedimento encontrado</h3>
              <p className="text-gray-700 mb-6">
                {searchTerm || selectedTipo !== "Todos os tipos"
                  ? "Nenhum resultado para sua busca. Tente outros filtros."
                  : "Você ainda não cadastrou nenhum procedimento."}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  resetForm()
                  setIsModalOpen(true)
                }}
                className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg transition-colors btn-animated"
              >
                <Plus size={18} className="mr-2" />
                Cadastrar Procedimento
              </motion.button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Código</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProcedimentos.map((procedimento) => (
                    <motion.tr
                      key={procedimento.id}
                      className="hover:bg-gray-50 transition-colors table-row-animated"
                      whileHover={{ x: 2 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="code-bold text-black">{procedimento.codigo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                            <FileText size={16} className="text-[#4d9d74]" />
                          </div>
                          <div className="text-black">{procedimento.nome}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-black">{procedimento.tipo_procedimento.nome}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-black">{formatCurrency(procedimento.valor)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => handleEdit(procedimento)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64]"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => handleDelete(procedimento.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            aria-label="Excluir"
                          >
                            <Trash2 size={18} />
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{editingId ? "Editar Procedimento" : "Novo Procedimento"}</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Código *</label>
                    <input
                      type="text"
                      name="codigo"
                      value={formData.codigo}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent input-animated"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Procedimento *</label>
                    <select
                      name="tipo_procedimento_id"
                      value={formData.tipo_procedimento_id}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent input-animated"
                    >
                      <option value="">Selecione um tipo</option>
                      {tiposProcedimento.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Procedimento *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent input-animated"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent input-animated"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                  <input
                    type="number"
                    name="valor"
                    step="0.01"
                    min="0"
                    value={formData.valor}
                    onChange={handleInputChange}
                    placeholder="0,00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent input-animated"
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
                    className="flex-1 px-4 py-2 bg-[#4d9d74] text-white rounded-md hover:bg-[#3a7d59] transition-colors btn-animated"
                  >
                    {editingId ? "Atualizar" : "Cadastrar"}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
