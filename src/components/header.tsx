"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { motion } from "framer-motion"

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; path: string; key: string }[]>([])
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const generateBreadcrumbs = () => {
      const paths = pathname.split("/").filter(Boolean)

      const breadcrumbItems = [{ name: "Home", path: "/dashboard", key: "home" }]

      if (pathname !== "/dashboard") {
        paths.forEach((path, index) => {
          const url = `/${paths.slice(0, index + 1).join("/")}`
          const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ")
          breadcrumbItems.push({
            name,
            path: url,
            key: `breadcrumb-${index}-${path}`, 
          })
        })
      }

      setBreadcrumbs(breadcrumbItems)
    }

    generateBreadcrumbs()
  }, [pathname])

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-30 bg-white transition-all ${scrolled ? "shadow-md" : "border-b border-gray-200"}`}
    >
      <div className="py-4 px-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.key} className="flex items-center">
              {index > 0 && <ChevronRight size={14} className="mx-1" />}
              <Link
                href={crumb.path}
                className={`hover:text-[#4d9d74] transition-colors ${
                  index === breadcrumbs.length - 1 ? "text-gray-700 font-medium" : ""
                }`}
              >
                {crumb.name}
              </Link>
            </div>
          ))}
        </div>
        <motion.h1
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="code-bold text-2xl text-gray-800"
        >
          {title}
        </motion.h1>
      </div>
    </motion.div>
  )
}
