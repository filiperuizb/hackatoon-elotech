"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface TipoProcedimento {
  id: string
  nome: string
}

export default function NovoProcedimentoPage() {
  const router = useRouter()
  const [tiposProcedimento, setTiposProcedimento] = useState<TipoProcedimento[]>([])
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    descricao: "",
    valor: "",
    tipo_procedimento_id: "",
  })
  const [loading, setLoading] = useState(false)
  const [loadingTipos, setLoadingTipos] = useState(true)

  useEffect(() => {
    const fetchTiposProcedimento = async () => {
      try {
        const response = await fetch("/api/tipos-procedimento")

        if (!response.ok) {
          throw new Error("Erro ao buscar tipos de procedimento")
        }

        const data = await response.json()
        setTiposProcedimento(data)
      } catch (error) {
        console.error("Erro:", error)
        alert("Não foi possível carregar os tipos de procedimento")
      } finally {
        setLoadingTipos(false)
      }
    }

    fetchTiposProcedimento()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      if (!formData.nome || !formData.codigo || !formData.tipo_procedimento_id) {
        alert("Nome, código e tipo de procedimento são obrigatórios")
        setLoading(false)
        return
      }

      // Converter valor para número se não estiver vazio
      const valorNumerico = formData.valor ? Number.parseFloat(formData.valor) : null

      const response = await fetch("/api/procedimentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          valor: valorNumerico,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao cadastrar procedimento")
      }

      alert("Procedimento cadastrado com sucesso!")
      router.push("/procedimentos")
    } catch (error) {
      console.error("Erro:", error)
      alert("Não foi possível cadastrar o procedimento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/procedimentos" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Novo Procedimento</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {loadingTipos ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código *</label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Procedimento *</label>
                <select
                  name="tipo_procedimento_id"
                  value={formData.tipo_procedimento_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d9d74] focus:border-transparent"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Link
                href="/procedimentos"
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
        )}
      </div>
    </div>
  )
}
