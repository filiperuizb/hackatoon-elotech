import { NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma"

export async function GET() {
  try {
    const especialidades = await prisma.especialidade.findMany({
      orderBy: {
        nome: "asc",
      },
    })
    
    return NextResponse.json(especialidades)
  } catch (error) {
    console.error("Erro ao buscar especialidades:", error)
    return NextResponse.json(
      { error: "Erro ao buscar especialidades" },
      { status: 500 }
    )
  }
}