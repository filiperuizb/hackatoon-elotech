import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';
import { getIdFromRequest } from '@/lib/utils/getId'

export async function GET(request: NextRequest) {
    try {
        const id = getIdFromRequest(request);
        const prescricao = await prisma.prescricao.findUnique({
            where: { id },
        });

        return !prescricao
            ? NextResponse.json({ error: "Prescrição não foi encontrada" }, { status: 404 })
            : NextResponse.json(prescricao, { status: 200 });
    } catch (error) {
        console.error("Erro ao listar a prescrição", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const id = getIdFromRequest(request);
        const data = await request.json();
        const prescricao = await prisma.prescricao.update({
            where: { id },
            data,
        });
        return NextResponse.json(prescricao, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar a prescrição", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = getIdFromRequest(request);
        await prisma.prescricao.delete({ where: { id } });
        return NextResponse.json({ message: "Prescrição deletada com sucesso" }, { status: 200 });
    } catch (error) {
        console.error("Erro ao deletar a prescrição", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}