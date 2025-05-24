"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
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
} from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false)
      } else {
        setIsNavbarVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const features = [
    {
      icon: <Users className="h-8 w-8 text-[#4d9d74]" />,
      title: "Gestão de Pacientes",
      description: "Cadastre e gerencie informações completas dos pacientes de forma simples e segura.",
    },
    {
      icon: <FileText className="h-8 w-8 text-[#4d9d74]" />,
      title: "Prontuário Eletrônico",
      description:
        "Anamnese padronizada com fluxo: Queixa Principal → HDA → HPP → História Familiar → Hábitos → Conduta.",
    },
    {
      icon: <Shield className="h-8 w-8 text-[#4d9d74]" />,
      title: "Segurança de Dados",
      description: "Proteção total das informações médicas seguindo as normas da LGPD.",
    },
    {
      icon: <Clock className="h-8 w-8 text-[#4d9d74]" />,
      title: "Agilidade",
      description: "Reduza o tempo administrativo e foque no atendimento ao paciente.",
    },
  ]

  const technologies = [
    { name: "React", icon: "⚛️", color: "bg-blue-100 text-blue-600" },
    { name: "Node.js", icon: "🟢", color: "bg-green-100 text-green-600" },
    { name: "TypeScript", icon: "📘", color: "bg-blue-100 text-blue-800" },
    { name: "PostgreSQL", icon: "🐘", color: "bg-blue-100 text-blue-700" },
  ]

  const mvpFeatures = [
    "Cadastro e gestão de pacientes",
    "Agendamento de consultas",
    "Prontuário eletrônico padronizado",
    "Prescrições médicas",
    "Gestão de medicamentos",
    "Controle de unidades de saúde",
  ]

  const testimonials = [
    {
      name: "Dr. Gustavo Valente",
      role: "Médico da Família e Comunidade",
      content:
        "Acho muito difícil buscar o histórico do paciente em outros sistemas. Seria necessário um layout mais simples com menos informação desnecessária.",
      rating: 4,
    },
    {
      name: "Dr. Lucas Gomes",
      role: "Médico",
      content:
        "Clareza e evidência das informações sobre o DIA QUE FOI FEITA A CONSULTA, O PROFISSIONAL QUE ATENDEU E A ESPECIALIDADE nos registros de evolução dos pacientes, FONTES MAIORES e menos poluição visual, navegação mais fluida.",
      rating: 4,
    },
  ]

  const stats = [
    { number: "100%", label: "Funcional", icon: <CheckCircle className="h-6 w-6" /> },
    { number: "50%", label: "Menos Tempo", icon: <Clock className="h-6 w-6" /> },
    { number: "24/7", label: "Disponível", icon: <Activity className="h-6 w-6" /> },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="p-2  rounded-lg">
              </div>
              <Image src="/logo.png" alt="SPA Logo" width={150} height={40} />
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="font-semibold text-gray-700 hover:text-[#4d9d74] transition-colors"
            >
              Funcionalidades
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="font-semibold text-gray-700 hover:text-[#4d9d74] transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("technology")}
              className="font-semibold text-gray-700 hover:text-[#4d9d74] transition-colors"
            >
              Tecnologia
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="font-semibold text-gray-700 hover:text-[#4d9d74] transition-colors"
            >
              Contato
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="font-semibold text-[#4d9d74] hover:text-[#3a8a64] transition-colors">
              Login
            </Link>
            <Link
              href="/registro"
              className="font-semibold bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-2 rounded-lg transition-colors"
            >
              Começar Agora
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#4d9d74] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left font-semibold text-gray-700 hover:text-[#4d9d74] transition-colors py-2"
              >
                Funcionalidades
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left font-semibold text-gray-700 hover:text-[#4d9d74] transition-colors py-2"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("technology")}
                className="block w-full text-left font-semibold text-gray-700 hover:text-[#4d9d74] transition-colors py-2"
              >
                Tecnologia
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left font-semibold text-gray-700 hover:text-[#4d9d74] transition-colors py-2"
              >
                Contato
              </button>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  href="/login"
                  className="block font-semibold text-[#4d9d74] hover:text-[#3a8a64] transition-colors py-2"
                >
                  Login
                </Link>
                <Link
                  href="/registro"
                  className="block font-semibold bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-2 rounded-lg transition-colors text-center"
                >
                  Começar Agora
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4d9d74]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4d9d74]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center bg-[#4d9d74]/10 text-[#4d9d74] px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <Heart className="h-4 w-4 mr-2" />
                Sistema de Prontuário Ágil
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="text-gray-900 code-bold">Saúde Pública</span>
                <br />
                <span className="text-[#4d9d74] code-bold ">Eficiente e Inovadora</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                A tecnologia ao alcance dos profissionais de saúde. Reduza o tempo administrativo e foque no que
                realmente importa: <span className="text-[#4d9d74] font-semibold">o cuidado com os pacientes</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link
                  href="/registro"
                  className="font-semibold bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button
                  onClick={() => scrollToSection("features")}
                  className="font-semibold border-2 border-gray-300 hover:border-[#4d9d74] text-gray-700 hover:text-[#4d9d74] px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center text-lg hover:shadow-lg"
                >
                  Ver Demonstração
                  <ChevronDown className="ml-2 h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center mb-2 text-[#4d9d74]">{stat.icon}</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 code-bold">
                Funcionalidades do MVP
                <span className="block text-[#4d9d74] code-bold">Desenvolvidas e Testadas</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Baseado em feedback real de profissionais de saúde, nosso MVP já resolve os principais problemas do dia
                a dia médico.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#4d9d74]/20 group"
              >
                <div className="p-4 bg-[#4d9d74]/10 rounded-2xl w-fit mb-6 group-hover:bg-[#4d9d74]/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#4d9d74] to-[#3a8a64] rounded-3xl p-8 md:p-12 text-white"
          >
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 code-bold">MVP Funcional</h3>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                Sistema completo e funcional, pronto para uso em unidades de saúde.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {mvpFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center bg-white/10 rounded-lg p-3">
                    <CheckCircle className="h-5 w-5 text-green-200 mr-3 flex-shrink-0" />
                    <span className="text-green-100">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-[#4d9d74] to-[#3a8a64] rounded-3xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-white/20 rounded-xl mr-4">
                    <Stethoscope className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">SPA</h3>
                    <p className="text-green-100">Sistema de Prontuário Ágil</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-green-100">Funcional</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">MVP</div>
                    <div className="text-sm text-green-100">Completo</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 code-bold">Sobre o SPA</h2>
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
                  <div key={index} className="flex items-center">
                    <div className="p-1 bg-[#4d9d74]/10 rounded-full mr-3">
                      <CheckCircle className="h-5 w-5 text-[#4d9d74]" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/registro"
                className="inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Testar o Sistema
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 code-bold">Feedback dos Profissionais</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Depoimentos reais que inspiraram o desenvolvimento do SPA.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="p-2 bg-[#4d9d74]/10 rounded-full mr-3">
                    <Stethoscope className="h-5 w-5 text-[#4d9d74]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 code-bold">Tecnologias Utilizadas</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stack moderno e confiável para garantir performance e escalabilidade.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{tech.icon}</div>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${tech.color}`}>
                  {tech.name}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="p-4 bg-[#4d9d74]/10 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-[#4d9d74]/20 transition-colors">
                  <Database className="h-12 w-12 text-[#4d9d74]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Banco PostgreSQL</h3>
                <p className="text-gray-600">
                  Banco de dados robusto e confiável para armazenamento seguro das informações.
                </p>
              </div>
              <div className="group">
                <div className="p-4 bg-[#4d9d74]/10 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-[#4d9d74]/20 transition-colors">
                  <Smartphone className="h-12 w-12 text-[#4d9d74]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Interface Responsiva</h3>
                <p className="text-gray-600">Funciona perfeitamente em computadores, tablets e smartphones.</p>
              </div>
              <div className="group">
                <div className="p-4 bg-[#4d9d74]/10 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-[#4d9d74]/20 transition-colors">
                  <Zap className="h-12 w-12 text-[#4d9d74]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Otimizada</h3>
                <p className="text-gray-600">Carregamento rápido e navegação fluida para máxima produtividade.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 code-bold">
                Teste o SPA
                <span className="block text-[#4d9d74] code-bold">Sistema já funcional</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Nosso MVP está pronto para uso. Crie sua conta e experimente todas as funcionalidades desenvolvidas.
              </p>
            </motion.div>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/registro"
                  className="font-semibold bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Criar Conta Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/login"
                  className="font-semibold border-2 border-[#4d9d74] text-[#4d9d74] hover:bg-[#4d9d74] hover:text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center text-lg"
                >
                  Fazer Login
                </Link>
              </div>
              <p className="text-gray-400">
                Sistema completo com todas as funcionalidades já implementadas e testadas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-[#4d9d74] rounded-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">SPA</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Sistema de Prontuário Ágil - MVP funcional desenvolvido para revolucionar a gestão de saúde pública.
              </p>
              <div className="flex space-x-4">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Heart className="h-5 w-5 text-[#4d9d74]" />
                </div>
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Shield className="h-5 w-5 text-[#4d9d74]" />
                </div>
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Activity className="h-5 w-5 text-[#4d9d74]" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Sistema</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Funcionalidades
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sobre
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("technology")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tecnologia
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Acesso</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/registro" className="text-gray-400 hover:text-white transition-colors">
                    Criar Conta
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Garotos de Programa
            </p>
          </div>
        </div>
      </footer>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 p-4 bg-[#4d9d74] text-white rounded-full shadow-lg z-50 hover:bg-[#3a8a64] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
          isVisible ? "block" : "hidden"
        }`}
        aria-label="Voltar ao topo"
      >
        <ArrowRight className="h-6 w-6 transform -rotate-90" />
      </motion.button>
    </div>
  )
}
