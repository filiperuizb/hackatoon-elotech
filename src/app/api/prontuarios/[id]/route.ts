import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const prontuario = await prisma.prontuario.findUnique({
      where: { id: params.id },
      include: {
        paciente: {
          select: {
            id: true,
            nome: true,
            cpf: true,
            data_nascimento: true,
            telefone: true,
            email: true,
          },
        },
        profissional_saude: {
          select: {
            id: true,
            nome: true,
            especialidade: {
              select: {
                nome: true,
              },
            },
          },
        },
        prescricao: true,
      },
    })

    if (!prontuario) {
      return NextResponse.json({ error: "Prontuário não encontrado" }, { status: 404 })
    }

    return NextResponse.json(prontuario)
  } catch (error) {
    console.error("Erro ao buscar prontuário:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()

    const cleanData = {
      queixa_principal: data.queixa_principal || null,
      historia_doenca_atual: data.historia_doenca_atual || null,
      historia_patologica: data.historia_patologica || null,
      historia_familiar: data.historia_familiar || null,
      historia_social: data.historia_social || null,
      exame_fisico: data.exame_fisico || null,
      pressao_arterial: data.pressao_arterial || null,
      frequencia_cardiaca: data.frequencia_cardiaca || null,
      temperatura: data.temperatura || null,
      peso_atual: data.peso_atual ? Number.parseFloat(data.peso_atual) : null,
      altura_atual: data.altura_atual ? Number.parseFloat(data.altura_atual) : null,
      hipotese_diagnostica: data.hipotese_diagnostica || null,
      diagnostico_definitivo: data.diagnostico_definitivo || null,
      conduta: data.conduta || null,
      observacoes: data.observacoes || null,
      retorno: data.retorno || null,
    }

    const prontuario = await prisma.prontuario.update({
      where: { id: params.id },
      data: cleanData,
      include: {
        paciente: {
          select: {
            id: true,
            nome: true,
            cpf: true,
          },
        },
        profissional_saude: {
          select: {
            id: true,
            nome: true,
            especialidade: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(prontuario)
  } catch (error) {
    console.error("Erro ao atualizar prontuário:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.prontuario.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Prontuário excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir prontuário:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
