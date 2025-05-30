"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from '../../../components/header'
import { Save, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

interface NovaConsulta {
  data: string
  hora: string
  status: string
  paciente_id: string
  profissional_id: string  
  unidade_id: string       
  observacoes: string
}

interface Paciente {
  id: string
  nome: string
}

interface ProfissionalSaude {
  id: string
  nome: string
  especialidade: {
    nome: string
  } | null
}

interface UnidadeSaude {
  id: string
  nome: string
}

export default function NovaConsulta() {  const [consulta, setConsulta] = useState<NovaConsulta>({
    data: "",
    hora: "",
    status: "Agendada",
    paciente_id: "",
    profissional_id: "", 
    unidade_id: "",      
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
  
  // Filters for searchable dropdowns
  const [pacienteFilter, setPacienteFilter] = useState("")
  const [profissionalFilter, setProfissionalFilter] = useState("")
  const [unidadeFilter, setUnidadeFilter] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientesRes = await fetch("/api/pacientes")
        if (pacientesRes.ok) {
          const pacientesData = await pacientesRes.json()
          setPacientes(pacientesData)
        }

        const profissionaisRes = await fetch("/api/profissionais")
        if (profissionaisRes.ok) {
          const profissionaisData = await profissionaisRes.json()
          setProfissionais(profissionaisData)
        }

        const unidadesRes = await fetch("/api/unidades")
        if (unidadesRes.ok) {
          const unidadesData = await unidadesRes.json()
          setUnidades(unidadesData)
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

      const { 
        data, 
        hora, 
        status, 
        observacoes, 
        paciente_id, 
        profissional_id, 
        unidade_id 
      } = consulta;

      const createData = {
        data,     
        hora,
        status,
        observacoes,
        paciente_id,
        profissional_id,
        unidade_id
      };

      const res = await fetch("/api/consultas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Falha ao agendar consulta")
      }

      setSuccess("Consulta agendada com sucesso!")
      setTimeout(() => {
        router.push("/consultas")
      }, 2000)
    } catch (error) {
      console.error("Erro ao salvar:", error)
      setError(error instanceof Error ? error.message : "Ocorreu um erro ao agendar a consulta")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header title="Nova Consulta" />
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
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
      <Header title="Nova Consulta" />

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="paciente_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Paciente
                </label>
                <div className="relative">
                  <input
                    type="text"
                    list="pacientes-list"
                    placeholder="Digite para buscar paciente..."
                    value={pacienteFilter}
                    onChange={(e) => {
                      setPacienteFilter(e.target.value);
                      const selectedPaciente = pacientes.find(p => 
                        p.nome.toLowerCase() === e.target.value.toLowerCase()
                      );
                      if (selectedPaciente) {
                        setConsulta(prev => ({
                          ...prev,
                          paciente_id: selectedPaciente.id
                        }));
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                    required
                  />
                  <datalist id="pacientes-list">
                    {pacientes
                      .filter(paciente => 
                        pacienteFilter === "" || 
                        paciente.nome.toLowerCase().includes(pacienteFilter.toLowerCase())
                      )
                      .map(paciente => (
                        <option key={paciente.id} value={paciente.nome} />
                      ))}
                  </datalist>
                  <input 
                    type="hidden" 
                    id="paciente_id" 
                    name="paciente_id" 
                    value={consulta.paciente_id} 
                  />
                </div>
              </motion.div>              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >                
                <label htmlFor="profissional_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Profissional de Saúde
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
                        setConsulta(prev => ({
                          ...prev,
                          profissional_id: selectedProfissional.id
                        }));
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
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
                    value={consulta.profissional_id} 
                  />
                </div>
              </motion.div>              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >                
                <label htmlFor="unidade_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Unidade de Saúde
                </label>
                <div className="relative">
                  <input
                    type="text"
                    list="unidades-list"
                    placeholder="Digite para buscar unidade..."
                    value={unidadeFilter}
                    onChange={(e) => {
                      setUnidadeFilter(e.target.value);
                      const selectedUnidade = unidades.find(u => 
                        u.nome.toLowerCase() === e.target.value.toLowerCase()
                      );
                      if (selectedUnidade) {
                        setConsulta(prev => ({
                          ...prev,
                          unidade_id: selectedUnidade.id
                        }));
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                    required
                  />
                  <datalist id="unidades-list">
                    {unidades
                      .filter(unidade => 
                        unidadeFilter === "" || 
                        unidade.nome.toLowerCase().includes(unidadeFilter.toLowerCase())
                      )
                      .map(unidade => (
                        <option key={unidade.id} value={unidade.nome} />
                      ))}
                  </datalist>
                  <input 
                    type="hidden" 
                    id="unidade_id" 
                    name="unidade_id" 
                    value={consulta.unidade_id} 
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={consulta.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                  required
                >
                  <option value="Agendada">Agendada</option>
                  <option value="Concluída">Concluída</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  value={consulta.data}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora
                </label>
                <input
                  type="time"
                  id="hora"
                  name="hora"
                  value={consulta.hora}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="col-span-2"
              >
                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={consulta.observacoes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d9d74] focus:border-[#4d9d74] input-animated"
                ></textarea>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => router.push("/consultas")}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft size={18} className="mr-2" />
                Voltar
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={saving}
                className="code-bold flex items-center justify-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-animated"
              >
                <Save size={18} className="mr-2" />
                {saving ? "Agendando..." : "Agendar consulta"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
