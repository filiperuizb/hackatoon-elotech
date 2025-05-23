"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import { ArrowLeft, Edit, Download, User, Stethoscope, FileText } from "lucide-react"
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
  prescricao: Array<{
    id: string
    medicamento: string
    dosagem: string
    frequencia: string
    duracao: string
    observacoes: string
  }>
}

export default function VisualizarProntuario() {
  const [prontuario, setProntuario] = useState<Prontuario | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

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
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProntuario()
    }
  }, [id])

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const formatDateTime = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString("pt-BR")
  }

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return ""
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return `${age} anos`
  }

  const calculateIMC = (peso: number, altura: number) => {
    if (!peso || !altura) return ""
    const imc = peso / (altura * altura)
    return imc.toFixed(1)
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
              className="mt-4 code-bold bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded-lg"
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
      <Header title="Visualizar Prontuário" />

      <main className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/prontuarios")}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft size={18} className="mr-2" />
            Voltar
          </motion.button>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(`/prontuarios/${id}/editar`)}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              <Edit size={18} className="mr-2" />
              Editar
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center px-4 py-2 bg-[#4d9d74] hover:bg-[#3a8a64] text-white rounded-lg"
            >
              <Download size={18} className="mr-2" />
              Baixar PDF
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#4d9d74]/10 flex items-center justify-center mr-4">
                  <User size={24} className="text-[#4d9d74]" />
                </div>
                <div>
                  <h3 className="code-bold text-lg text-gray-800">Dados do Paciente</h3>
                  <p className="text-sm text-gray-600">Informações pessoais</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nome</label>
                  <p className="text-gray-900">{prontuario.paciente.nome}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">CPF</label>
                  <p className="text-gray-900">{prontuario.paciente.cpf}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Idade</label>
                  <p className="text-gray-900">{calculateAge(prontuario.paciente.data_nascimento)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Telefone</label>
                  <p className="text-gray-900">{prontuario.paciente.telefone || "Não informado"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{prontuario.paciente.email || "Não informado"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 hover-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Stethoscope size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="code-bold text-lg text-gray-800">Profissional</h3>
                  <p className="text-sm text-gray-600">Responsável pelo atendimento</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nome</label>
                  <p className="text-gray-900">{prontuario.profissional_saude.nome}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Especialidade</label>
                  <p className="text-gray-900">
                    {prontuario.profissional_saude.especialidade?.nome || "Não informado"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Data do Atendimento</label>
                  <p className="text-gray-900">{formatDateTime(prontuario.data_atendimento)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover-card">
              <div className="p-6 border-b">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <FileText size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="code-bold text-xl text-gray-800">Prontuário Médico</h3>
                    <p className="text-sm text-gray-600">Registro completo do atendimento</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="code-bold text-lg text-gray-800 mb-3">Sinais Vitais</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-xs font-medium text-gray-600">Pressão Arterial</label>
                        <p className="text-lg font-semibold text-gray-900">{prontuario.pressao_arterial || "N/A"}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-xs font-medium text-gray-600">Freq. Cardíaca</label>
                        <p className="text-lg font-semibold text-gray-900">{prontuario.frequencia_cardiaca || "N/A"}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-xs font-medium text-gray-600">Temperatura</label>
                        <p className="text-lg font-semibold text-gray-900">{prontuario.temperatura || "N/A"}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-xs font-medium text-gray-600">IMC</label>
                        <p className="text-lg font-semibold text-gray-900">
                          {calculateIMC(prontuario.peso_atual, prontuario.altura_atual) || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="code-bold text-lg text-gray-800 mb-3">Medidas Antropométricas</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-xs font-medium text-gray-600">Peso</label>
                        <p className="text-lg font-semibold text-gray-900">
                          {prontuario.peso_atual ? `${prontuario.peso_atual} kg` : "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-xs font-medium text-gray-600">Altura</label>
                        <p className="text-lg font-semibold text-gray-900">
                          {prontuario.altura_atual ? `${prontuario.altura_atual} m` : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="code-bold text-lg text-gray-800 mb-3">Queixa Principal</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">{prontuario.queixa_principal || "Não informado"}</p>
                  </div>
                </div>

                <div>
                  <h4 className="code-bold text-lg text-gray-800 mb-3">História da Doença Atual</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">{prontuario.historia_doenca_atual || "Não informado"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="code-bold text-lg text-gray-800 mb-3">História Patológica</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900">{prontuario.historia_patologica || "Não informado"}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="code-bold text-lg text-gray-800 mb-3">História Familiar</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900">{prontuario.historia_familiar || "Não informado"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="code-bold text-lg text-gray-800 mb-3">História Social</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">{prontuario.historia_social || "Não informado"}</p>
                  </div>
                </div>

                <div>
                  <h4 className="code-bold text-lg text-gray-800 mb-3">Exame Físico</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">{prontuario.exame_fisico || "Não informado"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="code-bold text-lg text-gray-800 mb-3">Hipótese Diagnóstica</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900">{prontuario.hipotese_diagnostica || "Não informado"}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="code-bold text-lg text-gray-800 mb-3">Diagnóstico Definitivo</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900">{prontuario.diagnostico_definitivo || "Não informado"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="code-bold text-lg text-gray-800 mb-3">Conduta</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">{prontuario.conduta || "Não informado"}</p>
                  </div>
                </div>

                {prontuario.prescricao && prontuario.prescricao.length > 0 && (
                  <div>
                    <h4 className="code-bold text-lg text-gray-800 mb-3">Prescrições</h4>
                    <div className="space-y-3">
                      {prontuario.prescricao.map((prescricao, index) => (
                        <div key={prescricao.id} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div>
                              <label className="text-xs font-medium text-blue-700">Medicamento</label>
                              <p className="text-blue-900 font-medium">{prescricao.medicamento}</p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-blue-700">Dosagem</label>
                              <p className="text-blue-900">{prescricao.dosagem}</p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-blue-700">Frequência</label>
                              <p className="text-blue-900">{prescricao.frequencia}</p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-blue-700">Duração</label>
                              <p className="text-blue-900">{prescricao.duracao}</p>
                            </div>
                          </div>
                          {prescricao.observacoes && (
                            <div className="mt-3">
                              <label className="text-xs font-medium text-blue-700">Observações</label>
                              <p className="text-blue-900">{prescricao.observacoes}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="code-bold text-lg text-gray-800 mb-3">Observações</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900">{prontuario.observacoes || "Não informado"}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="code-bold text-lg text-gray-800 mb-3">Retorno</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900">{prontuario.retorno || "Não informado"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
