import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';

export async function POST(request: NextRequest) {
    const data = await request.json();

    try {
        const prescricao = await prisma.prescricao.create({ data });

        return NextResponse.json(prescricao, { status: 201 });
    } catch (error) {
        console.error("Erro ao listar as prescrições", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const filters: Record<string, unknown> = {};
    const medicamento = searchParams.get("medicamento");
    const consulta_id = searchParams.get("consulta_id");

    if (medicamento) filters.medicamento = { contains: medicamento, mode: "insensitive" };
    if (consulta_id) filters.consulta_id = consulta_id;

    const prescricoes = await prisma.prescricao.findMany({ where: filters });
    return NextResponse.json(prescricoes, { status: 200 });
}