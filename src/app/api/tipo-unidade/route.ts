import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function GET(request: NextRequest) {
  try {
    const tiposUnidade = await prisma.tipo_unidade.findMany({
      orderBy: { nome: 'asc' },
    });
    
    return NextResponse.json(tiposUnidade, { status: 200 });
  } catch (error) {
    console.error("Erro ao listar os tipos de unidade:", error);
    return NextResponse.json(
      { error: "Não foi possível listar os tipos de unidade" },
      { status: 500 }
    );
  }
}