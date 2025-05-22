"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { ArrowRight, Users, Calendar, FileText, Shield, ChevronDown } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: <Users className="h-6 w-6 text-[#4d9d74]" />,
      title: "Gestão de Pacientes",
      description: "Cadastre e gerencie informações completas dos pacientes de forma simples e segura.",
    },
    {
      icon: <Calendar className="h-6 w-6 text-[#4d9d74]" />,
      title: "Agendamento de Consultas",
      description: "Organize sua agenda médica com facilidade e evite conflitos de horários.",
    },
    {
      icon: <FileText className="h-6 w-6 text-[#4d9d74]" />,
      title: "Prontuário Eletrônico",
      description: "Registre histórico médico, diagnósticos e prescrições em um só lugar.",
    },
    {
      icon: <Shield className="h-6 w-6 text-[#4d9d74]" />,
      title: "Segurança de Dados",
      description: "Proteção total das informações médicas seguindo as normas da LGPD.",
    },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.png" alt="SPA Logo" width={180} height={90} className="object-contain" priority />
          </div>
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
              onClick={() => scrollToSection("contact")}
              className="code-bold text-gray-700 hover:text-[#4d9d74] transition-colors"
            >
              Contato
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="code-bold text-[#4d9d74] hover:text-[#3a8a64] transition-colors hidden md:inline-block"
            >
              Login
            </Link>
            <Link
              href="/registro"
              className="code-bold bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-4 py-2 rounded transition-colors"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <h1 className="code-bold text-4xl md:text-5xl text-gray-800 mb-6">Prontuário Eletrônico Simplificado</h1>
            <p className="text-lg text-gray-600 mb-8">
              Gerencie seus pacientes, consultas e prescrições médicas em uma plataforma completa e intuitiva.
              Desenvolvido para profissionais de saúde que valorizam eficiência e segurança.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/login"
                className="code-bold bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button
                onClick={() => scrollToSection("features")}
                className="code-bold border border-gray-300 hover:border-[#4d9d74] text-gray-700 hover:text-[#4d9d74] px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                Saiba Mais
                <ChevronDown className="ml-2 h-5 w-5" />
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src="/healthcare-professionals-patients.png"
                alt="Profissionais de saúde"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="code-bold text-3xl text-gray-800 mb-4">Funcionalidades</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma oferece todas as ferramentas necessárias para otimizar sua prática médica e melhorar o
              atendimento aos pacientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="p-3 bg-[#4d9d74]/10 rounded-full w-fit mb-4">{feature.icon}</div>
                <h3 className="code-bold text-xl text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
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
                O Sistema de Prontuário Eletrônico Simplificado (SPA) foi desenvolvido para atender às necessidades dos
                profissionais de saúde, oferecendo uma solução completa e intuitiva para a gestão de pacientes e
                consultas médicas.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Nossa missão é simplificar o dia a dia dos profissionais de saúde, permitindo que dediquem mais tempo ao
                que realmente importa: o cuidado com os pacientes.
              </p>
              <Link
                href="/registro"
                className="code-bold inline-flex items-center bg-[#4d9d74] hover:bg-[#3a8a64] text-white px-6 py-3 rounded-lg transition-colors"
              >
                Junte-se a Nós
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="code-bold text-3xl text-gray-800 mb-4">Entre em Contato</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tem dúvidas sobre nossa plataforma? Entre em contato conosco e teremos prazer em ajudar.
            </p>
          </div>

          <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-0 focus:ring-2 focus:ring-[#4d9d74] text-gray-700"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-0 focus:ring-2 focus:ring-[#4d9d74] text-gray-700"
                  placeholder="Seu email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-0 focus:ring-2 focus:ring-[#4d9d74] text-gray-700"
                  placeholder="Sua mensagem"
                ></textarea>
              </div>
              <button
                type="submit"
                className="code-bold w-full bg-[#4d9d74] hover:bg-[#3a8a64] text-white py-3 px-4 rounded-lg transition-colors"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image src="/logo.png" alt="SPA Logo" width={150} height={75} className="object-contain" />
              <p className="mt-2 text-gray-400">Sistema de Prontuário Eletrônico Simplificado</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <h3 className="code-bold text-lg mb-3">Links Rápidos</h3>
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
                      onClick={() => scrollToSection("contact")}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contato
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="code-bold text-lg mb-3">Acesso</h3>
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
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} SPA Health Tech. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 p-3 bg-[#4d9d74] text-white rounded-full shadow-lg z-50 ${
          isVisible ? "block" : "hidden"
        }`}
        aria-label="Voltar ao topo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </div>
  )
}
