"use client"

import type React from "react"
import { ClipboardList, FileText, Pill } from "lucide-react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "@/components/header"
import { Save, ArrowLeft, AlertCircle, CheckCircle, User, Stethoscope, Plus, X, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NovoProntuario {
  paciente_id: string
  profissional_id: string
  consulta_id: string
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

interface Consulta {
  id: string
  data: string
  hora: string
  status: string
  paciente: {
    id: string
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

export default function NovoProntuario() {
  const [prontuario, setProntuario] = useState<NovoProntuario>({
    paciente_id: "",
    profissional_id: "",
    consulta_id: "",
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
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null)
  const [filteredConsultas, setFilteredConsultas] = useState<Consulta[]>([])

  const [prescricoes, setPrescricoes] = useState<PrescricaoItem[]>([])
  const [showMedicamentoSearch, setShowMedicamentoSearch] = useState(false)
  const [medicamentoSearch, setMedicamentoSearch] = useState("")
  
  // Search filters for dropdowns
  const [pacienteFilter, setPacienteFilter] = useState("")
  const [profissionalFilter, setProfissionalFilter] = useState("")
  const [consultaFilter, setConsultaFilter] = useState("")
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()
  const searchParams = useSearchParams()
  const prontuarioId = searchParams.get('id')
  const [isEditMode, setIsEditMode] = useState(!!prontuarioId)
  const pageTitle = isEditMode ? "Editar Prontuário" : "Novo Prontuário"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pacientesRes, profissionaisRes, consultasRes] = await Promise.all([
          fetch("/api/pacientes"),
          fetch("/api/profissionais"),
          fetch("/api/consultas"),
        ])

        if (pacientesRes.ok) {
          const pacientesData = await pacientesRes.json()
          setPacientes(pacientesData)
        }

        if (profissionaisRes.ok) {
          const profissionaisData = await profissionaisRes.json()
          setProfissionais(profissionaisData)
        }

        if (consultasRes.ok) {
          const consultasData = await consultasRes.json()
          setConsultas(consultasData)
        }

        // If in edit mode, fetch the existing prontuario data
        if (prontuarioId) {
          const prontuarioRes = await fetch(`/api/prontuarios/${prontuarioId}`)
          if (prontuarioRes.ok) {
            const prontuarioData = await prontuarioRes.json()
              // Extract prescriptions if they exist
            const existingPrescricoes = prontuarioData.prescricao?.map((p: any) => ({
              medicamento_id: p.medicamento_id || "",
              medicamento_nome: p.medicamento || "",
              dosagem: p.dosagem || "",
              via_administracao: p.via_administracao || "Oral",
              frequencia: p.frequencia || "",
              duracao: p.duracao || "",
              quantidade: p.quantidade || "",
              observacoes: p.observacoes || "",
            })) || []

            if (existingPrescricoes.length > 0) {
              setPrescricoes(existingPrescricoes)
            }
            
            // Format the date_atendimento to be compatible with the form
            const formattedDate = prontuarioData.data_atendimento 
              ? new Date(prontuarioData.data_atendimento).toISOString().slice(0, 16)
              : new Date().toISOString().slice(0, 16)
              
            // Map the fetched data to our form state
            setProntuario({
              paciente_id: prontuarioData.paciente_id || "",
              profissional_id: prontuarioData.profissional_id || "",
              consulta_id: prontuarioData.consulta_id || "",
              data_atendimento: formattedDate,
              queixa_principal: prontuarioData.queixa_principal || "",
              historia_doenca_atual: prontuarioData.historia_doenca_atual || "",
              historia_patologica: prontuarioData.historia_patologica || "",
              historia_familiar: prontuarioData.historia_familiar || "",
              historia_social: prontuarioData.historia_social || "",
              exame_fisico: prontuarioData.exame_fisico || "",
              pressao_arterial: prontuarioData.pressao_arterial || "",
              frequencia_cardiaca: prontuarioData.frequencia_cardiaca || "",
              temperatura: prontuarioData.temperatura || "",
              peso_atual: prontuarioData.peso_atual?.toString() || "",
              altura_atual: prontuarioData.altura_atual?.toString() || "",
              hipotese_diagnostica: prontuarioData.hipotese_diagnostica || "",
              diagnostico_definitivo: prontuarioData.diagnostico_definitivo || "",
              conduta: prontuarioData.conduta || "",
              observacoes: prontuarioData.observacoes || "",
              retorno: prontuarioData.retorno || "",
            })
          } else {
            setError("Não foi possível carregar os dados do prontuário")
          }
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

      const consultasPaciente = consultas.filter(
        (c) => c.paciente?.id === prontuario.paciente_id && c.status !== "Cancelada",
      )
      setFilteredConsultas(consultasPaciente)
    } else {
      setFilteredConsultas([])
    }
  }, [prontuario.paciente_id, pacientes, consultas])

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

  const addPrescricao = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()

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

  const removePrescricao = (index: number, e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    setPrescricoes(prescricoes.filter((_, i) => i !== index))
  }

  const updatePrescricao = (index: number, field: string, value: string) => {
    const updated = [...prescricoes]
    updated[index] = { ...updated[index], [field]: value }
    setPrescricoes(updated)
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
      }

      // Determine if we're updating or creating based on the presence of prontuarioId
      const url = isEditMode 
        ? `/api/prontuarios/${prontuarioId}` 
        : "/api/prontuarios"
      
      const method = isEditMode ? "PUT" : "POST"
      
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prontuarioData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || `Falha ao ${isEditMode ? 'atualizar' : 'criar'} prontuário`)
      }

      const successMessage = isEditMode 
        ? "Prontuário atualizado com sucesso!" 
        : "Prontuário criado com sucesso!"
      
      setSuccess(successMessage)
      
      setTimeout(() => {
        router.push("/prontuarios")
      }, 1500)
    } catch (error) {
      console.error("Erro ao salvar:", error)
      const errorMessage = isEditMode 
        ? "Ocorreu um erro ao atualizar o prontuário" 
        : "Ocorreu um erro ao criar o prontuário"
      setError(error instanceof Error ? error.message : errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const goToStep = (step: number, e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentStep(step)
    window.scrollTo(0, 0)
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
          className="bg-white rounded-xl shadow-sm overflow-hidden"
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

          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              {[
                { step: 1, title: "Dados Básicos" },
                { step: 2, title: "Anamnese" },
                { step: 3, title: "Exame Físico" },
                { step: 4, title: "Diagnóstico" },
                { step: 5, title: "Prescrição" },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center">
                  <button
                    onClick={(e) => goToStep(item.step, e)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= item.step
                        ? "bg-[#4d9d74] text-white"
                        : "bg-gray-100 text-gray-400 border border-gray-200"
                    }`}
                  >
                    {item.step}
                  </button>
                  <span
                    className={`text-xs font-medium ${currentStep >= item.step ? "text-[#4d9d74]" : "text-gray-400"}`}
                  >
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-2 rounded-lg bg-[#4d9d74]/10 mr-3">
                      <User size={20} className="text-[#4d9d74]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Dados Básicos</h2>
                      <p className="text-sm text-gray-500">Informações do paciente e profissional</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                    <div>
                      <label htmlFor="paciente_id" className="block text-sm font-medium text-gray-700 mb-1">
                        Paciente *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          list="pacientes-list"
                          placeholder="Digite para buscar paciente..."
                          value={pacienteFilter}
                          onChange={(e) => {
                            setPacienteFilter(e.target.value);
                            const displayValue = e.target.value;
                            const selectedPaciente = pacientes.find(p => 
                              `${p.nome} - ${p.cpf || ''}` === displayValue
                            );
                            if (selectedPaciente) {
                              setProntuario(prev => ({
                                ...prev,
                                paciente_id: selectedPaciente.id
                              }));
                            }
                          }}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                          required
                        />
                        <datalist id="pacientes-list">
                          {pacientes
                            .filter(paciente => 
                              pacienteFilter === "" || 
                              paciente.nome.toLowerCase().includes(pacienteFilter.toLowerCase()) || 
                              (paciente.cpf && paciente.cpf.includes(pacienteFilter))
                            )
                            .map(paciente => (
                              <option key={paciente.id} value={`${paciente.nome} - ${paciente.cpf || ''}`} />
                            ))}
                        </datalist>
                        <input 
                          type="hidden" 
                          id="paciente_id" 
                          name="paciente_id" 
                          value={prontuario.paciente_id}
                        />
                      </div>
                    </div>                    <div>
                      <label htmlFor="profissional_id" className="block text-sm font-medium text-gray-700 mb-1">
                        Profissional *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          list="profissionais-list"
                          placeholder="Digite para buscar profissional..."
                          value={profissionalFilter}
                          onChange={(e) => {
                            setProfissionalFilter(e.target.value);
                            const displayValue = e.target.value;
                            const selectedProfissional = profissionais.find(p => 
                              `${p.nome} - ${p.especialidade?.nome || "Não informado"}` === displayValue
                            );
                            if (selectedProfissional) {
                              setProntuario(prev => ({
                                ...prev,
                                profissional_id: selectedProfissional.id
                              }));
                            }
                          }}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                          required
                        />
                        <datalist id="profissionais-list">
                          {profissionais
                            .filter(profissional => 
                              profissionalFilter === "" || 
                              profissional.nome.toLowerCase().includes(profissionalFilter.toLowerCase()) ||
                              (profissional.especialidade?.nome && 
                                profissional.especialidade.nome.toLowerCase().includes(profissionalFilter.toLowerCase()))
                            )
                            .map(profissional => (
                              <option key={profissional.id} value={`${profissional.nome} - ${profissional.especialidade?.nome || "Não informado"}`} />
                            ))}
                        </datalist>
                        <input 
                          type="hidden" 
                          id="profissional_id" 
                          name="profissional_id" 
                          value={prontuario.profissional_id}
                        />
                      </div>
                    </div>                    <div>
                      <label htmlFor="consulta_id" className="block text-sm font-medium text-gray-700 mb-1">
                        Consulta Relacionada
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          list="consultas-list"
                          placeholder="Digite para buscar consulta..."
                          value={consultaFilter}
                          onChange={(e) => {
                            setConsultaFilter(e.target.value);
                            const displayValue = e.target.value;
                            const selectedConsulta = filteredConsultas.find(c => {
                              const consultaDisplay = `${new Date(c.data).toLocaleDateString()} - ${c.hora}${c.paciente ? ` - ${c.paciente.nome}` : ''}`;
                              return consultaDisplay === displayValue;
                            });
                            if (selectedConsulta) {
                              setProntuario(prev => ({
                                ...prev,
                                consulta_id: selectedConsulta.id
                              }));
                            }
                          }}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        />
                        <datalist id="consultas-list">
                          {filteredConsultas
                            .filter(consulta => {
                              if (consultaFilter === "") return true;
                              
                              const dateStr = new Date(consulta.data).toLocaleDateString();
                              const timeStr = consulta.hora;
                              const patientName = consulta.paciente?.nome || "";
                              
                              return dateStr.includes(consultaFilter) ||
                                    timeStr.includes(consultaFilter) ||
                                    patientName.toLowerCase().includes(consultaFilter.toLowerCase());
                            })
                            .map(consulta => {
                              const consultaDisplay = `${new Date(consulta.data).toLocaleDateString()} - ${consulta.hora}${consulta.paciente ? ` - ${consulta.paciente.nome}` : ''}`;
                              return (
                                <option key={consulta.id} value={consultaDisplay} />
                              );
                            })}
                        </datalist>
                        <input 
                          type="hidden" 
                          id="consulta_id" 
                          name="consulta_id" 
                          value={prontuario.consulta_id}
                        />
                      </div>
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
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        required
                      />
                    </div>
                  </div>

                  {selectedPaciente && (
                    <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações do Paciente</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-2 rounded-lg bg-[#4d9d74]/10 mr-3">
                      <ClipboardList size={20} className="text-[#4d9d74]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Anamnese</h2>
                      <p className="text-sm text-gray-500">Histórico e queixas do paciente</p>
                    </div>
                  </div>

                  <div className="space-y-6">
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
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        placeholder="Descreva a queixa principal do paciente..."
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="historia_doenca_atual" className="block text-sm font-medium text-gray-700 mb-2">
                        História da Doença Atual (HDA)
                      </label>
                      <textarea
                        id="historia_doenca_atual"
                        name="historia_doenca_atual"
                        value={prontuario.historia_doenca_atual}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        placeholder="Descreva a evolução da doença atual..."
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="historia_patologica" className="block text-sm font-medium text-gray-700 mb-2">
                        História Patológica Pregressa (HPP)
                      </label>
                      <textarea
                        id="historia_patologica"
                        name="historia_patologica"
                        value={prontuario.historia_patologica}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
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
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        placeholder="Histórico familiar de doenças..."
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="historia_social" className="block text-sm font-medium text-gray-700 mb-2">
                        Hábitos de Vida
                      </label>
                      <textarea
                        id="historia_social"
                        name="historia_social"
                        value={prontuario.historia_social}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        placeholder="Tabagismo, etilismo, atividade física..."
                      ></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-2 rounded-lg bg-[#4d9d74]/10 mr-3">
                      <Stethoscope size={20} className="text-[#4d9d74]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Exame Físico</h2>
                      <p className="text-sm text-gray-500">Sinais vitais e avaliação física</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        placeholder="Ex: 120/80 mmHg"
                      />
                    </div>

                    <div>
                      <label htmlFor="frequencia_cardiaca" className="block text-sm font-medium text-gray-700 mb-1">
                        Frequência Cardíaca
                      </label>
                      <input
                        type="text"
                        id="frequencia_cardiaca"
                        name="frequencia_cardiaca"
                        value={prontuario.frequencia_cardiaca}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        placeholder="Ex: 72 bpm"
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
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        placeholder="Ex: 36.5°C"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        placeholder="Ex: 70.5"
                      />
                    </div>

                    <div>
                      <label htmlFor="altura_atual" className="block text-sm font-medium text-gray-700 mb-1">
                        Altura (m)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id="altura_atual"
                        name="altura_atual"
                        value={prontuario.altura_atual}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        placeholder="Ex: 1.75"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="exame_fisico" className="block text-sm font-medium text-gray-700 mb-2">
                      Exame Físico Detalhado
                    </label>
                    <textarea
                      id="exame_fisico"
                      name="exame_fisico"
                      value={prontuario.exame_fisico}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                      placeholder="Descreva o exame físico completo..."
                    ></textarea>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-2 rounded-lg bg-[#4d9d74]/10 mr-3">
                      <FileText size={20} className="text-[#4d9d74]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Diagnóstico e Conduta</h2>
                      <p className="text-sm text-gray-500">Avaliação clínica e plano terapêutico</p>
                    </div>
                  </div>

                  <div className="space-y-6">
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
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
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
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        placeholder="Diagnóstico final..."
                      ></textarea>
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
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                        placeholder="Tratamento, orientações, exames..."
                      ></textarea>
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
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
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
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                          placeholder="Orientações para retorno..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-[#4d9d74]/10 mr-3">
                        <Pill size={20} className="text-[#4d9d74]" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">Prescrições</h2>
                        <p className="text-sm text-gray-500">Medicamentos prescritos</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => addPrescricao(e)}
                      className="flex items-center px-4 py-2 bg-[#4d9d74] text-white rounded-lg hover:bg-[#3a8a64] transition-colors"
                    >
                      <Plus size={16} className="mr-1" />
                      Adicionar Medicamento
                    </button>
                  </div>

                  {prescricoes.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                      <Pill size={40} className="mx-auto text-gray-300 mb-2" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma prescrição adicionada</h3>
                      <p className="text-gray-500 mb-4">Adicione medicamentos à prescrição do paciente.</p>
                      <button
                        type="button"
                        onClick={(e) => addPrescricao(e)}
                        className="inline-flex items-center px-4 py-2 bg-[#4d9d74] text-white rounded-lg hover:bg-[#3a8a64] transition-colors"
                      >
                        <Plus size={16} className="mr-1" />
                        Adicionar Medicamento
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {prescricoes.map((prescricao, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium text-gray-800">Medicamento {index + 1}</h4>
                            <button
                              type="button"
                              onClick={(e) => removePrescricao(index, e)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X size={16} />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                                  placeholder="Digite o nome do medicamento..."
                                />
                                {showMedicamentoSearch && medicamentos.length > 0 && (
                                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                                    {medicamentos.map((med) => (
                                      <button
                                        key={med.id}
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault()
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                                placeholder="Ex: 500mg"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Via</label>
                              <select
                                value={prescricao.via_administracao}
                                onChange={(e) => updatePrescricao(index, "via_administracao", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                                placeholder="Ex: 8/8h"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Duração</label>
                              <input
                                type="text"
                                value={prescricao.duracao}
                                onChange={(e) => updatePrescricao(index, "duracao", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                                placeholder="Ex: 7 dias"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                              <input
                                type="text"
                                value={prescricao.quantidade}
                                onChange={(e) => updatePrescricao(index, "quantidade", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                                placeholder="Ex: 1 caixa"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                              <textarea
                                value={prescricao.observacoes}
                                onChange={(e) => updatePrescricao(index, "observacoes", e.target.value)}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74]"
                                placeholder="Observações sobre o uso do medicamento..."
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={(e) => prevStep(e)}
                className={`flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
                  currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentStep === 1}
              >
                <ArrowLeft size={18} className="mr-2" />
                Anterior
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={(e) => nextStep(e)}
                  className="flex items-center px-6 py-2 bg-[#4d9d74] text-white rounded-lg hover:bg-[#3a8a64] transition-colors"
                >
                  Próximo
                  <ChevronRight size={18} className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center px-6 py-2 bg-[#4d9d74] text-white rounded-lg hover:bg-[#3a8a64] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={18} className="mr-2" />
                  {saving ? "Salvando..." : "Salvar Prontuário"}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
