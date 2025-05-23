"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import { Save, ArrowLeft, AlertCircle, CheckCircle, Building2, MapPin, Clock, Mail, Phone, Hash } from "lucide-react"
import { motion } from "framer-motion"

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
  observacoes?: string
  cidade?: string
  estado?: string
  descricao?: string
}

export default function EditarUnidade() {
  const [unidade, setUnidade] = useState<Unidade | null>(null)
  const [tiposUnidade, setTiposUnidade] = useState<TipoUnidade[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposRes = await fetch("/api/tipo-unidades")
        if (tiposRes.ok) {
          const tiposData = await tiposRes.json()
          setTiposUnidade(tiposData)
        } else {
          console.error("Erro ao buscar tipos de unidade")
        }

        const unidadeRes = await fetch(`/api/unidades/${id}`)
        if (!unidadeRes.ok) throw new Error("Falha ao buscar unidade")
        const unidadeData = await unidadeRes.json()
        setUnidade(unidadeData)
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar os dados da unidade")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!unidade) return

    const { name, value } = e.target
    setUnidade({
      ...unidade,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!unidade) return

    setSaving(true)
    setError("")
    setSuccess("")

    if (!unidade.nome || !unidade.tipo_id) {
      setError("Preencha todos os campos obrigatórios")
      setSaving(false)
      return
    }

    try {
      const res = await fetch(`/api/unidades/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(unidade),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Falha ao atualizar unidade")
      }

      setSuccess("Unidade atualizada com sucesso!")
      setTimeout(() => {
        router.push("/unidades")
      }, 1500)
    } catch (error) {
      console.error("Erro ao salvar:", error)
      setError(error instanceof Error ? error.message : "Ocorreu um erro ao atualizar a unidade")
    } finally {
      setSaving(false)
    }
  }

  const estados = [
    { sigla: "AC", nome: "Acre" },
    { sigla: "AL", nome: "Alagoas" },
    { sigla: "AP", nome: "Amapá" },
    { sigla: "AM", nome: "Amazonas" },
    { sigla: "BA", nome: "Bahia" },
    { sigla: "CE", nome: "Ceará" },
    { sigla: "DF", nome: "Distrito Federal" },
    { sigla: "ES", nome: "Espírito Santo" },
    { sigla: "GO", nome: "Goiás" },
    { sigla: "MA", nome: "Maranhão" },
    { sigla: "MT", nome: "Mato Grosso" },
    { sigla: "MS", nome: "Mato Grosso do Sul" },
    { sigla: "MG", nome: "Minas Gerais" },
    { sigla: "PA", nome: "Pará" },
    { sigla: "PB", nome: "Paraíba" },
    { sigla: "PR", nome: "Paraná" },
    { sigla: "PE", nome: "Pernambuco" },
    { sigla: "PI", nome: "Piauí" },
    { sigla: "RJ", nome: "Rio de Janeiro" },
    { sigla: "RN", nome: "Rio Grande do Norte" },
    { sigla: "RS", nome: "Rio Grande do Sul" },
    { sigla: "RO", nome: "Rondônia" },
    { sigla: "RR", nome: "Roraima" },
    { sigla: "SC", nome: "Santa Catarina" },
    { sigla: "SP", nome: "São Paulo" },
    { sigla: "SE", nome: "Sergipe" },
    { sigla: "TO", nome: "Tocantins" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header title="Carregando..." />
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 skeleton rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !unidade) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header title="Erro" />
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => router.push("/unidades")}
              className="mt-4 code-bold bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!unidade) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header title="Editar Unidade de Saúde" />

      <main className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover-card"
        >
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 flex items-start">
              <AlertCircle size={20} className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border-l-4 border-green-500 flex items-start">
              <CheckCircle size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Unidade *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={unidade?.nome || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="tipo_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Unidade *
                  </label>
                  <select
                    id="tipo_id"
                    name="tipo_id"
                    value={unidade?.tipo_id || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                    required
                  >
                    <option value="">Selecione um tipo</option>
                    {tiposUnidade.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <div>
                  <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    value={unidade?.endereco || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      value={unidade?.cidade || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <select
                      id="estado"
                      name="estado"
                      value={unidade?.estado || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                    >
                      <option value="">Selecione</option>
                      {estados.map((estado) => (
                        <option key={estado.sigla} value={estado.sigla}>
                          {estado.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={unidade?.descricao || ''}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push('/unidades')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-[#4d9d74] hover:bg-[#3a8a64] text-white rounded-lg disabled:opacity-50"
              >
                {saving ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
