"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import { ArrowLeft, Save, Trash } from "lucide-react"
import { motion } from "framer-motion"

interface Prontuario {
  id: string
  data_atendimento: string
  queixa_principal: string
  historia_doenca_atual: string
  historia_patologica: string
  historia_familiar: string
  historia_social: string
  exame_fisico: string
  pressao_arterial: string
  frequencia_cardiaca: string
  temperatura: string
  peso_atual: number
  altura_atual: number
  hipotese_diagnostica: string
  diagnostico_definitivo: string
  conduta: string
  observacoes: string
  retorno: string
  paciente_id: string
  profissional_saude_id: string
  consulta_id?: string
  paciente: {
    id: string
    nome: string
    cpf: string
    data_nascimento: string
    telefone: string
    email: string
  }
  profissional_saude: {
    id: string
    nome: string
    especialidade: {
      nome: string
    }
  }
  consulta?: {
    id: string
    data: string
    status: string
  }
}

interface Paciente {
  id: string
  nome: string
}

interface ProfissionalSaude {
  id: string
  nome: string
}

interface Consulta {
  id: string
  data: string
  paciente: {
    nome: string
  }
}

export default function EditarProntuario() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [prontuario, setProntuario] = useState<Prontuario | null>(null)
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [profissionais, setProfissionais] = useState<ProfissionalSaude[]>([])
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProntuario = async () => {
      try {
        const res = await fetch(`/api/prontuarios/${id}`)
        if (!res.ok) throw new Error("Falha ao buscar prontuário")
        const data = await res.json()
        setProntuario(data)
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar o prontuário")
      }
    }

    const fetchPacientes = async () => {
      try {
        const res = await fetch("/api/pacientes")
        if (!res.ok) throw new Error("Falha ao buscar pacientes")
        const data = await res.json()
        setPacientes(data)
      } catch (error) {
        console.error("Erro:", error)
      }
    }

    const fetchProfissionais = async () => {
      try {
        const res = await fetch("/api/profissionais")
        if (!res.ok) throw new Error("Falha ao buscar profissionais")
        const data = await res.json()
        setProfissionais(data)
      } catch (error) {
        console.error("Erro:", error)
      }
    }

    const fetchConsultas = async () => {
      try {
        const res = await fetch("/api/consultas")
        if (!res.ok) throw new Error("Falha ao buscar consultas")
        const data = await res.json()
        setConsultas(data)
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProntuario()
    fetchPacientes()
    fetchProfissionais()
    fetchConsultas()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProntuario((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prontuario) return

    setSaving(true)
    try {
      const res = await fetch(`/api/prontuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prontuario),
      })

      if (!res.ok) throw new Error("Falha ao atualizar prontuário")

      router.push(`/prontuarios/${id}`)
    } catch (error) {
      console.error("Erro:", error)
      setError("Não foi possível atualizar o prontuário")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este prontuário?")) return

    try {
      const res = await fetch(`/api/prontuarios/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Falha ao excluir prontuário")

      router.push("/prontuarios")
    } catch (error) {
      console.error("Erro:", error)
      setError("Não foi possível excluir o prontuário")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header title="Carregando..." />
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 skeleton rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !prontuario) {
    return (
      <div className="min-h-screen bg-white">
        <Header title="Erro" />
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-red-600">{error || "Prontuário não encontrado"}</p>
            <button
              onClick={() => router.push("/prontuarios")}
              className="mt-4 bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Editar Prontuário" />

      <main className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(`/prontuarios/${id}`)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft size={18} className="mr-2" />
            Voltar
          </motion.button>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDelete}
              className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              <Trash size={18} className="mr-2" />
              Excluir
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center px-4 py-2 bg-[#4d9d74] hover:bg-[#3a8a64] text-white rounded-lg disabled:opacity-50"
            >
              <Save size={18} className="mr-2" />
              {saving ? "Salvando..." : "Salvar"}
            </motion.button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Básicas</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                <select
                  name="paciente_id"
                  value={prontuario.paciente_id}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                >
                  <option value="">Selecione um paciente</option>
                  {pacientes.map((paciente) => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profissional de Saúde</label>
                <select
                  name="profissional_saude_id"
                  value={prontuario.profissional_saude_id}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                >
                  <option value="">Selecione um profissional</option>
                  {profissionais.map((profissional) => (
                    <option key={profissional.id} value={profissional.id}>
                      {profissional.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data do Atendimento</label>
                <input
                  type="datetime-local"
                  name="data_atendimento"
                  value={prontuario.data_atendimento ? prontuario.data_atendimento.slice(0, 16) : ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consulta Relacionada</label>
                <select
                  name="consulta_id"
                  value={prontuario.consulta_id || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                >
                  <option value="">Nenhuma consulta relacionada</option>
                  {consultas.map((consulta) => (
                    <option key={consulta.id} value={consulta.id}>
                      {new Date(consulta.data).toLocaleString()} - {consulta.paciente.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Anamnese</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Queixa Principal</label>
                <textarea
                  name="queixa_principal"
                  value={prontuario.queixa_principal || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">História da Doença Atual</label>
                <textarea
                  name="historia_doenca_atual"
                  value={prontuario.historia_doenca_atual || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">História Patológica Pregressa</label>
                <textarea
                  name="historia_patologica"
                  value={prontuario.historia_patologica || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">História Familiar</label>
                <textarea
                  name="historia_familiar"
                  value={prontuario.historia_familiar || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">História Social</label>
                <textarea
                  name="historia_social"
                  value={prontuario.historia_social || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Exame Físico</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do Exame Físico</label>
                <textarea
                  name="exame_fisico"
                  value={prontuario.exame_fisico || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pressão Arterial</label>
                  <input
                    type="text"
                    name="pressao_arterial"
                    value={prontuario.pressao_arterial || ""}
                    onChange={handleChange}
                    placeholder="Ex: 120/80 mmHg"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequência Cardíaca</label>
                  <input
                    type="text"
                    name="frequencia_cardiaca"
                    value={prontuario.frequencia_cardiaca || ""}
                    onChange={handleChange}
                    placeholder="Ex: 80 bpm"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temperatura</label>
                  <input
                    type="text"
                    name="temperatura"
                    value={prontuario.temperatura || ""}
                    onChange={handleChange}
                    placeholder="Ex: 36.5 °C"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="peso_atual"
                    value={prontuario.peso_atual || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Altura (m)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="altura_atual"
                    value={prontuario.altura_atual || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Diagnóstico e Conduta</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hipótese Diagnóstica</label>
                <textarea
                  name="hipotese_diagnostica"
                  value={prontuario.hipotese_diagnostica || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnóstico Definitivo</label>
                <textarea
                  name="diagnostico_definitivo"
                  value={prontuario.diagnostico_definitivo || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conduta</label>
                <textarea
                  name="conduta"
                  value={prontuario.conduta || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Adicionais</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                <textarea
                  name="observacoes"
                  value={prontuario.observacoes || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Retorno</label>
                <textarea
                  name="retorno"
                  value={prontuario.retorno || ""}
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  placeholder="Ex: Retorno em 15 dias para reavaliação"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push(`/prontuarios/${id}`)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-[#4d9d74] hover:bg-[#3a8a64] text-white rounded-lg disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Salvar Prontuário"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
