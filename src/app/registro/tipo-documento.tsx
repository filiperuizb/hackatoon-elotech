"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"

type TipoDocumento = {
  id: string
  nome: string
  descricao?: string
}

interface TipoDocumentoSelectorProps {
  value: string
  onChange: (id: string) => void
}

export default function TipoDocumentoSelector({ value, onChange }: TipoDocumentoSelectorProps) {
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTiposDocumento = async () => {
      try {
        const response = await fetch("/api/documentotipo")
        if (!response.ok) throw new Error("Falha ao buscar tipos de documento")

        const data = await response.json()
        setTiposDocumento(data)
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar os tipos de documento")
      } finally {
        setLoading(false)
      }
    }

    fetchTiposDocumento()
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
      {tiposDocumento.map((tipo) => (
        <div
          key={tipo.id}
          onClick={() => onChange(tipo.id)}
          className={`
            flex items-center p-2 border rounded-md cursor-pointer transition-colors
            ${value === tipo.id ? "border-[#4d9d74] bg-[#4d9d74]/10" : "border-gray-200 hover:border-gray-300"}
          `}
        >
          <div
            className={`
            w-5 h-5 rounded-full border flex items-center justify-center mr-2
            ${value === tipo.id ? "border-[#4d9d74] bg-[#4d9d74] text-white" : "border-gray-300"}
          `}
          >
            {value === tipo.id && <Check size={12} />}
          </div>
          <span className="text-sm">{tipo.nome}</span>
        </div>
      ))}
    </div>
  )
}
