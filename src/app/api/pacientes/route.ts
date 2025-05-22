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
        const pacientes = await prisma.paciente.findMany();
        return NextResponse.json(pacientes, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Não foi possível listar os pacientes"}, {status: 500});
    }
}
