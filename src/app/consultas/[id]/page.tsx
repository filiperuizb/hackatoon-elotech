"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import { Save, ArrowLeft, Trash2, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

interface Consulta {
  id: string
  data: string
  hora: string
  status: string
  paciente_id: string
  profissional_saude_id: string
  unidade_saude_id: string
  observacoes: string
}

interface Paciente {
  id: string
  nome: string
}

interface ProfissionalSaude {
  id: string
  nome: string
  especialidade: string
}

interface UnidadeSaude {
  id: string
  nome: string
}

export default function EditarConsulta() {
  const [consulta, setConsulta] = useState<Consulta>({
    id: "",
    data: "",
    hora: "",
    status: "",
    paciente_id: "",
    profissional_saude_id: "",
    unidade_saude_id: "",
    observacoes: "",
  })
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [profissionais, setProfissionais] = useState<ProfissionalSaude[]>([])
  const [unidades, setUnidades] = useState<UnidadeSaude[]>([])
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
        const consultaRes = await fetch(`/api/consultas/${id}`)
        if (!consultaRes.ok) throw new Error("Falha ao buscar dados da consulta")
        const consultaData = await consultaRes.json()
        setConsulta(consultaData)

        const pacientesRes = await fetch("/api/pacientes")
        if (!pacientesRes.ok) throw new Error("Falha ao buscar pacientes")
        const pacientesData = await pacientesRes.json()
        setPacientes(pacientesData)

        const profissionaisRes = await fetch("/api/profissionais")
        if (!profissionaisRes.ok) throw new Error("Falha ao buscar profissionais")
        const profissionaisData = await profissionaisRes.json()
        setProfissionais(profissionaisData)

        const unidadesRes = await fetch("/api/unidades")
        if (!unidadesRes.ok) throw new Error("Falha ao buscar unidades")
        const unidadesData = await unidadesRes.json()
        setUnidades(unidadesData)
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar os dados necessários")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setConsulta((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch(`/api/consultas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(consulta),
      })

      if (!res.ok) throw new Error("Falha ao atualizar consulta")

      setSuccess("Consulta atualizada com sucesso!")
      setTimeout(() => {
        router.push("/consultas")
      }, 2000)
    } catch (error) {
      console.error("Erro ao salvar:", error)
      setError("Ocorreu um erro ao salvar as alterações")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta consulta? Esta ação não pode ser desfeita.")) return

    try {
      const res = await fetch(`/api/consultas/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Falha ao excluir consulta")

      router.push("/consultas")
    } catch (error) {
      console.error("Erro ao excluir:", error)
      setError("Ocorreu um erro ao excluir a consulta")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Carregando..." />
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Editar Consulta" />

      <main className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
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
                <label htmlFor="paciente_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Paciente
                </label>
                <select
                  id="paciente_id"
                  name="paciente_id"
                  value={consulta.paciente_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
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
                <label htmlFor="profissional_saude_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Profissional de Saúde
                </label>
                <select
                  id="profissional_saude_id"
                  name="profissional_saude_id"
                  value={consulta.profissional_saude_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                >
                  <option value="">Selecione um profissional</option>
                  {profissionais.map((profissional) => (
                    <option key={profissional.id} value={profissional.id}>
                      {profissional.nome} - {profissional.especialidade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="unidade_saude_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Unidade de Saúde
                </label>
                <select
                  id="unidade_saude_id"
                  name="unidade_saude_id"
                  value={consulta.unidade_saude_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                >
                  <option value="">Selecione uma unidade</option>
                  {unidades.map((unidade) => (
                    <option key={unidade.id} value={unidade.id}>
                      {unidade.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={consulta.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                >
                  <option value="">Selecione um status</option>
                  <option value="Agendada">Agendada</option>
                  <option value="Concluída">Concluída</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>

              <div>
                <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  value={consulta.data}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                />
              </div>

              <div>
                <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora
                </label>
                <input
                  type="time"
                  id="hora"
                  name="hora"
                  value={consulta.hora}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                  required
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={consulta.observacoes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                ></textarea>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/consultas")}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Voltar
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center justify-center px-4 py-2 border border-red-300 rounded-lg text-red-700 bg-white hover:bg-red-50"
                >
                  <Trash2 size={18} className="mr-2" />
                  Excluir
                </button>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="code-bold flex items-center justify-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} className="mr-2" />
                {saving ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
