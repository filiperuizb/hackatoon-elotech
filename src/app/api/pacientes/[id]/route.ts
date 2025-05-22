import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';
import { getIdFromRequest } from '@/lib/utils/getId';

export async function GET(request: NextRequest) {
    const id = getIdFromRequest(request);

    try {
        const paciente = await prisma.paciente.findUnique({
            where: { id },
        });

        return !paciente
            ? NextResponse.json({ error: `Paciente ${id} não foi encontrado` }, { status: 404 })
            : NextResponse.json(paciente, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Não foi possível listar o paciente ${id}` }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const id = getIdFromRequest(request);

    try {
        const data = await request.json();

        const pacienteAtualizado = await prisma.paciente.update({
            where: { id },
            data,
        });

        return NextResponse.json(pacienteAtualizado, { status: 200 });
    } catch (error) {
        console.error("Não foi possível atualizar o paciente -> ", error);
        return NextResponse.json({ error: "Não foi possível atualizar o paciente" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const id = getIdFromRequest(request);

    try {
        await prisma.paciente.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Paciente deletado com sucesso" }, { status: 200 });
    } catch (error) {
        console.error("Não foi possível deletar o paciente -> ", error);
        return NextResponse.json({ error: "Não foi possível deletar o paciente" }, { status: 500 });
    }
}