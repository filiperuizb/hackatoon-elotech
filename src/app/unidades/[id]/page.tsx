"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import { Save, ArrowLeft, AlertCircle, CheckCircle, Building2, MapPin, Clock } from "lucide-react"
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
  observacoes?: string
}

export default function EditarUnidade() {
  const [unidade, setUnidade] = useState<Unidade | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    const fetchUnidade = async () => {
      try {
        const res = await fetch(`/api/unidades/${id}`)
        if (!res.ok) throw new Error("Falha ao buscar unidade")
        const data = await res.json()
        setUnidade(data)
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar os dados da unidade")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchUnidade()
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

    if (!unidade.nome || !unidade.endereco || !unidade.telefone || !unidade.email || !unidade.tipo) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
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
      <div className="min-h-screen bg-white">
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
    <div className="min-h-screen bg-white">
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
                      <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Unidade *
                      </label>
                      <select
                        id="tipo"
                        name="tipo"
                        value={unidade.tipo}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                        required
                      >
                        <option value="UBS">Unidade Básica de Saúde (UBS)</option>
                        <option value="ESF">Estratégia Saúde da Família (ESF)</option>
                        <option value="UPA">Unidade de Pronto Atendimento (UPA)</option>
                        <option value="CAPS">Centro de Atenção Psicossocial (CAPS)</option>
                        <option value="HOSPITAL">Hospital</option>
                        <option value="POLICLINICA">Policlínica</option>
                        <option value="OUTRO">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="cnes" className="block text-sm font-medium text-gray-700 mb-1">
                        CNES (Cadastro Nacional de Estabelecimentos de Saúde)
                      </label>
                      <input
                        type="text"
                        id="cnes"
                        name="cnes"
                        value={unidade.cnes || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                      />
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
                        Endereço Completo *
                      </label>
                      <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={unidade.endereco}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        value={unidade.telefone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={unidade.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                        required
                      />
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
                      <input
                        type="text"
                        id="horario_funcionamento"
                        name="horario_funcionamento"
                        value={unidade.horario_funcionamento || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                        placeholder="Ex: Segunda a Sexta, 8h às 18h"
                      />
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
