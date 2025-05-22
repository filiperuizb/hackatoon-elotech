import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';
import { getIdFromRequest } from '@/lib/utils/getId';

export async function GET(request: NextRequest) {
    try {
        const id = getIdFromRequest(request);
        const template = await prisma.template.findUnique({
            where: { id },
        });
        return !template
            ? NextResponse.json({ error: "Template não foi encontrado" }, { status: 404 })
            : NextResponse.json(template, { status: 200 });
    } catch (error) {
        console.error("Erro ao listar o template", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
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