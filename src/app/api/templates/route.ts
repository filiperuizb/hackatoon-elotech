import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';

export async function POST(request: NextRequest) {
    const data = await request.json();
    try {
        const template = await prisma.template.create({ data });
        return NextResponse.json(template, { status: 201 });
    } catch (error) {
        console.error("Erro ao listar os templates", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const filters: Record<string, unknown> = {};
    const titulo = searchParams.get("titulo");
    const sintomas_padrao = searchParams.get("sintomas_padrao");
    const sazonalidade = searchParams.get("sazonalidade");

    if (titulo) filters.titulo = { contains: titulo, mode: "insensitive" };
    if (sintomas_padrao) filters.sintomas_padrao = { contains: sintomas_padrao, mode: "insensitive" };
    if (sazonalidade) filters.sazonalidade = { contains: sazonalidade, mode: "insensitive" };

    const templates = await prisma.template.findMany({ where: filters });
    return NextResponse.json(templates, { status: 200 });
}