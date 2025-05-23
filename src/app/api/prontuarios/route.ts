import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const pacienteId = searchParams.get("paciente_id")

    const where = pacienteId ? { paciente_id: pacienteId } : {}

    const prontuarios = await prisma.prontuario.findMany({
      where,
      include: {
        paciente: {
          select: {
            id: true,
            nome: true,
            cpf: true,
            data_nascimento: true,
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
      orderBy: {
        data_atendimento: "desc",
      },
    })

    return NextResponse.json(prontuarios)
  } catch (error) {
    console.error("Erro ao buscar prontuários:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const cleanData = {
      paciente_id: data.paciente_id || null,
      profissional_id: data.profissional_id || null,
      data_atendimento: data.data_atendimento ? new Date(data.data_atendimento) : new Date(),
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

    if (!cleanData.paciente_id || !cleanData.profissional_id) {
      return NextResponse.json({ error: "Paciente e profissional são obrigatórios" }, { status: 400 })
    }

    const prontuario = await prisma.prontuario.create({
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

    return NextResponse.json(prontuario, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar prontuário:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
