import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")

    const where = search
      ? {
          nome: { contains: search, mode: "insensitive" as const },
        }
      : {}

    const tiposProcedimento = await prisma.tipo_procedimento.findMany({
      where,
      orderBy: { nome: "asc" },
    })

    return NextResponse.json(tiposProcedimento)
  } catch (error) {
    console.error("Erro ao buscar tipos de procedimento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const tipoProcedimento = await prisma.tipo_procedimento.create({
      data: {
        nome: data.nome,
        descricao: data.descricao || null,
      },
    })

    return NextResponse.json(tipoProcedimento, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar tipo de procedimento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
