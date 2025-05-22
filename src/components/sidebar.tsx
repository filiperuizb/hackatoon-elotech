"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Users, Calendar, FileText, FileSpreadsheet, Home, LogOut, Menu, X, User, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [userName, setUserName] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        setUserName(payload.nome || "Usuário")
      } catch (error) {
        console.error("Erro ao decodificar token:", error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Pacientes", href: "/pacientes", icon: Users },
    { name: "Consultas", href: "/consultas", icon: Calendar },
    { name: "Prescrições", href: "/prescricoes", icon: FileText },
    { name: "Templates", href: "/templates", icon: FileSpreadsheet },
  ]

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-30 flex items-center px-4 md:pl-64">
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu size={24} className="text-gray-700" />
        </button>

        <div className="flex-1"></div>

        <div className="flex items-center">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-[#4d9d74] transition-colors p-2 rounded-md hover:bg-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-[#4d9d74] flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="hidden sm:inline-block code-bold">{userName}</span>
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sair do sistema
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <Image src="/logo.png" alt="SPA Logo" width={120} height={40} className="object-contain" />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#4d9d74] flex items-center justify-center text-white">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="code-bold font-medium text-gray-800">{userName}</div>
                    <div className="text-xs text-gray-700">Profissional de Saúde</div>
                  </div>
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`code-bold flex items-center px-3 py-2 rounded-lg transition-colors ${
                            isActive(item.href) ? "bg-[#4d9d74] text-white" : "text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon size={18} className="mr-3" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="p-4 border-t">
                <button
                  onClick={handleLogout}
                  className="code-bold flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 hidden md:block">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Image src="/logo.png" alt="SPA Logo" width={120} height={40} className="object-contain" />
            </div>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#4d9d74] flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <div>
                <div className="code-bold font-medium text-gray-800">{userName}</div>
                <div className="text-xs text-gray-700">Profissional de Saúde</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <motion.li key={item.href} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={item.href}
                      className={`code-bold flex items-center px-3 py-2 rounded-lg transition-colors ${
                        isActive(item.href) ? "bg-[#4d9d74] text-white" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={18} className="mr-3" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <motion.button
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
              onClick={handleLogout}
              className="code-bold flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} className="mr-3" />
              <span>Sair</span>
            </motion.button>
          </div>
        </div>
      </aside>
    </>
  )
}
