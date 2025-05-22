import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        if (data.senha) {
            data.senha = await bcrypt.hash(data.senha, 10);
        }

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
        const { searchParams } = new URL(request.url);

        const filters: any = {};
        const nome = searchParams.get("nome");
        const email = searchParams.get("email");
        const especialidade = searchParams.get("especialidade");

        if (nome) filters.nome = { contains: nome, mode: "insensitive" };
        if (email) filters.email = { contains: email, mode: "insensitive" };
        if (especialidade) filters.especialidade = { contains: especialidade, mode: "insensitive" };

        const profissionais = await prisma.profissional_saude.findMany({ where: filters });
        return NextResponse.json(profissionais, { status: 200 });
    } catch (error) {
        console.error("Não foi possível listar os profissionais -> ", error);
        return NextResponse.json({ error: "Não foi possível listar os profissionais" }, { status: 500 });
    }
}