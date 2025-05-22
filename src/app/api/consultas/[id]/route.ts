import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';

export async function GET(req: NextRequest, { params}: { params: { id: string } }) {
    try {
        const consulta = await prisma.consulta.findUnique({
            where: { id: params.id },
            include: {
                paciente: true,
                profissional_saude: true,
                unidade_saude: true,
                prescricao: true,
            },
        });

        return !consulta
            ? NextResponse.json({ error: "Consulta não foi encontrada" }, { status: 404 })
            : NextResponse.json(consulta, { status: 200 });
    } catch (error) {
        console.error("Erro ao listar a consulta", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        const consulta = await prisma.consulta.update({
            where: { id: params.id },
            data,
        });

        return NextResponse.json(consulta, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar a consulta", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } })  {
    try {
        await prisma.consulta.delete({where: { id: params.id }});
        return NextResponse.json({ message: "Consulta deletada com sucesso" }, { status: 200 });
    } catch (error) {
        console.error("Erro ao deletar a consulta", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}