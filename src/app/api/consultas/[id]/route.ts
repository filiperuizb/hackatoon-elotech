import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';
import { getIdFromRequest } from '@/lib/utils/getId';

export async function GET(request: NextRequest) {
    try {
        const id = getIdFromRequest(request);

        const consulta = await prisma.consulta.findUnique({
            where: { id },
            include: {
                paciente: true,
                profissional_saude: true,
                unidade_saude: true,
            },
        });

        if (!consulta) {
            return NextResponse.json({ error: "Consulta não foi encontrada" }, { status: 404 });
        }

        return NextResponse.json(consulta, { status: 200 });
    } catch (error) {
        console.error("Erro ao listar a consulta", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const id = getIdFromRequest(request);
        const data = await request.json();
        const consulta = await prisma.consulta.update({
            where: { id },
            data,
        });

        return NextResponse.json(consulta, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar a consulta", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = getIdFromRequest(request);
        await prisma.consulta.delete({ where: { id } });
        return NextResponse.json({ message: "Consulta deletada com sucesso" }, { status: 200 });
    } catch (error) {
        console.error("Erro ao deletar a consulta", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}