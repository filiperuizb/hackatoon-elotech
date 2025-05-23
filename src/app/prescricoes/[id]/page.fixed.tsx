"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from '@/components/header'
import { Save, ArrowLeft, Trash2, AlertCircle, CheckCircle, Download } from "lucide-react"
import { motion } from "framer-motion"

interface Prescricao {
  id: string
  medicamento_id: string
  medicamento_nome: string
  dosagem: string
  frequencia: string
  duracao: string
  observacoes: string
  prontuario_id: string
}

interface Prontuario {
  id: string
  paciente: {
    nome: string
  }
  data_atendimento: string
}

interface Medicamento {
  id: string
  nome: string
  principio_ativo: string | null
}

export default function EditarPrescricao() {
  const [prescricao, setPrescricao] = useState<Prescricao>({
    id: "",
    medicamento_id: "",
    medicamento_nome: "",
    dosagem: "",
    frequencia: "",
    duracao: "",
    observacoes: "",
    prontuario_id: "",
  })
  
  const [prontuarios, setProntuarios] = useState<Prontuario[]>([])
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [prontuarioFilter, setProntuarioFilter] = useState("")
  const [medicamentoFilter, setMedicamentoFilter] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prescricaoRes = await fetch(`/api/prescricoes/${id}`)
        if (!prescricaoRes.ok) throw new Error("Falha ao buscar dados da prescrição")
        const prescricaoData = await prescricaoRes.json()
        setPrescricao(prescricaoData)
        
        const prontuariosRes = await fetch("/api/prontuarios")
        if (!prontuariosRes.ok) throw new Error("Falha ao buscar prontuários")
        const prontuariosData = await prontuariosRes.json()
        setProntuarios(prontuariosData)
        
        const medicamentosRes = await fetch("/api/medicamentos")
        if (!medicamentosRes.ok) throw new Error("Falha ao buscar medicamentos")
        const medicamentosData = await medicamentosRes.json()
        setMedicamentos(medicamentosData)
        
        // Set the display values after all data is loaded
        if (prescricaoData.medicamento_nome) {
          const selectedMedicamento = medicamentosData.find((m: Medicamento) => m.id === prescricaoData.medicamento_id)
          if (selectedMedicamento) {
            const medDisplay = `${selectedMedicamento.nome}${selectedMedicamento.principio_ativo ? ` - ${selectedMedicamento.principio_ativo}` : ''}`;
            setMedicamentoFilter(medDisplay)
          } else {
            setMedicamentoFilter(prescricaoData.medicamento_nome)
          }
        }
        
        if (prescricaoData.prontuario_id && prontuariosData.length > 0) {
          const selectedProntuario = prontuariosData.find((p: Prontuario) => p.id === prescricaoData.prontuario_id)
          if (selectedProntuario) {
            const prontuarioDisplay = `${selectedProntuario.paciente?.nome || ''} - ${formatDate(selectedProntuario.data_atendimento)}`;
            setProntuarioFilter(prontuarioDisplay)
          }
        }
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
    
    if (name === 'medicamento_id' && value) {
      const selectedMedicamento = medicamentos.find(m => m.id === value)
      if (selectedMedicamento) {
        setPrescricao(prev => ({
          ...prev,
          medicamento_id: value,
          medicamento_nome: selectedMedicamento.nome
        }))
      } else {
        setPrescricao(prev => ({ ...prev, [name]: value }))
      }
    } else {
      setPrescricao(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      // Make sure we're sending correct data structure
      const prescricaoData = {
        id: prescricao.id,
        medicamento_id: prescricao.medicamento_id,
        medicamento_nome: prescricao.medicamento_nome,
        dosagem: prescricao.dosagem,
        frequencia: prescricao.frequencia,
        duracao: prescricao.duracao,
        observacoes: prescricao.observacoes,
        prontuario_id: prescricao.prontuario_id,
      }
      
      const res = await fetch(`/api/prescricoes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescricaoData),
      })

      if (!res.ok) throw new Error("Falha ao atualizar prescrição")

      setSuccess("Prescrição atualizada com sucesso!")
      setTimeout(() => {
        router.push("/prescricoes")
      }, 2000)
    } catch (error) {
      console.error("Erro ao salvar:", error)
      setError("Ocorreu um erro ao salvar as alterações")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta prescrição? Esta ação não pode ser desfeita.")) return

    try {
      const res = await fetch(`/api/prescricoes/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Falha ao excluir prescrição")

      router.push("/prescricoes")
    } catch (error) {
      console.error("Erro ao excluir:", error)
      setError("Ocorreu um erro ao excluir a prescrição")
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
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
    <div className="min-h-screen bg-white">
      <Header title="Editar Prescrição" />

      <main className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover-card"
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
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="prontuario_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Prontuário
                </label>
                <div className="relative">
                  <input
                    type="text"
                    list="prontuarios-list"
                    placeholder="Digite para buscar prontuário..."
                    value={prontuarioFilter}
                    onChange={(e) => {
                      setProntuarioFilter(e.target.value);
                      const displayValue = e.target.value;
                      const selectedProntuario = prontuarios.find(p => {
                        const prontuarioDisplay = `${p.paciente?.nome || ''} - ${formatDate(p.data_atendimento)}`;
                        return prontuarioDisplay === displayValue;
                      });
                      if (selectedProntuario) {
                        setPrescricao(prev => ({
                          ...prev,
                          prontuario_id: selectedProntuario.id
                        }));
                      } else {
                        setPrescricao(prev => ({
                          ...prev,
                          prontuario_id: ""
                        }));
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                    required
                  />
                  <datalist id="prontuarios-list">
                    {prontuarios
                      .filter((prontuario) => 
                        prontuarioFilter === "" || 
                        (prontuario.paciente?.nome && 
                          prontuario.paciente.nome.toLowerCase().includes(prontuarioFilter.toLowerCase()))
                      )
                      .map((prontuario) => {
                        const prontuarioDisplay = `${prontuario.paciente?.nome || ''} - ${formatDate(prontuario.data_atendimento)}`;
                        return (
                          <option key={prontuario.id} value={prontuarioDisplay} />
                        );
                      })}
                  </datalist>
                  <input 
                    type="hidden" 
                    id="prontuario_id" 
                    name="prontuario_id" 
                    value={prescricao.prontuario_id || ""}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label htmlFor="medicamento_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Medicamento
                </label>
                <div className="relative">
                  <input
                    type="text"
                    list="medicamentos-list"
                    placeholder="Digite para buscar medicamento..."
                    value={medicamentoFilter}
                    onChange={(e) => {
                      setMedicamentoFilter(e.target.value);
                      const displayValue = e.target.value;
                      const selectedMedicamento = medicamentos.find(m => {
                        const medDisplay = `${m.nome}${m.principio_ativo ? ` - ${m.principio_ativo}` : ''}`;
                        return medDisplay === displayValue;
                      });
                      if (selectedMedicamento) {
                        setPrescricao(prev => ({
                          ...prev,
                          medicamento_id: selectedMedicamento.id,
                          medicamento_nome: selectedMedicamento.nome
                        }));
                      } else {
                        setPrescricao(prev => ({
                          ...prev,
                          medicamento_id: "",
                          medicamento_nome: ""
                        }));
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                    required
                  />
                  <datalist id="medicamentos-list">
                    {medicamentos
                      .filter((medicamento) => 
                        medicamentoFilter === "" || 
                        medicamento.nome.toLowerCase().includes(medicamentoFilter.toLowerCase()) || 
                        (medicamento.principio_ativo && 
                         medicamento.principio_ativo.toLowerCase().includes(medicamentoFilter.toLowerCase()))
                      )
                      .map((medicamento) => {
                        const medDisplay = `${medicamento.nome}${medicamento.principio_ativo ? ` - ${medicamento.principio_ativo}` : ''}`;
                        return (
                          <option key={medicamento.id} value={medDisplay} />
                        );
                      })}
                  </datalist>
                  <input 
                    type="hidden" 
                    id="medicamento_id" 
                    name="medicamento_id" 
                    value={prescricao.medicamento_id || ""}
                  />
                  <input 
                    type="hidden" 
                    id="medicamento_nome" 
                    name="medicamento_nome" 
                    value={prescricao.medicamento_nome || ""}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <label htmlFor="dosagem" className="block text-sm font-medium text-gray-700 mb-1">
                  Dosagem
                </label>
                <input
                  type="text"
                  id="dosagem"
                  name="dosagem"
                  value={prescricao.dosagem}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label htmlFor="frequencia" className="block text-sm font-medium text-gray-700 mb-1">
                  Frequência
                </label>
                <input
                  type="text"
                  id="frequencia"
                  name="frequencia"
                  value={prescricao.frequencia}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <label htmlFor="duracao" className="block text-sm font-medium text-gray-700 mb-1">
                  Duração
                </label>
                <input
                  type="text"
                  id="duracao"
                  name="duracao"
                  value={prescricao.duracao}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="col-span-2"
              >
                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={prescricao.observacoes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                ></textarea>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => router.push("/prescricoes")}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Voltar
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center justify-center px-4 py-2 border border-red-300 rounded-lg text-red-700 bg-white hover:bg-red-50"
                >
                  <Trash2 size={18} className="mr-2" />
                  Excluir
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  className="flex items-center justify-center px-4 py-2 border border-[#4d9d74] rounded-lg text-[#4d9d74] bg-white hover:bg-[#4d9d74]/10"
                >
                  <Download size={18} className="mr-2" />
                  Baixar PDF
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={saving}
                className="code-bold flex items-center justify-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-animated"
              >
                <Save size={18} className="mr-2" />
                {saving ? "Salvando..." : "Salvar alterações"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
