"use client"

import { useState, useEffect } from "react"
import Cookie from "js-cookie"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = Cookie.get("admin_token")

    if (!token) {
      setIsAuthenticated(false)
      setIsLoading(false)
      return
    }

    fetch("/api/admin/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Não autorizado")
        }
        return response.json()
      })
      .then(() => {
        setIsAuthenticated(true)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Erro de autenticação:", error)
        setIsAuthenticated(false)
        setIsLoading(false)
      })
  }, [])

  return { isAuthenticated, isLoading }
}
