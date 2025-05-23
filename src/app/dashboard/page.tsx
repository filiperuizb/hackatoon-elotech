"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import { Calendar, Users, FileText, ArrowRight, Bell, Activity, Clock, Plus, Pill, Building2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface DashboardStats {
  totalPacientes: number
  totalConsultas: number
  totalPrescricoes: number
  totalMedicamentos: number
  totalUnidades: number
  totalProntuarios: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPacientes: 0,
    totalConsultas: 0,
    totalPrescricoes: 0,
    totalMedicamentos: 0,
    totalUnidades: 0,
    totalProntuarios: 0,
  })
  const [loading, setLoading] = useState(true)
  const [showNotification, setShowNotification] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const pacientesRes = await fetch("/api/pacientes")
        if (pacientesRes.ok) {
          const pacientes = await pacientesRes.json()
          stats.totalPacientes = pacientes.length
        }

        const consultasRes = await fetch("/api/consultas")
        if (consultasRes.ok) {
          const consultas = await consultasRes.json()
          stats.totalConsultas = consultas.length
        }

        const prescricoesRes = await fetch("/api/prescricoes")
        if (prescricoesRes.ok) {
          const prescricoes = await prescricoesRes.json()
          stats.totalPrescricoes = prescricoes.length
        }

        const medicamentosRes = await fetch("/api/medicamentos")
        if (medicamentosRes.ok) {
          const medicamentos = await medicamentosRes.json()
          stats.totalMedicamentos = medicamentos.length
        }

        const unidadesRes = await fetch("/api/unidades")
        if (unidadesRes.ok) {
          const unidades = await unidadesRes.json()
          stats.totalUnidades = unidades.length
        }

        const prontuariosRes = await fetch("/api/prontuarios")
        if (prontuariosRes.ok) {
          const prontuarios = await prontuariosRes.json()
          stats.totalProntuarios = prontuarios.length
        }

        setStats({ ...stats })
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    const timer = setTimeout(() => {
      setShowNotification(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const statCards = [
    {
      title: "Total de Pacientes",
      value: stats.totalPacientes,
      icon: Users,
      link: "/pacientes",
    },
    {
      title: "Total de Consultas",
      value: stats.totalConsultas,
      icon: Calendar,
      link: "/consultas",
    },
    {
      title: "Prescrições",
      value: stats.totalPrescricoes,
      icon: FileText,
      link: "/prescricoes",
    },
    {
      title: "Prontuários",
      value: stats.totalProntuarios,
      icon: Clock,
      link: "/prontuarios",
    },
    {
      title: "Medicamentos",
      value: stats.totalMedicamentos,
      icon: Pill,
      link: "/medicamentos",
    },
    {
      title: "Unidades",
      value: stats.totalUnidades,
      icon: Building2,
      link: "/unidades",
    },
  ]

  const quickActions = [
    { name: "Novo Paciente", href: "/pacientes/novo", icon: Users },
    { name: "Nova Consulta", href: "/consultas/nova", icon: Calendar },
    { name: "Nova Prescrição", href: "/prescricoes/nova", icon: FileText },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 z-50 bg-[#4d9d74] text-white px-6 py-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center">
              <Bell size={18} className="mr-3" />
              <div>
                <p className="font-semibold">Login realizado com sucesso!</p>
                <p className="text-sm opacity-90">Bem-vindo ao Sistema de Prontuário Eletrônico</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gray-50">
        <Header title="Dashboard" />

        <main className="p-6 space-y-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-8 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta!</h1>
              <p className="text-emerald-100 mb-6">Aqui está um resumo das suas atividades hoje.</p>

              <div className="flex flex-wrap gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={action.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={action.href}
                        className="inline-flex items-center bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        <Icon size={16} className="mr-2" />
                        {action.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {statCards.map((card, index) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-gray-100">
                      <Icon className="text-[#4d9d74]" size={24} />
                    </div>
                    {loading ? (
                      <div className="h-8 w-16 bg-gray-200 skeleton rounded"></div>
                    ) : (
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">{card.value}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-700">{card.title}</h3>
                      <p className="text-sm text-gray-500">Total no sistema</p>
                    </div>
                    <Link href={card.link} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <ArrowRight size={16} className="text-gray-400" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Ações Rápidas */}
            <motion.div variants={item} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-gray-100 mr-3">
                    <Plus size={20} className="text-[#4d9d74]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Ações Rápidas</h2>
                    <p className="text-sm text-gray-500">Acesso direto às principais funcionalidades</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link
                  href="/pacientes/novo"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#4d9d74] rounded-full flex items-center justify-center mr-4">
                    <Users size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Cadastrar Novo Paciente</p>
                    <p className="text-sm text-gray-500">Adicionar um novo paciente ao sistema</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/prontuarios/novo"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#4d9d74] rounded-full flex items-center justify-center mr-4">
                    <FileText size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Criar Novo Prontuário</p>
                    <p className="text-sm text-gray-500">Iniciar um novo prontuário eletrônico</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/prescricoes/nova"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#4d9d74] rounded-full flex items-center justify-center mr-4">
                    <FileText size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Nova Prescrição</p>
                    <p className="text-sm text-gray-500">Emitir uma nova prescrição médica</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Navegação Rápida */}
            <motion.div variants={item} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-lg bg-gray-100 mr-3">
                  <Activity size={20} className="text-[#4d9d74]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Navegação Rápida</h2>
                  <p className="text-sm text-gray-500">Acesse as principais seções</p>
                </div>
              </div>

              <div className="space-y-4">
                <Link
                  href="/pacientes"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#4d9d74] rounded-full flex items-center justify-center mr-4">
                    <Users size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Gerenciar Pacientes</p>
                    <p className="text-sm text-gray-500">Visualizar e editar informações dos pacientes</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/prontuarios"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#4d9d74] rounded-full flex items-center justify-center mr-4">
                    <Clock size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Prontuários Eletrônicos</p>
                    <p className="text-sm text-gray-500">Acessar todos os prontuários do sistema</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/prescricoes"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#4d9d74] rounded-full flex items-center justify-center mr-4">
                    <FileText size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Prescrições Médicas</p>
                    <p className="text-sm text-gray-500">Visualizar e gerenciar prescrições</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </>
  )
}
