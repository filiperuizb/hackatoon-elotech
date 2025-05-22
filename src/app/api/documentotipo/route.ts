import { NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma"

export async function GET() {
  try {
    const tiposDocumento = await prisma.tipo_documento.findMany({
      orderBy: {
        nome: "asc",
      },
    })
    
    return NextResponse.json(tiposDocumento)
  } catch (error) {
    console.error("Erro ao buscar tipos de documento:", error)
    return NextResponse.json(
      { error: "Erro ao buscar tipos de documento" },
      { status: 500 }
    )
  }
}