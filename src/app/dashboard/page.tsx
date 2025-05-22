"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import { Calendar, Users, FileText, TrendingUp, ArrowRight, Bell } from "lucide-react"
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
      color: "bg-[#4d9d74]",
      link: "/pacientes",
    },
    {
      title: "Total de Consultas",
      value: stats.totalConsultas,
      icon: Calendar,
      color: "bg-[#4d9d74]",
      link: "/consultas",
    },
    {
      title: "Consultas Hoje",
      value: stats.consultasHoje,
      icon: TrendingUp,
      color: "bg-[#4d9d74]",
      link: "/consultas",
    },
    {
      title: "Prescrições",
      value: stats.totalPrescricoes,
      icon: FileText,
      color: "bg-[#4d9d74]",
      link: "/prescricoes",
    },
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
            className="notification notification-success"
          >
            <Bell size={18} className="mr-2" />
            <div>
              <p className="code-bold font-medium">Login realizado com sucesso!</p>
              <p className="text-xs">Bem-vindo ao Sistema de Prontuário Eletrônico</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white">
        <Header title="Dashboard" />

        <main className="p-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {statCards.map((card, index) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md border border-gray-200 hover-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${card.color}`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    {loading ? (
                      <div className="h-8 w-12 bg-gray-200 skeleton rounded"></div>
                    ) : (
                      <span className="code-bold text-3xl text-black font-bold">{card.value}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="code-bold text-black">{card.title}</h3>
                    <Link
                      href={card.link}
                      className="text-[#4d9d74] hover:text-[#3a8a64] transition-transform hover:translate-x-1"
                    >
                      <ArrowRight size={16} />
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
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <motion.div variants={item} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover-card">
              <h2 className="code-bold text-xl mb-4 text-[#4d9d74] flex justify-between items-center">
                <span>Próximas Consultas</span>
                <Link
                  href="/consultas"
                  className="code-bold text-sm text-[#4d9d74] hover:text-[#3a8a64] flex items-center group"
                >
                  Ver todas
                  <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </h2>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 skeleton rounded"></div>
                  ))}
                </div>
              ) : stats.consultasHoje === 0 ? (
                <div className="text-center py-8">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                  >
                    <Calendar size={40} className="mx-auto text-gray-300 mb-2" />
                  </motion.div>
                  <p className="text-gray-700">Nenhuma consulta agendada para hoje.</p>
                  <Link
                    href="/consultas/nova"
                    className="code-bold mt-4 inline-flex items-center text-sm text-[#4d9d74] hover:text-[#3a8a64] group"
                  >
                    Agendar nova consulta
                    <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {[...Array(stats.consultasHoje)].map((_, index) => (
                    <motion.div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="code-bold font-medium">Paciente {index + 1}</p>
                          <p className="text-sm text-gray-700">Dr. João Silva • Cardiologia</p>
                        </div>
                        <div className="text-right">
                          <p className="code-bold text-sm font-medium text-[#4d9d74]">14:3{index} - 15:00</p>
                          <p className="text-xs text-gray-700">Hoje</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div variants={item} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover-card">
              <h2 className="code-bold text-xl mb-4 text-[#4d9d74] flex justify-between items-center">
                <span>Atividade Recente</span>
                <Link
                  href="/pacientes"
                  className="code-bold text-sm text-[#4d9d74] hover:text-[#3a8a64] flex items-center group"
                >
                  Ver pacientes
                  <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </h2>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 skeleton rounded"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    <div className="p-2 bg-[#4d9d74]/10 rounded-full mr-3">
                      <Users size={16} className="text-[#4d9d74]" />
                    </div>
                    <div className="flex-1">
                      <p className="code-bold text-sm font-medium">Novo paciente cadastrado</p>
                      <p className="text-xs text-gray-700">Há 2 horas</p>
                    </div>
                    <Link href="/pacientes" className="text-[#4d9d74] transition-transform hover:translate-x-1">
                      <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                  <motion.div
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    <div className="p-2 bg-[#4d9d74]/10 rounded-full mr-3">
                      <Calendar size={16} className="text-[#4d9d74]" />
                    </div>
                    <div className="flex-1">
                      <p className="code-bold text-sm font-medium">Consulta agendada</p>
                      <p className="text-xs text-gray-700">Há 3 horas</p>
                    </div>
                    <Link href="/consultas" className="text-[#4d9d74] transition-transform hover:translate-x-1">
                      <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                  <motion.div
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    <div className="p-2 bg-[#4d9d74]/10 rounded-full mr-3">
                      <FileText size={16} className="text-[#4d9d74]" />
                    </div>
                    <div className="flex-1">
                      <p className="code-bold text-sm font-medium">Nova prescrição emitida</p>
                      <p className="text-xs text-gray-700">Há 5 horas</p>
                    </div>
                    <Link href="/prescricoes" className="text-[#4d9d74] transition-transform hover:translate-x-1">
                      <ArrowRight size={14} />
                    </Link>
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
