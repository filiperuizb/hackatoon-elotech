"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import {
  ArrowRight,
  Users,
  Shield,
  ChevronDown,
  FileText,
  Database,
  Smartphone,
  CheckCircle,
  Star,
  Zap,
  Heart,
  Activity,
  Menu,
  X,
  Stethoscope,
  Clock,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Lock,
  Cpu,
} from "lucide-react"
import Image from "next/image"

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 to-green-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"
      />
    </div>
  )
}

const GlassCard = ({ children, className = "", delay = 0 }: any) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 rounded-2xl" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

const CompactNavbar = ({
  isVisible,
  scrollToSection,
}: { isVisible: boolean; scrollToSection: (id: string) => void }) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-full px-6 py-3 shadow-xl"
    >
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="SPA" width={40} height={20} className="rounded" />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {["Funcionalidades", "Sobre", "Tecnologia", "Contato"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-sm font-medium code-bold text-gray-700 hover:text-[#4d9d74] transition-colors px-3 py-1 rounded-full hover:bg-emerald-50"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/login"
            className="text-sm font-medium code-bold text-gray-700 hover:text-[#4d9d74] transition-colors px-3 py-1.5 rounded-full hover:bg-gray-50"
          >
            Login
          </Link>
          <Link
            href="/registro"
            className="text-sm font-medium code-bold bg-gradient-to-r from-[#4d9d74] to-emerald-600 text-white px-4 py-1.5 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Registrar
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function LandingPage() {
  const router = useRouter()
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [isCompactNavVisible, setIsCompactNavVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 200) {
        setIsCompactNavVisible(true)
        setIsNavbarVisible(false)
      } else {
        setIsCompactNavVisible(false)
        setIsNavbarVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Gestão de Pacientes",
      description: "Cadastre e gerencie informações completas dos pacientes de forma simples e segura.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Prontuário Eletrônico",
      description: "Anamnese padronizada com fluxo completo e intuitivo para consultas eficientes.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Segurança de Dados",
      description: "Proteção total das informações médicas seguindo as normas da LGPD.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Agilidade",
      description: "Reduza o tempo administrativo e foque no atendimento ao paciente.",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  const testimonials = [
    {
      name: "Dr. Gustavo Valente",
      role: "Médico da Família",
      content:
        "Acho muito difícil buscar o histórico do paciente em outros sistemas. Seria necessário um layout mais simples com menos informação desnecessária.",
      avatar: "GV",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      name: "Dr. Lucas Gomes",
      role: "Médico",
      content:
        "Clareza e evidência das informações sobre o DIA QUE FOI FEITA A CONSULTA, O PROFISSIONAL QUE ATENDEU E A ESPECIALIDADE nos registros de evolução dos pacientes.",
      avatar: "LG",
      gradient: "from-emerald-500 to-teal-500",
    },
  ]

  const stats = [
    { number: "100%", label: "Funcional", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "50%", label: "Menos Tempo", icon: <Clock className="h-5 w-5" /> },
    { number: "24/7", label: "Disponível", icon: <Activity className="h-5 w-5" /> },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const technologies = [
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      description: "Interface moderna",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      description: "Backend robusto",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      description: "Código seguro",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      description: "Dados confiáveis",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-x-hidden">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isNavbarVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
              <Image src="/logo.png" alt="SPA Logo" width={120} height={60} className="rounded-lg" />
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {["Funcionalidades", "Sobre", "Tecnologia", "Contato"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="font-medium code-bold text-gray-700 hover:text-[#4d9d74] transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4d9d74] to-emerald-600 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/login"
                  className="font-medium code-bold text-gray-700 hover:text-[#4d9d74] transition-colors px-4 py-2 rounded-xl hover:bg-emerald-50"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/registro"
                  className="font-medium code-bold bg-gradient-to-r from-[#4d9d74] to-emerald-600 text-white px-6 py-2.5 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  Começar Agora
                </Link>
              </motion.div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#4d9d74] transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {["Funcionalidades", "Sobre", "Tecnologia", "Contato"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left font-medium code-bold text-gray-700 hover:text-[#4d9d74] transition-colors py-2"
              >
                {item}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link
                href="/login"
                className="block font-medium code-bold text-[#4d9d74] hover:text-emerald-700 transition-colors py-2"
              >
                Login
              </Link>
              <Link
                href="/registro"
                className="block font-medium code-bold bg-gradient-to-r from-[#4d9d74] to-emerald-600 text-white px-6 py-3 rounded-2xl text-center hover:shadow-lg transition-all duration-300"
              >
                Começar Agora
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <CompactNavbar isVisible={isCompactNavVisible} scrollToSection={scrollToSection} />

      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 overflow-hidden">
        <AnimatedBackground />

        <motion.div style={{ opacity }} className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={heroInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Sistema de Prontuário Ágil
              </motion.div>

              <motion.h1
                style={{ y: y1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight code-bold"
              >
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Saúde Pública
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#4d9d74] to-emerald-600 bg-clip-text text-transparent">
                  Eficiente e Inovadora
                </span>
              </motion.h1>

              <motion.p
                style={{ y: y2 }}
                className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto"
              >
                A tecnologia ao alcance dos profissionais de saúde. Reduza o tempo administrativo e foque no que
                realmente importa: <span className="text-[#4d9d74] font-semibold">o cuidado com os pacientes</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/registro"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium code-bold text-white bg-gradient-to-r from-[#4d9d74] to-emerald-600 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center font-semibold">
                      Começar Gratuitamente
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("funcionalidades")}
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium code-bold text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl hover:border-[#4d9d74] hover:text-[#4d9d74] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Ver Demonstração
                  <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                </motion.button>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {stats.map((stat, index) => (
                  <GlassCard key={index} delay={0.2 + index * 0.1} className="p-6 rounded-2xl text-center">
                    <div className="flex items-center justify-center mb-3 text-[#4d9d74]">{stat.icon}</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#4d9d74] to-emerald-600 bg-clip-text text-transparent mb-1">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="funcionalidades" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Zap className="h-4 w-4 mr-2" />
                MVP Completo
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 code-bold">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Funcionalidades do MVP
                </span>
                <span className="block text-3xl md:text-4xl mt-2 bg-gradient-to-r from-[#4d9d74] to-emerald-600 bg-clip-text text-transparent">
                  Desenvolvidas e Testadas
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Baseado em feedback real de profissionais de saúde, nosso MVP já resolve os principais problemas do dia
                a dia médico.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <GlassCard delay={index * 0.1} className="p-8 rounded-2xl group">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                    className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl w-fit mb-6 text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 code-bold">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-br from-[#4d9d74] via-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6"
              >
                <CheckCircle className="h-8 w-8" />
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 code-bold">MVP Funcional</h3>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                Sistema completo e funcional, pronto para uso em unidades de saúde.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {[
                  "Cadastro e gestão de pacientes",
                  "Agendamento de consultas",
                  "Prontuário eletrônico padronizado",
                  "Prescrições médicas",
                  "Gestão de medicamentos",
                  "Controle de unidades de saúde",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-colors"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-200 mr-3 flex-shrink-0" />
                    <span className="text-emerald-50">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="sobre" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 rounded-3xl">
                <div className="bg-gradient-to-br from-[#4d9d74] to-emerald-600 rounded-2xl p-8 text-white">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl mr-4">
                      <Stethoscope className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold code-bold">SPA</h3>
                      <p className="text-emerald-100">Sistema de Prontuário Ágil</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-colors">
                      <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold code-bold">100%</div>
                      <div className="text-sm text-emerald-100">Funcional</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-colors">
                      <Users className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold code-bold">MVP</div>
                      <div className="text-sm text-emerald-100">Completo</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Heart className="h-4 w-4 mr-2" />
                Sobre o Sistema
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 code-bold">
                Desenvolvido para{" "}
                <span className="bg-gradient-to-r from-[#4d9d74] to-emerald-600 bg-clip-text text-transparent">
                  Profissionais de Saúde
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                O Sistema de Prontuário Ágil (SPA) foi desenvolvido para atender às necessidades reais dos profissionais
                de saúde, oferecendo uma solução completa e intuitiva para a gestão de pacientes e consultas médicas.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Baseado em pesquisas e entrevistas com médicos, enfermeiros e estudantes de medicina, o SPA resolve
                problemas reais como navegação complexa, travamentos e falta de padronização.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Layout limpo com menos abas desnecessárias",
                  "Navegação fluida e intuitiva",
                  "Padronização da anamnese (já implementada!)",
                  "Estabilidade e confiabilidade",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center group"
                  >
                    <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mr-4 group-hover:from-emerald-200 group-hover:to-teal-200 transition-colors">
                      <CheckCircle className="h-5 w-5 text-[#4d9d74]" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/registro"
                  className="inline-flex items-center bg-gradient-to-r from-[#4d9d74] to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 code-bold"
                >
                  Testar o Sistema
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star className="h-4 w-4 mr-2" />
                Depoimentos
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 code-bold">
                Feedback dos{" "}
                <span className="bg-gradient-to-r from-[#4d9d74] to-emerald-600 bg-clip-text text-transparent">
                  Profissionais
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Depoimentos reais que inspiraram o desenvolvimento do SPA.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <GlassCard key={index} delay={index * 0.2} className="p-8 rounded-2xl">
                <div className="flex items-center mb-6">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold mr-4`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 2 ? "text-amber-400 fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section id="tecnologia" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Cpu className="h-4 w-4 mr-2" />
                Stack Moderna
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 code-bold">
                Tecnologias{" "}
                <span className="bg-gradient-to-r from-[#4d9d74] to-emerald-600 bg-clip-text text-transparent">
                  Utilizadas
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stack moderno e confiável para garantir performance e escalabilidade.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {technologies.map((tech, index) => (
              <GlassCard key={index} delay={index * 0.1} className="p-8 rounded-2xl text-center group cursor-pointer">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="mb-4">
                  <img src={tech.icon || "/placeholder.svg"} alt={tech.name} className="w-16 h-16 mx-auto" />
                </motion.div>
                <h3 className="font-bold text-gray-900 mb-2 code-bold">{tech.name}</h3>
                <p className="text-sm text-gray-600">{tech.description}</p>
              </GlassCard>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-8 rounded-2xl text-center group">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl w-fit mx-auto mb-6 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Database className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 code-bold">Banco PostgreSQL</h3>
              <p className="text-gray-600">
                Banco de dados robusto e confiável para armazenamento seguro das informações.
              </p>
            </GlassCard>

            <GlassCard className="p-8 rounded-2xl text-center group">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl w-fit mx-auto mb-6 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 code-bold">Interface Responsiva</h3>
              <p className="text-gray-600">Funciona perfeitamente em computadores, tablets e smartphones.</p>
            </GlassCard>

            <GlassCard className="p-8 rounded-2xl text-center group">
              <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl w-fit mx-auto mb-6 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 code-bold">Performance Otimizada</h3>
              <p className="text-gray-600">Carregamento rápido e navegação fluida para máxima produtividade.</p>
            </GlassCard>
          </div>
        </div>
      </section>

      <section
        id="contato"
        className="py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4d9d74]/20 to-emerald-600/20" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                Pronto para Uso
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 code-bold">
                Teste o SPA
                <span className="block text-3xl md:text-4xl mt-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Sistema já funcional
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                Nosso MVP está pronto para uso. Crie sua conta e experimente todas as funcionalidades desenvolvidas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/registro"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium code-bold text-gray-900 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center font-semibold">
                      Criar Conta Gratuita
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium code-bold text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                  >
                    Fazer Login
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>

              <p className="text-gray-400 mt-8">
                Sistema completo com todas as funcionalidades já implementadas e testadas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <Image src="/logo.png" alt="SPA" width={80} height={40} className="rounded" />
              </div>
              <p className="text-gray-400 mb-6">
                Sistema de Prontuário Ágil - MVP funcional desenvolvido para revolucionar a gestão de saúde pública.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Heart className="h-5 w-5" />, label: "Saúde" },
                  { icon: <Shield className="h-5 w-5" />, label: "Segurança" },
                  { icon: <Activity className="h-5 w-5" />, label: "Agilidade" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer"
                    title={item.label}
                  >
                    <div className="text-[#4d9d74]">{item.icon}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6 bg-gradient-to-r from-[#4d9d74] to-emerald-400 bg-clip-text text-transparent code-bold">
                Sistema
              </h3>
              <ul className="space-y-3">
                {["Funcionalidades", "Sobre", "Tecnologia", "Contato"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <ChevronDown className="h-4 w-4 mr-2 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6 bg-gradient-to-r from-[#4d9d74] to-emerald-400 bg-clip-text text-transparent code-bold">
                Acesso
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/login"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <Lock className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/registro"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <Users className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Criar Conta
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6 bg-gradient-to-r from-[#4d9d74] to-emerald-400 bg-clip-text text-transparent code-bold">
                Contato
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-3 text-[#4d9d74]" />
                  filiperuizboligon9@gmail.com
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-3 text-[#4d9d74]" />
                  Maringá, Paraná
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-left">
                &copy; {new Date().getFullYear()} Garotos de Programa. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6">
                <motion.a
                  href="https://github.com/filiperuizb/spa-prontuario-agil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-[#4d9d74] transition-colors"
                  title="GitHub"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/posts/filipe-ruiz-boligon-8930582b6_sa%C3%BAde-p%C3%BAblica-eficiente-e-inovadora-activity-7332134056450527232-c48Y?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvTb-8BWnEFXMbyPhDiRnqrImX6Nop3VEc"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-[#4d9d74] transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: scrollY.get() > 300 ? 1 : 0,
          scale: scrollY.get() > 300 ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-[#4d9d74] to-emerald-600 text-white rounded-full shadow-xl z-50 hover:shadow-2xl transition-all duration-300"
        aria-label="Voltar ao topo"
      >
        <ArrowRight className="h-6 w-6 transform -rotate-90" />
      </motion.button>
    </div>
  )
}
