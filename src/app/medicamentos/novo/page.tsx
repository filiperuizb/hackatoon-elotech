"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Save, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function NovoMedicamento() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    principio_ativo: "",
    concentracao: "",
    forma_farmaceutica: "",
    fabricante: "",
    ativo: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (!formData.nome || !formData.principio_ativo || !formData.concentracao || !formData.forma_farmaceutica) {
        setError("Nome, princípio ativo, concentração e forma farmacêutica são obrigatórios")
        setLoading(false)
        return
      }

      const response = await fetch("/api/medicamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erro ao cadastrar medicamento")
      }

      setSuccess("Medicamento cadastrado com sucesso!")
      setTimeout(() => {
        router.push("/medicamentos")
      }, 2000)
    } catch (error) {
      console.error("Erro:", error)
      setError("Não foi possível cadastrar o medicamento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header title="Novo Medicamento" />

      <main className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover-card"
        >
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 flex items-start mb-6">
              <AlertCircle size={20} className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border-l-4 border-green-500 flex items-start mb-6">
              <CheckCircle size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Medicamento *</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
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
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
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
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Forma Farmacêutica *</label>
                <select
                  name="forma_farmaceutica"
                  value={formData.forma_farmaceutica}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
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
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="ativo"
                  value={formData.ativo ? "true" : "false"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ativo: e.target.value === "true",
                    })
                  }
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => router.push("/medicamentos")}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft size={18} className="mr-2" />
                Voltar
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="flex items-center justify-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} className="mr-2" />
                {loading ? "Salvando..." : "Salvar medicamento"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
