import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const medicamento = await prisma.medicamento.create({
      data
    });
    
    return NextResponse.json(medicamento, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar medicamento:", error);
    return NextResponse.json(
      { error: "Falha ao cadastrar medicamento" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: Record<string, unknown> = {};
    const nome = searchParams.get("nome");
    const principioAtivo = searchParams.get("principioAtivo");
    
    if (nome) filters.nome = { contains: nome, mode: "insensitive" };
    if (principioAtivo) filters.principio_ativo = { contains: principioAtivo, mode: "insensitive" };
    
    const medicamentos = await prisma.medicamento.findMany({ 
      where: filters,
      orderBy: { nome: "asc" }
    });
    
    return NextResponse.json(medicamentos, { status: 200 });
  } catch (error) {
    console.error("Erro ao listar medicamentos:", error);
    return NextResponse.json({ error: "Não foi possível listar os medicamentos" }, { status: 500 });
  }
}