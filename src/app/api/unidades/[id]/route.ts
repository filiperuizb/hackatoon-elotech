import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma"
import { getIdFromRequest } from '@/lib/utils/getId'

export async function GET(request: NextRequest) {
  try {
    const id = getIdFromRequest(request)

    const unidade = await prisma.unidade_saude.findUnique({
      where: { id },
    })

    if (!unidade) {
      return NextResponse.json({ error: "Unidade de saúde não encontrada" }, { status: 404 })
    }

    return NextResponse.json(unidade, { status: 200 })
  } catch (error) {
    console.error("Erro ao buscar unidade de saúde:", error)
    return NextResponse.json({ error: "Falha ao buscar unidade de saúde" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromRequest(request)
    const data = await request.json()

    const unidade = await prisma.unidade_saude.update({
      where: { id },
      data,
    })

    return NextResponse.json(unidade, { status: 200 })
  } catch (error) {
    console.error("Erro ao atualizar unidade de saúde:", error)
    return NextResponse.json({ error: "Falha ao atualizar unidade de saúde" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromRequest(request)

    await prisma.unidade_saude.delete({
      where: { id },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Erro ao excluir unidade de saúde:", error)
    return NextResponse.json({ error: "Falha ao excluir unidade de saúde" }, { status: 500 })
  }
}