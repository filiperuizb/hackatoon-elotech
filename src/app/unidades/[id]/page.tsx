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
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="code-bold text-lg text-gray-800 mb-4 flex items-center">
                    <Building2 size={20} className="mr-2 text-[#4d9d74]" />
                    Dados da Unidade
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome da Unidade *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={unidade.nome}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
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
                        value={unidade.tipo_id || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
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

                    <div>
                      <label htmlFor="cnes" className="block text-sm font-medium text-gray-700 mb-1">
                        CNES (Cadastro Nacional de Estabelecimentos de Saúde)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Hash size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="cnes"
                          name="cnes"
                          value={unidade.cnes || ""}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                          placeholder="0000000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="code-bold text-lg text-gray-800 mb-4 flex items-center">
                    <MapPin size={20} className="mr-2 text-[#4d9d74]" />
                    Contato e Localização
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
                        Endereço
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MapPin size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="endereco"
                          name="endereco"
                          value={unidade.endereco || ""}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                          placeholder="Rua, número, bairro"
                        />
                      </div>
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
                          value={unidade.cidade || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                        />
                      </div>
                      <div>
                        <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                          Estado
                        </label>
                        <select
                          id="estado"
                          name="estado"
                          value={unidade.estado || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                        >
                          <option value="">Selecione</option>
                          {estados.map((estado) => (
                            <option key={estado.sigla} value={estado.sigla}>
                              {estado.sigla} - {estado.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Phone size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="telefone"
                          name="telefone"
                          value={unidade.telefone || ""}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                          placeholder="(00) 0000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={unidade.email || ""}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                          placeholder="exemplo@email.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="code-bold text-lg text-gray-800 mb-4 flex items-center">
                    <Clock size={20} className="mr-2 text-[#4d9d74]" />
                    Informações Adicionais
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="horario_funcionamento" className="block text-sm font-medium text-gray-700 mb-1">
                        Horário de Funcionamento
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Clock size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="horario_funcionamento"
                          name="horario_funcionamento"
                          value={unidade.horario_funcionamento || ""}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                          placeholder="Ex: Segunda a Sexta, 8h às 18h"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                        Observações
                      </label>
                      <textarea
                        id="observacoes"
                        name="observacoes"
                        value={unidade.observacoes || ""}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                        placeholder="Informações adicionais sobre a unidade..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => router.push("/unidades")}
                className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft size={18} className="mr-2" />
                Cancelar
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={saving}
                className="code-bold flex items-center justify-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-animated"
              >
                <Save size={18} className="mr-2" />
                {saving ? "Salvando..." : "Salvar Alterações"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
