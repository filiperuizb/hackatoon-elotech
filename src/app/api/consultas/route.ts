import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        
        const { 
            data: dataConsulta, 
            hora, 
            status, 
            observacoes, 
            paciente_id, 
            profissional_id, 
            unidade_id 
        } = data;
        const createData = {
            data: new Date(dataConsulta), 
            hora,
            status,
            observacoes,
            paciente_id,
            profissional_id,
            unidade_id
        };
        
        const consulta = await prisma.consulta.create({ data: createData });
        
        return NextResponse.json(consulta, {status: 201});
    } catch (error) {
        console.error("Erro ao criar consulta", error);
        return NextResponse.json({ error: `Erro interno | ${error}`}, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const filters: Record<string, unknown> = {};
        const pacienteId = searchParams.get("pacienteId");
        const profissionalId = searchParams.get("profissionalId");
        const unidadeId = searchParams.get("unidadeId");
        const data = searchParams.get("data"); 

        if (pacienteId) filters.paciente_id = pacienteId;
        if (profissionalId) filters.profissional_saude_id = profissionalId;
        if (unidadeId) filters.unidade_id = unidadeId; 
        if (data) filters.data = data; 

        const consultas = await prisma.consulta.findMany({
            where: filters,
            include: {
                paciente: true,
                profissional_saude: true,
                unidade_saude: true,
            },
        });
        return NextResponse.json(consultas, { status: 200 });
    } catch (error) {
        console.error("Erro ao listar as consultas", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}
