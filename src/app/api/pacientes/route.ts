import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';

export async function POST(request: NextRequest) {
    const data = await request.json();
    try {
        const paciente = await prisma.paciente.create({data});
        return NextResponse.json(paciente, {status: 201});
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: "Não foi possível criar o paciente." }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const filters: any = {};
        const nome = searchParams.get("nome");
        const cpf = searchParams.get("cpf");
        const telefone = searchParams.get("telefone");

        if (nome) filters.nome = { contains: nome, mode: "insensitive" };
        if (cpf) filters.cpf = cpf;
        if (telefone) filters.telefone = { contains: telefone, mode: "insensitive" };

        const pacientes = await prisma.paciente.findMany({ where: filters });
        return NextResponse.json(pacientes, { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: "Não foi possível listar os pacientes" }, { status: 500 });
    }
}