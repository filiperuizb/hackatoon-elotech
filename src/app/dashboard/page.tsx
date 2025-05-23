"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import { Calendar, Users, FileText, ArrowRight, Bell, Activity, Clock, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface DashboardStats {
  totalPacientes: number
  totalConsultas: number
  totalPrescricoes: number
  consultasHoje: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPacientes: 0,
    totalConsultas: 0,
    totalPrescricoes: 0,
    consultasHoje: 0,
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

          const today = new Date().toISOString().split("T")[0]
          stats.consultasHoje = consultas.filter((consulta: any) => consulta.data?.startsWith(today)).length
        }

        const prescricoesRes = await fetch("/api/prescricoes")
        if (prescricoesRes.ok) {
          const prescricoes = await prescricoesRes.json()
          stats.totalPrescricoes = prescricoes.length
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
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Total de Consultas",
      value: stats.totalConsultas,
      icon: Calendar,
      link: "/consultas",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Consultas Hoje",
      value: stats.consultasHoje,
      icon: Clock,
      link: "/consultas",
      change: "0",
      changeType: "neutral",
    },
    {
      title: "Prescrições",
      value: stats.totalPrescricoes,
      icon: FileText,
      link: "/prescricoes",
      change: "+15%",
      changeType: "positive",
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

            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                        <div
                          className={`text-sm font-medium ${
                            card.changeType === "positive"
                              ? "text-green-600"
                              : card.changeType === "negative"
                                ? "text-red-600"
                                : "text-gray-500"
                          }`}
                        >
                          {card.change !== "0" && card.change}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-700">{card.title}</h3>
                      <p className="text-sm text-gray-500">vs. mês anterior</p>
                    </div>
                    <Link href={card.link} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <ArrowRight size={16} className="text-gray-400" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <motion.div
              variants={item}
              className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-gray-100 mr-3">
                    <Calendar size={20} className="text-[#4d9d74]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Próximas Consultas</h2>
                    <p className="text-sm text-gray-500">Agenda do dia</p>
                  </div>
                </div>
                <Link
                  href="/consultas"
                  className="text-sm text-[#4d9d74] hover:text-[#3a8a64] font-medium flex items-center group"
                >
                  Ver todas
                  <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 skeleton rounded-lg"></div>
                  ))}
                </div>
              ) : stats.consultasHoje === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma consulta hoje</h3>
                  <p className="text-gray-500 mb-6">Sua agenda está livre para hoje.</p>
                  <Link
                    href="/consultas/nova"
                    className="inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    <Plus size={18} className="mr-2" />
                    Agendar Consulta
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {[...Array(stats.consultasHoje)].map((_, index) => (
                    <motion.div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      whileHover={{ x: 2 }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#4d9d74] rounded-full flex items-center justify-center mr-4">
                            <Users size={16} className="text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Paciente {index + 1}</p>
                            <p className="text-sm text-gray-500">Dr. João Silva • Cardiologia</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#4d9d74]">14:3{index} - 15:00</p>
                          <p className="text-xs text-gray-500">Hoje</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div variants={item} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-lg bg-gray-100 mr-3">
                  <Activity size={20} className="text-[#4d9d74]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Atividade Recente</h2>
                  <p className="text-sm text-gray-500">Últimas ações</p>
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 skeleton rounded-lg"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <div className="w-10 h-10 bg-[#4d9d74] rounded-full flex items-center justify-center mr-4">
                      <Users size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Novo paciente cadastrado</p>
                      <p className="text-sm text-gray-500">Há 2 horas</p>
                    </div>
                    <ArrowRight size={16} className="text-gray-400" />
                  </motion.div>

                  <motion.div
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <div className="w-10 h-10 bg-[#4d9d74] rounded-full flex items-center justify-center mr-4">
                      <Calendar size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Consulta agendada</p>
                      <p className="text-sm text-gray-500">Há 3 horas</p>
                    </div>
                    <ArrowRight size={16} className="text-gray-400" />
                  </motion.div>

                  <motion.div
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <div className="w-10 h-10 bg-[#4d9d74] rounded-full flex items-center justify-center mr-4">
                      <FileText size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Nova prescrição emitida</p>
                      <p className="text-sm text-gray-500">Há 5 horas</p>
                    </div>
                    <ArrowRight size={16} className="text-gray-400" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </main>
      </div>
    </>
  )
}
