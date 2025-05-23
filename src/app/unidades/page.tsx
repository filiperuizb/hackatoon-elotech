"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Plus, Search, Building2, Edit, Trash2, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"

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
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
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

  const filteredUnidades = unidades.filter((unidade) => {
    return (
      unidade.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unidade.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unidade.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleDelete = async (id: string) => {
    if (confirmDelete === id) {
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
      setConfirmDelete(null)
    } else {
      setConfirmDelete(id)
      setTimeout(() => setConfirmDelete(null), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Unidades de Saúde" />

      <main className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                {searchTerm
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
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Endereço</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Telefone</th>
                    <th className="px-6 py-3 text-xs code-bold text-black uppercase tracking-wider">Tipo</th>
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
                            <div className="text-sm text-gray-700">{unidade.cnes || "CNES não informado"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <MapPin size={16} className="text-gray-500 mr-2" />
                          <span className="text-gray-900">{unidade.endereco}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Phone size={16} className="text-gray-500 mr-2" />
                          <span className="text-gray-900">{unidade.telefone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {unidade.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => router.push(`/unidades/${unidade.id}`)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            aria-label="Editar"
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => handleDelete(unidade.id)}
                            className={`p-1 ${
                              confirmDelete === unidade.id ? "text-red-600" : "text-gray-500 hover:text-red-600"
                            }`}
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
    </div>
  )
}
