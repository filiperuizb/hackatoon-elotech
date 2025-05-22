import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        const profissional = await prisma.profissional_saude.findUnique({
            where: { id: id },
        });

        return !profissional
            ? NextResponse.json({ error: `Profissional ${id} não foi encontrado` }, { status: 404 })
            : NextResponse.json(profissional, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Não foi possível listar o profissional ${id}` }, { status: 500 });
    }   
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();

        const profissionalAtualizado = await prisma.profissional_saude.update({
            where: { id: params.id },
            data,
        });

        return NextResponse.json(profissionalAtualizado, { status: 200 });
    } catch (error) {
        console.error("Não foi possível atualizar o profissional -> ", error);
        return NextResponse.json({ error: "Não foi possível atualizar o profissional" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.profissional_saude.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: "Profissional deletado com sucesso" }, { status: 200 });
    } catch(error) {
        console.error("Não foi possível deletar o profissional -> ", error);
        return NextResponse.json({ error: "Não foi possível deletar o profissional" }, { status: 500 });    
    }
}