"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"

type Especialidade = {
  id: string
  nome: string
  descricao?: string
}

interface EspecialidadeSelectorProps {
  value: string
  onChange: (id: string) => void
}

export default function EspecialidadeSelector({ value, onChange }: EspecialidadeSelectorProps) {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch("/api/especialidades")
        if (!response.ok) throw new Error("Falha ao buscar especialidades")

        const data = await response.json()
        setEspecialidades(data)
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar as especialidades")
      } finally {
        setLoading(false)
      }
    }

    fetchEspecialidades()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin h-5 w-5 border-2 border-[#4d9d74] rounded-full border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-sm py-2">{error}</div>
  }

  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {especialidades.map((esp) => (
        <div
          key={esp.id}
          onClick={() => onChange(esp.id)}
          className={`
            flex items-center p-2 border rounded-md cursor-pointer transition-colors
            ${value === esp.id ? "border-[#4d9d74] bg-[#4d9d74]/10" : "border-gray-200 hover:border-gray-300"}
          `}
        >
          <div
            className={`
            w-5 h-5 rounded-full border flex items-center justify-center mr-2
            ${value === esp.id ? "border-[#4d9d74] bg-[#4d9d74] text-white" : "border-gray-300"}
          `}
          >
            {value === esp.id && <Check size={12} />}
          </div>
          <span className="text-sm">{esp.nome}</span>
        </div>
      ))}
    </div>
  )
}
