"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Plus, Search, Edit, Trash2, Pill } from "lucide-react"
import { motion } from "framer-motion"

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
      } finally {
        setLoading(false)
      }
    }

    fetchMedicamentos()
  }, [])

  const filteredMedicamentos = medicamentos.filter((medicamento) => {
    return (
      medicamento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicamento.principio_ativo.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

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
        alert("Nome, princípio ativo, concentração e forma farmacêutica são obrigatórios")
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

      alert(editingId ? "Medicamento atualizado com sucesso" : "Medicamento cadastrado com sucesso")

      setIsModalOpen(false)
      resetForm()

      // Recarregar a lista
      const res = await fetch("/api/medicamentos")
      if (res.ok) {
        const data = await res.json()
        setMedicamentos(data)
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Não foi possível salvar o medicamento")
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

      alert("Medicamento excluído com sucesso")

      // Recarregar a lista
      const res = await fetch("/api/medicamentos")
      if (res.ok) {
        const data = await res.json()
        setMedicamentos(data)
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Não foi possível excluir o medicamento")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Medicamentos" />

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
                placeholder="Buscar por nome ou princípio ativo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
            Novo Medicamento
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
          ) : filteredMedicamentos.length === 0 ? (
            <div className="p-8 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"
              >
                <Pill size={24} className="text-gray-400" />
              </motion.div>
              <h3 className="code-bold text-lg mb-2">Nenhum medicamento encontrado</h3>
              <p className="text-gray-700 mb-6">
                {searchTerm
                  ? "Nenhum resultado para sua busca. Tente outros termos."
                  : "Você ainda não cadastrou nenhum medicamento."}
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
                Cadastrar Medicamento
              </motion.button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Princípio Ativo</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Concentração</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Forma</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMedicamentos.map((medicamento) => (
                    <motion.tr
                      key={medicamento.id}
                      className="hover:bg-gray-50 transition-colors table-row-animated"
                      whileHover={{ x: 2 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-3">
                            <Pill size={16} className="text-[#4d9d74]" />
                          </div>
                          <div className="code-bold text-black">{medicamento.nome}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-black">{medicamento.principio_ativo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-black">{medicamento.concentracao}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-black">{medicamento.forma_farmaceutica}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => handleEdit(medicamento)}
                            className="p-1 text-[#4d9d74] hover:text-[#3a8a64]"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => handleDelete(medicamento.id)}
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
              <h2 className="text-xl font-semibold mb-4">{editingId ? "Editar Medicamento" : "Novo Medicamento"}</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Medicamento *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Princípio Ativo *</label>
                  <input
                    type="text"
                    name="principio_ativo"
                    value={formData.principio_ativo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent input-animated"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent input-animated"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Forma Farmacêutica *</label>
                  <select
                    name="forma_farmaceutica"
                    value={formData.forma_farmaceutica}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent input-animated"
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
