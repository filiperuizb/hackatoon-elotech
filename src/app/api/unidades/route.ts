import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        
        const filters: Record<string, unknown> = {};
        const nome = searchParams.get("nome");
        const tipoId = searchParams.get("tipo_id");
        
        if (nome) filters.nome = { contains: nome, mode: "insensitive" };
        if (tipoId) filters.tipo_id = tipoId;
        
        const unidades = await prisma.unidade_saude.findMany({ 
          where: filters,
          include: {
            tipo: true
          }
        });
        return NextResponse.json(unidades, { status: 200 });
    } catch (error) {
        console.error("Erro ao listar as unidades de saúde:", error);
        return NextResponse.json({ error: "Não foi possível listar as unidades" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const unidade = await prisma.unidade_saude.create({
      data,
      include: {
        tipo: true
      }
    });
    
    return NextResponse.json(unidade, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar unidade de saúde:", error);
    return NextResponse.json(
      { error: "Falha ao cadastrar unidade de saúde" },
      { status: 500 }
    );
  }
}