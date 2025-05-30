import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';
import { getIdFromRequest } from '@/lib/utils/getId';

export async function GET(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);

    const medicamento = await prisma.medicamento.findUnique({
      where: { id },
    });

    if (!medicamento) {
      return NextResponse.json({ error: "Medicamento não encontrado" }, { status: 404 });
    }

    return NextResponse.json(medicamento);
  } catch (error) {
    console.error("Erro ao buscar medicamento:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    const data = await request.json();

    const medicamento = await prisma.medicamento.update({
      where: { id },
      data,
    });

    return NextResponse.json(medicamento);
  } catch (error) {
    console.error("Erro ao atualizar medicamento:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);

    await prisma.medicamento.update({
      where: { id },
      data: { ativo: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir medicamento:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}