"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Users,
  Calendar,
  FileText,
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
  Pill,
  ClipboardList,
  LayoutDashboard,
  Building2,
  Search,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const menuStructure = [
  {
    category: "Principal",
    items: [{ id: "main-dashboard", name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    category: "Atendimento",
    items: [
      { id: "patients", name: "Pacientes", href: "/pacientes", icon: Users },
      { id: "appointments", name: "Consultas", href: "/consultas", icon: Calendar },
      { id: "medical-records", name: "Prontuários", href: "/prontuarios", icon: ClipboardList },
    ],
  },
  {
    category: "Documentos",
    items: [{ id: "prescriptions", name: "Prescrições", href: "/prescricoes", icon: FileText }],
  },
  {
    category: "Recursos",
    items: [
      { id: "medications", name: "Medicamentos", href: "/medicamentos", icon: Pill },
      { id: "health-units", name: "Unidades", href: "/unidades", icon: Building2 },
    ],
  },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const activeCategory = menuStructure.find((category) =>
      category.items.some((item) => isActive(item.href)),
    )?.category

    if (activeCategory) {
      setExpandedCategories([activeCategory])
    }
  }, [])

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

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const getFilteredMenuItems = () => {
    if (!searchQuery.trim()) return menuStructure

    return menuStructure
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
      }))
      .filter((category) => category.items.length > 0)
  }

  const renderMenuItems = (isMobile: boolean) => {
    const filteredMenu = getFilteredMenuItems()

    return (
      <div className="flex flex-col h-full bg-white">
        <div className="p-4 flex items-center justify-center border-b border-gray-100">
          <Image src="/logo.png" alt="SPA Logo" width={120} height={40} className="object-contain" />
        </div>

        <div className="px-4 py-3 border-b border-gray-100">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="pl-9 pr-4 py-2 w-full bg-gray-50 border-0 rounded-lg text-sm focus:ring-2 focus:ring-[#4d9d74] focus:bg-white transition-all"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2">
          {filteredMenu.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">Nenhum resultado encontrado</div>
          ) : (
            filteredMenu.map((category) => (
              <div key={category.category} className="mb-4">
                <motion.button
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  onClick={() => toggleCategory(category.category)}
                  className="flex items-center justify-between w-full px-2 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 rounded-md"
                >
                  <span>{category.category}</span>
                  <motion.div
                    animate={{ rotate: expandedCategories.includes(category.category) ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {expandedCategories.includes(category.category) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-1 py-2">
                        {category.items.map((item) => {
                          const Icon = item.icon
                          const active = isActive(item.href)
                          return (
                            <motion.li key={item.id} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                              <Link
                                href={item.href}
                                className={`code-bold flex items-center px-3 py-2.5 rounded-lg text-sm transition-all ${
                                  active
                                    ? "bg-[#4d9d74]/10 text-[#4d9d74] font-medium"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                                onClick={() => isMobile && setIsOpen(false)}
                              >
                                <div className={`mr-3 flex-shrink-0 ${active ? "text-[#4d9d74]" : "text-gray-500"}`}>
                                  <Icon size={16} />
                                </div>
                                <span className="truncate">{item.name}</span>
                                {active && <div className="ml-auto h-2 w-2 rounded-full bg-[#4d9d74]" />}
                              </Link>
                            </motion.li>
                          )
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </nav>

        <div className="p-4 mt-auto border-t border-gray-100">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center w-full space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4d9d74] to-[#3a8a64] flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-700 truncate">{userName}</p>
                <p className="text-xs text-gray-500">{}</p>
              </div>
              <ChevronDown size={14} className="text-gray-500" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut size={14} className="mr-2" />
                    Sair do sistema
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 bg-white z-30 flex items-center px-4 md:pl-64 shadow-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu size={20} className="text-gray-700" />
        </button>

        <div className="md:hidden ml-2">
          <Image src="/logo.png" alt="Logo" width={90} height={32} className="object-contain" />
        </div>

        <div className="flex-1"></div>
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
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 md:hidden"
          >
            <div className="flex items-center justify-between p-4">
              <Image src="/logo.png" alt="Logo" width={100} height={32} className="object-contain" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            {renderMenuItems(true)}
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 hidden md:block">
        {renderMenuItems(false)}
      </aside>

      <div className="md:pl-64 pt-16 md:pt-0"></div>
    </>
  )
}
