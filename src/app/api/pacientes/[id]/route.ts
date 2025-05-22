import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        const paciente = await prisma.paciente.findUnique({
            where: { id: id },
        });

        return !paciente
            ? NextResponse.json({ error: `Paciente ${id} não foi encontrado` }, { status: 404 })
            : NextResponse.json(paciente, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Não foi possível listar o paciente ${id}` }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();

        const pacienteAtualizado = await prisma.paciente.update({
            where: { id: params.id },
            data,
        });

        return NextResponse.json(pacienteAtualizado, { status: 200 });
    } catch (error) {
        console.error("Não foi possível atualizar o paciente -> ", error);
        return NextResponse.json({ error: "Não foi possível atualizar o paciente" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.paciente.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: "Paciente deletado com sucesso" }, { status: 200 });
    } catch(error) {
        console.error("Não foi possível deletar o paciente -> ", error);
        return NextResponse.json({ error: "Não foi possível deletar o paciente" }, { status: 500 });    
    }

}