import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")
    const tipo = searchParams.get("tipo")

    const where: any = { ativo: true }

    if (search) {
      where.OR = [
        { nome: { contains: search, mode: "insensitive" as const } },
        { codigo: { contains: search, mode: "insensitive" as const } },
        { descricao: { contains: search, mode: "insensitive" as const } },
      ]
    }

    if (tipo) {
      where.tipo_procedimento = {
        nome: { contains: tipo, mode: "insensitive" as const },
      }
    }

    const procedimentos = await prisma.procedimento.findMany({
      where,
      include: {
        tipo_procedimento: true,
      },
      orderBy: { nome: "asc" },
      take: 50,
    })

    return NextResponse.json(procedimentos)
  } catch (error) {
    console.error("Erro ao buscar procedimentos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
