import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const novoProfissional = await prisma.profissional_saude.create({
            data,
        });

        return NextResponse.json(novoProfissional, { status: 201 });
    } catch (error) {
        console.error("Não foi possível criar o profissional -> ", error);
        return NextResponse.json({ error: "Não foi possível criar o profissional" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const profissionais = await prisma.profissional_saude.findMany();
    } catch (error) {
        console.error("Não foi possível listar os profissionais -> ", error);
        return NextResponse.json({ error: "Não foi possível listar os profissionais" }, { status: 500 });
    }
}