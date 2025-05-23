"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NovoMedicamentoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    principio_ativo: "",
    concentracao: "",
    forma_farmaceutica: "",
    fabricante: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      if (!formData.nome || !formData.principio_ativo || !formData.concentracao || !formData.forma_farmaceutica) {
        alert("Nome, princípio ativo, concentração e forma farmacêutica são obrigatórios")
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

      alert("Medicamento cadastrado com sucesso!")
      router.push("/medicamentos")
    } catch (error) {
      console.error("Erro:", error)
      alert("Não foi possível cadastrar o medicamento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/medicamentos" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Novo Medicamento</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Medicamento *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Concentração *</label>
              <input
                type="text"
                name="concentracao"
                value={formData.concentracao}
                onChange={handleInputChange}
                required
                placeholder="Ex: 500mg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Forma Farmacêutica *</label>
              <select
                name="forma_farmaceutica"
                value={formData.forma_farmaceutica}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent"
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fabricante</label>
            <input
              type="text"
              name="fabricante"
              value={formData.fabricante}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Link
              href="/medicamentos"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#4d9d74] text-white rounded-md hover:bg-[#3a7d59] transition-colors disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
