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
                profissional_saude: {
                    include: {
                        especialidade: true 
                    }
                },
                unidade_saude: true,
            },
        });

        if (!consulta) {
            return NextResponse.json({ error: "Consulta não foi encontrada" }, { status: 404 });
        }
        
        const consultaFormatada = {
            id: consulta.id,
            data: consulta.data,
            hora: consulta.hora,
            status: consulta.status,
            observacoes: consulta.observacoes,
            
            paciente_id: consulta.paciente_id,
            profissional_id: consulta.profissional_id,
            unidade_id: consulta.unidade_id, 
            
            paciente_nome: consulta.paciente?.nome || '',
            profissional_nome: consulta.profissional_saude?.nome || '',

            profissional_especialidade: consulta.profissional_saude?.especialidade?.nome || '',
            unidade_nome: consulta.unidade_saude?.nome || '',
            
            created_at: consulta.created_at,
            updated_at: consulta.updated_at
        };

        return NextResponse.json(consultaFormatada, { status: 200 });
    } catch (error) {
        console.error("Erro ao listar a consulta", error);
        return NextResponse.json({ error: `Erro interno | ${error}` }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const id = getIdFromRequest(request);
        const data = await request.json();
        
        // Extract only the fields that are in the database model
        const { 
            data: dataConsulta, 
            hora, 
            status, 
            observacoes, 
            paciente_id, 
            profissional_id, 
            unidade_id 
        } = data;
          // Create an update object with only valid fields
        // Ensure that the data field is properly converted to a Date object
        const updateData = {
            data: new Date(dataConsulta), // Convert string date to Date object
            hora,
            status,
            observacoes,
            paciente_id,
            profissional_id,
            unidade_id
        };
        
        const consulta = await prisma.consulta.update({
            where: { id },
            data: updateData,
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