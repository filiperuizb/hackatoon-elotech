import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const medicamento = await prisma.medicamento.findUnique({
      where: { id },
    })

    if (!medicamento) {
      return NextResponse.json({ error: "Medicamento não encontrado" }, { status: 404 })
    }

    return NextResponse.json(medicamento)
  } catch (error) {
    console.error("Erro ao buscar medicamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await req.json()

    const medicamento = await prisma.medicamento.update({
      where: { id },
      data: {
        nome: data.nome,
        principio_ativo: data.principio_ativo || null,
        concentracao: data.concentracao || null,
        forma_farmaceutica: data.forma_farmaceutica || null,
        fabricante: data.fabricante || null,
        codigo_barras: data.codigo_barras || null,
      },
    })

    return NextResponse.json(medicamento)
  } catch (error) {
    console.error("Erro ao atualizar medicamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await prisma.medicamento.update({
      where: { id },
      data: { ativo: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao excluir medicamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
