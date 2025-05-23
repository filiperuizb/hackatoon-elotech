"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Save, ArrowLeft, AlertCircle, CheckCircle, User, Stethoscope, Plus, X } from "lucide-react"
import { motion } from "framer-motion"

interface NovoProntuario {
  paciente_id: string
  profissional_id: string
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
  peso_atual: string
  altura_atual: string
  hipotese_diagnostica: string
  diagnostico_definitivo: string
  conduta: string
  observacoes: string
  retorno: string
}

interface Paciente {
  id: string
  nome: string
  cpf: string
  peso: number
  altura: number
  alergias: string
  medicamentos_uso: string
}

interface Profissional {
  id: string
  nome: string
  especialidade: {
    nome: string
  }
}

interface Medicamento {
  id: string
  nome: string
  principio_ativo: string
  concentracao: string
  forma_farmaceutica: string
}

interface Procedimento {
  id: string
  nome: string
  codigo: string
  tipo_procedimento: {
    nome: string
  }
}

interface PrescricaoItem {
  medicamento_id: string
  medicamento_nome: string
  dosagem: string
  via_administracao: string
  frequencia: string
  duracao: string
  quantidade: string
  observacoes: string
}

interface ProcedimentoItem {
  procedimento_id: string
  observacoes: string
  valor: string
}

export default function NovoProntuario() {
  const [prontuario, setProntuario] = useState<NovoProntuario>({
    paciente_id: "",
    profissional_id: "",
    data_atendimento: new Date().toISOString().slice(0, 16),
    queixa_principal: "",
    historia_doenca_atual: "",
    historia_patologica: "",
    historia_familiar: "",
    historia_social: "",
    exame_fisico: "",
    pressao_arterial: "",
    frequencia_cardiaca: "",
    temperatura: "",
    peso_atual: "",
    altura_atual: "",
    hipotese_diagnostica: "",
    diagnostico_definitivo: "",
    conduta: "",
    observacoes: "",
    retorno: "",
  })

  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([])
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null)

  const [prescricoes, setPrescricoes] = useState<PrescricaoItem[]>([])
  const [procedimentosRealizados, setProcedimentosRealizados] = useState<ProcedimentoItem[]>([])

  const [showMedicamentoSearch, setShowMedicamentoSearch] = useState(false)
  const [showProcedimentoSearch, setShowProcedimentoSearch] = useState(false)
  const [medicamentoSearch, setMedicamentoSearch] = useState("")
  const [procedimentoSearch, setProcedimentoSearch] = useState("")

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pacientesRes, profissionaisRes] = await Promise.all([
          fetch("/api/pacientes"),
          fetch("/api/profissionais"),
        ])

        if (pacientesRes.ok) {
          const pacientesData = await pacientesRes.json()
          setPacientes(pacientesData)
        }

        if (profissionaisRes.ok) {
          const profissionaisData = await profissionaisRes.json()
          setProfissionais(profissionaisData)
        }
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar os dados necessários")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (prontuario.paciente_id) {
      const paciente = pacientes.find((p) => p.id === prontuario.paciente_id)
      setSelectedPaciente(paciente || null)
      if (paciente) {
        setProntuario((prev) => ({
          ...prev,
          peso_atual: paciente.peso?.toString() || "",
          altura_atual: paciente.altura?.toString() || "",
        }))
      }
    }
  }, [prontuario.paciente_id, pacientes])

  const searchMedicamentos = async (search: string) => {
    if (search.length < 2) return
    try {
      const res = await fetch(`/api/medicamentos?search=${encodeURIComponent(search)}`)
      if (res.ok) {
        const data = await res.json()
        setMedicamentos(data)
      }
    } catch (error) {
      console.error("Erro ao buscar medicamentos:", error)
    }
  }

  const searchProcedimentos = async (search: string) => {
    if (search.length < 2) return
    try {
      const res = await fetch(`/api/procedimentos?search=${encodeURIComponent(search)}`)
      if (res.ok) {
        const data = await res.json()
        setProcedimentos(data)
      }
    } catch (error) {
      console.error("Erro ao buscar procedimentos:", error)
    }
  }

  const addPrescricao = () => {
    setPrescricoes([
      ...prescricoes,
      {
        medicamento_id: "",
        medicamento_nome: "",
        dosagem: "",
        via_administracao: "Oral",
        frequencia: "",
        duracao: "",
        quantidade: "",
        observacoes: "",
      },
    ])
  }

  const removePrescricao = (index: number) => {
    setPrescricoes(prescricoes.filter((_, i) => i !== index))
  }

  const updatePrescricao = (index: number, field: string, value: string) => {
    const updated = [...prescricoes]
    updated[index] = { ...updated[index], [field]: value }
    setPrescricoes(updated)
  }

  const addProcedimento = () => {
    setProcedimentosRealizados([
      ...procedimentosRealizados,
      {
        procedimento_id: "",
        observacoes: "",
        valor: "",
      },
    ])
  }

  const removeProcedimento = (index: number) => {
    setProcedimentosRealizados(procedimentosRealizados.filter((_, i) => i !== index))
  }

  const updateProcedimento = (index: number, field: string, value: string) => {
    const updated = [...procedimentosRealizados]
    updated[index] = { ...updated[index], [field]: value }
    setProcedimentosRealizados(updated)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProntuario((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    if (!prontuario.paciente_id || !prontuario.profissional_id) {
      setError("Paciente e profissional são obrigatórios")
      setSaving(false)
      return
    }

    try {
      const prontuarioData = {
        ...prontuario,
        prescricoes,
        procedimentos: procedimentosRealizados,
      }

      const res = await fetch("/api/prontuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prontuarioData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Falha ao criar prontuário")
      }

      setSuccess("Prontuário criado com sucesso!")
      setTimeout(() => {
        router.push("/prontuarios")
      }, 1500)
    } catch (error) {
      console.error("Erro ao salvar:", error)
      setError(error instanceof Error ? error.message : "Ocorreu um erro ao criar o prontuário")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header title="Novo Prontuário" />
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

  return (
    <div className="min-h-screen bg-white">
      <Header title="Novo Prontuário" />

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="code-bold text-lg text-gray-800 mb-4 flex items-center">
                    <User size={20} className="mr-2 text-[#4d9d74]" />
                    Dados Básicos
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="paciente_id" className="block text-sm font-medium text-gray-700 mb-1">
                        Paciente *
                      </label>
                      <select
                        id="paciente_id"
                        name="paciente_id"
                        value={prontuario.paciente_id}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                        required
                      >
                        <option value="">Selecione um paciente</option>
                        {pacientes.map((paciente) => (
                          <option key={paciente.id} value={paciente.id}>
                            {paciente.nome} - {paciente.cpf}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="profissional_id" className="block text-sm font-medium text-gray-700 mb-1">
                        Profissional *
                      </label>
                      <select
                        id="profissional_id"
                        name="profissional_id"
                        value={prontuario.profissional_id}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                        required
                      >
                        <option value="">Selecione um profissional</option>
                        {profissionais.map((profissional) => (
                          <option key={profissional.id} value={profissional.id}>
                            {profissional.nome} - {profissional.especialidade?.nome}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="data_atendimento" className="block text-sm font-medium text-gray-700 mb-1">
                        Data e Hora
                      </label>
                      <input
                        type="datetime-local"
                        id="data_atendimento"
                        name="data_atendimento"
                        value={prontuario.data_atendimento}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                        required
                      />
                    </div>
                  </div>
                </div>

                {selectedPaciente && (
                  <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <h3 className="code-bold text-lg text-gray-800 mb-4">Informações do Paciente</h3>
                    <div className="space-y-2 text-sm">
                      {selectedPaciente.alergias && (
                        <div>
                          <span className="font-medium text-red-600">Alergias:</span>
                          <p className="text-red-700">{selectedPaciente.alergias}</p>
                        </div>
                      )}
                      {selectedPaciente.medicamentos_uso && (
                        <div>
                          <span className="font-medium text-blue-600">Medicamentos em uso:</span>
                          <p className="text-blue-700">{selectedPaciente.medicamentos_uso}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="code-bold text-lg text-gray-800 mb-4 flex items-center">
                    <Stethoscope size={20} className="mr-2 text-blue-600" />
                    Sinais Vitais
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pressao_arterial" className="block text-sm font-medium text-gray-700 mb-1">
                        Pressão Arterial
                      </label>
                      <input
                        type="text"
                        id="pressao_arterial"
                        name="pressao_arterial"
                        value={prontuario.pressao_arterial}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="120/80"
                      />
                    </div>

                    <div>
                      <label htmlFor="frequencia_cardiaca" className="block text-sm font-medium text-gray-700 mb-1">
                        Freq. Cardíaca
                      </label>
                      <input
                        type="text"
                        id="frequencia_cardiaca"
                        name="frequencia_cardiaca"
                        value={prontuario.frequencia_cardiaca}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="72 bpm"
                      />
                    </div>

                    <div>
                      <label htmlFor="temperatura" className="block text-sm font-medium text-gray-700 mb-1">
                        Temperatura
                      </label>
                      <input
                        type="text"
                        id="temperatura"
                        name="temperatura"
                        value={prontuario.temperatura}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="36.5°C"
                      />
                    </div>

                    <div>
                      <label htmlFor="peso_atual" className="block text-sm font-medium text-gray-700 mb-1">
                        Peso (kg)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        id="peso_atual"
                        name="peso_atual"
                        value={prontuario.peso_atual}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="70.5"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label htmlFor="queixa_principal" className="block text-sm font-medium text-gray-700 mb-2">
                    Queixa Principal
                  </label>
                  <textarea
                    id="queixa_principal"
                    name="queixa_principal"
                    value={prontuario.queixa_principal}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                    placeholder="Descreva a queixa principal do paciente..."
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="historia_doenca_atual" className="block text-sm font-medium text-gray-700 mb-2">
                    História da Doença Atual
                  </label>
                  <textarea
                    id="historia_doenca_atual"
                    name="historia_doenca_atual"
                    value={prontuario.historia_doenca_atual}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                    placeholder="Descreva a evolução da doença atual..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="historia_patologica" className="block text-sm font-medium text-gray-700 mb-2">
                      História Patológica
                    </label>
                    <textarea
                      id="historia_patologica"
                      name="historia_patologica"
                      value={prontuario.historia_patologica}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                      placeholder="Doenças anteriores, cirurgias..."
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="historia_familiar" className="block text-sm font-medium text-gray-700 mb-2">
                      História Familiar
                    </label>
                    <textarea
                      id="historia_familiar"
                      name="historia_familiar"
                      value={prontuario.historia_familiar}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                      placeholder="Histórico familiar de doenças..."
                    ></textarea>
                  </div>
                </div>

                <div>
                  <label htmlFor="exame_fisico" className="block text-sm font-medium text-gray-700 mb-2">
                    Exame Físico
                  </label>
                  <textarea
                    id="exame_fisico"
                    name="exame_fisico"
                    value={prontuario.exame_fisico}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                    placeholder="Descrição do exame físico..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="hipotese_diagnostica" className="block text-sm font-medium text-gray-700 mb-2">
                      Hipótese Diagnóstica
                    </label>
                    <textarea
                      id="hipotese_diagnostica"
                      name="hipotese_diagnostica"
                      value={prontuario.hipotese_diagnostica}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                      placeholder="Hipóteses diagnósticas..."
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="diagnostico_definitivo" className="block text-sm font-medium text-gray-700 mb-2">
                      Diagnóstico Definitivo
                    </label>
                    <textarea
                      id="diagnostico_definitivo"
                      name="diagnostico_definitivo"
                      value={prontuario.diagnostico_definitivo}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                      placeholder="Diagnóstico final..."
                    ></textarea>
                  </div>
                </div>

                <div>
                  <label htmlFor="conduta" className="block text-sm font-medium text-gray-700 mb-2">
                    Conduta
                  </label>
                  <textarea
                    id="conduta"
                    name="conduta"
                    value={prontuario.conduta}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                    placeholder="Tratamento, orientações, exames..."
                  ></textarea>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="code-bold text-lg text-gray-800">Prescrições</h3>
                    <button
                      type="button"
                      onClick={addPrescricao}
                      className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Plus size={16} className="mr-1" />
                      Adicionar
                    </button>
                  </div>

                  {prescricoes.map((prescricao, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg mb-4 border">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-800">Prescrição {index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removePrescricao(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Medicamento</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={prescricao.medicamento_nome}
                              onChange={(e) => {
                                updatePrescricao(index, "medicamento_nome", e.target.value)
                                setMedicamentoSearch(e.target.value)
                                if (e.target.value.length >= 2) {
                                  searchMedicamentos(e.target.value)
                                  setShowMedicamentoSearch(true)
                                }
                              }}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              placeholder="Digite o nome do medicamento..."
                            />
                            {showMedicamentoSearch && medicamentos.length > 0 && (
                              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                                {medicamentos.map((med) => (
                                  <button
                                    key={med.id}
                                    type="button"
                                    onClick={() => {
                                      updatePrescricao(index, "medicamento_id", med.id)
                                      updatePrescricao(index, "medicamento_nome", med.nome)
                                      setShowMedicamentoSearch(false)
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                  >
                                    <div className="font-medium">{med.nome}</div>
                                    <div className="text-sm text-gray-600">
                                      {med.principio_ativo} - {med.concentracao}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Dosagem</label>
                          <input
                            type="text"
                            value={prescricao.dosagem}
                            onChange={(e) => updatePrescricao(index, "dosagem", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="Ex: 500mg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Via</label>
                          <select
                            value={prescricao.via_administracao}
                            onChange={(e) => updatePrescricao(index, "via_administracao", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          >
                            <option value="Oral">Oral</option>
                            <option value="Intravenosa">Intravenosa</option>
                            <option value="Intramuscular">Intramuscular</option>
                            <option value="Subcutânea">Subcutânea</option>
                            <option value="Tópica">Tópica</option>
                            <option value="Inalatória">Inalatória</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Frequência</label>
                          <input
                            type="text"
                            value={prescricao.frequencia}
                            onChange={(e) => updatePrescricao(index, "frequencia", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="Ex: 8/8h"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duração</label>
                          <input
                            type="text"
                            value={prescricao.duracao}
                            onChange={(e) => updatePrescricao(index, "duracao", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="Ex: 7 dias"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-2">
                      Observações
                    </label>
                    <textarea
                      id="observacoes"
                      name="observacoes"
                      value={prontuario.observacoes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                      placeholder="Observações adicionais..."
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="retorno" className="block text-sm font-medium text-gray-700 mb-2">
                      Retorno
                    </label>
                    <textarea
                      id="retorno"
                      name="retorno"
                      value={prontuario.retorno}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                      placeholder="Orientações para retorno..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => router.push("/prontuarios")}
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
                {saving ? "Salvando..." : "Salvar Prontuário"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
