import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';
import { getIdFromRequest } from '@/lib/utils/getId';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    if (id === "novo") {
      return NextResponse.json({
        id: null,
        titulo: "",
        sintomas_padrao: "",
        condutas_sugeridas: "",
        sazonalidade: ""
      });
    }
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: "ID inválido. Deve ser um UUID válido." },
        { status: 400 }
      );
    }

    const template = await prisma.template.findUnique({
      where: { id },
    });
    return !template
        ? NextResponse.json({ error: "Template não foi encontrado" }, { status: 404 })
        : NextResponse.json(template, { status: 200 });
  } catch (error) {
    console.error("Erro:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
    try {
        const id = getIdFromRequest(request);
        const data = await request.json();
        const template = await prisma.template.update({
            where: { id },
            data,
        });
        return NextResponse.json(template, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar o template", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = getIdFromRequest(request);
        await prisma.template.delete({ where: { id } });
        return NextResponse.json({ message: "Template deletado com sucesso" }, { status: 200 });
    } catch (error) {
        console.error("Erro ao deletar o template", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}