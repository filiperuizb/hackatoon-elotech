"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
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
  Calendar,
  Menu,
  X,
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

      // Show/hide scroll to top button
      if (currentScrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false) // Hide when scrolling down
      } else {
        setIsNavbarVisible(true) // Show when scrolling up
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const features = [
    {
      icon: <Users className="h-6 w-6 text-[#4d9d74]" />,
      title: "Gestão de Pacientes",
      description: "Cadastre e gerencie informações completas dos pacientes de forma simples e segura.",
    },
    {
      icon: <FileText className="h-6 w-6 text-[#4d9d74]" />,
      title: "Prontuário Eletrônico",
      description:
        "Anamnese padronizada com fluxo: Queixa Principal → HDA → HPP → História Familiar → Hábitos → Conduta.",
    },
    {
      icon: <Shield className="h-6 w-6 text-[#4d9d74]" />,
      title: "Segurança de Dados",
      description: "Proteção total das informações médicas seguindo as normas da LGPD.",
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.png" alt="SPA Logo" width={140} height={70} className="object-contain" priority />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="code-bold text-gray-700 hover:text-[#4d9d74] transition-colors"
            >
              Funcionalidades
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="code-bold text-gray-700 hover:text-[#4d9d74] transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("technology")}
              className="code-bold text-gray-700 hover:text-[#4d9d74] transition-colors"
            >
              Tecnologia
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="code-bold text-gray-700 hover:text-[#4d9d74] transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="code-bold text-[#4d9d74] hover:text-[#3a8a64] transition-colors">
              Login
            </Link>
            <Link
              href="/registro"
              className="code-bold bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-2 rounded-lg transition-colors"
            >
              Começar Agora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#4d9d74] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
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
                className="block w-full text-left code-bold text-gray-700 hover:text-[#4d9d74] transition-colors py-2"
              >
                Funcionalidades
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left code-bold text-gray-700 hover:text-[#4d9d74] transition-colors py-2"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("technology")}
                className="block w-full text-left code-bold text-gray-700 hover:text-[#4d9d74] transition-colors py-2"
              >
                Tecnologia
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left code-bold text-gray-700 hover:text-[#4d9d74] transition-colors py-2"
              >
                Contato
              </button>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  href="/login"
                  className="block code-bold text-[#4d9d74] hover:text-[#3a8a64] transition-colors py-2"
                >
                  Login
                </Link>
                <Link
                  href="/registro"
                  className="block code-bold bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-2 rounded-lg transition-colors text-center"
                >
                  Começar Agora
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4d9d74]/20 to-transparent"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 mb-12 lg:mb-0"
            >
              <div className="inline-flex items-center bg-[#4d9d74]/20 text-[#4d9d74] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart className="h-4 w-4 mr-2" />
                Sistema de Prontuário Ágil
              </div>
              <h1 className="code-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Saúde Pública
                <span className="block text-[#4d9d74]">Eficiente e Inovadora</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                A tecnologia ao alcance dos profissionais de saúde. Reduza o tempo administrativo e foque no que
                realmente importa:
                <span className="text-[#4d9d74] font-semibold"> o cuidado com os pacientes</span>.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <Link
                  href="/registro"
                  className="code-bold bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-8 py-4 rounded-lg transition-colors flex items-center justify-center text-lg"
                >
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button
                  onClick={() => scrollToSection("features")}
                  className="code-bold border-2 border-gray-600 hover:border-[#4d9d74] text-gray-300 hover:text-[#4d9d74] px-8 py-4 rounded-lg transition-colors flex items-center justify-center text-lg"
                >
                  Ver Demonstração
                  <ChevronDown className="ml-2 h-5 w-5" />
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4d9d74] to-[#3a8a64] rounded-3xl transform rotate-3 opacity-20"></div>
                <Image
                  src="/atendente.jpg"
                  alt="Profissionais de saúde"
                  width={600}
                  height={400}
                  className="relative z-10 rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="code-bold text-4xl md:text-5xl text-gray-800 mb-6">
                Funcionalidades do MVP
                <span className="block text-[#4d9d74]">Desenvolvidas e Testadas</span>
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
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="p-4 bg-[#4d9d74]/10 rounded-2xl w-fit mb-6">{feature.icon}</div>
                <h3 className="code-bold text-xl text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h3 className="code-bold text-3xl md:text-4xl mb-4">MVP Funcional</h3>
                <p className="text-xl text-green-100 mb-6">
                  Sistema completo e funcional, pronto para uso em unidades de saúde.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mvpFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-200 mr-2 flex-shrink-0" />
                      <span className="text-green-100">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-12">
                <Image src="/gp.png" alt="SPA Dashboard" width={500} height={300} className="rounded-xl shadow-2xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <div className="relative h-64 md:h-80 w-full">
                <Image src="/logo.png" alt="SPA Logo" fill className="object-contain" priority />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:w-1/2 md:pl-10"
            >
              <h2 className="code-bold text-3xl text-gray-800 mb-4">Sobre o SPA</h2>
              <p className="text-lg text-gray-600 mb-4">
                O Sistema de Prontuário Ágil (SPA) foi desenvolvido para atender às necessidades reais dos profissionais
                de saúde, oferecendo uma solução completa e intuitiva para a gestão de pacientes e consultas médicas.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Baseado em pesquisas e entrevistas com médicos, enfermeiros e estudantes de medicina, o SPA resolve
                problemas reais como navegação complexa, travamentos e falta de padronização.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4d9d74] mr-3" />
                  <span className="text-gray-700">Layout limpo com menos abas desnecessárias</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4d9d74] mr-3" />
                  <span className="text-gray-700">Navegação fluida e intuitiva</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4d9d74] mr-3" />
                  <span className="text-gray-700">Padronização da anamnese (já implementada!)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4d9d74] mr-3" />
                  <span className="text-gray-700">Estabilidade e confiabilidade</span>
                </div>
              </div>
              <Link
                href="/registro"
                className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-3 rounded-lg transition-colors"
              >
                Testar o Sistema
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="code-bold text-4xl text-gray-800 mb-4">Feedback dos Profissionais</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="code-bold text-4xl md:text-5xl text-gray-800 mb-6">Tecnologias Utilizadas</h2>
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
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
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
              <div>
                <Database className="h-12 w-12 text-[#4d9d74] mx-auto mb-4" />
                <h3 className="code-bold text-xl text-gray-800 mb-2">Banco PostgreSQL</h3>
                <p className="text-gray-600">
                  Banco de dados robusto e confiável para armazenamento seguro das informações.
                </p>
              </div>
              <div>
                <Smartphone className="h-12 w-12 text-[#4d9d74] mx-auto mb-4" />
                <h3 className="code-bold text-xl text-gray-800 mb-2">Interface Responsiva</h3>
                <p className="text-gray-600">Funciona perfeitamente em computadores, tablets e smartphones.</p>
              </div>
              <div>
                <Zap className="h-12 w-12 text-[#4d9d74] mx-auto mb-4" />
                <h3 className="code-bold text-xl text-gray-800 mb-2">Performance Otimizada</h3>
                <p className="text-gray-600">Carregamento rápido e navegação fluida para máxima produtividade.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="code-bold text-4xl md:text-5xl mb-6">
                Teste o SPA
                <span className="block text-[#4d9d74]">Sistema já funcional</span>
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
                  className="code-bold bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-8 py-4 rounded-lg transition-colors flex items-center justify-center text-lg"
                >
                  Criar Conta Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/login"
                  className="code-bold border-2 border-[#4d9d74] text-[#4d9d74] hover:bg-[#4d9d74] hover:text-white px-8 py-4 rounded-lg transition-colors flex items-center justify-center text-lg"
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <Image src="/logo.png" alt="SPA Logo" width={180} height={90} className="object-contain mb-4" />
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
              <h3 className="code-bold text-lg mb-4">Sistema</h3>
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
              <h3 className="code-bold text-lg mb-4">Acesso</h3>
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
              &copy; {new Date().getFullYear()} SPA Health Tech. MVP desenvolvido para hackathon.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 p-4 bg-[#4d9d74] text-white rounded-full shadow-lg z-50 hover:bg-[#3a8a64] transition-colors ${
          isVisible ? "block" : "hidden"
        }`}
        aria-label="Voltar ao topo"
      >
        <ArrowRight className="h-6 w-6 transform -rotate-90" />
      </motion.button>
    </div>
  )
}
